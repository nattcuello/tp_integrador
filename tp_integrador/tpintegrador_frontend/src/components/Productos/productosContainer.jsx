// components/Productos/ProductosContainer.jsx
import { useEffect, useState } from "react";
import ProductosView from "./productosView";
import { ProductosContext } from "./productosContext";

const API = "http://localhost:3000/productos";

const ProductosContainer = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({ id: null, nombre: "", precio: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch(API);
      if (response.ok) {
        const data = await response.json();
        setProductos(data);
        setError(null);
      } else {
        setError(`Error: ${response.status}`);
      }
    } catch (err) {
      setError(`Error de red: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchProductos();
      } else {
        setError("Error al eliminar");
      }
    } catch (err) {
      setError(`Error de red: ${err.message}`);
    }
  };

  const updateProducto = async () => {
    try {
      const response = await fetch(`${API}/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchProductos();
        setFormData({ id: null, nombre: "", precio: "" });
        setIsEditing(false);
      } else {
        setError("Error al actualizar");
      }
    } catch (err) {
      setError(`Error de red: ${err.message}`);
    }
  };

  const createProducto = async () => {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchProductos();
        setFormData({ id: null, nombre: "", precio: "" });
      } else {
        setError("Error al crear producto");
      }
    } catch (err) {
      setError(`Error de red: ${err.message}`);
    }
  };

  const handleEdit = (prod) => {
    setFormData(prod);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProducto();
    } else {
      createProducto();
    }
  };

  return (
    <ProductosView
      productos={productos}
      loading={loading}
      error={error}
      formData={formData}
      isEditing={isEditing}
      handleEdit={handleEdit}
      handleChange={handleChange}
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
    />
  );
};

export default ProductosContainer;