import PruebasEleccion from "../Modelo/PruebasEleccion.js";
import { registrarPruebaEleccion } from "./http/http-pruebaseleccion.js";

var botonEleccion = document.getElementById('btneleccion')

function enviarFormulario() {
    var preguntaInput = document.getElementById("pregunta2");
    var respuesta1Input = document.getElementById("respuesta1");
    var respuesta2Input = document.getElementById("respuesta2");
    var respuestaCorrectaInput = document.getElementById("respuestaCorrecta");

    var pregunta = preguntaInput.value;

    var usuario = sessionStorage.getItem('usuario');

    if (!usuario) {
        throw new Error('Usuario no reconocido.');
    }
    
    var PruebaEleccion;    
    if(usuario == 'Zeus'){
        PruebaEleccion = new PruebasEleccion(pregunta, respuesta1Input.value, respuesta2Input.value, respuestaCorrectaInput.value, 1);
    } else if(usuario == 'Poseidon'){
        PruebaEleccion = new PruebasEleccion(pregunta, respuesta1Input.value, respuesta2Input.value, respuestaCorrectaInput.value, 2);
    } else if(usuario == 'Hades'){
        PruebaEleccion = new PruebasEleccion(pregunta, respuesta1Input.value, respuesta2Input.value, respuestaCorrectaInput.value, 3);
    }
    


    console.log(PruebaEleccion);
    registrarPruebaEleccion(PruebaEleccion.getJSON()).then(() => {
       window.location.href = "./dashboarddios.html";
    }).catch((error) => {
        console.error('Error al enviar los datos:', error);
    });
}

botonEleccion.addEventListener("click", enviarFormulario)