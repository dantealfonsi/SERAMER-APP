import React, { useState, useEffect } from 'react';
import { getAdjudicatarios,addAdjudicatarios } from '../../API/UseAlertas';
import '../../../assets/Spinner.css'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function CrearAdjudicatario() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [listAdjudicatarios, setListAdjudicatarios] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [elementosPorPagina, setElementosPorPagina] = useState(10);     
    const [edit, setEdit] = useState(false);

    const DOCUMENT_TYPES = {
    JURIDICO: 'J',
    GOBIERNO: 'G', 
    EXTRANJERO: 'E',
    VENEZOLANO: 'V',
    };  

    const [formData, setFormData] = useState({
        tipoDocumento: DOCUMENT_TYPES.VENEZOLANO,
        numeroDocumento: '',
        nombreRazonSocial: '',
        apellido: '',
        telefono: '',
        email: '',
        direccion:'',
        solvenciaFinanciera: false,
        esPersonaJuridica: false,
        nombreRepresentanteLegal:'',
        fechaRegistro:'',
        activo: false
  });

const styleh1 = {
    backgroundColor: '#f0f0f0'
}

useEffect(() => {
    const fetchListAdjudicatarios = async ()=>{
        try {
            const data = await getAdjudicatarios(); // Suponiendo que esta función existe
            setListAdjudicatarios(data);
        } catch (err) {
            console.error('Error al cargar tipos de queja:', err);
            setError('No se pudieron cargar los tipos de queja.');
        }
    };

    fetchListAdjudicatarios();

},[isLoading]);

if (isLoading) {
    return <div>Cargando datos...<div className="spinner-container"><div className="spinner"></div></div></div>;
}

if (error) {
    toast.error(`Error: ${error}`);
}

  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const datosPaginaActual = listAdjudicatarios.slice(indicePrimerElemento, indiceUltimoElemento);

  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(listAdjudicatarios.length / elementosPorPagina);

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

  const handleChange = (event) =>{
    setFormData({ ...formData, tipoDocumento: event.target.value });
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
    if(!formData.numeroDocumento || 
      !formData.nombreRazonSocial ||
      !formData.telefono ||
      !formData.nombreRepresentanteLegal
    ){
        setError('los campos son obligatorios...');
        return;
    }
    setIsLoading(true);
    try {
        let solvencia = 0;
        let personaJuridica = 0;
        let activo = 0;

        if (formData.solvenciaFinanciera === true){
            solvencia = 1;
        }
        else if (formData.esPersonaJuridica === true){
            personaJuridica = 1;
        }
        else if (formData.activo === true){
            activo = 1;
        }

        const tipoData = {
          tipoDocumento: formData.tipoDocumento,
          numeroDocumento: formData.numeroDocumento,
          nombreRazonSocial: formData.nombreRazonSocial,
          apellido: formData.apellido,
          telefono: formData.telefono,
          correo: formData.email,
          direccion: formData.direccion,
          solvenciaFinanciera: solvencia,
          esPersonaJuridica: personaJuridica,
          nombreRepresentanteLegal:formData.nombreRepresentanteLegal,
          fechaRegistro: formData.fechaRegistro,
          activo: activo
        }
        
        const response = await addAdjudicatarios(tipoData);

        if(!edit){
            toast.info(response.message);
        }
        else{
            toast.info("Datos Actualizados...");
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
      <h1 style={styleh1}>Crear Adjudicatario</h1>
      <form style={{background:'teal', padding:'10px'}} onSubmit={handleSubmit}>
        <label htmlFor="numeroDocumento">* Numero Documento:</label>        
        <select id='tipoDocumento' value={formData.tipoDocumento} onChange={handleChange}>
          {Object.values(DOCUMENT_TYPES).map((type) =>(
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input
            type="text" 
            name="numeroDocumento" 
            id="numeroDocumento" 
            readOnly = {edit}
            value={formData.numeroDocumento} 
            onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })}
            />
        <br />
        <label htmlFor="nombre">* Razon Social (Nombre):</label>      
        <input
            type="text" 
            name="nombre" 
            id="nombre" 
            value={formData.nombreRazonSocial} 
            onChange={(e) => setFormData({ ...formData, nombreRazonSocial: e.target.value })}
            />
        <br />
        <label htmlFor="apellido">Apellido:</label>      
        <input
            type="text" 
            name="apellido" 
            id="apellido" 
            value={formData.apellido} 
            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
            />
        <br />
        <label htmlFor="telefono">* Telefono:</label>      
        <input
            type="text" 
            name="telefono" 
            id="telefono" 
            value={formData.telefono} 
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            />
        <br />        
        <label htmlFor="correo">Correo:</label>      
        <input
            type="email" 
            name="correo" 
            id="correo" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
        <br /> 
        <label htmlFor="direccion">Direccion Fiscal:</label>      
        <input
            type="text" 
            name="direccion" 
            id="direccion" 
            value={formData.direccion} 
            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
            />
        <br />
        <label htmlFor="solvencia">Solvencia Financiera:</label>      
        <input
            type="checkbox" 
            name="solvencia" 
            id="solvencia" 
            checked={formData.solvenciaFinanciera || false} 
            onChange={(e) => setFormData({ ...formData, solvenciaFinanciera: e.target.checked })}
            />
        <br />
        <label htmlFor="personaJuridica">Es Persona Juridica:</label>      
        <input
            type="checkbox" 
            name="personaJuridica" 
            id="personaJuridica" 
            checked={formData.esPersonaJuridica || false} 
            onChange={(e) => setFormData({ ...formData, esPersonaJuridica: e.target.checked })}
            />
        <br />        
        <label htmlFor="representante">* Representante Legal:</label> 
        <input
            type="text" 
            name="representante" 
            id="representante" 
            value={formData.nombreRepresentanteLegal} 
            onChange={(e) => setFormData({ ...formData, nombreRepresentanteLegal: e.target.value })}
            />
        <br />
        <label htmlFor="fechaRegistro">Fecha del Registro:</label> 
        <input
            type="date" 
            name="fechaRegistro" 
            id="fechaRegistro" 
            value={formData.fechaRegistro} 
            onChange={(e) => setFormData({ ...formData, fechaRegistro: e.target.value })}
            />
        <br />        
        <label htmlFor="activo">Activo:</label>      
        <input
            type="checkbox" 
            name="activo" 
            id="activo" 
            checked={formData.activo || false} 
            onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
            />
        <div style={{marginTop: '18px'}} />
        <button type="submit" disabled = {isLoading} > {edit ? "Actualizar" : "Crear Nuevo"}</button>
        <br />
        <br /> 
        <button type="reset" onClick={() => {setFormData({
          tipoDocumento: DOCUMENT_TYPES.VENEZOLANO,
          numeroDocumento: '',
          nombreRazonSocial: '',
          apellido: '',
          telefono: '',
          email: '',
          direccion:'',
          solvenciaFinanciera: false,
          esPersonaJuridica: false,
          nombreRepresentanteLegal:'',
          fechaRegistro:'',
          activo: false }); setEdit(false)}}>{edit ? "Cancelar" : "Limpiar"}</button>
     </form>
    </div>
    <div>
      <h3 style={styleh1}>Adjudicatarios Registrados</h3>
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
      {listAdjudicatarios.length === 0 ? (<p>No hay Datos</p>):(
        <ul>
            {datosPaginaActual.map( list => (
                <li style={{background:'lightblue',padding:'5px', margin:'2px'}} key={list.id_tipo_alerta}>
                    <h3>{`${list.razon_social_nombre} ${list.apellido}`}</h3>
                    <p><b>Datos:</b>{`${list.tipo_documento}-${list.numero_documento} <br>Telf. ${list.telefono}`}</p>
                    <button onClick={() => handleEdit(list)}>Editar</button>
                </li>
            ))}    
        </ul>    
        )}

    </div>
    </>
  );
}

export default CrearAdjudicatario;