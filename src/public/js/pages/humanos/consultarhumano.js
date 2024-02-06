import { obtenerIdHumano } from "./http/http-obteneridhumano.js";
import { obtenerVida } from "./http/http-obtenervidahumano.js";

var url = 'http://127.0.0.1:8000/api/humano/obtener/id';
var metodo = 'GET';
var id_humano;

obtenerIdHumano(url, metodo)
    .then(function(id) {
        id_humano = id; // Guardamos el ID obtenido
        return obtenerVida(id_humano.id_humano); // Llamamos a obtenerVida con el ID
    })
    .then(function(vida) {
        console.log('Vida obtenida:', vida);

        // Guardar el resultado de obtenerVida en sessionStorage
        sessionStorage.setItem('vida', JSON.stringify(vida.vida));

        // Recuperar el valor de "vida" del sessionStorage
        var vidaGuardada = JSON.parse(sessionStorage.getItem('vida'));

        // Redireccionar según el valor de "vida"
        if (vidaGuardada === 1) {
            window.location.href = "./dashboardhumanovivo.html";
        } else if (vidaGuardada === 0) {
            window.location.href = window.location.href = "./dashboardhumanomuerto.html";
        } else {
            console.error('Valor de vida no válido:', vidaGuardada);
        }
    })
    .catch(function(error) {
        console.error('Error al obtener el ID:', error);
    });
