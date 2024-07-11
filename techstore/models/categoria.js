'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {});
  Categoria.associate = function(models) {
    Categoria.hasMany(models.Producto, { foreignKey: 'categoriaId', as: 'productos' });
  };
  return Categoria;
};