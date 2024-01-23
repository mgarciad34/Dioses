export default class PruebasEleccion {
    constructor(pregunta, respuesta1, respuesta2, correcta, id_dios) {
        this.pregunta = pregunta;
        this.respuesta1 = respuesta1;
        this.respuesta2 = respuesta2;
        this.correcta = correcta;
        this.id_dios = id_dios;
    }

    getJSON() {
        return {
            pregunta: this.pregunta,
            respuesta1: this.respuesta1,
            respuesta2: this.respuesta2,
            correcta: this.correcta,
            id_dios: this.id_dios
        }
    }
}
