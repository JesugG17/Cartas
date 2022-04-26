import '../css/components.css';

const cardsGrid = document.querySelector(".center");
const inputSim  = document.querySelector(".inputSimulaciones");


// Lugares de los 4 jugadores
const player1 = document.querySelector(".one");
const player2 = document.querySelector(".two");
const player3 = document.querySelector(".three");
const player4 = document.querySelector(".four");


let cantidadSimulaciones = 0;
let iteracion = 0, games = 0;
let intervalo;


console.log( inputSim );


const letters = ['O', 'C', 'E', 'P'];
let deck;



// console.log( cardsContainer )

const stopInterval = () => {
    clearInterval( intervalo );
}


export const showCard = () => {


   for(let i = 1; i <= 4; i++) {
       const newCard = document.createElement("img");
       newCard.classList.add("card");
       newCard.classList.add(`card${ i }`);
       const carta   = deck[( Math.trunc( Math.random() * deck.length ))];
       // console.log( carta )
       newCard.src   = `../assets/img/${carta}.PNG`;
       cardsGrid.append( newCard );

   }

    
        
    // iteracion++;
    // console.log( iteracion );
    // if ( iteracion === simulaciones ) {
    //     console.log( iteracion );
    //     console.log( simulaciones );
    //     stopInterval();
    // }
};

const generateDeck = () => {

    deck = [];

    for(let i = 1; i <= 12; i++) {

        for(const letter of letters) {
            
            deck.push( i + letter );
        
        }

    }
    putBackCards();

};

const putBackCards = () => {
    

    for(let i = 1; i <= 4; i++) {

        for(let j = 1; j <= 10; j++) {

            const backOfTheCard = document.createElement("img");
            backOfTheCard.src   = `../assets/img/back.PNG`;
            backOfTheCard.classList.add("backcard");

            // figure.append( backOfTheCard );


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


    // while( player1.firstChild ) {
     
    //         player1.removeChild(player1.firstChild);
        
    // }


}

export const initGame = () => {

    generateDeck();

};


const cycle = () => {
    intervalo = setInterval(() => {
        showCard();
        
            player1.removeChild( player1.firstChild );
            player2.removeChild( player2.firstChild );
            player3.removeChild( player3.firstChild );
            player4.removeChild( player4.firstChild );

        iteracion++;
        console.log(iteracion);
        if ( iteracion === 10 ) {
            clearInterval( intervalo );
            games++;
            if ( games === cantidadSimulaciones ) {
                setTimeout( () => {
                    alert("El juego ha acabado!");
                }, 1000);
                return;
            }
            iteracion = 0;
            initGame();
            cycle();
        }
        console.log("Hola");
    }, 750);
}

inputSim.addEventListener('keyup', ( event ) => {

    if ( event.keyCode === 13 ) {
        
        cantidadSimulaciones = parseInt(event.target.value);
        event.target.value   = "";

        cycle();
        console.log("Hola intervalo")
        

        

        

    }
});



