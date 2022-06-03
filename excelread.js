const xlsx = require( "xlsx" );
// 엑셀 파일을 가져오기

const excelFile = xlsx.readFile( "컴퓨터공학과 권장이수 가이드라인.xlsx");
// 엑셀 파일의 첫번째 시트의 정보 추출

const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];
const jsonData = xlsx.utils.sheet_to_json(firstSheet);

var first_first = [];
var first_second = [];
var second_first = [];
var second_second = [];
var third_first = [];
var third_second = [];
var fourth_first = [];
var fourth_second = [];

function jason_to_arry() {
  for (var data in jsonData){
    first_first.push(jsonData[data]['1학년 1학기']);
    first_second.push(jsonData[data]['1학년 2학기']);
    second_first.push(jsonData[data]['2학년 1학기']);
    second_second.push(jsonData[data]['2학년 2학기']);
    third_first.push(jsonData[data]['3학년 1학기']);
    third_second.push(jsonData[data]['3학년 2학기']);
    fourth_first.push(jsonData[data]['4학년 1학기']);
    fourth_second.push(jsonData[data]['4학년 2학기']);
  }
}
// jason -> array로 변경
function remove_null() {
first_first = first_first.filter(function(item) {
  return item !== null && item !== undefined && item !== '';
});
first_second = first_second.filter(function(item) {
    return item !== null && item !== undefined && item !== '';
  });
second_first = second_first.filter(function(item) {
    return item !== null && item !== undefined && item !== '';
});
second_second = second_second.filter(function(item) {
    return item !== null && item !== undefined && item !== '';
  });
third_first = third_first.filter(function(item) {
    return item !== null && item !== undefined && item !== '';
  });
third_second = third_second.filter(function(item) {
    return item !== null && item !== undefined && item !== '';
  });
fourth_first = fourth_first.filter(function(item) {
    return item !== null && item !== undefined && item !== '';
  });
fourth_second = fourth_second.filter(function(item) {
    return item !== null && item !== undefined && item !== '';
  });
}
// null 값 제거

jason_to_arry()
remove_null()
