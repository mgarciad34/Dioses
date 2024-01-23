export default class PruebasValoracion {
    constructor(pregunta, valor, id_dios) {
        this.pregunta = pregunta;
        this.valor = valor;
        this.id_dios = id_dios;
    }

    getJSON() {
        return {
            pregunta: this.pregunta,
            valor: this.valor,
            id_dios: this.id_dios
        }
    }
}
