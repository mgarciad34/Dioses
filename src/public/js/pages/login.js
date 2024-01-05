// Importamos las clases a utilizar
import Login from './Modelo/Login.js'
import {login} from "././comunes/http/http-login";

var correo = document.getElementById('email');
var contrasena = document.getElementById('password');
var btnregistro = document.getElementById('btniniciar');

btnregistro.addEventListener('click', function (event) {
    event.preventDefault();
    const login = new Login(correo.value, contrasena.value);
    login(login.getJSON())
            .then(function () {
                console.log(login)
                // window.location.href="./index.html";
            })
            .catch(function (error) {
                console.error('Error al registrar:', error.message);
            });
});