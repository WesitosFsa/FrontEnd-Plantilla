import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegistrarModulo3 = () => {
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombreEstudiante, setNombreEstudiante] = useState('');
    const [idEstudiante, setIdEstudiante] = useState('');
    const [idMaterias, setIdMaterias] = useState([]);
    const [materiasDisponibles, setMateriasDisponibles] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerMateriasDisponibles();
        obtenerEstudiantes();
    }, []);

    

    const obtenerMateriasDisponibles = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/materias/ver`);
            setMateriasDisponibles(data);
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Error al obtener las materias disponibles.' });
        }
    };

    const obtenerEstudiantes = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/estudiante/ver`);
            if (Array.isArray(data)) {
                setEstudiantes(data);
            } else {
                setEstudiantes([]);
                console.error("La API no devolvió un array:", data);
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Error al obtener los estudiantes.' });
            setEstudiantes([]);
        }
    };
    

    const seleccionarEstudiante = (estudiante) => {
        setNombreEstudiante(`${estudiante.nombre} ${estudiante.apellido}`);
        setIdEstudiante(estudiante._id);
        setCedula(estudiante.cedula);
    };

    const handleMateriaSeleccionada = (id) => {
        setIdMaterias(idMaterias.includes(id) ? idMaterias.filter(materiaId => materiaId !== id) : [...idMaterias, id]);
    };

    const CrearenModulo3 = async (e) => {
        e.preventDefault();
        if (!codigo || !descripcion || !idEstudiante || idMaterias.length === 0) {
            Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Por favor, completa todos los campos y selecciona al menos una materia.' });
            return;
        }
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/caso1/matriculas/crear`, { codigo, descripcion, id_estudiante: idEstudiante, id_materias: idMaterias });
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
    };

    
    return (
        <div className="container mt-4">
            <form onSubmit={CrearenModulo3} className="bg-white p-4 shadow rounded">
                <h2 className="text-center mb-4">Registrar Matrícula</h2>
                <div className="mb-3">
                    <label className="form-label">Código</label>
                    <input type="text" className="form-control" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Estudiante</label>
                    <input type="text" className="form-control" value={nombreEstudiante} readOnly />
                </div>
                <div className="mb-3">
                    <label className="form-label">Seleccionar Estudiante</label>
                    <select className="form-select" onChange={(e) => seleccionarEstudiante(estudiantes.find(est => est._id === e.target.value))}>
                        <option value="">Seleccione un estudiante</option>
                        {estudiantes.map(est => (
                            <option key={est._id} value={est._id}>{est.nombre} {est.apellido} - {est.cedula}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Materias Disponibles</label>
                    {materiasDisponibles.map((materia) => (
                        <div key={materia._id} className="form-check">
                            <input type="checkbox" className="form-check-input" checked={idMaterias.includes(materia._id)} onChange={() => handleMateriaSeleccionada(materia._id)} />
                            <label className="form-check-label">{materia.nombre} ({materia.codigo})</label>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary">Registrar Matrícula</button>
                    <button type="button" onClick={() => navigate('/matriculas')} className="btn btn-secondary">Ver Matrículas</button>
                </div>
            </form>
        </div>
    );
};

export default RegistrarModulo3;
