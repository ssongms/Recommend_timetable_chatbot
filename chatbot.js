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
const config = require('./config')
const mongoose = require("mongoose");
const { range } = require("express/lib/request");
const connect = mongoose.connect(config.url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB : Succesfully Connected"))
    .catch((err) => console.log(err.message));
var express = require('express');
const { Subinfo } = require('./models/model');

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
                if (ID_data_array[i].length < 5) {
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
            ID_data_array[ID_data_array.length - 1].push(data);
        }
    }

    // request log
    console.log('======================', new Date(), '======================');
    console.log('[request]', req.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);

    console.log(ID_data_array)
    for (var i in ID_data_array) {
        console.log(ID_data_array[i])
    }

    for (var i in ID_data_array) {
        if (ID_data_array[i][0] == user_ID) {
            if (ID_data_array[i].length == 5) {

                var campusinfo = ID_data_array[i][1]
                var collegeinfo = ID_data_array[i][2]
                var departmentinfo = ID_data_array[i][3]
                var gradeinfo = ID_data_array[i][4]

                var name = []
                var time = []
                var prof = []
                var credit = []

                Subinfo.find({ campus: `${campusinfo}`, college: `${collegeinfo}`, department: `${departmentinfo}`, grade: `${gradeinfo}` }).then((sub) => {
                    if (sub) {
                        console.log(sub)
                        for (var i in sub) {
                            if (sub[i]['subject'].length == 0) {
                                continue
                            }

                            if (sub[i]['choice'] == '필수') {
                                name.push(sub[i]['name'])
                                credit.push(sub[i]['credit'])

                                var random_num = (Math.floor(Math.random() * (sub[i]['subject'].length)))

                                if (time.length > 0) {
                                    while (true) {
                                        try {
                                            var tmp = 0
                                            var random_num = (Math.floor(Math.random() * (sub[i]['subject'].length)))

                                            for (var j in time) {
                                                if (time[j].slice(0, 1) == sub[i]['subject'][random_num]['time'].slice(0, 1)) {
                                                    var tmp_time1 = Number(`${time[j].slice(2, 4) + '.' + time[j].slice(5, 7)}`)
                                                    var tmp_time2 = Number(`${time[j].slice(8, 10) + '.' + time[j].slice(11, 13)}`)
                                                    var tmp_time3 = Number(`${sub[i]['subject'][random_num]['time'].slice(2, 4) + '.' + sub[i]['subject'][random_num]['time'].slice(5, 7)}`)

                                                    if (tmp_time3 >= tmp_time1 & tmp_time3 <= tmp_time2) {
                                                        tmp = 1
                                                        break
                                                    }
                                                }
                                            }
                                            if (tmp == 0) {
                                                break
                                            }
                                        }
                                        catch (err) {
                                            console.error(err);
                                        }
                                    }
                                }
                                time.push(sub[i]['subject'][random_num]['time'])
                                prof.push(sub[i]['subject'][random_num]['prof'])
                            }
                        }
                    }
                    else {
                        console.log(err)
                    }

                    var message_array = []

                    for (var i in name) {
                        var message_json = {
                            'type': 'text',
                            'text': `${'과목명: ' + name[i] + '\n' + '강의 시간: ' + time[i] + '\n' + '교수님: ' + prof[i] + '\n' + '학점: ' + credit[i]}`
                        }
                        message_array.push(message_json)
                    }
                    if (message_array.length == 0) {
                        message_array = [{
                            'type': 'text',
                            'text': '입력과정에서 오류가 있습니다. \'시작\'을 입력해주세요.'
                        }]
                    }

                    request.post(
                        {
                            url: TARGET_URL,
                            headers: {
                                'Authorization': `Bearer ${TOKEN}`
                            },

                            json: {
                                "replyToken": eventObj.replyToken,
                                "messages": message_array
                            },

                        }, (error, response, body) => {
                            console.log(body)
                        });
                })
            }
            break
        }
    }
    res.sendStatus(200);
});

try {
    const option = {
        ca: fs.readFileSync('/etc/letsencrypt/live/' + domain + '/fullchain.pem'),
        key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain + '/privkey.pem'), 'utf8').toString(),
        cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain + '/cert.pem'), 'utf8').toString(),
    };

    HTTPS.createServer(option, app).listen(sslport, () => {
        console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
} catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
}