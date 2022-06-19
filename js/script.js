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

function gameStart() {;
    // grid 
    const mainGrid = document.getElementById('grid');

    // risultato punteggio
    const resultMessage = document.getElementById('result-message');

    // grid vuota dopo ogni click e senza classi, messaggio svuotato
    mainGrid.innerHTML = '';
    mainGrid.classList = '';
    resultMessage.innerHTML = '';
    
    // utente sceglie livello
    const userRange = document.getElementById('difficult').value;
    console.log(userRange);

    // range per ogni livello
    const minRange = 1;

    // variabile per creare la classe che specifica la difficoltà
    let gridClass;

    let maxRange;

    if (userRange === 'easy') {
        maxRange = 100;
        gridClass = 'easy';
    } else if (userRange === 'medium') {
        maxRange = 81;
        gridClass = 'medium';
    } else if (userRange === 'crazy'){
        maxRange = 49;
        gridClass = 'crazy';
    }

    // utilizzo della funzione che genera le bombe
    let bombs = generateRandomBombs(minRange, maxRange, 16)

    // tentativi possibili
    let possibleAttempts = maxRange - 16;

    // array vuoto da popolare con i numeri giusti che non sono "bombe"
    let rightNumbers = [];

    // genero la grid con una funzione
    

    generateGrid();

    function generateGrid() {
        // aggiungere classe alla griglia per decidere le dimensioni degli square
        mainGrid.classList.add(gridClass);
        for (let i = 1; i <= maxRange; i++) {
            // creare il div
            const singleDiv = document.createElement('div');

            // aggiungo la classe al div
            singleDiv.classList.add('square');

            // aggiungo il contenuto del div
            singleDiv.innerHTML = `<span>${i}</span>`;

            // infine appendo il div alla grid
            mainGrid.append(singleDiv);

            // click sul div
            singleDiv.addEventListener('click', cellClick)
            
        }
        
    }

    // funzione che esegue le azioni al click su una singola cella
    function cellClick() {
        // la singola cella non deve essere cliccabile più volte
        this.style.pointerEvents = 'none';
        // seleziono il numero cliccato dall'utente
        let singleCellClick = parseInt(this.querySelector('span').innerHTML);
        console.log(singleCellClick)

        // se il numero cliccato dall'utente è presente nelle "bombe" la cella si colorerà di rosso
        if (bombs.includes(singleCellClick)) {
            this.classList.add('red');
            resultMessage.innerHTML = `HAI PERSO! HAI INDOVINATO ${rightNumbers.length} NUMERI`;
        } else if(!rightNumbers.includes(singleCellClick)){
            rightNumbers.push(singleCellClick);
            this.classList.add('lightblue')
        }
    
        // se il numero di volte che l'utente inserisce un numero (nell'array vuoto con i numeri giusti), è uguale al massimo di tentativi possibili --> gioco finito --> messaggio 
        if (rightNumbers.length === possibleAttempts) {
            resultMessage.innerHTML = 'HAI VINTO!';
        }


    }


}