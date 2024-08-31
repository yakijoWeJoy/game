let player1Code = '';
let player2Code = '';
let currentPlayer = 1;
let isCodeSet = false;

document.getElementById('set-code-btn').addEventListener('click', () => {
    const code = document.getElementById('player-code').value;

    if (code.length === 4 && !isNaN(code)) {
        if (currentPlayer === 1) {
            player1Code = code;
            currentPlayer = 2;
            document.getElementById('player-code').value = '';
            document.getElementById('current-player').textContent = currentPlayer;
        } else if (currentPlayer === 2) {
            player2Code = code;
            isCodeSet = true;
            currentPlayer = 1;
            document.getElementById('set-code').classList.add('hidden');
            document.getElementById('guess-code').classList.remove('hidden');
            document.getElementById('current-player-guess').textContent = currentPlayer;
        }
    } else {
        alert('Please enter a valid 4-digit code.');
    }
});

document.getElementById('guess-code-btn').addEventListener('click', () => {
    const guess = document.getElementById('player-guess').value;
    let feedback = '';

    if (guess.length === 4 && !isNaN(guess)) {
        if (currentPlayer === 1) {
            feedback = checkGuess(guess, player2Code);
            if (feedback.correct === 4) {
                declareWinner(1);
                return;
            }
            currentPlayer = 2;
        } else if (currentPlayer === 2) {
            feedback = checkGuess(guess, player1Code);
            if (feedback.correct === 4) {
                declareWinner(2);
                return;
            }
            currentPlayer = 1;
        }
        document.getElementById('player-guess').value = '';
        document.getElementById('current-player-guess').textContent = currentPlayer;
        document.getElementById('feedback').textContent = `Correct digits in right place: ${feedback.correct}, Correct digits in wrong place: ${feedback.partial}`;
    } else {
        alert('Please enter a valid 4-digit guess.');
    }
});

function checkGuess(guess, code) {
    let correct = 0;
    let partial = 0;
    const guessArr = guess.split('');
    const codeArr = code.split('');

    guessArr.forEach((digit, index) => {
        if (digit === codeArr[index]) {
            correct++;
        } else if (codeArr.includes(digit)) {
            partial++;
        }
    });

    return { correct, partial };
}

function declareWinner(player) {
    document.getElementById('guess-code').classList.add('hidden');
    document.getElementById('winner').classList.remove('hidden');
    document.getElementById('winner-player').textContent = player;
}

document.getElementById('restart-btn').addEventListener('click', () => {
    player1Code = '';
    player2Code = '';
    currentPlayer = 1;
    isCodeSet = false;
    document.getElementById('set-code').classList.remove('hidden');
    document.getElementById('guess-code').classList.add('hidden');
    document.getElementById('winner').classList.add('hidden');
    document.getElementById('player-code').value = '';
    document.getElementById('player-guess').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('current-player').textContent = currentPlayer;
});
