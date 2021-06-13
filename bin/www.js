//获取服务器的模块
var app = require('../app');
var debug = require('debug')('obj:server');
var http = require('http');
 //从环境中获取端口并存储在Express中。
 var config=require("../config/server");
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
//设置服务器
var server =http.createServer(app);
//在提供的端口、所有网络接口上侦听。
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
//将端口规范化为数字、字符串或false。
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
     return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
// HTTP服务器“错误”事件的事件侦听器。
function onError(error) {
  if (error.syscall !== 'listen') {
    //抛出错误
     throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // 使用友好消息处理特定的侦听错误
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
// HTTP服务器“侦听”事件的事件侦听器
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
