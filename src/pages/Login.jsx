import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import '../styles/Login.css';

export const Login = () => {
  const [textos, setTextos] = useState({})



  useEffect(() => {
    fetch("/Bienvenida.xml") // Cargar el XML desde public/
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");

        // Extraer los textos
        setTextos({
          logintitulo: xml.getElementsByTagName("logintitulo")[0].textContent,
          logintexto: xml.getElementsByTagName("logintexto")[0].textContent,
        });
      })
      .catch(error => console.error("Error cargando XML:", error));
  }, []);


    
  return (
    <div className="min-vh-100 bg-dark text-white d-flex justify-content-center align-items-center">
        
        <div className="container bg-light text-dark d-flex justify-content-center align-items-center " id="formulario" >
            
            <form>
            <h2 className="fw-bold">{textos.logintitulo}</h2>
            <p className="lead">{textos.logintexto}</p>

            <div className="form-group">
                <label for="exampleInputEmail1" className="fw-bold"> Correo Electronico </label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ejemplo : wes.dev@gmail.com"></input>
                <small id="emailHelp" className="form-text text-muted">Nunca compartas tu email con otras Personas</small> 
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1" className="fw-bold"> Contraseña </label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Tu contraseña es secreta no la compartas con nadie"></input>
            </div>
            <span></span>
            <hr />
            <Link to="/Dashboard">
            <button type="submit" className="btn btn-primary btn-lg w-100">Ingresar</button>
            </Link>
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
            <p className="lead text-center">Eres nuevo ? </p>
            </div>
            </div>

            </form>

        </div>
    </div>
  );
};
