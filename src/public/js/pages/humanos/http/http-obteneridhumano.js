export function obtenerIdHumano(url, metodo) {
    var token = sessionStorage.getItem('token');
    if (!token) {
        console.error('Token no encontrado en el sessionStorage.');
        return Promise.reject(new Error('Token no encontrado en el sessionStorage.'));
    }

    // Obtener el correo electrónico del sessionStorage
    var correo = sessionStorage.getItem('correo');
    if (!correo) {
        console.error('Correo no encontrado en el sessionStorage.');
        return Promise.reject(new Error('Correo no encontrado en el sessionStorage.'));
    }

    // Construir la URL con el correo electrónico
    var urlConCorreo = url + '/' + encodeURIComponent(correo);

    var opciones = {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    // Si el método es GET, no incluir el cuerpo de la solicitud
    if (metodo === 'GET') {
        delete opciones.headers['Content-Type'];
    }

    return fetch(urlConCorreo, opciones)
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error('Error en la petición: ' + respuesta.status);
            }
            return respuesta.json();
        })
        .catch(function (error) {
            console.error('Error al hacer la petición:', error);
            throw error; // Propagar el error para que el código de llamada pueda manejarlo
        });
}
