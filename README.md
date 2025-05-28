# tp_integrador
---

## 🚀 Cómo instalar y correr la aplicación

### Backend

1. Abrir terminal y posicionarse en la carpeta `/tp_integrador_backend`.
2. Ejecutar `npm install` para instalar dependencias.
3. Ejecutar `node index.js` para iniciar el servidor en `http://localhost:3000`.

### Frontend

1. Abrir otra terminal y posicionarse en `/tpintegrador_frontend`.
2. Ejecutar `npm install` para instalar dependencias.
3. Ejecutar `npm run dev` para iniciar el frontend (Vite).
4. Abrir el navegador en la URL que indique Vite (por defecto `http://localhost:5173`).

---

## ⚙️ Funcionalidades

### Backend

- Endpoints REST para Productos y Usuarios:
  - `GET /productos` y `GET /usuarios`
  - `POST /productos` y `POST /usuarios`
  - `PUT /productos/:id` y `PUT /usuarios/:id`
  - `DELETE /productos/:id` y `DELETE /usuarios/:id`
- Persistencia de datos en archivos JSON (`productos.json`, `usuarios.json`)
- CORS habilitado para conexión con el frontend.

### Frontend

- Visualización de listados de Productos y Usuarios en pestañas o componentes separados.
- Formularios para crear y editar productos y usuarios.
- Botones para eliminar productos y usuarios.
- Comunicación con el backend usando Fetch.
- Exportación en PDF de los listados:
  - Productos: nombre y precio.
  - Usuarios: nombre, email y edad.
- Diseño responsivo y agradable con Bootstrap React.

---

## 🧾 Exportación PDF

- Uso de la librería `jsPDF` y `jspdf-autotable`.
- Botón en cada sección para generar PDF con la lista completa.
- Formato claro y ordenado.

---

## 📂 Archivos importantes

- `/tp_integrador_backend/index.js`: servidor Express con rutas y controladores.
- `/tp_integrador_backend/productos.json` y `/tp_integrador_backend/usuarios.json`: archivos con datos persistentes.
- `/tpintegrador_frontend/src/components/ProductosView.jsx` y `usuariosView.jsx`: componentes React para mostrar y manipular datos.
- `/tpintegrador_frontend/src/App.jsx`: componente principal con navegación entre secciones.

---


Cuello Natalia - [nattcuello](https://github.com/nattcuello/tp_integrador.git)
