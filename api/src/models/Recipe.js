const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
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
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dishTypes:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    image: {
      type: DataTypes.TEXT,
    },
    score: {
      type: DataTypes.FLOAT,
    },
    healthScore: {
      type: DataTypes.FLOAT,  
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
  });
};
