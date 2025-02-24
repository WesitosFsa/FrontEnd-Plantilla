import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import usuario from '../assets/usuario.png';
import '../styles/Login.css';
import RegistrarModulo3 from '../components/RegistrarModulo3'; // Importar formulario

export const Modulo3 = () => {
  const [textos, setTextos] = useState({});
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  useEffect(() => {
    fetch("/Bienvenida.xml") // Cargar el XML desde public/
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");

        setTextos({
          logintitulo: xml.getElementsByTagName("logintitulo")[0]?.textContent || "Bienvenido",
          logintexto: xml.getElementsByTagName("logintexto")[0]?.textContent || "Texto de inicio",
          modulo1titulo: xml.getElementsByTagName("modulo1titulo")[0].textContent,
          modulo2titulo: xml.getElementsByTagName("modulo2titulo")[0].textContent,
          modulo3titulo: xml.getElementsByTagName("modulo3titulo")[0].textContent,
          modulo1descripcion: xml.getElementsByTagName("modulo1descripcion")[0].textContent,
          modulo2descripcion: xml.getElementsByTagName("modulo2descripcion")[0].textContent,
          modulo3descripcion: xml.getElementsByTagName("modulo3descripcion")[0].textContent
        });
      })
      .catch(error => console.error("Error cargando XML:", error));
  }, []);

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column flex-md-row">
      {/* Sección oscura (30%) */}
      <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: "100%", maxWidth: "300px" }}>
        <nav className="navbar navbar-dark">
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span> Menu
          </button>
          <div className={`offcanvas offcanvas-start bg-dark text-white ${menuAbierto ? "show" : ""}`} id="offcanvasDarkNavbar">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Menú</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleMenu}></button>
            </div>
            <div className="offcanvas-body d-flex flex-column">
   
                <ul className="navbar-nav flex-grow-1">
                    <Link to='/Dashboard/Modulo2'><li className="nav-item"><p className="nav-link" href="#">{textos.modulo2titulo}</p></li></Link>
                    <Link to='/Dashboard/Modulo3'><li className="nav-item"><p className="nav-link" href="#">{textos.modulo3titulo}</p></li></Link>
                </ul>
                
                {/* Botón alineado abajo */}
                <Link to='/Dashboard'>
                <button type="button" className="btn btn-success w-100 mt-auto">Volver al Dashboard</button>
                </Link>
                </div>

          </div>
        </nav>

        <hr />
        {/* Tarjeta de usuario */}
        <div className="card bg-dark text-white w-100">
          <img className="card-img-top img-fluid" src={usuario} alt="Perfil" />
          <div className="card-body text-center">
            <h5 className="card-title">Usuario</h5>
            <p className="card-text">Información del usuario</p>
            <p href="#" className="btn btn-primary">Ver perfil</p>
          </div>
        </div>

        <hr />
        <h2 className="fw-light text-center">{textos.logintitulo}</h2>
        <h3 className="fw-light text-center">Nombre del usuario</h3>
        <hr />
        <Link to='/Dashboard'>
        <button type="button" className="btn btn-success w-100">Volver al Dashboard</button>
        </Link>
      </div>

      {/* Sección clara (70%) */}
      <div className="flex-grow-1 bg-light text-dark d-flex flex-column align-items-center p-4">
        <h2 className="text-center fw-bold">{textos.modulo3titulo}</h2>
        
        {/* Formulario para Registrar Módulo 1 */}
        <div className="w-75">
          <RegistrarModulo3 />
        </div>
      </div>
    </div>
  );
};