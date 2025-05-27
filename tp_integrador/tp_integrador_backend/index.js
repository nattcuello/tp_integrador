const express = require('express');
const cors = require('cors');

const usuariosRoutes = require('./routes/usuario.routes');
const productosRoutes = require('./routes/products.routes');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());


app.get('/bienvenida', (req, res) => {
  res.send('Hello World!');
});

app.post('/bienvenida', (req, res) => {
  const { nombre } = req.body;
  res.json({ mensaje: `Hola ${nombre}, bienvenido a la API!`, status: 200 });
});

app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
