import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import VerModulo3 from './VerModulo3'; // Importamos el componente de la lista de auditorios
import '../styles/Modulos.css';

const RegistrarModulo3 = () => {
    const rutaobtenerAuditorios = "/caso5/auditorio/ver";
    const rutaobtenerConferencistas = "/caso5/conferencista/ver";
    const rutaCrearReserva = "/caso5/reserva/crear";

    const TOKEN = localStorage.getItem('token');

    const [cedula,setCedula]= useState('');
    const [textos, setTextos] = useState({});
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [nombreConferencista, setNombreConferencista] = useState('');
    const [idConferencista, setIdConferencista] = useState('');
    const [auditorioSeleccionado, setAuditorioSeleccionada] = useState('');
    const [idAuditorio, setIdAuditorios] = useState([]);
    const [auditoriosDisponibles, setMateriasDisponibles] = useState([]);
    const [conferencistas, setConferencistas] = useState([]);

    const navigate = useNavigate();

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
            modulo3titulo: xml.getElementsByTagName("modulo3titulo")[0].textContent,
            modulo2descripcion: xml.getElementsByTagName("modulo2descripcion")[0].textContent,
            MSGmod1Cexit: xml.getElementsByTagName("MSGmod1Cexit")[0].textContent,
            MSGmod1Cfail: xml.getElementsByTagName("MSGmod1Cfail")[0].textContent,
            modulo3tituloEditar: xml.getElementsByTagName("modulo3tituloEditar")[0].textContent,
  
          });
        })
        .catch(error => console.error("Error cargando XML:", error));
        obtenerAuditorios();
        obtenerConferencistas();
    }, []);

    const obtenerAuditorios = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}${rutaobtenerAuditorios}`, {
                headers: { Authorization: `Bearer ${TOKEN}` },
            });
            setMateriasDisponibles(data);
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Error al obtener las auditorios disponibles.' });
        }
    };
    const obtenerConferencistas = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}${rutaobtenerConferencistas}`, {
                headers: { Authorization: `Bearer ${TOKEN}` },
            });
            setConferencistas(Array.isArray(data) ? data : []);
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Error al obtener los conferencistas.' });
            setConferencistas([]);
        }
    };
    const seleccionarConferencista = (e) => {
        const conferencista = conferencistas.find(est => est._id === e.target.value);
        if (conferencista) {
            setNombreConferencista(`${conferencista.nombre} ${conferencista.apellido} - ${conferencista.cedula}`);
            setIdConferencista(conferencista._id);
            setCedula(conferencista.cedula);
        }
    };
    const agregarAuditorio = () => {
        if (!auditorioSeleccionado) {
            Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Por favor, selecciona una auditorio.' });
            return;
        }
        const auditorio = auditoriosDisponibles.find(mat => mat._id === auditorioSeleccionado);
        if (auditorio && !idAuditorio.some(m => m._id === auditorio._id)) {
            setIdAuditorios([...idAuditorio, auditorio]);
        }
    };
    const eliminarAuditorio = (id) => {
        const auditorioEliminada = idAuditorio.find(m => m._id === id);
        if (auditorioEliminada) {
            setIdAuditorios(idAuditorio.filter(m => m._id !== id));
        }
    };
    const CrearenModulo3 = async (e) => {
        e.preventDefault();
        if (!codigo || !descripcion || !idConferencista || idAuditorio.length === 0) {
            Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Por favor, completa todos los campos y selecciona al menos una auditorio.' });
            return;
        }
        try {
            const nuevoDato = {codigo,descripcion ,  id_conferencista: idConferencista,id_auditorios: idAuditorio.map(m => m._id) };

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}${rutaCrearReserva}`,nuevoDato,{
                headers: {
                  Authorization: `Bearer ${TOKEN}`,
                },
              });
            Swal.fire({ icon: 'success', title: 'Éxito', text: 'Matrícula creada con éxito.' });
            limpiarFormulario();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: error.response ? error.response.data.msg : 'Error al crear la matrícula.' });
        }
    };
    
    const limpiarFormulario = () => {
        setCodigo('');
        setDescripcion('');
        setCedula('');
        setNombreConferencista('');
        setIdConferencista('');
        setIdAuditorios([]);
        setAuditorioSeleccionada('');

    };

    return (
        <div className="container mt-4">
            <form onSubmit={CrearenModulo3} className="bg-white p-4 shadow rounded">
                <h2 className="text-center mb-4">Registrar Reserva</h2>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Código</label>
                        <input type="text" className="form-control" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Descripción</label>
                        <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Conferencista</label>
                        <input type="text" className="form-control" value={nombreConferencista} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Seleccionar Conferencista</label>
                        <select className="form-select" value={nombreConferencista} onChange={seleccionarConferencista}>
                            <option value="">Seleccione un conferencista</option>
                            {conferencistas.map(est => (
                                <option key={est._id} value={est._id}>{est.nombre} {est.apellido} - {est.cedula}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Seleccionar Auditorio</label>
                        <div className="d-flex">
                            <select className="form-select me-2" value={auditorioSeleccionado} onChange={(e) => setAuditorioSeleccionada(e.target.value)}>
                                <option value="">Seleccione una auditorio</option>
                                {auditoriosDisponibles.map(mat => (
                                    <option key={mat._id} value={mat._id}>{mat.nombre} ({mat.codigo}) </option>
                                ))}
                            </select>
                            <button type="button" className="btn btn-success" onClick={agregarAuditorio}>Añadir Auditorio</button>
                        </div>

                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Auditorios Seleccionados</label>
                        <ul className="list-group">
                        {idAuditorio.map((mat) => (
                            <li key={mat._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {mat.nombre} ({mat.codigo}) 
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => eliminarAuditorio(mat._id)}>Eliminar</button>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary">Registrar Reserva</button>
                    <button type="button" onClick={() => setMostrarModal(true)} className="btn btn-secondary">Ver {textos.modulo3titulo} Registradas</button>

                </div>
            </form>
                {mostrarModal && (
                    <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="btn-cerrar" onClick={() => setMostrarModal(false)}>X</button>
                        <VerModulo3/> {/* Se muestra la lista de auditorios dentro del modal */}
                    </div>
                    </div>
                )}
        </div>
    );
};

export default RegistrarModulo3;
