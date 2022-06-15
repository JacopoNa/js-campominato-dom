// funzione che genera numeri random (in un range) e li aggiunge ad un array vuoto, solo se il numero generato non è gia presente nell'array
function generateRandomBombs(minBombRange, maxBombRange, totalBombsNum) {

    // array vuoto da popolare con le "bombe"
    let bombsArray = [];

    // nel while genero un numero random tante volte quanto la lunghezza di "totalBombsNum" e lo pusho nell'array vuoto solo se il numero non è già presente
    while(bombsArray.length < totalBombsNum) {
        let randomNumb = getRndInteger(minBombRange, maxBombRange);

        if (!bombsArray.includes(randomNumb)) {
        bombsArray.push(randomNumb)
        } 
        console.log(bombsArray);
    }
    return bombsArray;
}

// funzione che genera numeri random
function getRndInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// ---------------------------------------------

// al click sul tasto play ha inzio tutto il gioco
const playBtn = document.getElementById('play-btn');

playBtn.addEventListener ('click',gameStart);

function gameStart() {
    
    // utente sceglie livello
    const userRange = document.getElementById('difficult').value;
    console.log(userRange);

    // range per ogni livello
    const minRange = 1;

    let maxRange;

    if (userRange === 1) {
        maxRange = 100;
    } else if (userRange === 2) {
        maxRange = 81;
    } else if (userRange === 3){
        maxRange = 49;
    }

    // utilizzo della funzione che genera le bombe
    let bombs = generateRandomBombs(minRange, maxRange, 16)

    // tentativi possibili
    let possibleAttempts = maxRange - 16;

    // array vuoto da popolare con i numeri giusti che non sono "bombe"
    let rightNumbers = [];
}