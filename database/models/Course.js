module.exports = function (sequelize, DataTypes) {
  var Course = sequelize.define('course', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      comment: "Аккаунт курса",
      allowNull: false
    },
    state: {
      comment: "Состояние (D = Draft (черновик), P = Public (опубликованный), A = Archive (архивный))",
      type: DataTypes.STRING,
    },
    visCourse: {
      comment: "Видимость курса на витрине аккаунта. Виден ли данный курс в интерфейсе на витрине аккаунта. Варианты по видимости аналогичны полю Account.VisCourses. Если не заполнен, то работает признак аккаунта.",
      type: DataTypes.STRING,
    },
    visShowcase: {
      comment: "Видимость курса на общей витрине.Аналогично одноименному признаку аккаунта. Если не заполнен, то работает признак аккаунта.",
      type: DataTypes.STRING,
    },
    name: {
      comment: "Название курса",
      type: DataTypes.STRING,
      i18n: true
    },
    description: {
      comment: "Описание курса",
      type: DataTypes.STRING,
      i18n: true
    },
    price: {
      comment: "Цена курса",
      type: DataTypes.STRING
    },
    cover: {
      comment: "Обложка курса. Ссылка на картинку обложки курса. Параметры картинки?",
      type: DataTypes.STRING
    },
    language_id: {
      type: DataTypes.BIGINT,
      comment: "Язык",
      allowNull: false
    }
  }, { /* options */ });

  Course.associate = (models) => {
    Course.belongsToMany(models.Account, { through: { model: models.AuthorToCourse, unique: false }, foreignKey: 'course_id', sourceKey: 'account_id' })
    Course.belongsToMany(models.Author, { through: { model: models.AuthorToCourse, unique: false }, foreignKey: 'course_id', sourceKey: 'author_id' })

    Course.belongsToMany(models.Lesson, { through: { model: models.LessonToCourse, unique: false }, foreignKey: 'course_id', sourceKey: 'lesson_id' })
  }

  return Course;
};