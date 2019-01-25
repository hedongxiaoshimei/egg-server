'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1548406823417_9568';

  // add your config here
  config.middleware = ['responseTime'];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
    // allowHeaders :'Authorization,DNT,User-Agent,Keep-Alive,Content-Type,accept,origin,X-Requested-With'
  };

  config.sequelize = {
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
  return config;
};
