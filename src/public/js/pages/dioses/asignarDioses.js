
document.getElementById('tipoPrueba').addEventListener('change', cargarDatosPrueba);

function cargarDatosPrueba() {
    var tipoPrueba = document.getElementById('tipoPrueba').value;
    var pruebaSelect = document.getElementById('prueba');
    var token = sessionStorage.getItem('token');

    // Verificar que se haya seleccionado un tipo de prueba
    if (!tipoPrueba) {
        alert('Por favor, selecciona un tipo de prueba.');
        return;
    }

    // Ajusta la URL de la API según tu caso
    var apiUrl = '';

    // Realizar la petición a la API en función del tipo de prueba seleccionada
    if (tipoPrueba === 'libre') {
        apiUrl = 'http://127.0.0.1:8000/api/dioses/recuperar/pruebas/libre';
    } else if (tipoPrueba === 'eleccion') {
        apiUrl = 'http://127.0.0.1:8000/api/dioses/recuperar/pruebas/eleccion';
    } else if (tipoPrueba === 'valoracion') {
        apiUrl = 'http://127.0.0.1:8000/api/dioses/recuperar/pruebas/valoracion';
    }

    // Limpiar opciones actuales del select de prueba
    pruebaSelect.innerHTML = '';

    // Hacer la petición a la API incluyendo el token
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.data)
            for (var i = 0; i < data.data.length; i++) {
                var option = document.createElement("option");
                option.text = data.data[i].pregunta;
                option.value = data.data[i].id;
                pruebaSelect.add(option);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function cargarDatosUsuarios() {
    var usuariosSelect = document.getElementById('usuarios');
    var token = sessionStorage.getItem('token');

    // Ajusta la URL de la API según tu caso
    var apiUrl = 'http://127.0.0.1:8000/api/dioses/recuperar/humanos';

    // Hacer la petición a la API incluyendo el token
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.data)
            // Limpiar opciones actuales del select de usuarios
            usuariosSelect.innerHTML = '';

            // Procesar los datos recibidos y llenar el select de usuarios
            for (var i = 0; i < data.data.length; i++) {
                var option = document.createElement("option");
                option.text = data.data[i].nombre;
                option.value = data.data[i].id;
                usuariosSelect.add(option);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', cargarDatosUsuarios);

function agregarUsuario() {
    var usuariosSelect = document.getElementById('usuarios');
    var usuariosSeleccionadosSelect = document.getElementById('usuariosSeleccionados');

    // Mover usuarios seleccionados de la lista de usuarios a la lista de usuarios seleccionados
    moveSelectedOptions(usuariosSelect, usuariosSeleccionadosSelect);
}

function quitarUsuario() {
    var usuariosSelect = document.getElementById('usuarios');
    var usuariosSeleccionadosSelect = document.getElementById('usuariosSeleccionados');

    // Mover usuarios seleccionados de la lista de usuarios seleccionados a la lista de usuarios
    moveSelectedOptions(usuariosSeleccionadosSelect, usuariosSelect);
}

function seleccionarTodos() {
    var usuariosSelect = document.getElementById('usuarios');
    var usuariosSeleccionadosSelect = document.getElementById('usuariosSeleccionados');
    var btnSeleccionarTodos = document.getElementById('btnSeleccionarTodos');

    // Mover todos los usuarios de la lista de usuarios a la lista de usuarios seleccionados
    moveAllOptions(usuariosSelect, usuariosSeleccionadosSelect);

    // Cambiar el texto del botón a "Deseleccionar Todas"
    btnSeleccionarTodos.textContent = 'Deseleccionar Todas';
    // Asignar la nueva función al botón
    btnSeleccionarTodos.onclick = deseleccionarTodos;
}

function deseleccionarTodos() {
    var usuariosSelect = document.getElementById('usuarios');
    var usuariosSeleccionadosSelect = document.getElementById('usuariosSeleccionados');
    var btnSeleccionarTodos = document.getElementById('btnSeleccionarTodos');

    // Mover todos los usuarios seleccionados de la lista de usuarios seleccionados a la lista de usuarios
    moveAllOptions(usuariosSeleccionadosSelect, usuariosSelect);

    // Cambiar el texto del botón a "Seleccionar Todas"
    btnSeleccionarTodos.textContent = 'Seleccionar Todas';
    // Asignar la nueva función al botón
    btnSeleccionarTodos.onclick = seleccionarTodos;
}

function moveSelectedOptions(sourceSelect, destinationSelect) {
    // Mover opciones seleccionadas de la fuente al destino
    for (var i = 0; i < sourceSelect.options.length; i++) {
        if (sourceSelect.options[i].selected) {
            var option = sourceSelect.options[i].cloneNode(true);
            destinationSelect.add(option);
            sourceSelect.remove(i);
            i--; // Ajustar el índice después de la eliminación
        }
    }
}

function moveAllOptions(sourceSelect, destinationSelect) {
    // Mover todas las opciones de la fuente al destino
    for (var i = 0; i < sourceSelect.options.length; i++) {
        var option = sourceSelect.options[i].cloneNode(true);
        destinationSelect.add(option);
    }
    // Limpiar la fuente después de mover todas las opciones
    sourceSelect.innerHTML = '';
}