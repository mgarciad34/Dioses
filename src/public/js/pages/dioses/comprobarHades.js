function mostrarHades() {
    var usuario = sessionStorage.getItem('usuario');
   
    if (usuario === 'Hades') {
        document.getElementById('eliminarPruebas').style.display = 'block';
    }
   }

mostrarHades()
   