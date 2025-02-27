import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditarModulo3 = ({ matricula }) => {
    const [textos, setTextos] = useState({});
    
    const [codigo, setCodigo] = useState(matricula?.codigo || '');
    const [descripcion, setDescripcion] = useState(matricula?.descripcion || '');
    
    const TOKEN = localStorage.getItem('token');
    const rutaEditarDatosMod1 = "/caso1/matriculas/actualizar";

    useEffect(() => {
        fetch("/Bienvenida.xml")
            .then(response => response.text())
            .then(str => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(str, "text/xml");
    
                setTextos({
                    modulo2tituloEditar: xml.getElementsByTagName("modulo2tituloEditar")[0]?.textContent || "Editar Datos"
                });
            })
            .catch(error => console.error("Error cargando XML:", error));
    
        if (matricula) {
            setCodigo(matricula.codigo);
            setDescripcion(matricula.descripcion);
        }
    }, [matricula]);
    
    const ActualizarDatosMod2 = async (e) => {
        e.preventDefault();
        if (!codigo || !descripcion ) {
            Swal.fire('Advertencia', 'Por favor, complete todos los campos.', 'warning');
            return;
        }
    
        try {
            const datosMatricula = { codigo, descripcion };
    
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}${rutaEditarDatosMod1}/${matricula._id}`, 
                datosMatricula, 
                { headers: { Authorization: `Bearer ${TOKEN}` } }
            );
    
            Swal.fire('Éxito', `${textos.modulo2tituloEditar} se ha editado con éxito`, 'success');
        } catch (error) {
            Swal.fire('Error', `${textos.modulo2tituloEditar} no se editó, revise esto por favor (${error})`, 'error');
        }
    };
    
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Editar {textos.modulo2tituloEditar}</h2>
            <form onSubmit={ActualizarDatosMod2} className="p-3 border rounded shadow bg-light">
                <div className="mb-3">
                    <label className="form-label">Código</label>
                    <input type="text" className="form-control" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary px-4">Actualizar {textos.modulo2tituloEditar}</button>
                </div>
            </form>
        </div>
    );
};

export default EditarModulo3;
