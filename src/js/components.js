import { Chart, registerables } from 'chart.js';
import { Card } from '../classes/card.class';
import { numeroCarta, tipoCarta } from './MonteCarlo';

Chart.register( ...registerables )
import '../css/components.css';

// Referencia al boton de la grafica
const generarGrafica = document.querySelector(".button__grafica");



// Referencia a donde se ponen las cartas y donde se introduce el numero de simulaciones
const divCards = document.querySelector(".show__cards");
const inputSim = document.querySelector(".inputSimulaciones");


// Lugares de los 4 jugadores
const player1 = document.querySelector(".one");
const player2 = document.querySelector(".two");
const player3 = document.querySelector(".three");
const player4 = document.querySelector(".four");

// Puntajes de los jugadores de las manos
const puntajeP1 = document.querySelector(".p1");
const puntajeP2 = document.querySelector(".p2");
const puntajeP3 = document.querySelector(".p3");
const puntajeP4 = document.querySelector(".p4");

// Puntajes de los jugadores de los juegos ganados
const puntajeJuegoP1 = document.querySelector(".p1__game")
const puntajeJuegoP2 = document.querySelector(".p2__game")
const puntajeJuegoP3 = document.querySelector(".p3__game")
const puntajeJuegoP4 = document.querySelector(".p4__game")

console.log( puntajeP1 );



// variables controladoras
let cantidadSimulaciones = 0;
let iteracion = 0, games = 0;
let intervalo;


console.log( inputSim );

// variables para cartas y jugadores
const letters         = ['O', 'C', 'E', 'P'];
let puntosJugadores   = [0,0,0,0]; 
const juegosGanados   = [0,0,0,0];
let deck;





const generateCard = () => {
    let carta;
    do {
        carta = numeroCarta();
        carta    += tipoCarta();
    } while( !deck.includes( carta ) );
    return carta; 

}

const colocarNivelCarta = ( carta, i ) => {

    let nivel   = 0;
    let numeros = parseInt( carta.substring(0, carta.length - 1 ) );
    const letra = carta[ carta.length - 1];
    

    if ( letra === "O" ) {
        nivel = 4;
    } else if ( letra === "C" ) {
        nivel = 3;
    } else if ( letra === "E" ) {
        nivel = 2;
    } else {
        nivel = 1;
    }

    return new Card( i + 1, nivel, numeros );
}


const encontrarGanadorMano = ( cartas ) => {

    let cartaMayor = cartas[0];

    for(let i = 1; i < cartas.length; i++) {

        if ( cartas[i].getNivel() > cartaMayor.getNivel() ) {

            cartaMayor = cartas[i];

        } else if ( cartas[i].getNivel() === cartaMayor.getNivel() && cartas[i].getNumero() > cartaMayor.getNumero() ) {

            cartaMayor = cartas[i];

        }
    }

    puntosJugadores[ cartaMayor.getJugador() - 1 ] += 1;
    
    switch( cartaMayor.getJugador() ) {
    case 1:
        puntajeP1.textContent =  "P1 = " + JSON.stringify(puntosJugadores[ cartaMayor.getJugador() - 1 ]);
        break;
    case 2:
        puntajeP2.textContent =  "P2 = " + JSON.stringify(puntosJugadores[ cartaMayor.getJugador() - 1 ]);
        break;
    case 3:
        puntajeP3.textContent =  "P3 = " + JSON.stringify(puntosJugadores[ cartaMayor.getJugador() - 1 ]);
        break;
    case 4:
        puntajeP4.textContent =  "P4 = " + JSON.stringify(puntosJugadores[ cartaMayor.getJugador() - 1 ]);
        break;
    }
}


export const showCard = () => {

    const cartas = [];

    while( divCards.firstChild ) {
        divCards.removeChild( divCards.firstChild );
    }

    for(let i = 0; i < 4; i++) {
            const newCard = document.createElement("img");
            newCard.classList.add("card");
            const carta = generateCard();

            
            deck = deck.filter( ( card ) => card !== carta );
            console.log( deck.includes( carta ));


            const objetoCarta = colocarNivelCarta( carta, i );
            cartas.push( objetoCarta );


            newCard.src   = `../assets/img/${carta}.PNG`;
            divCards.append( newCard );

    }

    encontrarGanadorMano( cartas );
    

    
        
};

const generateDeck = () => {

    deck = [];

    for(let i = 1; i <= 12; i++) {

        for(const letter of letters) {
            
            deck.push( i + letter );
        
        }

    }

    deck = _.shuffle( deck );
    putBackCards();

};

const putBackCards = () => {
    

    for(let i = 1; i <= 4; i++) {

        for(let j = 1; j <= 10; j++) {

            const backOfTheCard = document.createElement("img");
            backOfTheCard.src   = `../assets/img/back.PNG`;
            backOfTheCard.classList.add("backcards");

            switch( i ) {
            case 1:
                player1.append( backOfTheCard );
                break
            case 2:
                player2.append( backOfTheCard );      
                break;
            case 3:
                player3.append( backOfTheCard );
                break;
            case 4:
                player4.append( backOfTheCard );
                break;
            }

        }
    }


}

export const initGame = () => {
    generateDeck();
};

const colocarScore = ( empatados ) => {


    empatados.forEach( numJugador => {
        console.log( numJugador );
        switch( numJugador + 1 ) {
        case 1:
            puntajeJuegoP1.textContent =  "P1 = " + JSON.stringify( juegosGanados[ numJugador ] );
            break;
        case 2:
            puntajeJuegoP2.textContent =  "P2 = " + JSON.stringify( juegosGanados[ numJugador ] );
            break;
        case 3:
            puntajeJuegoP3.textContent =  "P3 = " + JSON.stringify( juegosGanados[ numJugador ] );
            break;
        case 4:
            puntajeJuegoP4.textContent =  "P4 = " + JSON.stringify( juegosGanados[ numJugador ] );
            break;
        }
    })
}


const comprobarGanadorJuego = () => {

    const empatados = [];

    let puntajeMayor = puntosJugadores[0], jugador = 0;
    for(let i = 1; i < puntosJugadores.length; i++) {

        if ( puntosJugadores[i] > puntajeMayor ){ 
            puntajeMayor = puntosJugadores[i];
            jugador = i;
        }
    }
    empatados.push( jugador );
    puntosJugadores[ jugador ] = 0;

    for(let i = 0; i < puntosJugadores.length; i++) {

        if ( puntosJugadores[i] === puntajeMayor ) {
            empatados.push( i );
        }
    }

    console.log( empatados );


    return empatados;

}

const cycle = () => {

    intervalo = setInterval(() => {

        showCard();
        player1.removeChild( player1.firstChild );
        player2.removeChild( player2.firstChild );
        player3.removeChild( player3.firstChild );
        player4.removeChild( player4.firstChild );
       
        
        iteracion++;
        if ( iteracion === 10 ) {

            clearInterval( intervalo );
            games++;
            
            const empatados = comprobarGanadorJuego();
            empatados.forEach( jugadores => {
                juegosGanados[ jugadores ] += 1;
            })
            colocarScore( empatados );

            if ( games === cantidadSimulaciones ) {
                setTimeout( () => {
                    alert("El juego ha acabado!");
                }, 1000);
                generarGrafica.disabled = false;
                return;
            }

            iteracion = 0;
            puntosJugadores = [0,0,0,0];
                
            
            puntajeP1.textContent = "P1 = 0";
            puntajeP2.textContent = "P2 = 0";
            puntajeP3.textContent = "P3 = 0";
            puntajeP4.textContent = "P4 = 0";

            initGame();
            cycle();
        }
    }, 750);
}

inputSim.addEventListener('keyup', ( event ) => {

    if ( event.keyCode === 13 ) {
        
        cantidadSimulaciones = parseInt(event.target.value);
        event.target.value   = "";

        cycle();     

    }
});

// CODIGO DE LA GRAFICA
let chart

let labels = ["Jugador 1", "Jugador 2", "Jugador 3", "Jugador 4"];

const data = {
    labels: labels,
    datasets: [{
        label: 'Juego de Cartas',
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(247, 247, 12)',
            'rgb(54, 255, 0)',
            'rgb(0, 193, 255)'
        ],
        borderColor: 'rgb(255, 99, 132)',
        data: juegosGanados,
    }]
};

const config = {
    type: 'pie',
    data: data,
    options: {
        maintainAspectRatio: false,
    }
}


const renderChart = () => {
   chart = new Chart(document.querySelector(".myChart"), config );
}


generarGrafica.addEventListener("click", () => {
    document.body.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.classList.add("myChart");
    document.body.append( canvas )
    renderChart();
})


