function enviarFormulario() {
    // Obtén los campos del formulario por sus ID
    var preguntaInput = document.getElementById("preguntaInput");
    var palabrasRelacionadasTextarea = document.getElementById("palabrasRelacionadasTextarea");

    // Obtén los valores de los campos
    var pregunta = preguntaInput.value;
    var palabrasRelacionadas = palabrasRelacionadasTextarea.value;

    // Imprime los valores en la consola
    console.log("Pregunta: " + pregunta);
    console.log("Palabras relacionadas: " + palabrasRelacionadas);
}
