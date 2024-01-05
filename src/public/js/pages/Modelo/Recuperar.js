export default class RecuperarUsuario{
    constructor(email) {
        this.email = email;
    }

    getJSON() {
        return {
            correo: this.email
        }
    }
}