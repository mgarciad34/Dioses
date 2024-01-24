import { obtenerDatos } from "./http/http-consultalibres.js";

function loadTable(value) {
    // Obtén todas las tablas
    var tabs = document.getElementsByTagName("table");

    // Recorre todas las tablas y ocúltalas
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }

    // Muestra la tabla que corresponde a la opción seleccionada
    if (value !== "") {
        document.getElementById(value).style.display = "";
        obtenerDatos(value);
    }
}

window.loadTable = loadTable;