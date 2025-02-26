import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import VerModulo1 from './VerModulo1'; // Importamos el componente de la lista de materias
import '../styles/Modulos.css';
const RegistrarModulo1 = () => {
  const rutacrearModulo1 = "/caso1/materias/crear";
  const TOKEN = localStorage.getItem('token');

  const [textos, setTextos] = useState({});
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [creditos, setCreditos] = useState('');
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
          modulo1titulo: xml.getElementsByTagName("modulo1titulo")[0].textContent,
          modulo1descripcion: xml.getElementsByTagName("modulo1descripcion")[0].textContent,
          MSGmod1Cexit: xml.getElementsByTagName("MSGmod1Cexit")[0].textContent,
          MSGmod1Cfail: xml.getElementsByTagName("MSGmod1Cfail")[0].textContent,
          modulo1tituloEditar: xml.getElementsByTagName("modulo1tituloEditar")[0].textContent,

        });
      })
      .catch(error => console.error("Error cargando XML:", error));
  }, []);
  const CrearenModulo1 = async (e) => {
    e.preventDefault();
    try {
      const nuevoDato = { nombre, codigo, descripcion, creditos };
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}${rutacrearModulo1}`, nuevoDato ,{
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      Swal.fire('Éxito',textos.modulo1tituloEditar + 'se ha añadido con exito','success');
      limpiarFormulario();
    } catch (error) {
      Swal.fire('Error',textos.modulo1tituloEditar +' no se añadido revise esto porfavor ('+ error.response?.data?.msg + ')' ,'error');
    }
    
  };
  const limpiarFormulario = () => {
    setNombre('');
    setCodigo('');
    setDescripcion('');
    setCreditos('');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Registrar {textos.modulo1titulo}</h2>
        <form onSubmit={CrearenModulo1}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Código</label>
            <input
              type="text"
              className="form-control"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input
              type="text"
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Créditos</label>
            <input
              type="number"
              className="form-control"
              value={creditos}
              onChange={(e) => setCreditos(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Registrar {textos.modulo1titulo}</button>
            <button type="button" onClick={() => setMostrarModal(true)} className="btn btn-secondary">Ver {textos.modulo1titulo} Registradas</button>
          </div>
        </form>
      </div>
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="btn-cerrar" onClick={() => setMostrarModal(false)}>X</button>
            <VerModulo1 /> {/* Se muestra la lista de materias dentro del modal */}
          </div>
        </div>
      )}
    </div>
  );
};
export default RegistrarModulo1;
