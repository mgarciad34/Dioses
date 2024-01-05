// Importamos las clases a utilizar
import RecuperarUsuario from './Modelo/Recuperar.js'
import { recuperar } from './comunes/http/http-recuperusuario.js';

var correo = document.getElementById('email');
var contrasena = document.getElementById('password');
var btnrecuperar = document.getElementById('btnrecuperar');

btnrecuperar.addEventListener('click', function (event) {
    event.preventDefault();
    const recuperarClaves = new RecuperarUsuario(correo.value);
    recuperar(recuperarClaves.getJSON())
        .then(function () {
            window.location.href = "./index.html";
            
        })
        .catch(function (error) {
            console.error('Error al registrar:', error.message);
        });
});

