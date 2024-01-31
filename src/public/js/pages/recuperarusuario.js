// Importamos la clase RecuperarUsuario y la función recuperar
import RecuperarUsuario from './Modelo/Recuperar.js';
import { recuperar } from './comunes/http/http-recuperusuario.js';

// Seleccionamos los elementos del DOM
var correo = document.getElementById('email');
var contrasena = document.getElementById('password');
var btnrecuperar = document.getElementById('btnrecuperar');

// Agregamos un evento de clic al botón de recuperar
btnrecuperar.addEventListener('click', function (event) {
    event.preventDefault();

    // Creamos una instancia de RecuperarUsuario con el valor del correo
    const recuperarClaves = new RecuperarUsuario(correo.value);

    // Llamamos a la función recuperar con el JSON de la instancia de RecuperarUsuario
    recuperar(recuperarClaves.getJSON())
        .then(function (resultado) {
            // Manejamos la respuesta (puedes ajustar esto según lo que necesites)
            console.log('Respuesta del servidor:', resultado);
            window.location.href = "./index.html";
        })
        .catch(function (error) {
            // Manejamos cualquier error
            console.error('Error al recuperar:', error.message);
        });
});
