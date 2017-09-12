module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courseToLang', {
    id : {
      type 			: DataTypes.BIGINT,
      primaryKey 		: true,
      autoIncrement 	: true
    },
    account_id : {
      type 			: DataTypes.BIGINT,
      comment   : "Аккаунт",
    },
    course_id : {
      comment   : "Курс",
      type 			: DataTypes.BIGINT,
    },
    language_id : {
      comment   : "Язык",
      type 			: DataTypes.BIGINT,
    }
  }, { /* options */ });
};