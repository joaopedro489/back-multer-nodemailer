const Cellphone = require('../../models/Cellphone');
const faker = require('faker-br');

 const seedCellphone = async function () {

  const cellphones = [];

  for (let i = 0; i < 10; i++) {
    cellphones.push({
      buy_date: faker.internet.email(),
      name: faker.internet.userName(),
      chips: faker.phone.phoneNumber(),
	  manufacturer: faker.internet.userName(),
	  nfc: faker.phone.phoneNumber(),
    });
  }

  try {
    await Cellphone.sync({ force: true });
    await Cellphone.bulkCreate(cellphones);

  } catch (err) { console.log(err); }
}

module.exports = seedCellphone;
