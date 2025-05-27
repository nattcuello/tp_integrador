// components/Usuarios/UsuariosContainer.jsx
import { useEffect, useState } from "react";
import UsuariosView from "./usuariosViews";

const API = "http://localhost:3000/usuarios";

const UsuariosContainer = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: null, nombre: "", email: "", edad: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchObjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(API);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
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
    fetchObjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchObjects();
      } else {
        setError("Error al eliminar");
      }
    } catch (err) {
      setError(`Error de red: ${err.message}`);
    }
  };

  const updateUser = async () => {
    try {
      const response = await fetch(`${API}/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchObjects();
        setFormData({ id: null, nombre: "", email: "", edad: "" });
        setIsEditing(false);
      } else {
        setError("Error al actualizar");
      }
    } catch (err) {
      setError(`Error de red: ${err.message}`);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchObjects();
        setFormData({ id: null, nombre: "", email: "", edad: "" });
      } else {
        setError("Error al crear usuario");
      }
    } catch (err) {
      setError(`Error de red: ${err.message}`);
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "edad" ? (value === "" ? "" : Number(value)) : value,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({ id: null, nombre: "", email: "", edad: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateUser();
    } else {
      createUser();
    }
  };

  return (
    <UsuariosView
      users={users}
      loading={loading}
      error={error}
      formData={formData}
      isEditing={isEditing}
      handleEdit={handleEdit}
      handleChange={handleChange}
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
      handleCancelEdit={handleCancelEdit}
    />
  );
};

export default UsuariosContainer;
