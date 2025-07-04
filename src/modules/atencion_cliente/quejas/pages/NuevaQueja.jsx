// Importamos React y hooks necesarios
import React, { useState, useEffect, useCallback } from 'react'; // Importamos useCallback para el debounce
import { createQueja } from '../../../API/QuejasService'; // Asegúrate de la ruta correcta
import { getTiposQueja } from '../../../API/QuejasService'; // Servicio para tipos de queja
import { searchAdjudicatarios } from '../../../API/QuejasService'; // Servicio para adjudicatarios

// Función auxiliar para debounce (evitar muchas peticiones al escribir)
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

function NuevaQueja() {    
    // --- 2. Gestionar el Estado del Formulario ---
    const [formData, setFormData] = useState({
        adjudicatarioId: '',
        adjudicatarioNombre: '', // Para mostrar el nombre en el input
        puestoId: '',
        puestoNombre: '', // Para mostrar el nombre en el input
        tipoQuejaId: '',
        gravedad: '',
        descripcion: '',
    });

    const [isLoading, setIsLoading] = useState(false); // Para el indicador de carga al enviar
    const [formError, setFormError] = useState(null); // Para errores de validación del formulario
    const [apiMessage, setApiMessage] = useState(null); // Para mensajes de éxito o error de la API

    // --- 3. Carga de Datos para Dropdowns y Autocompletados ---
    const [tiposQueja, setTiposQueja] = useState([]); // Opciones para el dropdown de tipos de queja
    const [adjudicatarioResults, setAdjudicatarioResults] = useState([]); // Resultados del autocompletado de adjudicatario
    const [puestoResults, setPuestoResults] = useState([]); // Resultados del autocompletado de puesto/local (si aplica)

    // Estado para saber si se está buscando algo para el autocompletado
    const [isSearchingAdjudicatario, setIsSearchingAdjudicatario] = useState(false);
    const [isSearchingPuesto, setIsSearchingPuesto] = useState(false);


    // useEffect para cargar tipos de queja cuando el componente se monta
    useEffect(() => {
        const fetchTiposQueja = async () => {
            try {
                const data = await getTiposQueja(); // Suponiendo que esta función existe
                setTiposQueja(data);
            } catch (err) {
                console.error('Error al cargar tipos de queja:', err);
                setFormError('No se pudieron cargar los tipos de queja.');
            }
        };
        fetchTiposQueja();
    }, []); // Array de dependencias vacío para que se ejecute solo una vez al montar


    // Lógica de búsqueda de adjudicatarios con debounce
    const handleSearchAdjudicatarios = useCallback(debounce(async (searchTerm) => {
        if (searchTerm.length < 3) { // Solo buscar si hay al menos 3 caracteres
            setAdjudicatarioResults([]);
            setIsSearchingAdjudicatario(false);
            return;
        }
        setIsSearchingAdjudicatario(true);
        try {
            const results = await searchAdjudicatarios(searchTerm); // Suponiendo que esta función existe
            setAdjudicatarioResults(results);
        } catch (err) {
            console.error('Error buscando adjudicatarios:', err);
            setAdjudicatarioResults([]);
        } finally {
            setIsSearchingAdjudicatario(false);
        }
    }, 500), []); // Debounce de 500ms

    // Puedes hacer lo mismo para `searchPuestos` si es necesario
    const handleSearchPuestos = useCallback(debounce(async (searchTerm, adjudicatarioId) => {
        if (searchTerm.length < 3 || !adjudicatarioId) {
            setPuestoResults([]);
            setIsSearchingPuesto(false);
            return;
        }
        setIsSearchingPuesto(true);
        try {
            // Suponiendo una función como esta: searchPuestos(searchTerm, adjudicatarioId)
            // const results = await searchPuestos(searchTerm, adjudicatarioId);
            const results = [{ id: 'p1', name: 'Puesto A' }, { id: 'p2', name: 'Puesto B' }]; // Mock
            setPuestoResults(results);
        } catch (err) {
            console.error('Error buscando puestos:', err);
            setPuestoResults([]);
        } finally {
            setIsSearchingPuesto(false);
        }
    }, 500), []);


    // Manejo de cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'adjudicatarioNombre') {
            handleSearchAdjudicatarios(value);
            // Limpiar ID y resultados de puesto si cambia el adjudicatario
            setFormData(prev => ({ ...prev, adjudicatarioId: '', puestoId: '', puestoNombre: '' }));
            setPuestoResults([]);
        }

        if (name === 'puestoNombre' && formData.adjudicatarioId) {
            handleSearchPuestos(value, formData.adjudicatarioId);
            setFormData(prev => ({ ...prev, puestoId: '' })); // Limpiar ID del puesto al escribir
        }
    };

    // Selección de adjudicatario de los resultados
    const selectAdjudicatario = (adjudicatario) => {
        setFormData(prev => ({
            ...prev,
            adjudicatarioId: adjudicatario.id,
            adjudicatarioNombre: adjudicatario.name
        }));
        setAdjudicatarioResults([]); // Ocultar resultados
    };

    // Selección de puesto/local de los resultados
    const selectPuesto = (puesto) => {
        setFormData(prev => ({
            ...prev,
            puestoId: puesto.id,
            puestoNombre: puesto.name
        }));
        setPuestoResults([]); // Ocultar resultados
    };


    // --- 4. Manejo del Envío del Formulario ---
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar el recargo de la página

        setFormError(null); // Limpiar errores previos
        setApiMessage(null); // Limpiar mensajes de API previos

        // Validaciones básicas en el frontend
        if (!formData.adjudicatarioId || !formData.tipoQuejaId || !formData.gravedad || !formData.descripcion) {
            setFormError('Todos los campos marcados con * son obligatorios.');
            return;
        }
        if (formData.descripcion.length < 10) {
            setFormError('La descripción debe tener al menos 10 caracteres.');
            return;
        }
        // Puedes añadir más validaciones aquí (ej. formato de IDs, etc.)

        setIsLoading(true); // Mostrar indicador de carga

        try {
            // Prepara los datos a enviar
            const quejaData = {
                adjudicatarioId: formData.adjudicatarioId,
                puestoId: formData.puestoId || null, // Puesto puede ser opcional
                tipoQuejaId: formData.tipoQuejaId,
                gravedad: formData.gravedad,
                descripcion: formData.descripcion,
                // Puedes añadir otros campos como userId, fecha, etc. si el backend los espera
            };

            const response = await createQueja(quejaData); // Llama a tu servicio para crear la queja

            setApiMessage({ type: 'success', message: '¡Queja registrada con éxito!' });
            // Redirige al usuario. En una aplicación real, usarías `react-router-dom`
            // Por ejemplo: history.push(`/quejas/${response.id}`);
            console.log('Queja creada:', response);
            // Opcional: Limpiar el formulario
            setFormData({
                adjudicatarioId: '',
                adjudicatarioNombre: '',
                puestoId: '',
                puestoNombre: '',
                tipoQuejaId: '',
                gravedad: '',
                descripcion: '',
            });
            setAdjudicatarioResults([]);
            setPuestoResults([]);

        } catch (err) {
            console.error('Error al registrar la queja:', err);
            const errorMessage = err.response?.data?.message || 'Error al registrar la queja. Inténtalo de nuevo.';
            setApiMessage({ type: 'error', message: errorMessage });
        } finally {
            setIsLoading(false); // Ocultar indicador de carga
        }
    };


    return (
        <div>
            <h1>Registrar Nueva Queja</h1>

            {/* Mensajes de API (éxito o error) */}
            {apiMessage && (
                <div style={{ color: apiMessage.type === 'success' ? 'green' : 'red', marginBottom: '15px' }}>
                    {apiMessage.message}
                </div>
            )}

            {/* Errores de validación del formulario */}
            {formError && (
                <div style={{ color: 'orange', marginBottom: '15px' }}>
                    {formError}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Campo Adjudicatario con Autocompletado */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="adjudicatarioNombre">Adjudicatario:*</label>
                    <input
                        type="text"
                        id="adjudicatarioNombre"
                        name="adjudicatarioNombre"
                        value={formData.adjudicatarioNombre}
                        onChange={handleChange}
                        placeholder="Buscar adjudicatario por nombre..."
                        disabled={isLoading}
                    />
                    {isSearchingAdjudicatario && <div>Buscando...</div>}
                    {adjudicatarioResults.length > 0 && (
                        <ul style={{ listStyle: 'none', padding: 0, border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto' }}>
                            {adjudicatarioResults.map(adj => (
                                <li key={adj.id} onClick={() => selectAdjudicatario(adj)} style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>
                                    {adj.name} (ID: {adj.id})
                                </li>
                            ))}
                        </ul>
                    )}
                    {formData.adjudicatarioId && (
                        <p>Adjudicatario Seleccionado: <strong>{formData.adjudicatarioNombre}</strong> (ID: {formData.adjudicatarioId})</p>
                    )}
                </div>

                {/* Campo Puesto/Local con Autocompletado (solo si hay adjudicatario seleccionado) */}
                {formData.adjudicatarioId && (
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="puestoNombre">Puesto/Local:</label>
                        <input
                            type="text"
                            id="puestoNombre"
                            name="puestoNombre"
                            value={formData.puestoNombre}
                            onChange={handleChange}
                            placeholder="Buscar puesto/local..."
                            disabled={isLoading}
                        />
                        {isSearchingPuesto && <div>Buscando...</div>}
                        {puestoResults.length > 0 && (
                            <ul style={{ listStyle: 'none', padding: 0, border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto' }}>
                                {puestoResults.map(puesto => (
                                    <li key={puesto.id} onClick={() => selectPuesto(puesto)} style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>
                                        {puesto.name} (ID: {puesto.id})
                                    </li>
                                ))}
                            </ul>
                        )}
                        {formData.puestoId && (
                            <p>Puesto Seleccionado: <strong>{formData.puestoNombre}</strong> (ID: {formData.puestoId})</p>
                        )}
                    </div>
                )}

                {/* Dropdown de Tipo de Queja */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="tipoQuejaId">Tipo de Queja:*</label>
                    <select
                        id="tipoQuejaId"
                        name="tipoQuejaId"
                        value={formData.tipoQuejaId}
                        onChange={handleChange}
                        disabled={isLoading}
                    >
                        <option value="">Seleccione un tipo</option>
                        {tiposQueja.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>{tipo.name}</option>
                        ))}
                    </select>
                </div>

                {/* Dropdown de Gravedad */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="gravedad">Gravedad:*</label>
                    <select
                        id="gravedad"
                        name="gravedad"
                        value={formData.gravedad}
                        onChange={handleChange}
                        disabled={isLoading}
                    >
                        <option value="">Seleccione la gravedad</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                        <option value="critica">Crítica</option>
                    </select>
                </div>

                {/* Campo Descripción */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="descripcion">Descripción:*</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Detalle su queja aquí..."
                        disabled={isLoading}
                    ></textarea>
                </div>

                {/* Botón de Envío */}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Registrando Queja...' : 'Registrar Queja'}
                </button>
            </form>
        </div>
    );
}

export default NuevaQueja;