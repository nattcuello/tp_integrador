import { createContext, useState, useEffect } from "react";

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const getProductos = async () => {
    const response = await fetch("http://localhost:3000/productos");
    const data = await response.json();
    setProductos(data);
  };
  

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <ProductosContext.Provider value={{productos, setProductos }}>
      {children}
    </ProductosContext.Provider>
  );
};
