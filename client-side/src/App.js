import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import socketClient  from "socket.io-client";
const SERVER = "http://127.0.0.1:3002";

function App() {
  
  var socket = socketClient (SERVER);
  socket.on('connection', () => {
    console.log(`I'm connected with the back-end`);
  });


  return (
   <>
   
   </>
  );
}

export default App;
