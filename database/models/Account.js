module.exports = function (sequelize, DataTypes) {
  var Account = sequelize.define('account', {
    id: {
      comment: "",
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    domain: {
      comment: "Доменное имя, (например, “pmt” для  pmt.magisteria.pro)",
      type: DataTypes.STRING,
    },
    name: {
      comment: "Название",
      type: DataTypes.STRING,
    },
    description: {
      comment: "Описание",
      type: DataTypes.STRING,
    },
    visCourses: {
      comment: "Видимость курсов на витрине аккаунта(U - АccountUsers - пользователям аккаунта R - RegisteredUsers - зарегистрированным пользователям A - All -  все)",
      type: DataTypes.STRING,
    },
    visShowcase: {
      comment: "Видимость курсов на общей витрине (N - No - не видны U - АccountUsers - пользователям аккаунта R - RegisteredUsers - зарегистрированным пользователям A - All -  все. Активируется администратором магистерии)",
      type: DataTypes.STRING,
    },
    autoReg: {
      comment: "Авторегистрация. Возможность пользователям регистрироваться самостоятельно.",
      type: DataTypes.BOOLEAN,
    },
    leadingCourse: {
      comment: "Ключевой курс - если заполнено, то содержит ссылку на курс, который указан как “основной” и выделен на витрине аккаунта первым и крупно",
      type: DataTypes.BIGINT,
    },
    defLang: {
      comment: "Язык по умолчанию. Язык контента аккаунта по умолчанию.",
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, { /* options */ });

  Account.associate = (models) => {
    Account.hasOne(models.User, { foreignKey: 'account_id', targetKey: 'id' })
    Account.hasOne(models.Author, { foreignKey: 'account_id', targetKey: 'id' })
    // Account.hasMany(models.Course, { foreignKey : 'account_id', targetKey: 'id'})
    Account.belongsToMany(models.Course, { through: { model: models.AuthorToCourse, unique: false }, foreignKey: 'account_id', sourceKey: 'course_id' })
    Account.belongsTo(models.Language, { foreignKey: 'defLang', targetKey: 'id' })
  }

  return Account;

};