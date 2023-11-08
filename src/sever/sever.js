let http=require('http');
let fs=require('fs');
let url=require('url');
let slides=require('./slide');
let port = process.argv[2] || 3000;

let read=(cd)=>{
   fs.readFile('./books.json','utf8',function (err,data) {
     if(err||data.length==0){
       cd([]);
     }else {
       cd(JSON.parse(data));
     }
   })
}
let write=(data,cd)=>{
  fs.writeFile('./books.json',JSON.stringify(data),cd);
}

http.createServer((req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") return res.end();/*让options请求快速返回*/
  let pagesize=5;
  let {pathname,query}=url.parse(req.url,true);
  if(pathname==='/slides'){
    res.setHeader('Content-Type','application/json;charset=utf8');
    res.end(JSON.stringify(slides));
    return;
  }
  if(pathname==='/hot'){
    read(function (books) {
      let hot=books.reverse().slice(0,6);
      res.setHeader('Content-Type','application/json;charset=utf8');
      res.end(JSON.stringify(hot));
      return;
    })
  }
  if(pathname==='/book'){
    let i=query.id;
    let id=parseInt(i);
    switch (req.method){
      case 'GET':
        if(typeof i==='string'){
          read(function (books) {
            let book=books.find((item)=>item.bookId==id);
            if(!book) book={};
            res.setHeader('Content-Type','application/json;charset=utf8');
            res.end(JSON.stringify(book));
          })
        }else {
          read(function (books) {
            books=books.reverse();
            res.setHeader('Content-Type','application/json;charset=utf8');
            res.end(JSON.stringify(books));
          })
        }
        break;
      case 'POST':
        let str='';
        req.on('data',chunk=>{
          str+=chunk;
        })
        req.on('end',()=> {
          let book = JSON.parse(str);
          read(function (books) {
            book.bookId=books.length>0?books[books.length-1].bookId+1:1;
            books.push(book);
            write(books,function () {
              res.setHeader('Content-Type','application/json;charset=utf8');
              res.end(JSON.stringify(books));
            })
          })
        })
        break;
      case 'PUT':
        if(id){
          let str='';
          req.on('data',chunk=>{
            str+=chunk;
          })
          req.on('end',()=>{
            let book=JSON.parse(str);
            read(function (books) {
             books=books.map(item=>{
                if(item.bookId==id)
                  return book;
                return item;
              });
             write(books,function () {
               res.setHeader('Content-Type','application/json;charset=utf8');
               res.end(JSON.stringify(book));
             })
            });

          })
        }
        break;
      case 'DELETE':
        read(function (books) {
          books=books.filter((item)=>item.bookId!=id);
          write(books,function () {
            res.setHeader('Content-Type','application/json;charset=utf8');
            res.end(JSON.stringify({}));
          })
        })
        break;
    };
    return;
  }
  if(pathname==='/page'){
    let offset=parseInt(query.offset)||0;
    read(function (books) {
      let result=books.reverse().slice(offset,offset+pagesize);
      let hasMore=true;
      if(books.length<=offset+pagesize){
        hasMore=false;
      }
      res.setHeader('Content-Type','application/json;charset=utf8');
      res.end(JSON.stringify({hasMore,books:result}))
    })
  }

// fs.stat('.'+pathname,function(err,stats){
//   if(err){
//     res.statusCode=404;
//     res.end('NOT FOUND');
//   }else{
//     if(stats.isDirectory()){
//       let p=require('path').join('.'+pathname,'./index.html');
//       fs.createReadStream(p).pipe(res);
//     }else{
//       fs.createReadStream('.'+pathname).pipe(res);
//     }
//   }
// })
}).listen(port);
