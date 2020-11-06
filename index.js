var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
 
var server = http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    if(pathname == "/"){
        pathname = "index.html";
    }
    var fileURL = "./" + path.normalize("./webClientStatic/" + pathname);
    var extname = path.extname(pathname);
    fs.readFile(fileURL,function(err,data){
        if(err){
            res.writeHead(404,{"Content-Type":"text/html;charset=UTF8"})
            res.end("404,请求文件不存在：" + fileURL);
        }
        getMime(extname,function(mime){
            res.writeHead(200,{"Content-Type":mime})
            res.end(data);
        });
    });
});

server.listen(8888);
console.log("已经监听端口 8888， 请移步浏览器输入 http://127.0.0.1:8888 预览 Orz");
 
function getMime(extname,callback){
    fs.readFile("./mime.json",function(err,data){
        if(err){
            throw Error("找不到mime.json：" + extname);
            return;
        }
        var mimeJSON = JSON.parse(data);
        var mime =  mimeJSON[extname]  || "text/html";
        callback(mime);
    });
}