document.addEventListener("DOMContentLoaded", async function () {
    const preguntaContainer = document.getElementById("preguntaContainer");
    const valoracionSelect = document.getElementById("valoracionSelect");
    const responderBtn = document.getElementById("responderBtn");

    if (!preguntaContainer || !valoracionSelect || !responderBtn) {
      console.error("Algunos elementos no existen en el DOM.");
      return;
    }

    const respuestaLocalStorage = JSON.parse(
      localStorage.getItem("respuesta")
    );
    if (!respuestaLocalStorage) {
      console.error(
        "No se pudo obtener la respuesta del almacenamiento local."
      );
      return;
    }

    // Realizar fetch y guardar el resultado antes de la funcionalidad del botón
    try {
      const pruebaId = respuestaLocalStorage.prueba_id;
      const token = sessionStorage.getItem("token");

      const responseValoracion = await fetch(
        `http://localhost:8000/api/humano/recuperar/pruebas/valoracion/${pruebaId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!responseValoracion.ok) {
        throw new Error(`Error HTTP: ${responseValoracion.status}`);
      }

      const responseDataValoracion = await responseValoracion.json();
      const valor = responseDataValoracion.data.valor;
      localStorage.setItem("peticion", valor);
    } catch (error) {
      console.error(
        "Error al obtener el resultado de la valoración:",
        error
      );
    }

    // Obtener y mostrar la pregunta
    const preguntaLabel = document.createElement("label");
    preguntaLabel.textContent = respuestaLocalStorage.pregunta;
    preguntaContainer.appendChild(preguntaLabel);

    responderBtn.addEventListener("click", async function () {
      const respuesta = valoracionSelect.value;
      const correctaLocalStorage = localStorage.getItem("peticion");
      let datos; // Declarar la variable datos aquí

      if (respuesta === correctaLocalStorage) {
        console.log("Correcto");
        datos = {
          id: respuestaLocalStorage.id,
          id_humano: sessionStorage.getItem("id_humano"),
          superada: 0,
        };
        console.log(datos);
      } else {
        console.log("Incorrecto");
        datos = {
          id: respuestaLocalStorage.id,
          id_humano: sessionStorage.getItem("id_humano"),
          superada: 1,
        };
        console.log(datos);
      }

      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8000/api/humano/superada",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(datos),
          }
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Respuesta de la petición 'superada':", responseData);
        window.location.href = "dashboardhumanovivo.html";
      } catch (error) {
        console.error("Error al realizar la petición 'superada':", error);
      }
    });
  });