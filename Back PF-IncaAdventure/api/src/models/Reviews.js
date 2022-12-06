const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Reviews', {
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comments: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    timestamps: true,
      createdAt: true,
      updatedAt: false
  
  });
};
