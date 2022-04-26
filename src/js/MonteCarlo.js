
const tipoCarta = () => {
    
    let tipoCarta = "";
    const aleagen = Math.random();


    if ( aleagen <= .25 ) {

        tipoCarta += "O";

    } else if ( aleagen <= .50 ) {

        tipoCarta += "C";

    } else if ( aleagen <= .75 ) {

        tipoCarta += "E";

    } else {

        tipoCarta += "P";

    }

    return tipoCarta;

}

const numeroCarta = () => {

    let tipoCarta = "";
    const aleagen = Math.random();


    if ( aleagen <= .10 ){ 
        
        tipoCarta += "1";

    } else if ( aleagen <= .20 ){ 

        tipoCarta += "12"

    } else if ( aleagen <= .30 ) {

        tipoCarta += "11";

    } else if ( aleagen <= .40 ){ 

        tipoCarta += "10";

    } else if ( aleagen <= .50 ) {

        tipoCarta += "7";

    } else if ( aleagen <= .60 ) {

        tipoCarta += "6";

    } else if ( aleagen <= .70 ) {

        tipoCarta += "5"

    } else if ( aleagen <= .80 ) {

        tipoCarta += "4"

    } else if ( aleagen <= .90 ) {

        tipoCarta += "3"

    } else {
        tipoCarta += "2"
    }

    return tipoCarta;


}


export {
    tipoCarta,
    numeroCarta,
}