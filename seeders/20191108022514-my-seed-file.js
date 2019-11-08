'use strict';
const bcrypt = require('bcrypt-nodejs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
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
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
