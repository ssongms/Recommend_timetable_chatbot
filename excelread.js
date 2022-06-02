// @breif xlsx 모듈추출

const xlsx = require( "xlsx" );

// @files 엑셀 파일을 가져온다.

const excelFile = xlsx.readFile( "컴퓨터공학과 권장이수 가이드라인.xlsx" );
// @breif 엑셀 파일의 첫번째 시트의 정보를 추출

const sheetName = excelFile.SheetNames[0];          // @details 첫번째 시트 정보 추출
const firstSheet = excelFile.Sheets[sheetName];       // @details 시트의 제목 추출

// @details 엑셀 파일의 첫번째 시트를 읽어온다.

const jsonData = xlsx.utils.sheet_to_json( firstSheet, { defval : "" } );
console.log( jsonData );

var ary = [];

const xlsxFile = require('read-excel-file/node'); xlsxFile('컴퓨터공학과 권장이수 가이드라인.xlsx').then((rows) => { 
    //console.log(rows); console.table(rows);
     for (var i in rows) {
        ary.push(rows[i]);
        
       
    }
    //console.log(ary)
    })
console.log(ary);