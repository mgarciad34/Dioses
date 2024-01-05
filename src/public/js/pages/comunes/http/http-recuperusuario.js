export async function recuperar(datos) {
    try {
        const url = `http://127.0.0.1:8000/api/recuperar?correo=${encodeURIComponent(datos.correo)}`;

        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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
