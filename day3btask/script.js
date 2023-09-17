let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;

const playerStatusElement = document.getElementById("player-status");
const player1ScoreElement = document.getElementById("player-1-score");
const player2ScoreElement = document.getElementById("player-2-score");
const rollDiceButton1 = document.getElementById("roll-dice-1");
const rollDiceButton2 = document.getElementById("roll-dice-2");
const diceElement = document.getElementById("dice");
const resetButton = document.getElementById("reset-game");
const balloonContainer = document.getElementById("balloon-container");

diceElement.innerHTML = `<div id="dice-1">
        <div class="dot dot-1"></div>
    </div>`;
function chooseStartingPlayer() {
    currentPlayer = Math.floor(Math.random() * 2) + 1; 
    playerStatusElement.innerText = `Player ${currentPlayer}'s Turn`;

    if (currentPlayer === 1) {
        rollDiceButton1.disabled = false;
        rollDiceButton2.disabled = true;
    } else {
        rollDiceButton1.disabled = true;
        rollDiceButton2.disabled = false;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    chooseStartingPlayer();
});


function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    playerStatusElement.innerText = `Player ${currentPlayer}'s Turn`;
    rollDiceButton1.disabled = !rollDiceButton1.disabled;
    rollDiceButton2.disabled = !rollDiceButton2.disabled;
}

function rollDice() {
    const diceValue = Math.floor(Math.random() * 6) + 1;

    if (diceValue === 1) {
        diceElement.innerHTML = `<div id="dice-${diceValue}">
        <div class="dot dot-1"></div>
    </div>`;
    } else if (diceValue === 2) {
        diceElement.innerHTML = `<div  id="dice-${diceValue}">
    <div class="dot dot-1"></div>
    <div class="dot dot-2"></div>
</div>`;
    } else if (diceValue === 3) {
        diceElement.innerHTML = `<div  id="dice-${diceValue}">
    <div class="dot dot-1"></div>
    <div class="dot dot-2"></div>
    <div class="dot dot-3"></div>
</div>`;
    } else if (diceValue === 4) {
        diceElement.innerHTML = `<div  id="dice-${diceValue}">
    <div class="dot dot-1"></div>
    <div class="dot dot-2"></div>
    <div class="dot dot-3"></div>
    <div class="dot dot-4"></div>
</div>`;
    } else if (diceValue === 5) {
        diceElement.innerHTML = `<div id="dice-${diceValue}">
    <div class="dot dot-1"></div>
    <div class="dot dot-2"></div>
    <div class="dot dot-3"></div>
    <div class="dot dot-4"></div>
    <div class="dot dot-5"></div>
</div>`;
    } else if (diceValue === 6) {
        diceElement.innerHTML = `<div  id="dice-${diceValue}">
     <div class="dot dot-7"></div>
    <div class="dot dot-2"></div>
    <div class="dot dot-3"></div>
    <div class="dot dot-4"></div>
    <div class="dot dot-5"></div>
    <div class="dot dot-6"></div>
</div>`;
    }



    if (currentPlayer === 1) {
        player1Score += diceValue;
        player1ScoreElement.innerText = player1Score;
        if (player1Score >= 30) {
            playerStatusElement.innerText = "Player 1 wins!";
            rollDiceButton1.disabled = true;
            rollDiceButton2.disabled = true;
            createBalloons(20)
            return;
        }
    } else {
        player2Score += diceValue;
        player2ScoreElement.innerText = player2Score;
        if (player2Score >= 30) {
            playerStatusElement.innerText = "Player 2 wins!";
            rollDiceButton1.disabled = true;
            rollDiceButton2.disabled = true;
            createBalloons(20)
            return; 
        }
    }

    if (diceValue !== 7) {
        switchPlayer();
    }
}

function resetGame() {
    currentPlayer = 1;
    player1Score = 0;
    player2Score = 0;
    playerStatusElement.innerText = "Player 1's Turn";
    player1ScoreElement.innerText = "0";
    player2ScoreElement.innerText = "0";
    rollDiceButton1.disabled = false;
    rollDiceButton2.disabled = true;
    diceElement.innerHTML = `<div id="dice-1">
        <div class="dot dot-1"></div>
    </div>`;
}

rollDiceButton1.addEventListener("click", rollDice);
rollDiceButton2.addEventListener("click", rollDice);
resetButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", removeBalloons);
rollDiceButton2.disabled = true;




function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var mt = random(200);
    var ml = random(50);
    var dur = random(5) + 5;
    return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
    for (var i = num; i > 0; i--) {
        var balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles();
        balloonContainer.appendChild(balloon);
    }
}

function removeBalloons() {
    balloonContainer.style.opacity = 0;
    setTimeout(() => {
        while (balloonContainer.firstChild) {
            balloonContainer.firstChild.remove();
        }
        balloonContainer.style.opacity = 1;
    }, 500);
}                                     