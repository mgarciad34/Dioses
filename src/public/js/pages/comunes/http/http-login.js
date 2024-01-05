// http-login.js
export async function login(datos) {
    try {
        const respuesta = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        if (!respuesta.ok) {
            throw new Error(`Error de red: ${respuesta.status}`);
        }

        const datosJson = await respuesta.json(); // Parsea la respuesta JSON

        return datosJson;

    } catch (error) {
        console.error('Error al enviar los datos:', error.message);
        throw error;
    }
}
