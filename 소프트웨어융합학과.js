var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://sugang.khu.ac.kr/core?attribute=lectListJson&lang=ko&loginYn=N&menu=1&p_major=A07337&p_year=2022&p_term=10&initYn=Y',
  'headers': {
    'Cookie': 'JSESSIONID=aHGSkYnn7ZmXH5Wgx8So3tatw4J7LyR5g98tqYffSUU7qPhC7FFjOaemFCb8UgU5.amV1c19kb21haW4vV0hfU3VnYW5nMQ==; WMONID=R84FN19dbP4'
  },
  formData: {
    'attribute': 'lectListJson',
    'lang': 'ko',
    'loginYn': 'N',
    'menu': '1',
    'p_major': 'A07337',
    'p_year': '2022',
    'p_term': '10',
    'initYn': 'Y'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var jason = response.body
  var json = JSON.parse(jason)
  
  const data = {}

  for (var i in json["rows"]){
    var obj = {};
    obj['name'] = json["rows"][i]["subjt_name"];
    obj['time'] = json["rows"][i]["timetable"];
    obj['prof'] = json["rows"][i]["teach_na"];
    obj['credit'] = json["rows"][i]["unit_num"];
    console.log(obj);
  }
});
