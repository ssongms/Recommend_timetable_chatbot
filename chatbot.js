var express = require('express');
const request = require('request');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = ''
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = ""
const sslport = 23023;

const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());


ID_data_array = []

app.post('/hook', function (req, res) {

    var eventObj = req.body.events[0];
    var source = eventObj.source;   
    var message = eventObj.message;

    var user_ID = eventObj.source['userId']
    var data = eventObj.message['text']
    if (ID_data_array.length == 0) {
        ID_data_array.push([user_ID])
        ID_data_array[0].push(data)
    }
    else {
        var find = 0
        for (var i in ID_data_array) {
            if (ID_data_array[i][0] == user_ID) {
                find = 1
                if (ID_data_array[i].length < 4) {
                    ID_data_array[i].push(data)    
                }
                else {
                    ID_data_array[i] = [user_ID];
                    ID_data_array[i].push(data);
                }
            }
        }
        if (find == 0) {
            ID_data_array.push([user_ID]);
            ID_data_array[ID_data_array.length-1].push(data);
        }
    }

    // request log
    console.log('======================', new Date() ,'======================');
    console.log('[request]', req.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);
    
    console.log(ID_data_array)
    for (var i in ID_data_array) {
        console.log(ID_data_array[i])        
    }


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

    if (data.length >= 3) {
        data = []
    }
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
