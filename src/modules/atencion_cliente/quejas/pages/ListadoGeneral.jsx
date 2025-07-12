import React, { useState, useEffect } from 'react';
import { getQuejas } from '../../../API/QuejasService';
import '../../../../assets/Spinner.css'; 
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function ListadoGeneral() {
  const [quejas, setQuejas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({petitions: 'getquejas', type: 'all', status: 'pending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Podría ser también un estado si el usuario lo puede cambiar

  useEffect(() => {
      const fetchQuejas = async () => {
          setIsLoading(true);
          setError(null); // Limpiar errores anteriores
          try {
              // Aquí, asumo que getQuejas puede tomar parámetros para filtros y paginación
              const data = await getQuejas(filters, currentPage, itemsPerPage);
              setQuejas(data);
          } catch (err) {
              setError('Hubo un error al cargar las quejas.');
              console.error('Error fetching quejas:', err);
          } finally {
              setIsLoading(false);
          }
      };

      fetchQuejas();
  }, [filters, currentPage, itemsPerPage]); // Este efecto se re-ejecutará cuando cambien estas dependencias

  const handleFilterChange = (event) => {
      setFilters({ ...filters, [event.target.name]: event.target.value });
      setCurrentPage(1); // Volver a la primera página cuando cambian los filtros
  };

  const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
  };

  if (isLoading) {
      toast.success('¡Queja cargadas exitosamente!');
      return <div>Cargando quejas...<div className="spinner-container"><div className="spinner"></div></div></div>;      
  }

  if (error) {
      return <div style={{ color: 'red' }}>Error: {error}</div>;
  }


  return (
    <>
        <ul>
          <li><Link to="/detalle">Detalles</Link></li>
          <li><Link to="/nuevaqueja">Nueva Queja</Link></li>
        </ul>
    <div>
        <h1>Listado de Quejas</h1>

        {/* Si isLoading es true, muestra el spinner */}
        {isLoading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}

        {/* Controles de Filtros */}
        <div>
            <label htmlFor="filterType">Filtrar por Tipo:</label>
            <select id="filterType" name="type" value={filters.type} onChange={handleFilterChange}>
                <option value="all">Todos</option>
                <option value="technical">Técnico</option>
                <option value="billing">Facturación</option>
            </select>

            <label htmlFor="filterStatus">Filtrar por Estado:</label>
            <select id="filterStatus" name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="pending">Pendiente</option>
                <option value="resolved">Resuelto</option>
            </select>
        </div>

        {/* Lista de Quejas */}
        {quejas.length === 0 ? (
            <p>No hay quejas para mostrar.</p>
        ) : (
            <ul>
                {quejas.map(queja => (
                    <li key={queja.id_queja}>
                        <h3>{queja.description_queja}</h3>
                        <p>Tipo: {queja.tipo_queja} - Estado: {queja.estado_queja}</p>
                        <p>{queja.observaciones_internas}</p>
                    </li>
                ))}
            </ul>
        )}

        {/* Controles de Paginación (ejemplo básico) */}
        <div>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
            </button>
            <span> Página {currentPage} </span>
            {/* Aquí deberías tener la lógica para saber la última página */}
            <button onClick={() => handlePageChange(currentPage + 1)}>
                Siguiente
            </button>
        </div>
    </div>
    </>
);

}

export default ListadoGeneral;