// Selectores de button y input.
const inputSeats = document.getElementById('inputNumberSeats');
const chooseSeat = document.getElementById('btnSeatElection');
var butacas = []; // Define el tamaño de la matriz.
// Listener que ejecuta la función hasta que todo el documento haya sido cargado.
window.addEventListener('DOMContentLoaded', function() {
    butacas = this.cinemaSeats();
    console.log('Matriz de asientos', butacas);
});
// Listener del evento keydown en el input, para no permitir que se ingrese mediante tecla un valor, solo por medio de las flechas.
inputSeats.addEventListener('keydown', function(event) {
    
    if (event.key !== 'ArrowUp' && event.key  !== 'ArrowDown') {
        event.preventDefault();
    } 
});
// Listener del boton que utiliza el evento click.
chooseSeat.addEventListener('click', (event) => {
    event.preventDefault();
    suggest(inputSeats.value);

});

// Esta función crea la matriz de asientos, y le da un estado a cada uno de forma aleatoria.
function cinemaSeats() {
    let butaca = [];
    const numberMatriz = 6;
    let count = 0;

    for (let i = 0; i < numberMatriz; i++) {

        let fila = [];
        for (let j = 0; j < numberMatriz; j++) {
            
            count++
            const randomOption = Math.random() < 0.5 ? true : false;
            fila.push({id: count, estado: randomOption});
        }

        butaca.push(fila);
    }

    return butaca;
}

// Función que evalúa si hay disponiblilidad de asientos, según el número de asientos que se elecciono. 
// Mostrando la pre-seleccion de asientos, empezando desde las filas mas lejanas a la pantalla del cine. 
function suggest(seats) {
    const numberSeatChosen = Number(seats);

    if (numberSeatChosen > 6) {
        return console.log('Asientos sugeridos:', new Set());
    }

    for (let i = butacas.length - 1; i >= 0; i--) {
        let countFalse = 0;
        let availableSeats = [];

        for (let j = 0; j < butacas.length; j++) {
            const estado = butacas[i][j].estado;
            const id = butacas[i][j].id;
            
            if (estado === false) {
                countFalse++

            } else {
                countFalse = 0;
            }

            if (countFalse > 0) {
                availableSeats.push(id);

                if (countFalse == numberSeatChosen) {
                    return console.log('Asientos sugeridos:', new Set(availableSeats));
                }

            } else {
                availableSeats = [];
            }
        }

    }
    
    return console.log('Asientos sugeridos:', new Set());
}