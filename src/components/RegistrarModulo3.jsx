import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import VerModulo3 from './VerModulo3'; // Importamos el componente de la lista de materias
import '../styles/Modulos.css';

const RegistrarModulo3 = () => {
    const rutaObtenerMaterias = "/caso1/materias/ver";
    const rutaObtenerEstudiantes = "/caso1/estudiantes/ver";
    const rutaCrearMatricula = "/caso1/matriculas/crear";

    const TOKEN = localStorage.getItem('token');

    const [cedula,setCedula]= useState('');
    const [textos, setTextos] = useState({});
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [nombreEstudiante, setNombreEstudiante] = useState('');
    const [idEstudiante, setIdEstudiante] = useState('');
    const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
    const [idMaterias, setIdMaterias] = useState([]);
    const [materiasDisponibles, setMateriasDisponibles] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [totalCreditos, setTotalCreditos] = useState(0);

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
            modulo2titulo: xml.getElementsByTagName("modulo2titulo")[0].textContent,
            modulo2descripcion: xml.getElementsByTagName("modulo2descripcion")[0].textContent,
            MSGmod1Cexit: xml.getElementsByTagName("MSGmod1Cexit")[0].textContent,
            MSGmod1Cfail: xml.getElementsByTagName("MSGmod1Cfail")[0].textContent,
            modulo2tituloEditar: xml.getElementsByTagName("modulo2tituloEditar")[0].textContent,
  
          });
        })
        .catch(error => console.error("Error cargando XML:", error));
        obtenerMaterias();
        obtenerEstudiantes();
    }, []);

    const obtenerMaterias = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}${rutaObtenerMaterias}`, {
                headers: { Authorization: `Bearer ${TOKEN}` },
            });
            setMateriasDisponibles(data);
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Error al obtener las materias disponibles.' });
        }
    };
    const obtenerEstudiantes = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}${rutaObtenerEstudiantes}`, {
                headers: { Authorization: `Bearer ${TOKEN}` },
            });
            setEstudiantes(Array.isArray(data) ? data : []);
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Error al obtener los estudiantes.' });
            setEstudiantes([]);
        }
    };
    const seleccionarEstudiante = (e) => {
        const estudiante = estudiantes.find(est => est._id === e.target.value);
        if (estudiante) {
            setNombreEstudiante(`${estudiante.nombre} ${estudiante.apellido} - ${estudiante.cedula}`);
            setIdEstudiante(estudiante._id);
            setCedula(estudiante.cedula);
        }
    };
    const agregarMateria = () => {
        if (!materiaSeleccionada) {
            Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Por favor, selecciona una materia.' });
            return;
        }
        const materia = materiasDisponibles.find(mat => mat._id === materiaSeleccionada);
        if (materia && !idMaterias.some(m => m._id === materia._id)) {
            setIdMaterias([...idMaterias, materia]);
            setTotalCreditos(prevTotal => prevTotal + materia.creditos);
        }
    };
    const eliminarMateria = (id) => {
        const materiaEliminada = idMaterias.find(m => m._id === id);
        if (materiaEliminada) {
            setIdMaterias(idMaterias.filter(m => m._id !== id));
            setTotalCreditos(prevTotal => prevTotal - materiaEliminada.creditos);
        }
    };
    const CrearenModulo3 = async (e) => {
        e.preventDefault();
        if (!codigo || !descripcion || !idEstudiante || idMaterias.length === 0) {
            Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Por favor, completa todos los campos y selecciona al menos una materia.' });
            return;
        }
        try {
            const nuevoDato = {codigo,descripcion,creditos: totalCreditos,  id_estudiante: idEstudiante,id_materias: idMaterias.map(m => m._id) };

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}${rutaCrearMatricula}`,nuevoDato,{
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
        setNombreEstudiante('');
        setIdEstudiante('');
        setIdMaterias([]);
        setTotalCreditos(0); 
        setMateriaSeleccionada('');

    };

    return (
        <div className="container mt-4">
            <form onSubmit={CrearenModulo3} className="bg-white p-4 shadow rounded">
                <h2 className="text-center mb-4">Registrar Matrícula</h2>
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
                        <label className="form-label">Estudiante</label>
                        <input type="text" className="form-control" value={nombreEstudiante} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Seleccionar Estudiante</label>
                        <select className="form-select" value={nombreEstudiante} onChange={seleccionarEstudiante}>
                            <option value="">Seleccione un estudiante</option>
                            {estudiantes.map(est => (
                                <option key={est._id} value={est._id}>{est.nombre} {est.apellido} - {est.cedula}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Seleccionar Materia</label>
                        <div className="d-flex">
                            <select className="form-select me-2" value={materiaSeleccionada} onChange={(e) => setMateriaSeleccionada(e.target.value)}>
                                <option value="">Seleccione una Materia</option>
                                {materiasDisponibles.map(mat => (
                                    <option key={mat._id} value={mat._id}>{mat.nombre} ({mat.codigo}) - {mat.creditos}</option>
                                ))}
                            </select>
                            <button type="button" className="btn btn-success" onClick={agregarMateria}>Añadir Materia</button>
                        </div>
                        <label className="form-label">Total de Créditos Seleccionados</label>
                        <input type="text" className="form-control" value={totalCreditos} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Materias seleccionadas</label>
                        <ul className="list-group">
                        {idMaterias.map((mat) => (
                            <li key={mat._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {mat.nombre} ({mat.codigo}) - {mat.creditos}
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => eliminarMateria(mat._id)}>Eliminar</button>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary">Registrar Matrícula</button>
                    <button type="button" onClick={() => setMostrarModal(true)} className="btn btn-secondary">Ver {textos.modulo2titulo} Registradas</button>

                </div>
            </form>
                {mostrarModal && (
                    <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="btn-cerrar" onClick={() => setMostrarModal(false)}>X</button>
                        <VerModulo3/> {/* Se muestra la lista de materias dentro del modal */}
                    </div>
                    </div>
                )}
        </div>
    );
};

export default RegistrarModulo3;
