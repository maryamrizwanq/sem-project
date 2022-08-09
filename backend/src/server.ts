#!/usr/bin/env node

/**
 * Module dependencies.
 */

 import { App } from './app';
 var debug = require('debug')('express-basics:server');
 var http = require('http');
 
 let appObj = new App();

 /**
  * Get port from environment and store in Express.
  */
 
 var port = normalizePort(process.env.PORT || '8000');
 appObj.app.set('port', port);
 
 /**
  * Create HTTP server.
  */
 
 var server = http.createServer(appObj.app);
 

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });

// const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

// io.on("connection", (socket) => {

// // Join a conversation
// const { roomId } = socket.handshake.query;
// socket.join(roomId);

// // Listen for new messages
// socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
//   io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
// });

// // Leave the room if the user closes the socket
// socket.on("disconnect", () => {
//   socket.leave(roomId);
// });
// });

 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 server.on('error', onError);
 server.on('listening', onListening);
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val: any) {
   var port = parseInt(val, 10);
 
   if (isNaN(port)) {
     // named pipe
     return val;
   }
 
   if (port >= 0) {
     // port number
     return port;
   }
 
   return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
 function onError(error: any) {
   if (error.syscall !== 'listen') {
     throw error;
   }
 
   var bind = typeof port === 'string'
     ? 'Pipe ' + port
     : 'Port ' + port;
 
   // handle specific listen errors with friendly messages
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
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'port ' + addr.port;
   debug('Listening on ' + bind);
 } 