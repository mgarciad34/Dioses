// Importamos las clases a utilizar
import Login from './Modelo/Login.js'
import { login } from "./comunes/http/http-login.js";

var correo = document.getElementById('email');
var contrasena = document.getElementById('password');
var btnregistro = document.getElementById('btniniciar');

btnregistro.addEventListener('click', function (event) {
    event.preventDefault();
    const loginSesion = new Login(correo.value, contrasena.value);
    login(loginSesion.getJSON())
        .then(function (data) {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("rol", data.rol);
            sessionStorage.setItem("usuario", data.user);
            if(data.rol == "humano"){
                window.location.href = "./dashboardhumano.html";
            }else if (data.rol == "dios"){
                window.location.href = "./dashboarddios.html";    
            }
        })
        .catch(function (error) {
            console.error('Error al registrar:', error.message);
        });
});

