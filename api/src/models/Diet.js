const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('diet', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true, 
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true, 
    },
  });
};

//[Gluten Free, Ketogenic, Vegetarian, Lacto-Vegetarian, Ovo-Vegetarian, Vegan, Pescetarian, Paleo, Primal, Whole30]
