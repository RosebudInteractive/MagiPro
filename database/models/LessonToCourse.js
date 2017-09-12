module.exports = function (sequelize, DataTypes) {
  return sequelize.define('lessonToCourse', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      comment: "Аккаунт",
    },
    course_id: {
      comment: "Курс",
      type: DataTypes.BIGINT,
    },
    lesson_id: {
      comment: "Урок",
      type: DataTypes.BIGINT,
    },
    orderNum: {
      type: DataTypes.BIGINT,
      comment: "Обложка лекции. Ссылка на картинку с обложкой"
    }
  }, { /* options */ });
};