'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    RestaurantId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Like.associate = function (models) {
    // associations can be defined here
  };
  return Like;
};