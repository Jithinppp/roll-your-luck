"use strict";

//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const scoreOneEl = document.querySelector(".score--0");
const scoreTwoEl = document.querySelector(".score--1");
const current0El = document.querySelector(".current--score--0");
const current1El = document.querySelector(".current--score--1");
const scoreEl = document.querySelectorAll(".score");
const diceEl = document.querySelector(".dice");
const btnNewGame = document.querySelector(".new--game");
const btnRollDice = document.querySelector(".roll--dice");
const btnHold = document.querySelector(".hold");
const confetti = document.querySelector(".confetti");

//initial conditions
let currentScore = 0;
let score = [0, 0];
let activePlayer = 0; //0 for player-1 and 1 for player-2
let playing = true;

const initialConditions = function () {
  scoreTwoEl.textContent = 0;
  scoreOneEl.textContent = 0;
  diceEl.classList.add("hidden");
  confetti.classList.add("hidden");

  diceEl.classList.add("hidden");
  currentScore = 0;
  score = [0, 0];
  activePlayer = 0;
  confetti.classList.add("hidden");
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  scoreOneEl.textContent = 0;
  scoreTwoEl.textContent = 0;
  player0El.classList.add("active--player");
  player1El.classList.remove("active--player");
  player0El.classList.remove("winner");
  player1El.classList.remove("winner");
};
initialConditions();

//functions
const toggleActivePlayer = function () {
  currentScore = 0;
  document.querySelector(`.current--score--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle("active--player");
  player1El.classList.toggle("active--player");
};

const rollDice = function () {
  if (playing) {
    //1.generate random no b/w 1-6
    const dice = Math.floor(Math.random() * 6) + 1;

    //2.display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3.if the random no = 1 switch player

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`.current--score--${activePlayer}`).textContent =
        currentScore;
    } else {
      toggleActivePlayer();
      //switch player
    }
  }
};

const btnHoldHandler = function () {
  if (playing) {
    //add the current score to the active player's score
    score[activePlayer] += currentScore;
    //update in the score DOM
    document.querySelector(`.score--${activePlayer}`).textContent =
      score[activePlayer];
    //change the active player
    if (score[activePlayer] >= 50) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("active--player");
      diceEl.classList.add("hidden");
      confetti.classList.remove("hidden");

      // alert(`player ${!activePlayer ? "1" : "2"} won`);

      playing = false;
    } else {
      toggleActivePlayer();
    }
  }
};

const resetGame = function () {
  console.log("resetting game");
  initialConditions();
};

//rolling the dice
btnRollDice.addEventListener("click", rollDice);
btnHold.addEventListener("click", btnHoldHandler);
btnNewGame.addEventListener("click", resetGame);
