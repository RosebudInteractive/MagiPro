module.exports = function(sequelize, DataTypes) {
  var Language = sequelize.define('language', {
    id : {
      type 			: DataTypes.BIGINT,
      primaryKey 		: true,
      autoIncrement 	: true
    },
    code : {
      type 			: DataTypes.STRING,
      comment   : "Код языка. Код языка, используется при формирование URL ",
    },
  }, { });

  Language.associate = (models) => {
    Language.hasMany(models.Language_i18n, { foreignKey: 'language_id', targetKey: 'id' })
    Language.hasMany(models.Author_i18n, { foreignKey: 'translation_language_id', targetKey: 'id' })
  }

  return Language;
};