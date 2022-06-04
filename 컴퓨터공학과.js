var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://sugang.khu.ac.kr/core?attribute=lectListJson&lang=ko&loginYn=N&menu=1&p_major=A10627&p_year=2022&p_term=10&initYn=Y',
  'headers': {
    'Cookie': 'JSESSIONID=0hka3HzdSAOOvWw17F0W3OixVWW5MKzJg31nZrYU3yjMlmIv7GF9vasjvDsYwTAe.amV1c19kb21haW4vV0hfU3VnYW5nMQ==; WMONID=R84FN19dbP4'
  },
  formData: {
    'attribute': 'lectListJson',
    'lang': 'ko',
    'loginYn': 'N',
    'menu': '1',
    'p_major': 'A10627',
    'p_year': '2022',
    'p_term': '10',
    'initYn': 'Y'
  }
  
};

request(options, function (error, response) {
  if (error) throw new Error(error);
  var json = response.body
  json = JSON.parse(json)
  
  const data = {};

  for (var i in json["rows"]) {
    
    var subjt_name = json["rows"][i]["subjt_name"]
    data[subjt_name] = [json["rows"][i]["timetable"], json["rows"][i]["teach_na"], json["rows"][i]["unit_num"]]
  }
  console.log(data)


});