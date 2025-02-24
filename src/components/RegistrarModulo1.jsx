import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegistrarModulo1 = () => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [creditos, setCreditos] = useState('');
  const navigate = useNavigate();

  const CrearenModulo1 = async (e) => {
    e.preventDefault();
    try {
      const nuevaMateria = { nombre, codigo, descripcion, creditos };
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/caso1/materias/crear`, nuevaMateria);
      Swal.fire('Éxito', 'Materia creada con éxito', 'success');
      limpiarFormulario();
    } catch (error) {
      Swal.fire('Error', 'Error al crear la materia', 'error');
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setCodigo('');
    setDescripcion('');
    setCreditos('');
  };

  const handleVerMaterias = () => {
    navigate('/materias-registradas');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Registrar Materia</h2>
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
            <button type="submit" className="btn btn-primary">Registrar Materia</button>
            <button type="button" onClick={handleVerMaterias} className="btn btn-secondary">Ver Materias Registradas</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarModulo1;
