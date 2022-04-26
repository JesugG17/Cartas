
export class Card {
   
    nivel
    jugador
    numero

    constructor( jugador, nivel, numero ) {
        this.nivel   = nivel;
        this.jugador = jugador;
        this.numero  = numero;
    }


    getNivel() {
        return this.nivel;
    }


    getNumero() {
        return this.numero;
    }
    
    getJugador() {
        return this.jugador;
    }



}