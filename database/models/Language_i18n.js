module.exports = function(sequelize, DataTypes) {
  var Language_i18n = sequelize.define('language_i18n', {
    id : {
      type 			: DataTypes.BIGINT,
      primaryKey 		: true,
      autoIncrement 	: true
    },
    language_id : {
      type 			: DataTypes.BIGINT,
    },
    translation_language_id: {
      comment   : "Показывать по умолчанию для выбранного языка",
      type 			: DataTypes.BIGINT,
    },
    name : {
      comment   : "Язык",
      type 			: DataTypes.STRING,
    }
  }, {});

  Language_i18n.associate = (models) => {
    Language_i18n.belongsTo(models.Language, { foreignKey: 'language_id', targetKey: 'id' })
  }

  return Language_i18n;
};