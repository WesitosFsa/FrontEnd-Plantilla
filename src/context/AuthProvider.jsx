import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Crear el contexto de autenticación
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // * Estado para almacenar la información del usuario
    const [auth, setAuth] = useState({});

    // Función para obtener el perfil del usuario
    const obtenerPerfil = async (token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/perfil`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const respuesta = await axios.get(url, options);
            setAuth(respuesta.data);
        } catch (error) {
            console.error("Error al obtener el perfil:", error.response?.data || error.message);
            setAuth({});
        }
    };

    // Ejecutar cuando se monta el componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            obtenerPerfil(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;