export default class Login{
    constructor(email, contrasena) {
        this.email = email;
        this.contrasena = contrasena;
    }

    getJSON() {
        return {
            correo: this.email,
            contrasena: this.contrasena
        }
    }
}