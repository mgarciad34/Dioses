export default class Humanos{
    constructor(name, email, contrasena, confirmarcontrasena) {
        this.name = name;
        this.email = email;
        this.contrasena = contrasena;
        this.confirmarcontrasena = confirmarcontrasena;
    }

    getJSON() {
        return {
            nombre: this.name,
            correo: this.email,
            contrasena: this.contrasena,
            confirmarcontrasena: this.confirmarcontrasena,
        }
    }
}