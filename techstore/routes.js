const express = require('express');
const router = express.Router();
const db = require('./models');

// Rutas para Productos
router.post('/productos', async (req, res) => {
  try {
    const producto = await db.Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/productos/:id', async (req, res) => {
  try {
    const producto = await db.Producto.findByPk(req.params.id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/productos/:id', async (req, res) => {
  try {
    const [updated] = await db.Producto.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const productoActualizado = await db.Producto.findByPk(req.params.id);
      res.status(200).json(productoActualizado);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/productos/:id', async (req, res) => {
  try {
    const eliminado = await db.Producto.destroy({
      where: { id: req.params.id }
    });
    if (eliminado) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Rutas para Clientes
router.post('/clientes', async (req, res) => {
  try {
    const cliente = await db.Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await db.Cliente.findByPk(req.params.id);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/clientes/:id', async (req, res) => {
  try {
    const [updated] = await db.Cliente.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const clienteActualizado = await db.Cliente.findByPk(req.params.id);
      res.status(200).json(clienteActualizado);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/clientes/:id', async (req, res) => {
  try {
    const eliminado = await db.Cliente.destroy({
      where: { id: req.params.id }
    });
    if (eliminado) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Rutas para Órdenes
router.post('/ordenes', async (req, res) => {
  try {
    const { clienteId, productos, total, estado } = req.body;
    const orden = await db.Orden.create({ clienteId, total, estado });
    for (const producto of productos) {
      await db.ProductoOrden.create({
        ordenId: orden.id,
        productoId: producto.productoId,
        cantidad: producto.cantidad
      });
    }
    res.status(201).json(orden);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/ordenes/:id', async (req, res) => {
  try {
    const orden = await db.Orden.findByPk(req.params.id, {
      include: [
        { model: db.Cliente, as: 'cliente' },
        { model: db.Producto, as: 'productos' }
      ]
    });
    if (orden) {
      res.status(200).json(orden);
    } else {
      res.status(404).json({ error: 'Orden no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/ordenes/:id', async (req, res) => {
  try {
    const [updated] = await db.Orden.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const ordenActualizada = await db.Orden.findByPk(req.params.id);
      res.status(200).json(ordenActualizada);
    } else {
      res.status(404).json({ error: 'Orden no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/ordenes/:id', async (req, res) => {
  try {
    const eliminado = await db.Orden.destroy({
      where: { id: req.params.id }
    });
    if (eliminado) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Orden no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Rutas para Categorías
router.post('/categorias', async (req, res) => {
  try {
    const categoria = await db.Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/categorias', async (req, res) => {
    try {
      const categorias = await db.Categoria.findAll();
      res.status(200).json(categorias);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router.put('/categorias/:id', async (req, res) => {
  try {
    const [updated] = await db.Categoria.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const categoriaActualizada = await db.Categoria.findByPk(req.params.id);
      res.status(200).json(categoriaActualizada);
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/categorias/:id', async (req, res) => {
  try {
    const eliminado = await db.Categoria.destroy({
      where: { id: req.params.id }
    });
    if (eliminado) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;