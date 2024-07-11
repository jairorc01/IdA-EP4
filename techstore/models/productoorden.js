'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductoOrden = sequelize.define('ProductoOrden', {
    ordenId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
  }, {});
  ProductoOrden.associate = function(models) {
    // associations can be defined here
  };
  return ProductoOrden;
};