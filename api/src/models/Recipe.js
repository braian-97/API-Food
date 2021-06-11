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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true, 
    },
    score: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    steps: {
      //type: DataTypes.ARRAY(DataTypes.TEXT),
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
// name, summary, score, healthScore, steps