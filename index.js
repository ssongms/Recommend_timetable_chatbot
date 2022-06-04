const config =require('./config')
const mongoose = require("mongoose");
const connect = mongoose.connect(config.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB : Succesfully Connected"))
  .catch((err) => console.log(err.message));


  const TimeSchema = new mongoose.Schema({
    time: String,
    prof: String,
    credit: Number,
  });

  const SubSchema = new mongoose.Schema({
    campus: String,
    college: String,
    department: String,
    grade: String,
    subject: [TimeSchema],
  });

  const Timeinfo = mongoose.model('Timeinfo', TimeSchema);
  const Subinfo = mongoose.model('Subinfo', SubSchema);

  module.exports = {Timeinfo, Subinfo};

  var express = require('express');
const request = require('request');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = 'KDfacj4wYOewyww1JPcvRZYDz+9UaV/mtjr9jkYiZw2Ywm0NO9R100opUwuRHMzXoTxmstALtM5a6l4Ro8nkjQBOT8HsBsARXeqRt6gaKDb1Hu7FAOmQ6kcKN8qsiwyEdKWDJnqaCB7im3QIiPGqIAdB04t89/1O/w1cDnyilFU='
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = "2019102187.osschatbot2022.ml"
const sslport = 23023;

const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.post('/hook', function (req, res) {

    var eventObj = req.body.events[0];
    var source = eventObj.source;
    var message = eventObj.message;

    // request log
    console.log('======================', new Date() ,'======================');
    console.log('[request]', req.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);

    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken":eventObj.replyToken,
                "messages":[
                    {
                        "type":"text",
                        "text":"Hello, user"
                    },
                    {
                        "type":"text",
                        "text":"May I help you?"
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
        });
    

    res.sendStatus(200);
});

try {
    const option = {
      ca: fs.readFileSync('/etc/letsencrypt/live/' + domain +'/fullchain.pem'),
      key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/privkey.pem'), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/cert.pem'), 'utf8').toString(),
    };
  
    HTTPS.createServer(option, app).listen(sslport, () => {
      console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
  } catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
  }
  
