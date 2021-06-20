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
    image: {
      type: DataTypes.TEXT,
    },
    score: {
      type: DataTypes.DECIMAL,
    },
    healthScore: {
      type: DataTypes.DECIMAL,  
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
  });
};
