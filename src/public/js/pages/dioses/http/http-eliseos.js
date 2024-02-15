const token = sessionStorage.getItem("token");

fetch("http://localhost:8000/api/dioses/obtener/eliseos", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((datos) => {
    const tbody = document.querySelector("#miTabla tbody");
    tbody.innerHTML = "";
    datos.forEach((item) => {
      const fila = document.createElement("tr");
      const celdaNombre = document.createElement("td");
      celdaNombre.textContent = item.nombre;
      const celdaCorreo = document.createElement("td");
      celdaCorreo.textContent = item.correo;
      fila.appendChild(celdaNombre);
      fila.appendChild(celdaCorreo);

      tbody.appendChild(fila);
    });
  })
  .catch((error) => console.error("Error al obtener los datos:", error));