import { Routes, Route } from 'react-router-dom';
import Detalle from './modules/atencion_cliente/quejas/pages/Detalle.jsx';
import ListadoGeneral from './modules/atencion_cliente/quejas/pages/ListadoGeneral.jsx';
import NuevaQueja from './modules/atencion_cliente/quejas/pages/NuevaQueja.jsx';
import './App.css'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/detalle" element={<Detalle />} />
          <Route path="/listado" element={<ListadoGeneral />} />
          <Route path="/nuevaqueja" element={<NuevaQueja />} />
          <Route path="/" element={<ListadoGeneral />} /> {/* expecting home, this rute is optional */}
        </Routes>
        <p className="read-the-docs">
          SERAMER-APP
        </p>
      </div>
    </>
  )
}

export default App
