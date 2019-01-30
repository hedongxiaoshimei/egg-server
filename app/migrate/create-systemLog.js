'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    const {
      INTEGER,
      STRING,
      TEXT,
      DATE,
    } = Sequelize;
    return queryInterface.createTable('systemLog', {
      id: {
        type: INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: INTEGER(10),
        allowNull: false,
        comment: '用户id',
      },
      user_name: {
        type: STRING(50),
        allowNull: false,
        comment: '用户名',
      },
      method: {
        type: STRING(200),
        allowNull: false,
        comment: '请求方法',
      },
      url: {
        type: STRING(200),
        allowNull: false,
        comment: '请求方法',
      },
      params: {
        type: STRING(5000),
        allowNull: false,
        defaultValue: 1,
        comment: '请求参数',
      },
      ip: {
        type: STRING(64),
        allowNull: false,
        comment: 'ip地址',
      },
      create_time: {
        type: DATE,
        allowNull: false,
        comment: '创建时间',
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('systemLog');
  },
};

