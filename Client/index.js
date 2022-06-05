var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var amqp = require('amqplib/callback_api');
const CONN_URL = "amqps://deeeuvun:stX7p-YHmF69-lEYRKpO0dushjDbEAo_@beaver.rmq.cloudamqp.com/deeeuvun"

app = express();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}));

amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, ch) {
      ch.consume('user-messages', function (msg) {
        console.log('.....');
        setTimeout(function(){
          console.log("Message:", msg.content.toString());
        },4000);
        },{ noAck: true }
      );  
    });
  });

app.listen(3002,(error)=>{
    console.log("Listening to 3002")
})
