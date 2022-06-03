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
