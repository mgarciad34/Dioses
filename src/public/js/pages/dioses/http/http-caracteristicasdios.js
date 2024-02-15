function obtenerPoder() {
    console.log('Obtener poder...');
}

function cargarDatosUsuarios() {
    var token = sessionStorage.getItem('token');
    var usuario = sessionStorage.getItem('usuario');

    var apiUrl;
    switch (usuario) {
        case 'Zeus':
            apiUrl = 'http://127.0.0.1:8000/api/dioses/obtener/dios/1';
            break;
        case 'Poseidon':
            apiUrl = 'http://127.0.0.1:8000/api/dioses/obtener/dios/2';
            break;
        case 'Hades':
            apiUrl = 'http://127.0.0.1:8000/api/dioses/obtener/dios/3';
            break;
        default:
            apiUrl = 'http://127.0.0.1:8000/api/dioses/obtener/dios';
    }

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta completa de la API:', data);
            if (data) {
                document.getElementById('sabiduria').value = data.sabiduria || '';
                document.getElementById('nobleza').value = data.nobleza || '';
                document.getElementById('virtud').value = data.virtud || '';
                document.getElementById('maldad').value = data.maldad || '';
                document.getElementById('audacia').value = data.audacia || '';

                var resultadoDom = document.getElementById('resultadoDom');
            } else {
                console.error('Error: La propiedad "data" no está presente en la respuesta de la API.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', cargarDatosUsuarios);

async function actualizarDatos() {
    try {
        var token = sessionStorage.getItem('token');
        var usuario = sessionStorage.getItem('usuario');
        var idUsuario;

        switch (usuario) {
            case 'Zeus':
                idUsuario = 1;
                break;
            case 'Poseidon':
                idUsuario = 2;
                break;
            case 'Hades':
                idUsuario = 3;
                break;
            default:
                console.error('No se pudo determinar el ID del usuario.');
                return;
        }

        var apiUrl = 'http://127.0.0.1:8000/api/dioses/actualizar/dios';

        // Obtén los valores actualizados de los campos de input
        var sabiduria = document.getElementById('sabiduria').value;
        var nobleza = document.getElementById('nobleza').value;
        var virtud = document.getElementById('virtud').value;
        var maldad = document.getElementById('maldad').value;
        var audacia = document.getElementById('audacia').value;

        var datosActualizados = {
            id: idUsuario,
            sabiduria: sabiduria,
            nobleza: nobleza,
            virtud: virtud,
            maldad: maldad,
            audacia: audacia
        };

        const respuesta = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(datosActualizados)
        });

        if (!respuesta.ok) {
            throw new Error(`Error de red: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        console.log('Respuesta de la API al actualizar datos:', data);

        var resultadoDom = document.getElementById('resultadoDom');
        window.location.href = "./dashboarddios.html";
        
    } catch (error) {
        console.error('Error al enviar los datos:', error.message);
    }
}