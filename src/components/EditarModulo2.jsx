import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditarModulo2 = ({ estudiante }) => {
    const [textos, setTextos] = useState({});
    
    const [nombre, setNombre] = useState(estudiante?.nombre || '');
    const [apellido, setApellido] = useState(estudiante?.nombre || '');
    const [cedula, setCedula] = useState(estudiante?.nombre || '');
    const [fecha_nacimiento, setFecha_nacimiento] = useState(estudiante?.nombre || '');
    const [ciudad, setCiudad] = useState(estudiante?.nombre || '');
    const [direccion, setDireccion] = useState(estudiante?.nombre || '');
    const [telefono, setTelefono] = useState(estudiante?.nombre || '');
    const [email, setEmail] = useState(estudiante?.nombre || '');
  
    const TOKEN = localStorage.getItem('token');
    const rutaEditarDatosMod1 = "/caso5/conferencista/actualizar";


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
        if (estudiante) {
            setNombre(estudiante.nombre);
            setApellido(estudiante.apellido);
            setCedula(estudiante.cedula);
            setFecha_nacimiento(estudiante.fecha_nacimiento);
            setCiudad(estudiante.ciudad);
            setDireccion(estudiante.direccion);
            setTelefono(estudiante.telefono);
            setEmail(estudiante.email);

        }
        
    }, [estudiante]);

    const ActualizarDatosMod2 = async (e) => {
        e.preventDefault();
        if (!nombre || !apellido || !cedula || !fecha_nacimiento || !ciudad || !direccion || !telefono || !email) {
            Swal.fire('Advertencia', 'Por favor, complete todos los campos.', 'warning');
            return;
        }

        try {
            const estudianteActualizada = { nombre, apellido, cedula, fecha_nacimiento,ciudad,direccion,telefono};
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}${rutaEditarDatosMod1}/${estudiante._id}`, estudianteActualizada,{
                headers: {
                  Authorization: `Bearer ${TOKEN}`,
                },
              });
             
            Swal.fire('Éxito', textos.modulo2tituloEditar + ' se ha editado con exito' , 'success');

        } catch (error) {
            Swal.fire('Error', textos.modulo2tituloEditar +' no se editado revise esto porfavor ('+ error  , 'error');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Datos de {textos.modulo2tituloEditar}</h2>
            <form onSubmit={ActualizarDatosMod2} className="p-3 border rounded shadow bg-light">
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
                            readOnly
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
                            readOnly
                            required
                        />
                        </div>
                    </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary px-4">Actualizar {textos.modulo2tituloEditar}</button>
                </div>
            </form>
        </div>
    );
};

export default EditarModulo2;
