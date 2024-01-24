async function obtenerDatos(tablaId) {
    try {
        const respuesta = await fetch('http://127.0.0.1:8000/api/dioses/recuperar/pruebas/libre', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        });

        if (!respuesta.ok) {
            throw new Error(`Error de red: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        console.log(datos);

        // Aquí puedes procesar los datos y actualizar la tabla
        updateTable(datos, tablaId);
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
}


function updateTable(datos, tablaId) {
    var tabla = document.getElementById(tablaId);

    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    datos.forEach((item, index) => {
        var fila = tabla.insertRow(-1);

        for (var clave in item) {
            var celda = fila.insertCell(-1);
            celda.innerHTML = item[clave];
        }
    });
}
