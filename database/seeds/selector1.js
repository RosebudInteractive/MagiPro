var db = require('../models');
var colors = require('colors')
var fs = require('fs');
let dt =process.hrtime();
//0.035884858
db.Account.findAll({
  where: {
    domain: 'pmt'
  },
  include: [
    {
      model: db.Course,
      include: [
        {
          model: db.Author,
          include: [
            {
              model: db.Author_i18n,
              as: 'AuthorIntl'
            }
          ]
        }
      ]
    },
    // {
    //   model: db.Language,
    //   include: [
    //     {
    //       model: db.Language_i18n,
    //     }
    //   ]
    // }
  ]
}).then(accounts => {

  var logStream = fs.createWriteStream('myjsonfile.json', {'flags': 'a'});
  logStream.write(JSON.stringify(accounts[0].get({plain:true})));
  logStream.end('');
  
  db.Language.findAll({
    include: [
      {
        model: db.Language_i18n
      }
    ]
  }).then(languages => {
    languages.map(language => {
      console.log('languages'.inverse);
      console.log(language.get({plain:true}))
    })

    console.log('performance.now()'.inverse);
    accounts.map((account, idx) => {
      console.log((idx + 'accounts').inverse);
      console.log(account.get({plain:true}));
      account.courses.map((course, idx) => {
        console.log((idx + 'courses').inverse);
        console.log(course.get({plain:true}))
        course.authors.map((author, idx) => {
          console.log((idx + 'author').inverse);
          console.log(author.get({plain:true}))
          // author.AuthorIntl.map((author_intl, idx) => {
          //   console.log((idx + 'author_intl').inverse);
          //   console.log(author_intl.get({plain:true}))
          // });
        })
      })
    })
    console.log('performance.now()'.inverse);
    console.log(dt);
    console.log(process.hrtime() );
  })


  
  // accounts.map((account, idx)=> {
  //   console.log((idx+'accounts').inverse);
  //   console.log(account);
  //   account.courses.map((course,idx)=>{
  //     console.log((idx+'courses').inverse);
  //     console.log(course)
  //     course.authors.map((author,idx)=>{
  //       console.log((idx+'author').inverse);
  //       console.log(author)
  //       author.AuthorIntl.map((author_intl, idx) => {
  //         console.log((idx+'author_intl').inverse);
  //         console.log(author_intl)
  //       });
  //     })
  //   })
  // })
})
// db.Author.findAll({
//   where: {
//     account_id: 1
//   },
//   include: [
//     {
//       model: db.Course
//     }
//   ]
// }).then(author=> {
//   console.log(author)
// })
// db.Course.findAll({
//   // include: db.Author,
// }).then(courses => {
//   console.log(courses);
// })

// db.Account.findAll({
//   // include: [{
//   //   model: db.Course,
//     include: [
//       {
//         model: db.Author
//       }
//     ]
//   // }]
// }).then(accounts => {
//   console.log(accounts);
//   console.log('courses'.inverse);
//   console.log(accounts[0].courses);
// })

// db.Author.findAll({ 
//   include: [{ 
//     model: db.Author_i18n, 
//     as: 'AuthorIntl',
//     include: [{
//       model: db.Language
//     }]
//   }]}).then(authors => {

//   console.log(authors)
//   console.log('AuthorIntl'.inverse)
//   console.log(authors[0].AuthorIntl)
//   console.log('AuthorIntl'.inverse)
//   console.log(authors[1].AuthorIntl)
// })