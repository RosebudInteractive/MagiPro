var db = require('../models');
db.sequelize.sync({force:true}).then(() => {
  process.exit();
});
