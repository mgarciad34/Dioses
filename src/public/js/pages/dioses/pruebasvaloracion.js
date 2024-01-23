import PruebasValoracion from "../Modelo/PruebasValoracion.js";
import { registrarPruebaValoracion } from "./http/http-pruebasvaloracion.js";

var botonValoracion = document.getElementById('btnvaloracion')

function enviarFormularioValoracion() {
    var preguntaInput = document.getElementById("pregunta3");
    var valorInput = document.getElementById("puntuacion");

    var pregunta = preguntaInput.value;
    var valor = valorInput.value;

    var usuario = sessionStorage.getItem('usuario');

    if (!usuario) {
        throw new Error('Usuario no reconocido.');
    }
    
    var PruebaValoracion;    
    if(usuario == 'Zeus'){
        PruebaValoracion = new PruebasValoracion(pregunta, valor, 1);
    } else if(usuario == 'Poseidon'){
        PruebaValoracion = new PruebasValoracion(pregunta, valor, 2);
    } else if(usuario == 'Hades'){
        PruebaValoracion = new PruebasValoracion(pregunta, valor, 3);
    }

    console.log(PruebaValoracion);
    registrarPruebaValoracion(PruebaValoracion.getJSON()).then(() => {
       window.location.href = "./dashboarddios.html";
    }).catch((error) => {
        console.error('Error al enviar los datos:', error);
    });
}

botonValoracion.addEventListener("click", enviarFormularioValoracion)
