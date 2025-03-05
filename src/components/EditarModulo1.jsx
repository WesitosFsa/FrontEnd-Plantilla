import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditarModulo1 = ({ materia }) => {
    const [textos, setTextos] = useState({});
    
    const [nombre, setNombre] = useState(materia?.nombre || '');
    const [cedula, setcedula] = useState(materia?.cedula || '');
    const [descripcion, setDescripcion] = useState(materia?.descripcion || '');
    const [ubicacion, setUbicacion] = useState(materia?.ubicacion || '');
    const [capacidad, setCapacidad] = useState(materia?.capacidad || '');
    const TOKEN = localStorage.getItem('token');
    const rutaEditarDatosMod1 = "/caso1/materias/actualizar";


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
        if (materia) {
            setNombre(materia.nombre);
            setcedula(materia.cedula);
            setDescripcion(materia.descripcion);
            setCreditos(materia.creditos);
        }
        
    }, [materia]);

    const ActualizarDatosMod1 = async (e) => {
        e.preventDefault();
        if (!nombre || !cedula || !descripcion || !creditos || !ubicacion) {
            Swal.fire('Advertencia', 'Por favor, complete todos los campos.', 'warning');
            return;
        }

        try {
            const materiaActualizada = { nombre, cedula, descripcion, capacidad };
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}${rutaEditarDatosMod1}/${materia._id}`, materiaActualizada,{
                headers: {
                  Authorization: `Bearer ${TOKEN}`,
                },
              });
             
            Swal.fire('Éxito', textos.modulo1tituloEditar + ' se ha editado con exito' , 'success');

        } catch (error) {
            Swal.fire('Error', textos.modulo1tituloEditar +' no se editado revise esto porfavor ('+ error.response?.data?.msg + ')'  , 'error');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Datos de {textos.modulo1tituloEditar}</h2>
            <form onSubmit={ActualizarDatosMod1} className="p-3 border rounded shadow bg-light">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Nombre</label>
                        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Código</label>
                        <input type="text" className="form-control" value={cedula} onChange={(e) => setcedula(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Descripción</label>
                        <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Ubicacion</label>
                        <input type="text" className="form-control" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required />
                    </div>
                </div>
                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Capacidad</label>
                        <input type="number" className="form-control" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} required />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary px-4">Actualizar {textos.modulo1tituloEditar}</button>
                </div>
            </form>
        </div>
    );
};

export default EditarModulo1;
