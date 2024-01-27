
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
    var usuario = sessionStorage.getItem('usuario');

    var apiUrl;
    switch (usuario) {
        case 'Zeus':
            apiUrl = 'http://127.0.0.1:8000/api/dioses/recuperar/humanos/1';
            break;
        case 'Poseidon':
            apiUrl = 'http://127.0.0.1:8000/api/dioses/recuperar/humanos/2';
            break;
        case 'Hades':
            apiUrl = 'http://127.0.0.1:8000/api/dioses/recuperar/humanos/3';
            break;
        default:
            apiUrl = 'http://127.0.0.1:8000/api/dioses/recuperar/humanos';
    }

    // Realiza la petición a la API incluyendo el token
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.data)
            // Limpia las opciones actuales del select de usuarios
            usuariosSelect.innerHTML = '';

            // Procesa los datos recibidos y llena el select de usuarios
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

function asignarPrueba() {
    var usuariosSeleccionadosSelect = document.getElementById('usuariosSeleccionados');
    var tipoPruebaSelect = document.getElementById('tipoPrueba');
    var pruebaSelect = document.getElementById('prueba');
    var token = sessionStorage.getItem('token');
  
    // Obtener todos los valores seleccionados
    var selectedValues = [];
    for (var i = 0; i < usuariosSeleccionadosSelect.options.length; i++) {
      selectedValues.push(usuariosSeleccionadosSelect.options[i].value);
    }
  
    // Mostrar los valores por consola
    console.log("Usuarios seleccionados:", selectedValues);
  
    // Verificar que haya usuarios seleccionados
    if (selectedValues.length === 0) {
      console.log("No hay usuarios seleccionados para asignar la prueba.");
      return;
    }
  
    // Obtener el valor del tipo de prueba y la prueba seleccionada
    var tipoPruebaValue = tipoPruebaSelect.value;
    var pruebaValue = pruebaSelect.value;
  
    // Realizar la petición POST a la API para cada usuario seleccionado
    selectedValues.forEach(function (usuarioId) {
      var dataToSend = {
        humano_id: usuarioId,
        tipo_prueba: tipoPruebaValue,
        prueba_id: pruebaValue,
      };
  
      // Mostrar por consola los datos que se van a enviar
      console.log("Datos a enviar:", dataToSend);
  
      // Realizar la solicitud POST para cada usuario seleccionado
      fetch('http://127.0.0.1:8000/api/dioses/asignar/prueba', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(dataToSend),
      })
        .then(response => {
          // Verificar si la respuesta es un error antes de intentar convertirla a JSON
          if (!response.ok) {
            console.error('Error en la solicitud:', response.status, response.statusText);
            throw new Error('Error en la solicitud: ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          // Manejar la respuesta de la API según tus necesidades
          console.log("Respuesta de la API para humano_id", usuarioId, ":", data);
        })
        .catch((error) => {
          console.error('Error al enviar la prueba para humano_id', usuarioId, ':', error);
        });
    });
  
    // Limpiar y recargar el select de Usuarios disponibles
    cargarDatosUsuarios();
    // Limpiar la lista de usuarios seleccionados después de asignar la prueba
    usuariosSeleccionadosSelect.innerHTML = '';
  }
  