'use strict';

module.exports = (sequelizeDatabase, DataTypes) => sequelizeDatabase.define('customers',{
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pronouns: {
    type: DataTypes.ENUM,
    values: ['they/them', 'he/him', 'she/her'],
    allowNull: true,
  },
});