import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditarModulo2 from './EditarModulo2'; // Importamos el componente de edición
import '../styles/Modulos2.css'; // Asegúrate de importar los estilos correctos

const VerModulo2 = () => {
  const [textos, setTextos] = useState({});
  const rutaObtenerDatosMod2 = "/caso5/conferencista/ver";
  const rutaEliminarDatosMod2 = "/caso5/conferencista/eliminar";
  const TOKEN = localStorage.getItem('token');

  const [estudiantes, setEstudiantes] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false); // Control del modal
  const [estudianteSeleccionada, setEstudianteSeleccionada] = useState(null); // Estado para la estudiante a editar

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
    ObtenerDatosMod2();
  }, []);

  const ObtenerDatosMod2 = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}${rutaObtenerDatosMod2}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setEstudiantes(data);
    } catch (error) {
      setMensaje('Error al obtener las estudiantes');
    }
  };

  const EliminarDatosMod2 = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperar esta estudiante después de eliminarla.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}${rutaEliminarDatosMod2}/${id}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        Swal.fire('Eliminado!', textos.modulo2tituloEditar + ' se ha eliminado con exito', 'success');
        ObtenerDatosMod2();
      } catch (error) {
        Swal.fire('Error!', textos.modulo2tituloEditar +' no se eliminado revise esto porfavor ('+ error + ')'  , 'error');
      }
    }
  };

  // Abrir el modal con la estudiante seleccionada
  const abrirModalEditar = (estudiante) => {
    setEstudianteSeleccionada(estudiante);
    setModalAbierto(true);
  };

  // Cerrar el modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setEstudianteSeleccionada(null);
    ObtenerDatosMod2();
  };


  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{textos.modulo2titulo} Registradas</h2>
      {mensaje && <p className="alert alert-danger">{mensaje}</p>}

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cedula</th>
              <th>Fecha de Nacimiento</th>
              <th>Ciudad</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Genero</th>
              <th>Email</th>
              <th>Acciones</th>

              
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante) => (
              <tr key={estudiante._id} className="text-center align-middle">
                <td>{estudiante.nombre}</td>
                <td>{estudiante.apellido}</td>
                <td>{estudiante.cedula}</td>
                <td>{estudiante.fecha_nacimiento}</td>
                <td>{estudiante.ciudad}</td>
                <td>{estudiante.genero}</td>
                <td>{estudiante.direccion}</td>
                <td>{estudiante.telefono}</td>
                <td>{estudiante.email}</td>

                <td>
                  <button className="btn btn-info me-2" onClick={() => abrirModalEditar(estudiante)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => EliminarDatosMod2(estudiante._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL MANUAL */}
      {modalAbierto && (
        <div className="modal-overlay"  onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-cerrar" onClick={cerrarModal}>✖</button>
            <h4 className="text-center mb-3">Editar {textos.modulo2tituloEditar} </h4>
            {estudianteSeleccionada && <EditarModulo2 estudiante={estudianteSeleccionada} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerModulo2;
