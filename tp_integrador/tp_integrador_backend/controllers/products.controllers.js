const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../db/productos.json');

// Leer productos desde el archivo JSON
const leerProductos = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Guardar productos en el archivo JSON
const guardarProductos = (productos) => {
  fs.writeFileSync(filePath, JSON.stringify(productos, null, 2), 'utf8');
};

// Obtener todos los productos
const getProductos = (req, res) => {
  const productos = leerProductos();
  res.json(productos);
};

// Crear un nuevo producto
const crearProducto = (req, res) => {
  const productos = leerProductos();
  const { nombre, precio } = req.body;
  const nuevoProducto = {
    id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
    nombre,
    precio
  };
  productos.push(nuevoProducto);
  guardarProductos(productos);
  res.status(201).json({ mensaje: 'Producto agregado', producto: nuevoProducto });
};

// Actualizar un producto
const actualizarProducto = (req, res) => {
  const productos = leerProductos();
  const id = parseInt(req.params.id);
  const { nombre, precio } = req.body;
  const index = productos.findIndex(p => p.id === id);

  if (index !== -1) {
    productos[index] = { id, nombre, precio };
    guardarProductos(productos);
    res.json({ mensaje: 'Producto actualizado', producto: productos[index] });
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
};

// Eliminar un producto
const eliminarProducto = (req, res) => {
  const productos = leerProductos();
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);

  if (index !== -1) {
    const eliminado = productos.splice(index, 1);
    guardarProductos(productos);
    res.json({ mensaje: 'Producto eliminado', eliminado });
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
};

module.exports = {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
