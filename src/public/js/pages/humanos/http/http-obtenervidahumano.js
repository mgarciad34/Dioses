export function obtenerVida(id) {
    var token = sessionStorage.getItem('token');
    if (!token) {
        console.error('Token no encontrado en el sessionStorage.');
        return Promise.reject(new Error('Token no encontrado en el sessionStorage.'));
    }

    var url = 'http://127.0.0.1:8000/api/humano/obtener/vida/' + id;
    var opciones = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    return fetch(url, opciones)
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
