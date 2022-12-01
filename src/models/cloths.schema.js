'use strict';

module.exports = (sequelizeDatabase, DataTypes) => sequelizeDatabase.define('cloths',{
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    values: ['top', 'bottom', 'hat'],
    allowNull: true,
  },
});