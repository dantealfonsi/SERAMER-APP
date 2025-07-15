import React, { useState, useEffect } from 'react';
import { getAlertasCumplimiento } from '../../API/UseAlertas';
import '../../../assets/Spinner.css'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';

function AlertasCumplimientoPage() {
  const [alertas, setAlertas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ petitions: 'alertas_cumplimiento', type: 'all', status: 'pending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Podría ser también un estado si el usuario lo puede cambiar

  const styleh1 = {
    backgroundColor: '#f0f0f0'
  }

  useEffect(() => {
    const fetchAlertas = async () => {
      setIsLoading(true);
      setError(null); // Limpiar errores anteriores
      try {
        const data = await getAlertasCumplimiento(filters, currentPage, itemsPerPage);
        setAlertas(data);
      } catch (err) {
        setError('Hubo un error al cargar las alertas.');
        console.error('Error fetching alertas:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlertas();
  }, [filters, currentPage, itemsPerPage]); // Este efecto se re-ejecutará cuando cambien estas dependencias

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
    setCurrentPage(1); // Volver a la primera página cuando cambian los filtros
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <div>Cargando alertas...<div className="spinner-container"><div className="spinner"></div></div></div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <>
      <ul>
        <li><Link to="/fiscalizacion/crear_alerta">Crear Una Alerta</Link></li>
        <li><Link to="/nuevaqueja">Nueva Queja</Link></li>
      </ul>
    <div>
      <h1 style={styleh1}>Listado de Alertas de Cumplimiento</h1>
      {/* Aquí podrías agregar filtros y paginación */}
      <ul>
        {alertas.map(alerta => (
          <li key={alerta.id}>{alerta.description}</li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default AlertasCumplimientoPage;