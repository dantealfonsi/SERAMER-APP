import React from 'react';
import { Link } from 'react-router-dom';

function Detalle() {
  return (
    <>
    <ul>
      <li><Link to="/listado">Listado General</Link></li>
      <li><Link to="/nuevaqueja">Nueva Queja</Link></li>
    </ul>

      <div>
        <h1>Detalle de una Queja Específica</h1>
        <p>¡Bienvenido!</p>
      </div>
    </>
  );
}

export default Detalle;