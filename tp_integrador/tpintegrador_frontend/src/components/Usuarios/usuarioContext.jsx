import { createContext, useState, useEffect } from "react";

export const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);

  const getUsuarios = async () => {
    const response = await fetch("http://localhost:3000/usuarios");
    const data = await response.json();
    setUsuarios(data);
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <UsuariosContext.Provider value={{ usuarios, setUsuarios }}>
      {children}
    </UsuariosContext.Provider>
  );
};
