import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import axios from 'axios';
export const Login = () => {
  const [textos, setTextos] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Bienvenida.xml")
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");
        setTextos({
          logintitulo: xml.getElementsByTagName("logintitulo")[0].textContent,
          logintexto: xml.getElementsByTagName("logintexto")[0].textContent,
        });
      })
      .catch(error => console.error("Error cargando XML:", error));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/caso5/usuarios/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      // Axios ya convierte la respuesta en JSON automáticamente
      const data = response.data;
  
      // Guardar datos en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("nombre", data.nombre);
      localStorage.setItem("apellido", data.apellido);
  
      // Redirigir al dashboard
      navigate("/Dashboard");
    } catch (err) {
      // Capturar el mensaje de error del backend si existe
      setError(err.response?.data?.message || "Error en la autenticación");
    }
  };
  

  return (
    <div className="min-vh-100 bg-dark text-white d-flex justify-content-center align-items-center">
      <div className="container bg-light text-dark d-flex justify-content-center align-items-center " id="formulario">
        <form onSubmit={handleLogin}>
          <h2 className="fw-bold">{textos.logintitulo}</h2>
          <p className="lead">{textos.logintexto}</p>
          {error && <p className="text-danger">{error}</p>}
          <div className="form-group">
            <label htmlFor="email" className="fw-bold">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="Ejemplo: wes.dev@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="fw-bold">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Tu contraseña es secreta"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <hr />
          <button type="submit" className="btn btn-primary btn-lg w-100">Ingresar</button>
          <hr />
          <div className="row">
            <div className="col-md-6 mb-3">
              <Link to="/">
                <button type="button" className="btn btn-danger btn-lg w-100">Regresar</button>
              </Link>
            </div>
            <div className="col-md-6 mb-3">
              <Link to="/Register">
                <button type="button" className="btn btn-success btn-lg w-100">Registrarse</button>
              </Link>
              <p className="lead text-center">¿Eres nuevo?</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
