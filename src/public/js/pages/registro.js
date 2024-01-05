// Importamos las clases a utilizar
import { validarNombre, validarCorreo, validarContrasena, confirmarContrasena } from './validaciones.js';
import {registrarHumano} from "./humanos/http/http-registrarhumano.js";
import Humanos from './Modelo/Humanos.js'

// Variables a rellenar
var nombre = document.getElementById('name');
var correo = document.getElementById('email');
var contrasena = document.getElementById('password');
var repetirContrasena = document.getElementById('confirmpassword');
var btnregistro = document.getElementById('registrarse');

// Variables de notificaciones
var mensajeContrasena = document.getElementById('mensajeContrasena');
var mensajeContrasenaConfirmar = document.getElementById('mensajeConfirmar');
var mensajeNombre = document.getElementById('mensajeNombre');
var mensajeEmail = document.getElementById('mensajeEmail');

const COLOR_VERDE = "green";
const COLOR_ROJO = "red";

function actualizarMensaje(elemento, mensaje, color) {
    elemento.style.color = color;
    elemento.innerHTML = mensaje;
}

function comprobarContrasena(contrasena) {
    var contrasenaTam = contrasena.length;
    var validacion = true;

    if (contrasenaTam < 6 || contrasenaTam > 12) {
        validacion = false;
        actualizarMensaje(mensajeContrasena, "El tamaño debe ser entre 6 y 12", COLOR_ROJO);
    }
    if (validarContrasena(contrasena) === false) {
        validacion = false;
        actualizarMensaje(mensajeContrasena, "El formato de contraseña no es válido", COLOR_ROJO);
    }
    if (validacion === true) {
        actualizarMensaje(mensajeContrasena, "Contraseña válida", COLOR_VERDE);
    }
    return validacion;
}

nombre.addEventListener('input', function () {
    if (validarNombre(nombre.value) === false) {
        actualizarMensaje(mensajeNombre, "Nombre Incorrecto", COLOR_ROJO);
    } else {
        actualizarMensaje(mensajeNombre, "Nombre Correcto", COLOR_VERDE);
    }
});

correo.addEventListener('input', function () {
    if (validarCorreo(correo.value) === false) {
        actualizarMensaje(mensajeEmail, "Correo Incorrecto", COLOR_ROJO);
    } else {
        actualizarMensaje(mensajeEmail, "Correo Correcto", COLOR_VERDE);
    }
});

contrasena.addEventListener('input', function () {
    comprobarContrasena(contrasena.value);
});

repetirContrasena.addEventListener('input', function () {
    var result = confirmarContrasena(contrasena.value, repetirContrasena.value);

    if (result === true) {
        actualizarMensaje(mensajeContrasenaConfirmar, "Las contraseñas coinciden", COLOR_VERDE);
    } else {
        actualizarMensaje(mensajeContrasenaConfirmar, "Las contraseñas no coinciden", COLOR_ROJO);
    }
});

btnregistro.addEventListener('click', function (event) {
    event.preventDefault();
    const nombreValido = validarNombre(nombre.value);
    const correoValido = validarCorreo(correo.value);
    const contrasenaValida = validarContrasena(contrasena.value);
    const contrasenasCoinciden = confirmarContrasena(contrasena.value, repetirContrasena.value);

    if (nombreValido && correoValido && contrasenaValida && contrasenasCoinciden) {
        var nuevoHumano = new Humanos(nombre.value, correo.value, contrasena.value, repetirContrasena.value);
        registrarHumano(nuevoHumano.getJSON())
            .then(function () {
                window.location.href = "./index.html";
            })
            .catch(function (error) {
                console.error('Error al registrar:', error.message);
            });
    } else {
        alert('Por favor, completa correctamente todos los campos.');
    }
});