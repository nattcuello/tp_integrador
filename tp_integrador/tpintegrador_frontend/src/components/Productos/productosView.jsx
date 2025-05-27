import jsPDF from "jspdf";

const ProductosView = ({
  productos,
  loading,
  error,
  formData,
  isEditing,
  handleEdit,
  handleChange,
  handleDelete,
  handleSubmit,
}) => {
  const exportarProductosPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Productos", 14, 20);

    let y = 30;
    productos.forEach((p, i) => {
      doc.text(`${i + 1}. ${p.nombre} - $${p.precio}`, 14, y);
      y += 10;
    });

    doc.save("productos.pdf");
  };

  return (
    <div className="container mt-4">
      <h2>Productos</h2>

      {/* Botón para exportar PDF */}
      <button className="btn btn-success mb-3" onClick={exportarProductosPDF}>
        Exportar productos PDF
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">{error}</p>}

      <ul className="list-group mb-4">
        {productos.map((prod) => (
          <li
            key={prod.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {prod.nombre} - ${prod.precio}
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEdit(prod)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(prod.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="card p-3">
        <h4>{isEditing ? "Editar Producto" : "Nuevo Producto"}</h4>
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
            type="number"
            name="precio"
            className="form-control"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          {isEditing ? "Guardar Cambios" : "Crear Producto"}
        </button>
      </form>
    </div>
  );
};

export default ProductosView;
