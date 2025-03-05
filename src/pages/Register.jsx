import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
import logo from '../assets/logo.png';
import '../styles/Login.css';

export const Register = () => {
  const [textos, setTextos] = useState({});
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Bienvenida.xml")
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");

        setTextos({
          registrotitulo: xml.getElementsByTagName("registrotitulo")[0]?.textContent || "Registro",
          registrotexto: xml.getElementsByTagName("registrotexto")[0]?.textContent || "Completa los campos para registrarte",
        });
      })
      .catch(error => console.error("Error cargando XML:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.nombre.trim()) tempErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellido.trim()) tempErrors.apellido = "El apellido es obligatorio";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "El correo es obligatorio";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Correo electrónico no válido";
    }

    if (formData.password.length < 6) {
      tempErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/caso5/usuarios/registro`, {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        password: formData.password,
      });

      Swal.fire("¡Registro exitoso!", "Ahora puedes iniciar sesión", "success");
      navigate("/Login");
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al registrarte", "error");
    }
    setLoading(false);
  };

  return (
    <div className="min-vh-100 bg-dark text-white d-flex justify-content-center align-items-center">
      <div className="container bg-light text-dark p-4 rounded" id="formulario">
        <form onSubmit={handleSubmit}>
          <h2 className="fw-bold text-center">{textos.registrotitulo}</h2>
          <p className="lead text-center">{textos.registrotexto}</p>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="fw-bold">Nombre</label>
              <input type="text" name="nombre" className="form-control" placeholder="Ingresa tu nombre" value={formData.nombre} onChange={handleChange} />
              {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="fw-bold">Apellido</label>
              <input type="text" name="apellido" className="form-control" placeholder="Ingresa tu apellido" value={formData.apellido} onChange={handleChange} />
              {errors.apellido && <p className="text-danger">{errors.apellido}</p>}
            </div>
          </div>

          <div className="mb-3">
            <label className="fw-bold">Correo Electrónico</label>
            <input type="email" name="email" className="form-control" placeholder="Ejemplo: usuario@gmail.com" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="fw-bold">Contraseña</label>
              <input type="password" name="password" className="form-control" placeholder="********" value={formData.password} onChange={handleChange} />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="fw-bold">Repetir Contraseña</label>
              <input type="password" name="confirmPassword" className="form-control" placeholder="********" value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button type="submit" className="btn btn-success btn-lg w-100" disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>

          <hr />

          <div className="row">
            <div className="col-md-6 mb-3">
              <Link to="/">
                <button type="button" className="btn btn-danger btn-lg w-100">Regresar</button>
              </Link>
            </div>
            <div className="col-md-6 mb-3 text-center">
              <Link to="/Login">
                <button type="button" className="btn btn-primary btn-lg w-100">Ingresar</button>
              </Link>
              <p className="lead">¿Ya estás registrado?</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
