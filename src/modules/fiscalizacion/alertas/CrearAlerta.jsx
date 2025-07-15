import React, { useState, useEffect } from 'react';
import { getTipoAlertas,getAdjudicatarios } from '../../API/UseAlertas';
import '../../../assets/Spinner.css'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function CrearAlerta() {
    const fechaActual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        tipoAlerta: '',
        adjudicatorio: '',
        fechaGeneracion: fechaActual,
        fechaResolucion: '',
        puesto: '',
        descripcion: '',
        estado: 'pending', 
        generadaPor: '' 
  });

  const [listTipos, setListTipos] = useState([]);
  const [listAdjudicatarios, setListAdjudicatarios] = useState([]);

  useEffect(()=>{
    const loadListTipos = async () =>{
        try{
            const datos = await getTipoAlertas();
            setListTipos(datos);
        }
        catch (err){
            console.log(`Error al consultar Servidor ${err}`);
            setError(`Error al consultar Servidor ${err}`);
        }
    };

    const loadListAdjudicatarios = async () =>{
        try{
            const datos = await getAdjudicatarios();
            setListAdjudicatarios(datos);
        }
        catch (err){
            console.log(`Error al consultar Servidor ${err}`);
            setError(`Error al consultar Servidor ${err}`);
        }

    };
    loadListTipos();
    loadListAdjudicatarios();
  },[isLoading]);

  const styleh1 = {
    backgroundColor: '#f0f0f0'
  }

  if (isLoading) {
    return <div>Cargando datos...<div className="spinner-container"><div className="spinner"></div></div></div>;
  }

  if (error) {
    toast.error(`Error: ${error}`);
  }

  const handleChangeTipoAlerta = (e) => {
    setFormData({ ...formData, tipoAlerta: e.target.value });
  };

  return (
    <>
      <ul>
        <li><Link to="/fiscalizacion/alertas">Lista de Alertas</Link></li>
        <li><Link to="/fiscalizacion/tipoalerta">Crear Tipo de Alertas</Link></li>
        <li><Link to="/fiscalizacion/adjudicatario">Crear Adjudicatario</Link></li>
      </ul>
    <div>
      <h1 style={styleh1}>Crear Una Nueva Alerta</h1>
      <form>
        <label htmlFor="tipoAlerta">Tipo de Alerta:</label>        
        <select
        id='tipoAlerta'
        value={formData.tipoAlerta}
        onChange={handleChangeTipoAlerta}
        >
        {listTipos.length === 0 ? (
            <option value={null}>No hay Datos</option>
            ) : (
            listTipos.map(item => (
                <option value={item.id_tipo_alerta} key={item.id_tipo_alerta}>{item.nombre_tipo_alerta}</option>
            ))
        )}
        </select>
        <br/>
        <label htmlFor='adjudicatario'>Adjudicatario</label>
        <input
        type='text'
        list='listAdjudicatarios'
        id='adjudicatario'
        value={formData.adjudicatorio}        
        />
        <datalist id="listAdjudicatarios">
        {listAdjudicatarios.length === 0 ? (
            <option value={null}>No hay Datos</option>
            ) : (
            listAdjudicatarios.map(item => (
                <option value={item.numero_documento} key={item.numero_documento}>{item.razon_social_nombre}</option>
            ))
        )}
        </datalist>
    </form>
    </div>
    </>
  );
}

export default CrearAlerta;