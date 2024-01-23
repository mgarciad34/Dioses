export default class PruebasLibres {
    constructor(pregunta, asociacion, id_dios) {
        this.pregunta = pregunta;
        this.asociacion = asociacion;
        this.id_dios = id_dios;
    }

    getJSON() {
        return {
            pregunta: this.pregunta,
            asociacion: this.asociacion,
            id_dios: this.id_dios
        }
    }
}
