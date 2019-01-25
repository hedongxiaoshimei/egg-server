'use strict';

exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  dialectOptions: {
    charset: 'utf8mb4',
  },
  database: 'jxc',
  host: '服务器地址',
  port: '端口',
  username: '数据库用户',
  password: '数据库密码',
  timezone: '+08:00',
};
