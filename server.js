var http = require('http');
var PORT = process.env.port || 4001;
var fs = require('fs');
var io = require('socket.io').listen(http);

http.createServer(function(request,response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('Listening on port '+PORT)
}).listen(PORT, () => console.log(`Legancko na porcie ${PORT}`));


io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });
// io.on("connection", function(socket) {
//     socket.on('connected', function(data) {
//         socket.broadcast.emit('connected', data);
//     });
// });