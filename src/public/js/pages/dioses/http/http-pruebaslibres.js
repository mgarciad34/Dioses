export async function registrarPruebaLibre(datos) {
    try {
        const token = sessionStorage.getItem('token'); 
        const respuesta = await fetch('http://127.0.0.1:8000/api/dioses/crear/prueba/libre', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datos),
        });
        console.log(respuesta.body)

        if (!respuesta.ok) {
            throw new Error(`Error de red: ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error.message);
    }
}