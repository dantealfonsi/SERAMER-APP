/*
service para manejar las quejas
Este servicio se encarga de realizar las peticiones a la API para obtener, crear y asignar quejas.
*/

const HOST ="http://www.localhost/SERAMER-PLATFORM/server.php";

function getAlertasCumplimiento(filters, page = 1, itemsPerPage = 10) {
    const url = new URL(HOST);
    url.searchParams.append('petitions', filters.petitions || 'alertas_cumplimiento');
    url.searchParams.append('type', filters.type || 'all');
    url.searchParams.append('status', filters.status || 'pending');
    url.searchParams.append('page', page);
    url.searchParams.append('itemsPerPage', itemsPerPage);

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching alertas:', error);
            throw error;
        });
}

function getTipoAlertas() {
    const url = new URL(HOST);
    url.searchParams.append('petitions', 'tipoAlertas');

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching tipo alertas:', error);
            throw error;
        });
}

function getAdjudicatarios() {
    const url = new URL(HOST);
    url.searchParams.append('petitions', 'listAdjudicatarios');

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching tipo alertas:', error);
            throw error;
        });
}

async function addTipoAlerta(data = {}){
    const parametros = {
        addTipoAlerta: true,
        data: data
    };

    try {
        const response = await fetch(HOST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parametros)
        });

        console.log('Estado de la respuesta:', response.status, response.statusText);

        if (!response.ok) { 
            const errorData = await response.text(); 
            console.error('Error del servidor:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); 
        console.log('Respuesta del servidor:', result); 
        return result;

    } catch (error) {
        console.error('Fallo en la comunicación:', error);
        throw error;
    }
}

async function addAdjudicatarios(params) {
    const parametros = {
        addAdjudicatarios: true,
        data: params
    };

    try {
        const response = await fetch(HOST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parametros)
        });

        console.log('Estado de la respuesta:', response.status, response.statusText);

        if (!response.ok) { 
            const errorData = await response.text(); 
            console.error('Error del servidor:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); 
        console.log('Respuesta del servidor:', result); 
        return result;

    } catch (error) {
        console.error('Fallo en la comunicación:', error);
        throw error;
    }    
}

export { 
    getAlertasCumplimiento, 
    getTipoAlertas, 
    addTipoAlerta,
    getAdjudicatarios,
    addAdjudicatarios
};