module.exports = function (sequelize, DataTypes) {
  var Author = sequelize.define('author', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      comment: "Аккаунт",
      allowNull: false
    },
    portrait: {
      comment: "Портрет автора. Ссылка на фото с портретом автора",
      type: DataTypes.STRING,
    }
  }, { /* options */ });

  Author.associate = (models) => {
    Author.hasMany(models.Author_i18n, { as: 'AuthorIntl', foreignKey: 'author_id', targetKey: 'id' })
    Author.belongsToMany(models.Course, { through: { model: models.AuthorToCourse, unique: false }, foreignKey: 'author_id', sourceKey: 'course_id' })

    Author.hasMany(models.Lesson, { foreignKey: 'author_id', targetKey: 'id' })
  }
  return Author;
};