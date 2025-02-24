import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'
import Auth from './layout/Auth'
import { Bienvenida } from './pages/Bienvenida.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Modulo1 } from './pages/Modulo1.jsx'
import { Modulo2 } from './pages/Modulo2.jsx'
import { Modulo3 } from './pages/Modulo3.jsx'

function App() {
  return (

    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={<Bienvenida/>}/>
            <Route path='/' element={<Auth/>}>
            <Route path='Login' element={<Login/>}/>
            <Route path='Register' element={<Register/>}/>
            <Route path='Dashboard' element={<Dashboard/>}/>
            <Route path='Dashboard/Modulo1' element={<Modulo1/>}/>
            <Route path='Dashboard/Modulo2' element={<Modulo2/>}/>
            <Route path='Dashboard/Modulo3' element={<Modulo3/>}/>




        </Route>
        </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
