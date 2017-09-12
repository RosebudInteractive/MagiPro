var Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://evg:evg@localhost:3306/magpro', {
  define: {
    freezeTableName: true,
  },
  dialectOptions: {
    charset: 'utf8_general_ci',
  }
});

var db = {}

var models = [
  'Language',
  'Language_i18n',
  'User',
  'Account',
  'Author',
  'Author_i18n',
  'AuthorToCourse',
  'Course',
  'Lesson',
  'LessonToCourse'
];

models.forEach(function(model) {
  console.log(__dirname + '/' + model);
  let mdl = sequelize.import(__dirname + '/' + model);
  db[model] = mdl;
});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;