const User = require("../../models/User");
const faker = require('faker-br');

 const seedUser = async function () {

  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      cellphone_number: faker.phone.phoneNumber(),
    });
  }

  try {
    await User.sync({ force: true });
    await User.bulkCreate(users);

  } catch (err) { console.log(err); }
}

module.exports = seedUser;
