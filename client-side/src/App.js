import './App.css';
import React, { useState, useEffect } from "react";
import socketClient  from "socket.io-client";
import { Button } from 'react-bootstrap';
const SERVER = "http://127.0.0.1:3003";

function App() {
  const [ClientName,setClientName]= useState("ClientName")
  const [ClientID,setClientID]= useState("ClientID")
  const [buttonState,setbuttonState]= useState(false)
  const [broadcastMsg,setBroadCastMsg] = useState('hello there')

  var socket = ''

  function ConnectToServer(){
    socket = socketClient (SERVER);
    socket.on('connection', () => { 
      console.log(`I'm connected with the back-end`);
      setClientID(socket.id)
      socket.on("msg", (arg) => {
        setBroadCastMsg(arg)
      });
     
    });
    setbuttonState(true)
  }

  return (
   <>
       <div style={{marginTop:"200px",marginLeft:"100px"}}> 
       <h4>{broadcastMsg}</h4>
       <h3> Name: {ClientName}</h3>
       <h3>ID: {ClientID}</h3>
       <Button style={{ 
      width: "200px", 
      height: "50px",  
      border: "5px", 
      backgroundColor: "darkslategray",
      borderRadius: "17px" }}    disabled={buttonState} onClick={ConnectToServer}> 
      Connect to Server
      </Button>
      <div> 
        
      </div>
       </div>
   
   </>
  );
}

export default App;
