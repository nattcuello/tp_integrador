const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../db/usuarios.json');

// Leer usuarios desde el archivo JSON
const leerUsuarios = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Guardar usuarios en el archivo JSON
const guardarUsuarios = (usuarios) => {
  fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2), 'utf8');
};

// Obtener todos los usuarios
const getUsuarios = (req, res) => {
  const usuarios = leerUsuarios();
  res.json(usuarios);
};

// Crear un nuevo usuario
const crearUsuario = (req, res) => {
  const usuarios = leerUsuarios();
  const { nombre, email, edad } = req.body;

  const nuevoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nombre,
    email,
    edad: Number(edad)
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  res.status(201).json({ mensaje: 'Usuario agregado', usuario: nuevoUsuario });
};

// Actualizar un usuario
const actualizarUsuario = (req, res) => {
  const usuarios = leerUsuarios();
  const id = parseInt(req.params.id);
  const { nombre, email, edad } = req.body;
  const index = usuarios.findIndex(u => u.id === id);

  if (index !== -1) {
    usuarios[index] = { id, nombre, email, edad: Number(edad) };
    guardarUsuarios(usuarios);
    res.json({ mensaje: 'Usuario actualizado', usuario: usuarios[index] });
  } else {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
};

// Eliminar un usuario
const eliminarUsuario = (req, res) => {
  const usuarios = leerUsuarios();
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index !== -1) {
    const eliminado = usuarios.splice(index, 1);
    guardarUsuarios(usuarios);
    res.json({ mensaje: 'Usuario eliminado', eliminado });
  } else {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};
