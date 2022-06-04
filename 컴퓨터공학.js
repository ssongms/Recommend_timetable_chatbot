var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://sugang.khu.ac.kr/core?attribute=lectListJson&lang=ko&loginYn=N&menu=1&p_major=A07308&p_year=2022&p_term=10&initYn=Y',
  'headers': {
    'Cookie': 'JSESSIONID=aHGSkYnn7ZmXH5Wgx8So3tatw4J7LyR5g98tqYffSUU7qPhC7FFjOaemFCb8UgU5.amV1c19kb21haW4vV0hfU3VnYW5nMQ==; WMONID=R84FN19dbP4'
  },
  formData: {
    'attribute': 'lectListJson',
    'lang': 'ko',
    'loginYn': 'N',
    'menu': '1',
    'p_major': 'A07308',
    'p_year': '2022',
    'p_term': '10',
    'initYn': 'Y'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
  var data = response.body;
  
  console.log(typeof data);
});