import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import VerModulo2 from './VerModulo2'; // Importamos el componente de la lista de materias
import '../styles/Modulos.css';
const RegistrarModulo2 = () => {
  const rutacrearModulo2 = "/caso1/estudiantes/crear";
  const TOKEN = localStorage.getItem('token');

  const [textos, setTextos] = useState({});
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [fecha_nacimiento, setFecha_nacimiento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');



  const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar el modal
  
  useEffect(() => {
    fetch("/Bienvenida.xml") // Cargar el XML desde public/
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");

        setTextos({
          logintitulo: xml.getElementsByTagName("logintitulo")[0]?.textContent || "Bienvenido",
          logintexto: xml.getElementsByTagName("logintexto")[0]?.textContent || "Texto de inicio",
          modulo2titulo: xml.getElementsByTagName("modulo2titulo")[0].textContent,
          modulo2descripcion: xml.getElementsByTagName("modulo2descripcion")[0].textContent,
          MSGmod1Cexit: xml.getElementsByTagName("MSGmod1Cexit")[0].textContent,
          MSGmod1Cfail: xml.getElementsByTagName("MSGmod1Cfail")[0].textContent,
          modulo2tituloEditar: xml.getElementsByTagName("modulo2tituloEditar")[0].textContent,

        });
      })
      .catch(error => console.error("Error cargando XML:", error));
  }, []);
  const CrearenModulo2 = async (e) => {
    e.preventDefault();
    try {
      const nuevoDato = { nombre, apellido,cedula,fecha_nacimiento,ciudad,direccion,telefono,email};
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}${rutacrearModulo2}`, nuevoDato ,{
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      Swal.fire('Éxito',textos.modulo2tituloEditar + ' se ha añadido con exito','success');
      limpiarFormulario();
    } catch (error) {
      Swal.fire('Error',textos.modulo2tituloEditar +' no se añadido revise esto porfavor ('+ error.response?.data?.msg + ')' ,'error');
    }
    
  };
  const limpiarFormulario = () => {
    setNombre('');
    setApellido('');
    setCedula('');
    setFecha_nacimiento('');
    setCiudad('');
    setDireccion('');
    setTelefono('');
    setEmail('');
    setEmpresa('');

  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Registrar {textos.modulo2titulo}</h2>
        <form onSubmit={CrearenModulo2}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Cedula</label>
              <input
                type="number"
                className="form-control"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Fecha de Nacimiento</label>
              <input
                type="date"
                className="form-control"
                value={fecha_nacimiento}
                onChange={(e) => setFecha_nacimiento(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Ciudad</label>
              <input
                type="text"
                className="form-control"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Direccion</label>
              <input
                type="text"
                className="form-control"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Telefono</label>
              <input
                type="number"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Empresa</label>
              <input
                type="text"
                className="form-control"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Registrar {textos.modulo2titulo}</button>
            <button type="button" onClick={() => setMostrarModal(true)} className="btn btn-secondary">Ver {textos.modulo2titulo} Registradas</button>
          </div>
        </form>
      </div>
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="btn-cerrar" onClick={() => setMostrarModal(false)}>X</button>
            <VerModulo2 /> {/* Se muestra la lista de materias dentro del modal */}
          </div>
        </div>
      )}
    </div>
  );
};
export default RegistrarModulo2;
