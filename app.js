//引用模板
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var multer=require("multer");
var cors=require("cors");
var upload = multer({ dest:'./public/upload'}); 
var app = express();
// 引用ejs视图的作用
app.use(upload.any());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//设置日志
app.use(logger('dev'));
//引用body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//静态资源引用
app.use(express.static(path.join(__dirname, 'public','template')));
app.use('/supervisor',express.static(path.join(__dirname, 'public','admin')));
app.use(express.static(path.join(__dirname, 'public')));
//引用接口下的文件
app.use(cors({
  //允许所有前端域名
  "origin": ["http://localhost:8001","http://localhost:5000","http://127.0.0.1:8848"],  
  "credentials":true,//允许携带凭证
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //被允许的提交方式
  "allowedHeaders":['Content-Type','Authorization','token']//被允许的post方式的请求头
}));
app.all('/api/*', require('./utils/params'));
// app.use("/index",require("./routes/index"))
app.use("/api/login",require("./routes/api/login"));
app.use("/api/news",require("./routes/api/news"));
app.use("/api/reg",require("./routes/api/reg"));
app.use("/api/user",require("./routes/api/user"));

// 捕获404并转发到错误处理程序
app.use(function(req, res, next) {
  next(createError(404));
});
// 错误处理程序
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);

  if(req.url.includes('/api')){// 用户端接口不存在 返回  {err:1,msg:'不存在的接口'}
    res.send({err:1,msg:'不存在的接口'})
  }else if(req.url.includes('/admin')){// 管理端接口不存在 返回  res.render('error.ejs')
    res.render('error');
  }else{ // 资源托管没有对应的页面 返回 404.html
    console.log('sendFile')
    res.sendFile(path.join(__dirname,'public','template','index.html'))
  }  
});
module.exports = app;
