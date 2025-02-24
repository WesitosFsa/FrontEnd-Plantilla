import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegistrarModulo2 = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const CrearenModulo2 = async (e) => {
    e.preventDefault();

    if ([nombre, apellido, cedula, fechaNacimiento, ciudad, direccion, telefono, email].includes('')) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Debes llenar todos los campos.' });
      return;
    }

    const Verificacion_numeros = /^[0-9]+$/;
    if (!Verificacion_numeros.test(cedula) || !Verificacion_numeros.test(telefono)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Cédula y Teléfono deben ser solo números.' });
      return;
    }

    try {
      const nuevoEstudiante = { nombre, apellido, cedula, fecha_nacimiento: fechaNacimiento, ciudad, direccion, telefono, email };
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/caso1/estudiante/crear`, nuevoEstudiante);
      Swal.fire({ icon: 'success', title: 'Éxito', text: 'Estudiante creado con éxito.' });
      limpiarFormulario();
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Error al registrar el estudiante.' });
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setApellido('');
    setCedula('');
    setFechaNacimiento('');
    setCiudad('');
    setDireccion('');
    setTelefono('');
    setEmail('');
  };

  const handleVerEstudiantes = () => {
    navigate('/estudiantes');
  };

  return (
    <div className="container mt-4">
      <form onSubmit={CrearenModulo2} className="bg-white p-4 shadow rounded">
      <h2 className="text-center mb-4">Registrar Estudiante</h2>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Apellido</label>
            <input type="text" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Cédula</label>
            <input type="text" className="form-control" value={cedula} onChange={(e) => setCedula(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Fecha de Nacimiento</label>
            <input type="date" className="form-control" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Ciudad</label>
            <input type="text" className="form-control" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Dirección</label>
            <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Teléfono</label>
            <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-primary">Registrar Estudiante</button>
          <button type="button" onClick={handleVerEstudiantes} className="btn btn-secondary">Ver Estudiantes</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarModulo2;
