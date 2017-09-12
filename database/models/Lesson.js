module.exports = function (sequelize, DataTypes) {
  var Lesson = sequelize.define('lesson', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      comment: "Аккаунт урока",
    },
    course_id: {
      type: DataTypes.BIGINT,
      comment: "Курс урока. Курс, которому принадлежит урок. Урок принадлежит одному курсу, но может входить в несколько курсов.",
    },
    author_id: {
      type: DataTypes.BIGINT,
      comment: "Автор урока. Из тех, что перечислены в связке курс-автор",
    },
    state: {
      type: DataTypes.STRING,
      comment: "Состояние урока. D = Draft (черновик), P = Public (опубликованный), A = Archive (архивный)",
    },
    blockFlag: {
      type: DataTypes.BOOLEAN,
      comment: "Блокирующий урок. Если урок не выполнен учеником (что такое “выполнен” определяется для каждого отдельного типа урока), то последующие уроки недоступны."
    },
    readyDate: {
      type: DataTypes.DATE,
      comment: "Дата готовности. Указывается планируемая дата публикации урока (для информирования пользователя) и показывается, если урок в режиме Draft, то есть еще не готов к прослушиванию."
    },
    lessonType: {
      type: DataTypes.STRING,
      comment: "Тип урока Lection (mvp1 - только этот тип поддерживается) Test И так далее"
    },
    name: {
      type: DataTypes.STRING,
      comment: "Название урока"
    },
    shortDescription: {
      type: DataTypes.STRING,
      comment: "Описание урока"
    },
    fullDescription: {
      type: DataTypes.STRING,
      comment: "Полное описание. Содержит отформатированный текст с описанием лекции, уроков к ней и дополнительных источников"
    },
    cover: {
      type: DataTypes.STRING,
      comment: "Обложка лекции. Ссылка на картинку с обложкой"
    }
  }, {});

  Lesson.associate = (models) => {
    Lesson.belongsToMany(models.Course, { through: { model: models.LessonToCourse, unique: false }, foreignKey: 'lesson_id', sourceKey: 'course_id' })
    Lesson.belongsTo(models.Author, { foreignKey: 'id', sourceKey: 'author_id'})
  }

  return Lesson;
};