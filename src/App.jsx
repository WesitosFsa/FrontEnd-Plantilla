import './App.css'
import { PaginaPrincipal } from './pages/PaginaPrincipal'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'
import Auth from './layout/Auth'
function App() {
  return (

    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={<PaginaPrincipal/>}/>
            <Route path='/' element={<Auth/>}>
        </Route>
        </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
