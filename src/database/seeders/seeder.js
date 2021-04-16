require('../../config/dotenv')();
require('../../config/sequelize');

const seedUser = require('./UserSeeder');
const seedCellphone = require('./Cellphone');

(async () => {
  try {
    await seedUser();

  } catch(err) { console.log(err) }
})();
