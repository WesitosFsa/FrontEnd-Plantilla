import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import '../styles/Login.css';

export const Register = () => {
  const [textos, setTextos] = useState({})
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    fetch("/Bienvenida.xml") // Cargar el XML desde public/
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");

        // Extraer los textos
        setTextos({
          registrotitulo: xml.getElementsByTagName("registrotitulo")[0].textContent,
          registrotexto: xml.getElementsByTagName("registrotexto")[0].textContent,
        });
      })
      .catch(error => console.error("Error cargando XML:", error));
  }, []);


    
  return (
    <div className="min-vh-100 bg-dark text-white d-flex justify-content-center align-items-center">
        
        <div className="container bg-light text-dark d-flex justify-content-center align-items-center " id="formulario" >
            
            <form>
            <h2 className="fw-bold">{textos.registrotitulo}</h2>
            <p className="lead">{textos.registrotexto}</p>
            <div className="row">
            <div className="col-md-6 mb-3">
                <label for="exampleInputEmail1" className="fw-bold"> Nombre </label>
                <input type="text" className="form-control" id="nombre"  placeholder="Ingresa tu nombre"></input>
            </div>
            <div className="col-md-6 mb-3">
                <label for="exampleInputEmail1" className="fw-bold"> Apellido </label>
                <input type="text" className="form-control" id="apellido"  placeholder="Ingresa tu apellido"></input>
            </div>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1" className="fw-bold"> Correo Electronico </label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ejemplo : wes.dev@gmail.com"></input>
                <small id="emailHelp" className="form-text text-muted">Nunca compartas tu email con otras Personas</small> 
            </div>
            <div className="row">
            <div className="col-md-6 mb-3">
                <label for="exampleInputPassword1" className="fw-bold"> Contraseña </label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="* * * * * * *"></input>
            </div>
            <div className="col-md-6 mb-3">
                <label for="exampleInputPassword1" className="fw-bold"> Repetir Contraseña </label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="* * * * * * *"></input>
            </div>
            </div>
     
            <button type="submit" className="btn btn-success btn-lg w-100">Registrar</button>
            <hr />
            <div className="row">
            <div className="col-md-6 mb-3">
            <Link to="/">
            <button type="button" className="btn btn-danger btn-lg w-100">Regresar</button>
            </Link>
            </div>
            <div className="col-md-6 mb-3">
            
            <Link to="/Login">
            <button type="button" className="btn btn-primary btn-lg w-100">Ingresar</button>
            </Link>
            <p className="lead text-center">Ya estas Registrado ?</p>
            </div>
            </div>
            </form>

        </div>
    </div>
  );
};
