const app = require('express')();
const server = require('http').createServer(app);
app.set("view engine","ejs")
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
const port = process.env.PORT || 3003;
var cors = require('cors')
app.use(cors());


var clients = [];

app.get('/', (req, res)=>{
  clients = []
  io.sockets.sockets.forEach((socket) => {
    clients.push(socket); 
});

  res.render("serverSide",{
     clients
   })
});

app.get('/RemoveClient', (req,res)=>{
  const {id}= req.query
  io.sockets.sockets.forEach((socket) => {
    // If given socket id is exist in list of all sockets, kill it
    if(socket.id === id)
      {  
        socket.disconnect(true);
        res.redirect('/')
      }
});
 
})

app.get('/SendBroadCastMsg',(req,res)=>{
  io.emit("msg", "world");
   console.log(" i am here in broadcast route")
  res.redirect('/')
})


io.on('connection',function(socket){
    console.log('a new user is connected')
    socket.emit('connection', null);
   
})



 
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});