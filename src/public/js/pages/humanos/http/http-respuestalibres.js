document.addEventListener("DOMContentLoaded", function() {
    // Obtener el valor almacenado en localStorage
    const data = localStorage.getItem("respuesta");
    const parsedData = JSON.parse(data);
    const pregunta = parsedData.pregunta;
    document.getElementById("preguntaLabel").textContent = pregunta;

    // Evento de clic para el botón
    document.getElementById("responderBtn").addEventListener("click", function() {
      const respuesta = document.getElementById("respuestaText").value;

      const pruebaId = parsedData.prueba_id;

      const idHumano = sessionStorage.getItem("id_humano");

      const token = sessionStorage.getItem("token");

      const cuerpo = {
        id: pruebaId,
        respuesta: respuesta
      };

      const url = 'http://127.0.0.1:8000/api/humano/resultado/prueba/libre';

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(cuerpo)

      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Hubo un problema con la solicitud");
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        const resultado = data;
        const cuerpoPut = {
          id: pruebaId,
          id_humano: idHumano,
          superada: resultado.superada
        };

        const urlPut = 'http://127.0.0.1:8000/api/humano/superada';

        fetch(urlPut, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(cuerpoPut)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error("Hubo un problema con la solicitud");
          }
          return response.json();
        })
        .then(data => {
          window.location.href = 'dashboardhumanovivo.html';
        })
        .catch(error => {
          console.error("Error:", error);
        });
      })
      .catch(error => { 
        console.error("Error:", error);
      });
    });
  });