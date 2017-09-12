var db = require('../models');
var colors = require('colors')

db.Author.findAll({ 
  include: [{ 
    model: db.Author_i18n, 
    as: 'AuthorIntl',
    include: [{
      model: db.Language
    }]
  }]}).then(authors => {

  console.log(authors)
  console.log('AuthorIntl'.inverse)
  console.log(authors[0].AuthorIntl)
  console.log('AuthorIntl'.inverse)
  console.log(authors[1].AuthorIntl)
})