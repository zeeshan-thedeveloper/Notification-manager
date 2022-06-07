const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const path = require('path');
const { Socket } = require('socket.io');

app.get('/', function(req, res) {
 res.sendFile(path.resolve(__dirname,'index.html'))
});

io.on('connection',function(socket){
    console.log('a new user is connected')
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
    socket.on('disconnect', function () {
        console.log('user disconnected');
      });
})

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});