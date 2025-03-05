import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditarModulo1 from './EditarModulo1'; // Importamos el componente de edición
import '../styles/Modulos.css'; // Asegúrate de importar los estilos correctos

const VerModulo1 = () => {
  const [textos, setTextos] = useState({});
  const rutaObtenerDatosMod1 = "/caso5/auditorio/ver";
  const rutaEliminarDatosMod1 = "/caso5/auditorio/eliminar";
  const TOKEN = localStorage.getItem('token');

  const [auditorios, setAuditorios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false); // Control del modal
  const [auditorioSeleccionado, setAuditorioSeleccionado] = useState(null); // Estado para la auditorio a editar

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
    ObtenerDatosMod1();
  }, []);

  const ObtenerDatosMod1 = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}${rutaObtenerDatosMod1}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setAuditorios(data);
    } catch (error) {
      setMensaje('Error al obtener las auditorios');
    }
  };

  const EliminarDatosMod1 = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperar esta auditorio después de eliminarla.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}${rutaEliminarDatosMod1}/${id}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        Swal.fire('Eliminado!', textos.modulo1tituloEditar + ' se ha eliminado con exito', 'success');
        ObtenerDatosMod1();
      } catch (error) {
        Swal.fire('Error!', textos.modulo1tituloEditar +' no se eliminado revise esto porfavor ('+ error.response?.data?.msg + ')'  , 'error');
      }
    }
  };

  // Abrir el modal con la auditorio seleccionada
  const abrirModalEditar = (auditorio) => {
    setAuditorioSeleccionado(auditorio);
    setModalAbierto(true);
  };

  // Cerrar el modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setAuditorioSeleccionado(null);
    ObtenerDatosMod1();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{textos.modulo1titulo} Registradas</h2>
      {mensaje && <p className="alert alert-danger">{mensaje}</p>}

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Ubicacion</th>
              <th>Capacidad</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {auditorios.map((auditorio) => (
              <tr key={auditorio._id} className="text-center align-middle">
                <td>{auditorio.cedula}</td>
                <td>{auditorio.nombre}</td>
                <td>{auditorio.ubicacion}</td>
                <td>{auditorio.capacidad}</td>
                <td>{auditorio.descripcion}</td>
                <td>
                  <button className="btn btn-info me-2" onClick={() => abrirModalEditar(auditorio)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => EliminarDatosMod1(auditorio._id)}>
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
            <h4 className="text-center mb-3">Editar {textos.modulo1tituloEditar} </h4>
            {auditorioSeleccionado && <EditarModulo1 auditorio={auditorioSeleccionado} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerModulo1;
