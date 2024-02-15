document.addEventListener("DOMContentLoaded", function () {
    localStorage.clear();
    const token = sessionStorage.getItem("token");

    const selectFetch = document.getElementById("selectFetch");

    selectFetch.addEventListener("change", function () {
        const id = sessionStorage.getItem("id_humano");
        const selectedValue = selectFetch.value;
        let url = "";

        if (selectedValue === "libres") {
            url = `http://localhost:8000/api/humano/obtener/pruebas/libres/${id}`;
        } else if (selectedValue === "valoracion") {
            url = `http://localhost:8000/api/humano/obtener/pruebas/valoracion/${id}`;
        } else if (selectedValue === "eleccion") {
            url = `http://localhost:8000/api/humano/obtener/pruebas/eleccion/${id}`;
        }

        const resultadoFetch = document.getElementById("resultadoFetch");

        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.length === 0) {
                    resultadoFetch.innerHTML = "<p>No tienes preguntas.</p>";
                } else {
                    const table = document.createElement("table");
                    table.classList.add("table", "table-bordered");

                    const thead = document.createElement("thead");
                    const headerRow = document.createElement("tr");
                    const headers = ["ID", "Pregunta", "Estado"];
                    headers.forEach((headerText) => {
                        const th = document.createElement("th");
                        th.textContent = headerText;
                        headerRow.appendChild(th);
                    });
                    thead.appendChild(headerRow);
                    table.appendChild(thead);

                    const tbody = document.createElement("tbody");

                    data.forEach((item) => {
                        const tr = document.createElement("tr");
                        Object.values(item).forEach((value, index) => {
                            if (index !== 3 && index !== 4) {
                                const td = document.createElement("td");
                                if (index === 2) {
                                    if (value === 0) {
                                        td.textContent = "Superado";
                                        tr.classList.add("superado");
                                    } else if (value === 1) {
                                        td.textContent = "No Superado";
                                        tr.classList.add("no-superado");
                                    } else {
                                        td.textContent = "Pendiente de realizar";
                                    }
                                } else {
                                    td.textContent = value;
                                }
                                tr.appendChild(td);
                            }
                        });

                        const tdActions = document.createElement("td");
                        const responderButton = document.createElement("button");
                        responderButton.textContent = "Responder Pregunta";
                        responderButton.classList.add("btn", "btn-primary", "btn-sm");

                        if (item.acciones === 0 || tr.classList.contains("superado") || tr.classList.contains("no-superado")) {
                            responderButton.disabled = true;
                        }

                        responderButton.addEventListener("click", function () {
                            localStorage.setItem("respuesta", JSON.stringify(item));
                            if (selectedValue === "libres") {
                                window.location.href = "respuestapruebaslibres.html";
                            } else if (selectedValue === "eleccion") {
                                window.location.href = "respuestaeleccion.html";
                            } else if (selectedValue === "valoracion") {
                                window.location.href = "respuestavaloracion.html";
                            }
                        });
                        tdActions.appendChild(responderButton);
                        tr.appendChild(tdActions);

                        tbody.appendChild(tr);
                    });
                    table.appendChild(tbody);

                    resultadoFetch.innerHTML = "";
                    resultadoFetch.appendChild(table);
                }
            })
            .catch((error) => {
                resultadoFetch.innerHTML = `Error: ${error}`;
            });
    });
    selectFetch.dispatchEvent(new Event('change'));
});