import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './layout/Auth'
import PrivateRoute from './layout/PrivateRoute'  // Importar PrivateRoute
import { Bienvenida } from './pages/Bienvenida.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { Dashboard } from './layout/Dashboard.jsx'
import { Modulo1 } from './pages/Modulo1.jsx'
import { Modulo2 } from './pages/Modulo2.jsx'
import { Modulo3 } from './pages/Modulo3.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página de bienvenida */}
        <Route index element={<Bienvenida />} />

        {/* Rutas protegidas por Auth */}
        <Route path="/" element={<Auth />}>
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Route>

        {/* Rutas protegidas por PrivateRoute */}
        <Route path="/Dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="Modulo1" element={<Modulo1 />} />
          <Route path="Modulo2" element={<Modulo2 />} />
          <Route path="Modulo3" element={<Modulo3 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
