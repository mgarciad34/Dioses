export async function recuperar(datos) {
    try {
        const url = 'http://localhost:8000/api/recuperar';

        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo: datos.correo }),
        });

        if (!respuesta.ok) {
            throw new Error(`Error de red: ${respuesta.status}`);
        }

        const datosJson = await respuesta.json();

        return datosJson;

    } catch (error) {
        console.error('Error al enviar los datos:', error.message);
        throw error;
    }
}
