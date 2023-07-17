let secretPhrase = ''; // Stores the secret phrase
let skip = 0; // Number of positions to skip
let attempts = 0; // Number of attempts made

const puzzleText = document.getElementById('puzzle-text');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const resultText = document.getElementById('result-text');

initializeGame();

submitButton.addEventListener('click', checkGuess);

function initializeGame() {
  secretPhrase = generateSecretPhrase();
  skip = Math.floor(Math.random() * 10) + 1; // Generate a skip value between 1 and 10
  attempts = 0;
  puzzleText.textContent = generatePuzzleText(secretPhrase, skip);
  guessInput.value = '';
  resultText.textContent = '';
}

function generateSecretPhrase() {
  const phrases = ['HELLO WORLD', 'OPENAI IS AWESOME', 'ZODIAC KILLER CIPHER', 'SECRET PHRASE'];
  return phrases[Math.floor(Math.random() * phrases.length)].toUpperCase();
}

function generatePuzzleText(phrase, skip) {
  let puzzle = '';
  for (let i = 0; i < phrase.length; i++) {
    if (phrase[i] === ' ') {
      puzzle += ' '; // Preserve spaces in the puzzle
    } else if ((i + 1) % skip === 0) {
      puzzle += phrase[i];
    } else {
      puzzle += '_';
    }
  }
  return puzzle;
}

function checkGuess() {
  const guess = guessInput.value.toUpperCase();
  attempts++;

  if (guess.length !== secretPhrase.length) {
    resultText.textContent = 'Invalid guess length';
    return;
  }

  if (guess === secretPhrase) {
    resultText.textContent = 'Congratulations! You solved the puzzle!';
    submitButton.disabled = true;
  } else {
    resultText.textContent = 'Incorrect guess, try again.';
  }

  guessInput.value = '';
}
