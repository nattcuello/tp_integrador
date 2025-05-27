import jsPDF from "jspdf";
import "jspdf-autotable";

const UsuariosView = ({
  users,
  loading,
  error,
  formData,
  isEditing,
  handleEdit,
  handleChange,
  handleDelete,
  handleSubmit,
}) => {
 
  const exportarUsuariosPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Usuarios", 14, 20);
  
    let y = 30; 
  
    users.forEach((user, i) => {
    
      doc.text(`${i + 1}. ${user.nombre} - ${user.email} - ${user.edad} años`, 14, y);
      y += 10; 
    });
  
    doc.save("usuarios.pdf");
  };
  
    

  return (
    <div className="container mt-4">
      <h2>Usuarios</h2>

   
      <button className="btn btn-success mb-3" onClick={exportarUsuariosPDF}>
        Exportar usuarios PDF
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">{error}</p>}

      <ul className="list-group mb-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {user.nombre} - {user.email} - {user.edad} años
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEdit(user)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(user.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="card p-3">
        <h4>{isEditing ? "Editar Usuario" : "Crear Usuario"}</h4>
        <div className="mb-2">
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            name="edad"
            className="form-control"
            placeholder="Edad"
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Guardar Cambios" : "Crear Usuario"}
        </button>
      </form>
    </div>
  );
};

export default UsuariosView;
