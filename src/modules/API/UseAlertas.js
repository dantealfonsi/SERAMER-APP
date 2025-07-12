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

export { getAlertasCumplimiento };