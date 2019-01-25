'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    const {
      INTEGER,
      STRING,
      TEXT,
      DATE,
    } = Sequelize;
    return queryInterface.createTable('user', {
      user_id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      role: {
        type: INTEGER(1),
        allowNull: false,
        comment: '用户类型 0:用户;1:管理员',
      },
      dept: {
        type: INTEGER(1),
        allowNull: false,
        comment: '用户部门',
      },
      username: {
        type: STRING(50),
        allowNull: false,
        comment: '用户名',
      },
      realname: {
        type: STRING(50),
        allowNull: false,
        comment: '姓名',
      },
      password: {
        type: STRING(50),
        allowNull: false,
        comment: '密码',
      },
      email: {
        type: STRING(50),
        allowNull: false,
        comment: '邮箱',
      },
      mobile: {
        type: STRING(50),
        allowNull: false,
        comment: '电话',
      },
      login_ip_now: {
        type: INTEGER(50),
        allowNull: false,
        comment: '当前登录ip',
      },
      login_ip_now: {
        type: INTEGER(50),
        allowNull: false,
        comment: '上次登录ip',
      },
      remark: {
        type: STRING(250),
        allowNull: true,
        comment: '备注',
      },
      pic: {
        type: STRING(250),
        allowNull: true,
        comment: '头像',
      },
      question: {
        type: STRING(250),
        allowNull: false,
        comment: '找回密码问题',
      },
      answer: {
        type: STRING(250),
        allowNull: false,
        comment: '找回密码答案',
      },
      create_time: {
        type: DATE,
        allowNull: false,
      },
      update_time: {
        type: DATE,
        allowNull: false,
      },
      login_time_now: {
        type: DATE,
        allowNull: false,
      },
      login_time_last: {
        type: DATE,
        allowNull: false,
      },
      extend: {
        type: TEXT,
        allowNull: true,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('user');
  },
};
