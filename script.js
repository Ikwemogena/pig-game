'use strict';

// selecting elements
// first player score

const player1Element = document.querySelector('.player--0')
const player2Element = document.querySelector('.player--1')

const score0Element = document.querySelector('#score--0');
const score1Element  = document.getElementById('score--1');
const diceElement = document.querySelector('.dice')

// game
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// score element 
const player1CurrentScore = document.querySelector('#current--0');
const player2CurrentScore = document.querySelector('#current--1');

//setting scores to zero, starting conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');


const scores = [0, 0];

let currentScore = 0;
let activePlayer = 0;
let playing = true;

// hide play again button until a game has started
btnNew.classList.add('hidden');

//rolldice function
function rollDice() {
    if(playing) {
        btnNew.classList.remove('hidden');
    // random number
    const dice = Math.trunc(Math.random() * 6) + 1
    // display dice
    diceElement.classList.remove('hidden')
    diceElement.src = `images/dice-${ dice }.png`

    
    // check for a rolled one,if true, switch to next player
    if (dice !== 1){
        // add to the current score
        currentScore += dice;

        document.getElementById(`current--${ activePlayer }`).textContent = currentScore

        // player1CurrentScore.textContent = currentScore;
        // 
    } else {
        switchPlayer();       
        
    }
    }
}

// switch player with hold
function switchPlayer() {
    document.getElementById(`current--${ activePlayer }`).textContent = currentScore
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1: 0;
    // turns on or off.
    player1Element.classList.toggle('player--active'); 
    player2Element.classList.toggle('player--active');
}

btnRoll.addEventListener('click', rollDice);

//hold game to switch function
function holdGame() {
    if(playing) { //if playing game is true then execute code
        //add current score to s=active user
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${ activePlayer }`).textContent = scores[activePlayer];
    
        // check if player's score is >= 100
        if(scores[activePlayer] >= 20) {
            playing = false;
            diceElement.classList.add('hidden');
            console.log('you don win')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
            btnRoll.classList.add('hidden');
            btnHold.classList.add('hidden');
        } else {
            // else finish game, swicth to next player
            switchPlayer(); 
        }
        
    }
}

btnHold.addEventListener('click', holdGame);

// new game
function playAgain() {
    btnNew.classList.add('hidden');
    playing = true
    
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;

    player1CurrentScore.textContent = 0
    player2CurrentScore.textContent = 0

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');

    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');
}

btnNew.addEventListener('click', playAgain);
