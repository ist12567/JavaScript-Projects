let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };
updateScoreElemetn();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = PickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        autoPlayButton = document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoPlayButton = document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    }
}

document.querySelector('.js-rock-button').addEventListener('click', () => playGame('rock'));
document.querySelector('.js-paper-button').addEventListener('click', () => playGame('paper'));
document.querySelector('.js-scissors-button').addEventListener('click', () => playGame('scissors'));
document.querySelector('.js-auto-play-button').addEventListener('click', () => autoPlay());
document.querySelector('.js-reset-score-button').addEventListener('click', () => showResetConfirmation());

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        showResetConfirmation();
    }
});

function playGame(playerMove) {
    const computerMove = PickComputerMove();
    let result = '';

    if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win';
        } else if (computerMove === 'paper') {
            result = 'Tie';
        } else if (computerMove === 'scissors') {
            result = 'You lose';
        }
    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        } else if (computerMove === 'paper') {
            result = 'You lose';
        } else if (computerMove === 'scissors') {
            result = 'You win';
        }
    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose';
        } else if (computerMove === 'paper') {
            result = 'You win';
        } else if (computerMove === 'scissors') {
            result = 'Tie';
        }
    }
    if (result === 'You win') {
        score.wins++;
    } else if (result === 'You lose') {
        score.losses++;
    } else if (result === 'Tie') {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElemetn();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You
        <img src="images/${playerMove}-emoji.png" class="move-icon">
        <img src="images/${computerMove}-emoji.png" class="move-icon">
        Computer`;
}

function updateScoreElemetn() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function PickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }
    return computerMove;
}

function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElemetn();
}

function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-confirm-yes">Yes</button>
        <button class="js-reset-confirm-no">No</button>`;
    document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
    });
    document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
        hideResetConfirmation();
    });
}

function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML = '';
}