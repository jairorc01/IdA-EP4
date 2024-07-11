'use strict';
module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    categoriaId: DataTypes.INTEGER
  }, {});
  Producto.associate = function(models) {
    Producto.belongsTo(models.Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
    Producto.belongsToMany(models.Orden, { through: models.ProductoOrden, foreignKey: 'productoId', as: 'ordenes' });
  };
  return Producto;
};