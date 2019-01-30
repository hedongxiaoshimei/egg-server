'use strict';
const moment = require('moment');
module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
    UUID,
    UUID4,
    TEXT,
  } = app.Sequelize;

  // 如果使用uuid 就不能自增 defaultValue: UUID4,
  const UserModel = app.model.define('user', {
    user_id: {
      type: INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: STRING(50),
      allowNull: false,
    },
    realname: {
      type: STRING(50),
      allowNull: true,
    },
    password: {
      type: STRING(50),
      allowNull: false,
    },
    email: {
      type: STRING(50),
      allowNull: true,
    },
    mobile: {
      type: STRING(50),
      allowNull: true,
    },
    login_ip_now: {
      type: INTEGER(50),
      allowNull: true,
    },
    remark: {
      type: STRING(250),
      allowNull: true,
    },
    pic: {
      type: STRING(250),
      allowNull: true,
    },
    question: {
      type: STRING(250),
      allowNull: true,
    },
    answer: {
      type: STRING(250),
      allowNull: true,
    },
    create_time: {
      type: DATE,
      allowNull: false,
      defaultValue: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      get() {
        return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    update_time: {
      type: DATE,
      allowNull: false,
      defaultValue: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      get() {
        return moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    login_time_now: {
      type: DATE,
      allowNull: false,
      defaultValue: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      get() {
        return moment(this.getDataValue('login_time_now')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    login_time_last: {
      type: DATE,
      allowNull: false,
      defaultValue: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      get() {
        return moment(this.getDataValue('login_time_last')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    extend: {
      type: TEXT,
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'user',
  });

  UserModel.beforeBulkUpdate(user => {
    user.attributes.updateTime = new Date();
    return user;
  });

  UserModel.beforeCreate(user => {
    return user;
  });

  return UserModel;
};
