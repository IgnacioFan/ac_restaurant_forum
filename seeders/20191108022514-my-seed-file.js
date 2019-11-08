'use strict';
const bcrypt = require('bcrypt-nodejs')
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', [{
      email: 'root@example.com',
      password: bcrypt.hashSync('12345', bcrypt.genSaltSync(10), null),
      isAdmin: true,
      name: 'root',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'ann@example.com',
      password: bcrypt.hashSync('12345', bcrypt.genSaltSync(10), null),
      isAdmin: false,
      name: 'ann',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'jimmy@example.com',
      password: bcrypt.hashSync('12345', bcrypt.genSaltSync(10), null),
      isAdmin: false,
      name: 'jimmy',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    return queryInterface.bulkInsert('Restaurants',
      Array.from({ length: 50 }).map(d => ({
        name: faker.name.findName(),
        tel: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        opening_hours: '08:00',
        image: faker.image.imageUrl(),
        description: faker.lorem.text(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      ), {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {});
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
