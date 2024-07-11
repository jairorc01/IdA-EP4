'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING
  }, {});
  Cliente.associate = function(models) {
    Cliente.hasMany(models.Orden, { foreignKey: 'clienteId', as: 'ordenes' });
  };
  return Cliente;
};