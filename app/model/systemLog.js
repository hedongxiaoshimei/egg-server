'use strict';
const moment = require('moment');
module.exports = app => {
 	const {
    INTEGER,
    STRING,
    DATE,
    UUID,
    UUIDV4,
  } = app.Sequelize;

  const SystemLog = app.model.define('systemLog',
    {
      id: {
        type: INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: INTEGER(10),
        allowNull: false,
      },
      user_name: {
        type: STRING(50),
        allowNull: false,
      },
      method: {
        type: STRING(200),
        allowNull: false,
      },
      url: {
        type: STRING(200),
        allowNull: false,
      },
      params: {
        type: STRING(5000),
        allowNull: false,
        defaultValue: 1,
      },
      ip: {
        type: STRING(64),
        allowNull: false,
      },
      create_time: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      timestamps: false,
      tableName: 'systemLog',
    }
  );

  SystemLog.beforeBulkUpdate(systemLog => {
    systemLog.attributes.updateTime = new Date();
    return systemLog;
  });

  SystemLog.beforeCreate(systemLog => {
    return systemLog;
  });

 	return SystemLog;
};
