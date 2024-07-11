'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orden = sequelize.define('Orden', {
    clienteId: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    estado: DataTypes.STRING
  }, {});
  Orden.associate = function(models) {
    Orden.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
    Orden.belongsToMany(models.Producto, { through: models.ProductoOrden, foreignKey: 'ordenId', as: 'productos' });
  };
  return Orden;
};