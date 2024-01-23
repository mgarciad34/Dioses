import PruebasLibres from "../Modelo/PruebasLibres.js";
import { registrarPruebaLibre } from "./http/http-pruebaslibres.js";

var botonLibre = document.getElementById('btnlibre')

function enviarFormulario() {
    var preguntaInput = document.getElementById("preguntaInput");
    var palabrasRelacionadasTextarea = document.getElementById("palabrasRelacionadasTextarea");

    var pregunta = preguntaInput.value;
    var asociacion = palabrasRelacionadasTextarea.value;

    var usuario = sessionStorage.getItem('usuario');

    if (!usuario) {
        throw new Error('Usuario no reconocido.');
    }

    var PruebaLibre;
    if(usuario == 'Zeus'){
        PruebaLibre = new PruebasLibres(pregunta, asociacion, 1)
    }else if(usuario == 'Poseidon'){
        PruebaLibre = new PruebasLibres(pregunta, asociacion, 2)
    }else if(usuario == 'Hades'){
        PruebaLibre = new PruebasLibres(pregunta, asociacion, 3)
    }

    console.log(PruebaLibre)
    registrarPruebaLibre(PruebaLibre.getJSON()).then(() => {
        window.location.href = "./dashboarddios.html";
    }).catch((error) => {
        console.error('Error al enviar los datos:', error);
    });
}


botonLibre.addEventListener("click", enviarFormulario)