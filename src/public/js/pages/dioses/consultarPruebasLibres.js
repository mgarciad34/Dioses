async function loadTable(tableName) {
    var tableContainer = document.getElementById("tablaContainer");
    tableContainer.innerHTML = "";

    // Verificamos si la tabla seleccionada es 'tabla1'
    if (tableName === "tabla1") {
        // Mostramos la tabla si es 'tabla1'
        tableContainer.classList.remove("hidden");
    } else {
        // Ocultamos la tabla para otras opciones
        tableContainer.classList.add("hidden");
        return; // Salimos de la función para evitar cargar datos innecesarios
    }

    var table = document.createElement("table");
    table.classList.add("table");

    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");

    if (tableName === "tabla1") {
        var headers = ["Pregunta", "Asociación"];
    }

    headers.forEach(function (headerText) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(headerText));
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");

    try {
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

        var apiUrl = "http://127.0.0.1:8000/api/dioses/recuperar/pruebas/libre";
        var response = await fetch(apiUrl, requestOptions);

        if (response.ok) {
            var data = await response.json();
            console.log(data.data);

            if (Array.isArray(data.data) && data.data.length > 0) {
                data.data.forEach(function (rowData) {
                    var row = document.createElement("tr");
                    var cell1 = document.createElement("td");
                    var cell2 = document.createElement("td");

                    cell1.appendChild(document.createTextNode(rowData.pregunta));
                    cell2.appendChild(document.createTextNode(rowData.asociacion));

                    row.appendChild(cell1);
                    row.appendChild(cell2);
                    tbody.appendChild(row);
                });
            } else {
                console.error("Los datos recibidos no son válidos:", data);
            }
        } else {
            console.error("Error en la solicitud a la API:", response.status);
        }
    } catch (error) {
        console.error("Error al cargar datos desde la API:", error);
    }

    table.appendChild(tbody);
    tableContainer.appendChild(table);
}
