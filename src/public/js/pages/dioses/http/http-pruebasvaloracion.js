export async function registrarPruebaValoracion(datos) {
    try {
        const token = sessionStorage.getItem('token'); 
        const respuesta = await fetch('http://127.0.0.1:8000/api/dioses/crear/prueba/valoracion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datos),
        });

        // Imprime el cuerpo de la respuesta como texto
        const cuerpoRespuesta = await respuesta.text();
        console.log(cuerpoRespuesta);

        if (!respuesta.ok) {
            throw new Error(`Error de red: ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error.message);
    }
}
