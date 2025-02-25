import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const autenticado = localStorage.getItem('token');

    return autenticado ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
