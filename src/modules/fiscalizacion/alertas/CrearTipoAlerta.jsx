import React, { useState, useEffect } from 'react';
import { getTipoAlertas,addTipoAlerta } from '../../API/UseAlertas';
import '../../../assets/Spinner.css'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function CrearTipoAlerta() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [listTipos, setListTipos] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [elementosPorPagina, setElementosPorPagina] = useState(10);     
    const [edit, setEdit] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        auto: false,
        dias: 7
  });


const styleh1 = {
    backgroundColor: '#f0f0f0'
}

useEffect(() => {
    const fetchListTipos = async ()=>{
        try {
            const data = await getTipoAlertas(); // Suponiendo que esta función existe
            setListTipos(data);
        } catch (err) {
            console.error('Error al cargar tipos de queja:', err);
            setError('No se pudieron cargar los tipos de queja.');
        }
    };

    fetchListTipos();

},[isLoading]);

if (isLoading) {
    return <div>Cargando datos...<div className="spinner-container"><div className="spinner"></div></div></div>;
}

if (error) {
    toast.error(`Error: ${error}`);
}

  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const datosPaginaActual = listTipos.slice(indicePrimerElemento, indiceUltimoElemento);

  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(listTipos.length / elementosPorPagina);

  // Funciones para cambiar de página
  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Manejar el cambio de elementos por página
  const handleChangeElementosPorPagina = (e) => {
    setElementosPorPagina(Number(e.target.value));
    setPaginaActual(1); // Resetear a la primera página al cambiar la cantidad
  };

const handleEdit = (item) => {
    setEdit(true);
    setFormData({ nombre: item.nombre_tipo_alerta, descripcion: item.descripcion, auto: item.escalamiento_automatico, dias: item.dias_para_escalar });
};

const handleSubmit = async (e) =>{
    e.preventDefault();
    setError(null);
    if(!formData.nombre || !formData.descripcion){
        setError('los campos son obligatorios...');
        return;
    }
    setIsLoading(true);
    try {
        let valor = 0;
        if (formData.auto === true){
            valor = 1;
        }
        const tipoData = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            auto: valor,
            dias: formData.dias
        }
        
        const response = await addTipoAlerta(tipoData);

        if(!edit){
            toast.info(response.message);
        }
        else{
            toast.info("Datos ACtualizados...");
        }
        

        setFormData({ nombre: '', descripcion: '', auto: false, dias: 7 });

    } catch (err) {
        console.error('Error al registrar el tipo de alerta:', err);
        const errorMessage = err.response?.data?.message || 'Error al registrar la queja. Inténtalo de nuevo.';
        setError.error(`Error: ${errorMessage}`);
    } finally {
        setIsLoading(false); // Ocultar indicador de carga
        setEdit(false);
    }           

};

return (
    <>
      <ul>
        <li><Link to="/fiscalizacion/alertas">Lista de Alertas</Link></li>
      </ul>
    <div>
      <h1 style={styleh1}>Crear Tipo de Alerta</h1>
      <form style={{background:'teal', padding:'10px'}} onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre de Alerta:</label>      
        <input
            type="text" 
            name="nombre" 
            id="nombre" 
            readOnly = {edit}
            value={formData.nombre} 
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
        <br />
        <label htmlFor="descripcion">Descripcion:</label>      
        <input
            type="text" 
            name="descripcion" 
            id="descripcion" 
            value={formData.descripcion} 
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
        <br />
        <label htmlFor="auto">Escalamiento Automatico:</label>      
        <input
            type="checkbox" 
            name="auto" 
            id="auto" 
            checked={formData.auto || false} 
            onChange={(e) => setFormData({ ...formData, auto: e.target.checked })}
            />
        <br />
        <label htmlFor="dias">Dias para Escalar:</label>      
        <input
            type="number" 
            name="dias" 
            id="dias" 
            min={1}
            value={formData.dias} 
            onChange={(e) => setFormData({ ...formData, dias: parseInt(e.target.value,10) })}
            />
        <div style={{marginTop: '18px'}} />
        <button type="submit" disabled = {isLoading} > {edit ? "Actualizar" : "Crear Tipo de Alerta"}</button>
        <br />
        <br /> 
        <button type="reset" onClick={() => {setFormData({ nombre: '', descripcion: '', auto: false, dias: 7 }); setEdit(false)}}>{edit ? "Cancelar" : "Limpiar"}</button>
     </form>
    </div>
    <div>
      <h3 style={styleh1}>Listado de Tipos de Alerta</h3>
      <div>
        <label htmlFor="elementosPorPagina">Elementos por página:</label>
        <select
          id="elementosPorPagina"
          value={elementosPorPagina}
          onChange={handleChangeElementosPorPagina}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>  
      <div>
        <button onClick={paginaAnterior} disabled={paginaActual === 1}>
          Anterior
        </button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button onClick={paginaSiguiente} disabled={paginaActual === totalPaginas}>
          Siguiente
        </button>

        {/* Opcional: Botones para cada número de página */}
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
          <button
            key={numero}
            onClick={() => irAPagina(numero)}
            disabled={paginaActual === numero}
            style={{ marginLeft: '5px' }}
          >
            {numero}
          </button>
        ))}
      </div>          
      {listTipos.length === 0 ? (<p>No hay Datos</p>):(
        <ul>
            {datosPaginaActual.map( list => (
                <li style={{background:'lightblue',padding:'5px', margin:'2px'}} key={list.id_tipo_alerta}>
                    <h3>{list.nombre_tipo_alerta}</h3>
                    <p>Descripcion: <b>{list.descripcion}</b></p>
                    <button onClick={() => handleEdit(list)}>Editar</button>
                </li>
            ))}    
        </ul>    
        )}

    </div>
    </>
  );
}

export default CrearTipoAlerta;