import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../styles/Bienvenida.css';
import logo from '../assets/logo.png'

export const Bienvenida = () => {
  const [textos, setTextos] = useState({})
  const [modoOscuro, setModoOscuro] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleModo = () => {
    setModoOscuro(!modoOscuro);
  };
  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  useEffect(() => {
    fetch("/Bienvenida.xml") // Cargar el XML desde public/
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");

        // Extraer los textos
        setTextos({
          titulo: xml.getElementsByTagName("titulo")[0].textContent,
          descripcion: xml.getElementsByTagName("descripcion")[0].textContent, //? Extraer el texto de al guesitos le gusta el pilin
          boton: xml.getElementsByTagName("boton")[0].textContent,
          boton1: xml.getElementsByTagName("boton1")[0].textContent,
          boton2: xml.getElementsByTagName("boton2")[0].textContent

        });
      })
      .catch(error => console.error("Error cargando XML:", error));
  }, []);


    
  return (
    <div className={`min-vh-100 ${modoOscuro ? "bg-dark text-white" : "bg-light text-dark"}`} id="pagina-principal">
       <nav className={`navbar navbar-expand-lg ${modoOscuro ? "bg-light text-white" : "bg-dark text-dark"} fixed-top`}>

          
          <a className="navbar-brand fw-bold" href="#">
          <img src={logo} alt="Logo" height="60px" className="d-inline-block align-text-top"/>
          </a>
          <button className="navbar-toggler mx-2" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon mx-2"></span>
          </button>


          {/* Menú colapsable */}
          <div className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link to="/Login">
                <button type="button" className={`${modoOscuro ? "btn btn-light mx-2" : "btn btn-dark mx-2"}`}>
                  {textos.boton1}
                </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Register">
                <button type="button" className={`${modoOscuro ? "btn btn-light mx-2" : "btn btn-dark mx-2"}`}>
                  {textos.boton2}
                </button>
                </Link>
              </li>
              <li className="nav-item">
                <button className={`${modoOscuro ? "btn btn-outline-light mx-2" : "btn btn-outline-dark mx-2"}`} onClick={toggleModo}>
                  {modoOscuro ? "☀️" : "🌙"}
                </button>
              </li>
            </ul>
          </div>
    
 
      </nav>
        <h1 className="fw-bold">{textos.titulo}</h1>
        <p className="lead">{textos.descripcion}</p>
        <button className="btn btn-primary btn-lg mt-3">{textos.boton}</button>

    </div>
  );
};
