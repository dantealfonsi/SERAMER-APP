import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* Rutas */
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword';
import SecurityToken from './pages/SecurityToken';
import NewPassword from './pages/NewPassword';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/recover-password" element={<RecoverPassword />}/>
          <Route path="/security-token" element={<SecurityToken />}/>
          <Route path="/new-password" element={<NewPassword />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
      {/* Toast */}
      <ToastContainer
        position="bottom-right"
        transition={Slide}
        limit={10}
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        closeButton
      />
    </>
  )
}
