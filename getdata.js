const config = require('./config')
const mongoose = require("mongoose");
const { range } = require("express/lib/request");
const xlsx = require("xlsx");
const fs = require('fs')



const connect = mongoose.connect(config.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB : Succesfully Connected"))
  .catch((err) => console.log(err.message));


var express = require('express');

const { Subinfo } = require('./models/model');
var request = require('request');


var departmentinfo = '컴퓨터공학과'
var gradeinfo = '2학년1학기'
var name = []
var time = []
var prof = []

Subinfo.find({ department: `${departmentinfo}`, grade: `${gradeinfo}` }).then((sub) => {
  if (sub) {
    for (var i in sub) {
      if (sub[i]['choice'] == '필수') {
        name.push(sub[i]['name'])

        var random_num = (Math.floor(Math.random() * (sub[i]['subject'].length)))
        sub[i]['subject'][random_num]['time']

        if (time.length > 0) {
          while (true) {
            try {
              var tmp = 0
              var random_num = (Math.floor(Math.random() * (sub[i]['subject'].length)))

              for (var j in time) {
                if (time[j].slice(0, 13) == sub[i]['subject'][random_num]['time'].slice(0, 13)) {
                  tmp = 1
                  break
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
    console.log(name)
    console.log(time)
    console.log(prof)
  }
  else {
    console.log(err)
  }
})

//console.log(Math.floor(Math.random() * (10)))