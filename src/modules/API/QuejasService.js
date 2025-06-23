/*
service para manejar las quejas
Este servicio se encarga de realizar las peticiones a la API para obtener, crear y asignar quejas.
*/
const HOST ="http://www.localhost/SERAMER-PLATFORM/server.php";


async function getQuejas(filtros = {}) {
    const queryParams = new URLSearchParams(filtros).toString();
    const url = queryParams ? `${HOST}?${queryParams}` : HOST;
    return await fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
}

async function getQuejaById(id = '') {
    const queryParams = new URLSearchParams(id).toString();
    const url = queryParams ? `${HOST}?${queryParams}` : HOST;
    return await fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
}

async function createQueja(datosQueja = {}) {
    const response = await fetch(HOST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosQueja)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

async function assignResponsable(idQueja, responsableId) {
    const datosQueja = {
        responsableId: responsableId,
        idQueja: idQueja
    };

    const response = await fetch(HOST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosQueja)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

async function updateQuejaStatus(idQueja, nuevoEstado) {
    const datosQueja = {
        nuevoEstado: nuevoEstado,
        idQueja: idQueja
    };

    const response = await fetch(HOST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosQueja)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

async function addSeguimiento(idQueja, datosSeguimiento)  {
    const datosQueja = {
        datosSeguimiento: datosSeguimiento,
        idQueja: idQueja
    };

    const response = await fetch(HOST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosQueja)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

async function resolveQueja(idQueja, solucionPropuesta)  {
    const datosQueja = {
        solucionPropuesta: solucionPropuesta,
        idQueja: idQueja
    };

    const response = await fetch(HOST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosQueja)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

async function escalateToInfraction(idQueja, datosInfraccion)  {
    const datosQueja = {
        datosInfraccion: datosInfraccion,
        idQueja: idQueja
    };

    const response = await fetch(HOST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosQueja)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

async function getTiposQueja() {
    return await fetch(`${HOST}?petitions=tipos`) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
}

async function getResponsables() {
    return await fetch(`${HOST}/responsables`) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
}

async function getTiposInfraccion() {
    return await fetch(`${HOST}/tipos-infraccion`) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
}

async function searchAdjudicatarios(query) {
    const queryParams = new URLSearchParams(query).toString();
    const url = queryParams ? `${HOST}?${queryParams}` : HOST;
    return await fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
}

export { getQuejas, 
    getQuejaById, 
    createQueja, 
    assignResponsable, 
    updateQuejaStatus, 
    addSeguimiento, 
    resolveQueja, 
    escalateToInfraction, 
    getTiposQueja,
    getResponsables,
    getTiposInfraccion,
    searchAdjudicatarios };