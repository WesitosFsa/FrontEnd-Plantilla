import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditarModulo3 from './EditarModulo3'; // Importamos el componente de edición
import '../styles/Modulos2.css'; // Asegúrate de importar los estilos correctos

const VerModulo3 = () => {
  const [textos, setTextos] = useState({});
  const rutaObtenerDatosMod3 = "/caso1/matriculas/ver";
  const rutaEliminarDatosMod3 = "/caso1/matriculas/eliminar";
  const TOKEN = localStorage.getItem('token');

  const [matriculas, setMatriculas] = useState([]);

  const [mensaje, setMensaje] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false); // Control del modal
  const [matriculaSeleccionada, setMatriculaSeleccionada] = useState(null); // Estado para la matricula a editar

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
    ObtenerDatosMod3();
  }, []);

  const ObtenerDatosMod3 = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}${rutaObtenerDatosMod3}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setMatriculas(data);
    } catch (error) {
      setMensaje('Error al obtener las matriculas');
    }
  };

  const EliminarDatosMod3 = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperar esta matricula después de eliminarla.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}${rutaEliminarDatosMod3}/${id}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        Swal.fire('Eliminado!', textos.modulo3tituloEditar + ' se ha eliminado con exito', 'success');
        ObtenerDatosMod3();
      } catch (error) {
        Swal.fire('Error!', textos.modulo3tituloEditar +' no se eliminado revise esto porfavor ('+ error + ')'  , 'error');
      }
    }
  };

  const abrirModalEditar = (matricula) => {
    setMatriculaSeleccionada(matricula);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setMatriculaSeleccionada(null);
    ObtenerDatosMod3();
  };


  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{textos.modulo3titulo} Registradas</h2>
      {mensaje && <p className="alert alert-danger">{mensaje}</p>}

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th>Codigo</th>
              <th>Descripcion</th>
              <th>Creditos</th>  
              <th>Estudiante</th>
              <th>Materias</th>
              <th>Acciones</th>
      
            </tr>
          </thead>
          <tbody>
            {matriculas.map((matricula) => (
              <tr key={matricula._id} className="text-center align-middle">
                <td>{matricula.codigo}</td>
                <td>{matricula.descripcion}</td>
                <td>
                {matricula.materia.length > 0 ? (
                    <>
                    
                    {matricula.materia.reduce((acc, mat) => acc + mat.creditos, 0)}
                    </>
                ) : (
                    "Sin créditos"
                )}
                </td>

                <td>{matricula.estudiante ? `${matricula.estudiante.nombre} ${matricula.estudiante.apellido}` : "No asignado"}</td>
                <td>
                {matricula.materia.length > 0 ? (
                    matricula.materia.map((mat) => (
                    <div key={mat._id}>{mat.nombre} ({mat.codigo}) </div>
                    ))
                ) : (
                    "Sin materias"
                )}
                </td>
                <td>
                  <button className="btn btn-info me-2" onClick={() => abrirModalEditar(matricula)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => EliminarDatosMod3(matricula._id)}>
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
            <h4 className="text-center mb-3">Editar {textos.modulo3tituloEditar} </h4>
            {matriculaSeleccionada && <EditarModulo3 matricula={matriculaSeleccionada} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerModulo3;
