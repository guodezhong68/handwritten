// XMLHttpRequest实现fetch方法
function myFetch(action, {method, body}) {
   return new Promise( (resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open( method, action );
      xhr.send( body );
      xhr.onload = function(e) {
         resolve( JSON.parse( xhr.response ) )
      }
   } )
}