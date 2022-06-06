**# About the project**
* 사용자가 본인의 캠퍼스, 단과대학, 학과, 학년학기를 순서대로 입력하면 경희대학교 학과 홈페이지의 권장이수체계도에서 제공하는 과목들의 개설시간을 고려한 시간표를 제공

**## 개발동기**
학기가 시작하기 전에, 많은 학생들이 경희대학교 학과 홈페이지에서 권장하는 이수체계도를 참고하지만 매번 확인이 번거롭고, 무엇보다 학기마다 전공 과목의 개설시간과 교수님 등의 정보가 바뀌어서 매 학기마다 희망과목을 담기 전에 미리 시간을 확인하고 직접 예정시간표에 추가해서 따져보아야 한다. 
이러한 문제점으로, 학과 홈페이지에서 제공하는 권장이수체계도에 따른 전공과목을 미리 넣어둔 시간표를 알 수 있다면 편리할 것 같아 이 프로젝트를 고안함
 
**## 기대효과**
챗봇이 시간표 케이스들을 제공해준다면, 사용자는 남은 시간 자리에 원하는 과목(전공선택, 교양, 배분이수 등)을 추가하여 수월하게 시간표 경우의 수를 계산할 수 있음

**## Built**
* Node.js


**# How to Install**
1. Clone Repository
<span class="evidence">git clone http://khuhub.khu.ac.kr/2019102206/time_table.git</span>

2. npm install
<span class="evidence">npm install</span>

**# Usage**

**# Roadmap**
* [x] 학과별 권장이수체계도 정보 담긴 파일 생성
* [x] info21 및 수강신청사이트에서 학과 과목 정보 등 데이터 크롤링
* [x] 크롤링한 정보 데이터화하기 (node.js)
* [x] DB 작업
* [ ] 권장이수체계에 맞는 시간표 랜덤 생성
* [ ] 시간표 추천 챗봇 구현
  (Demo 현재 소프트웨어융합대학 소속 학과만 제공)
  
**# Contributing**
* Fork the project
* feature 브랜치 생성 (git checkout -b feature/{function})
* 변경사항 commit (git commit -m 'Add some function)
* remote branch로 push (git push origin feature/{function})
* pull request 요청

**# License**
[MIT LICENSE](LICENSE)

**# Contact**
* 곽병민 : bqudmals@khu.ac.kr
* 송민석 : songms0909@khu.ac.kr
* 이나경 : 2000skrud@khu.ac.kr
* Link : http://khuhub.khu.ac.kr/2019102206/time_table
