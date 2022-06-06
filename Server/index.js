
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
const {publishToQueue} = require('./MQService')
app = express();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}));

app.post('/msg', async function(req, res){
    let { queueName, payload } = req.body;
    await publishToQueue(queueName, payload);
    res.statusCode = 200;
    res.data = {"message-sent":true};
    res.send()
})
 
app.listen(3001,(error)=>{
    if(!error) {
        console.log("Listening t0 3001")
    }
});