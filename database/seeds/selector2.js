var db = require('../models');
var colors = require('colors')
var fs = require('fs');
let dt =process.hrtime();

db.Author.findAll({
  include: [{
    model: db.Lesson
  }]
}).then(authors => {
  console.log(authors);
})
// db.Lesson.findAll({
//   include: [{
//     model: db.Author
//   }]
// }).then(lessons => {

//   console.log('lessons'.inverse)
//   console.log(lessons);
// })