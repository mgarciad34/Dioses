// tuarchivo2.js

async function loadTable(tableName) {
    var tableContainer = document.getElementById("tablaContainer");
    tableContainer.innerHTML = "";

    // Verificamos si la tabla seleccionada es 'tabla2'
    if (tableName !== "tabla2") {
        // Ocultamos la tabla para otras opciones
        tableContainer.classList.add("hidden");
        return; // Salimos de la función para evitar cargar datos innecesarios
    }

    // Mostramos la tabla si es 'tabla2'
    tableContainer.classList.remove("hidden");

    try {
        // Aquí puedes colocar la lógica para obtener datos específicos de 'tabla2'
        var token = sessionStorage.getItem("token");

        if (!token) {
            console.error("Token no encontrado en sessionStorage");
            return;
        }

        var requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        // Actualiza la URL de la API según sea necesario
        var apiUrl = "http://127.0.0.1:8000/api/dioses/recuperar/pruebas/eleccion";
        var response = await fetch(apiUrl, requestOptions);

        if (response.ok) {
            var data = await response.json();
            
            // Agregamos un console.log para mostrar los datos recibidos
            console.log("Datos recibidos desde la API:", data);

            // Continúa con la lógica de procesamiento de datos aquí
            var table = document.createElement("table");
            table.classList.add("table");

            var thead = document.createElement("thead");
            var headerRow = document.createElement("tr");

            var headers = ["Pregunta", "Respuesta1", "Respuesta2", "Correcta"];

            headers.forEach(function (headerText) {
                var th = document.createElement("th");
                th.appendChild(document.createTextNode(headerText));
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            var tbody = document.createElement("tbody");

            if (Array.isArray(data.data) && data.data.length > 0) {
                data.data.forEach(function (rowData) {
                    var row = document.createElement("tr");

                    headers.forEach(function (header) {
                        var cell = document.createElement("td");
                        cell.appendChild(document.createTextNode(rowData[header.toLowerCase()]));
                        row.appendChild(cell);
                    });

                    tbody.appendChild(row);
                });
            } else {
                console.error("Los datos recibidos no son válidos:", data);
            }

            table.appendChild(tbody);
            tableContainer.appendChild(table);

        } else {
            console.error("Error en la solicitud a la API:", response.status);
        }
    } catch (error) {
        console.error("Error al cargar datos desde la API:", error);
    }
}
