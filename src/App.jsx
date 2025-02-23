import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'
import Auth from './layout/Auth'
import { Bienvenida } from './pages/Bienvenida.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
function App() {
  return (

    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={<Bienvenida/>}/>
            <Route path='/' element={<Auth/>}>
            <Route path='Login' element={<Login/>}/>
            <Route path='Register' element={<Register/>}/>

        </Route>
        </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
