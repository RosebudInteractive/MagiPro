module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id : {
      comment   : "",
      type 			: DataTypes.BIGINT,
      primaryKey 		: true,
      autoIncrement 	: true
    },
    account_id : {
      comment   : "Аккаунт",
      type : DataTypes.BIGINT
    },
    ownedAccount: {
      comment   : "Созданный аккаунт",
      type : DataTypes.BIGINT
    },
    pwdHash : {
      comment   : "Хэш пароля",
      type 			: DataTypes.STRING,
    },
    name : {
      comment   : "Имя",
      type 			: DataTypes.STRING,
    },
    mail : {
      comment   : "Почта",
      type 			: DataTypes.STRING,
    },
    phone : {
      comment   : "Мобильный тел",
      type 			: DataTypes.STRING,
    },
    snetworktype : {
      comment   : "Тип СС для логина",
      type 			: DataTypes.ENUM('VK', 'FB', 'OK')
    },
    snetworkid : {
      comment   : "Идентификатор СС для логина",
      type 			: DataTypes.STRING,
    }
  }, {});
};