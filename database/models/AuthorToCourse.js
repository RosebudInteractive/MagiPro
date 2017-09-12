module.exports = function(sequelize, DataTypes) {
  var AuthorToCourse = sequelize.define('authorToCourse', {
    id : {
      type 			: DataTypes.BIGINT,
      primaryKey 		: true,
      autoIncrement 	: true
    },
    account_id : {
      type 			: DataTypes.BIGINT,
      comment   : "Аккаунт",
      // allowNull : false
    },
    author_id : {
      comment   : "Автор курса",
      type 			: DataTypes.BIGINT,
      // allowNull : false
    },
    course_id : {
      comment   : "Курс",
      type 			: DataTypes.BIGINT,
      // allowNull : false
    }
  }, { /* options */ });
  AuthorToCourse.associate = (models) => {
    // AuthorToCourse.hasMany(models.Course, { foreignKey: 'id', targetKey: 'account_id' })
    // AuthorToCourse.hasMany(models.Author, { foreignKey: 'id', targetKey: 'author_id' })
    // AuthorToCourse.hasMany(models.Account, { foreignKey: 'id', targetKey: 'account_id' })
  }
  return AuthorToCourse;
};