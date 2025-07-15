import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Detalle from './modules/atencion_cliente/quejas/pages/Detalle.jsx';
import ListadoGeneral from './modules/atencion_cliente/quejas/pages/ListadoGeneral.jsx';
import NuevaQueja from './modules/atencion_cliente/quejas/pages/NuevaQueja.jsx';
import AlertasCumplimientoPage from './modules/fiscalizacion/alertas/AlertasCumplimientoPage.jsx';
import CrearAlerta from './modules/fiscalizacion/alertas/CrearAlerta.jsx';
import CrearTipoAlerta from './modules/fiscalizacion/alertas/CrearTipoAlerta.jsx';
import CrearAdjudicatario from './modules/fiscalizacion/alertas/CrearAdjudicatario.jsx';
import './App.css'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/detalle" element={<Detalle />} />
          <Route path="/listado" element={<ListadoGeneral />} />
          <Route path="/nuevaqueja" element={<NuevaQueja />} />
          <Route path="/fiscalizacion/alertas" element={<AlertasCumplimientoPage />} />
          <Route path="/fiscalizacion/crear_alerta" element={<CrearAlerta />} />
          <Route path="/fiscalizacion/tipoalerta" element={<CrearTipoAlerta />} />
          <Route path="/fiscalizacion/adjudicatario" element={<CrearAdjudicatario />} />
          <Route path="/" element={<ListadoGeneral />} /> {/* expecting home, this rute is optional */}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />        
        <p className="read-the-docs">
          SERAMER-APP
        </p>
      </div>
    </>
  )
}

export default App
