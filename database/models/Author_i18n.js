module.exports = function(sequelize, DataTypes) {
  var Author_i18n = sequelize.define('author_i18n', {
    id : {
      type 			: DataTypes.BIGINT,
      primaryKey 		: true,
      autoIncrement 	: true
    },
    author_id : {
      type 			: DataTypes.BIGINT,
      comment   : "Аккаунт",
      allowNull : false
    },
    translation_language_id : {
      type      : DataTypes.BIGINT,
      comment   : "Язык",
      allowNull : false
    },
    firstName : {
      comment   : "Имя",
      type 			: DataTypes.STRING,
    },
    lastName : {
      comment   : "Фамилия",
      type 			: DataTypes.STRING,
    },
  }, { /* options */ });

  Author_i18n.associate = (models) => {
    Author_i18n.belongsTo(models.Author, { foreignKey: 'author_id', targetKey: 'id' })
    Author_i18n.belongsTo(models.Language, { foreignKey: 'translation_language_id', targetKey: 'id' })
  }

  return Author_i18n;
};