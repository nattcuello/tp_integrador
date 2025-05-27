
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Productos from "./components/Productos";
import Usuarios from "./components/Usuarios";
import Navbar from "./components/navbar";
import { ProductosProvider } from "./components/Productos/productosContext";
import { UsuariosProvider } from "./components/Usuarios/usuarioContext";

function App() {
  return (
    <ProductosProvider>
      <UsuariosProvider>
        <BrowserRouter>
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<h1>Bienvenido a la App</h1>} />
              <Route path="/Productos" element={<Productos />} />
              <Route path="/Usuarios" element={<Usuarios />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UsuariosProvider>
    </ProductosProvider>
  );
}

export default App;
