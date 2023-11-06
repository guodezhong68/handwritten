/**
 * @description
 * 快速导出压缩包 需要安装依赖 npm install archiver -D
 * 这个库的文档地址 https://github.com/archiverjs/node-archiver
 * 可以在 package.json 中配置 script 命令 npm run build 之后直接 进行 导出 zip 压缩包
 * @example  将需要导出的目录添加到target数组中 命令行执行 node export-zip.js 即可
 *    package.json
 *     "clean": "rimraf dist.zip",
 *     "zip": "node export-zip.js",
 *     "deploy": "npm run build && npm run clean && npm run zip",
 */

const fs = require('fs');
const archiver = require('archiver');

const homedir = __dirname;//这里是当前目录路径

//const timeString = new Date().toLocaleDateString().replace(/\//g, '-'); // 日期充当hash值防止覆盖之前的压缩包

//配置要打包的路径列表,需要打包某些目录，添加到数组里面即可 相对路径
const target = ['dist/']

// 默认在当前目录路径生成此文件 dist.zip
const output = fs.createWriteStream(homedir + '/dist.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // 设置压缩级别
});

archive.on('error', function (err) {
  throw err;
});

output.on('close', function () {

  console.log(`
     --------- ---------压缩完毕--------- ---------
     生成文件大小${(archive.pointer() / 1024 / 1024).toFixed(1)}MB
     请在当前项目路径下寻找 dist.zip 文件,系统路径为 ${homedir}\\dist.zip
     ---------如需配置生成路径或文件名,请配置output---------
     `);
});

archive.pipe(output);
for (i of target) { archive.directory(i, false) }

//const file1 = __dirname + '/file1.txt';
//archive.append(fs.createReadStream(file1), { name: 'file1.txt' });

//archive.append('string cheese!', { name: 'file2.txt' });

//const buffer3 = Buffer.from('buff it!');
//archive.append(buffer3, { name: 'file3.txt' });

//archive.file('file1.txt', { name: 'file4.txt' });

//rchive.directory('subdir/', 'new-subdir');

//archive.glob('file*.txt', {cwd:__dirname});

archive.finalize();
