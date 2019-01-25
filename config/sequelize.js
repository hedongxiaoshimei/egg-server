'use strict';

const local = require('./config.local');
const prod = require('./config.prod');

module.exports = {
  development: prod.sequelize,
  production: prod.sequelize,
};
