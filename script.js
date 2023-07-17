const words = ['ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'SCORPIO', 'SAGITTARIUS', 'CAPRICORN', 'AQUARIUS', 'PISCES']; // Array of zodiac signs
let selectedWord = ''; // Stores the selected word
let attempts = 0; // Number of attempts made

const puzzleText = document.getElementById('puzzle-text');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const resultText = document.getElementById('result-text');

initializeGame();

submitButton.addEventListener('click', checkGuess);

function initializeGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  attempts = 0;
  puzzleText.textContent = generatePuzzleText(selectedWord);
  guessInput.value = '';
  resultText.textContent = '';
}

function generatePuzzleText(word) {
  let puzzle = '';
  for (let i = 0; i < word.length; i++) {
    puzzle += '_';
  }
  return puzzle;
}

function checkGuess() {
  const guess = guessInput.value.toUpperCase();
  attempts++;

  if (guess.length !== selectedWord.length) {
    resultText.textContent = 'Invalid guess length';
    return;
  }

  if (guess === selectedWord) {
    resultText.textContent = 'Congratulations! You solved the puzzle!';
    submitButton.disabled = true;
  } else {
    resultText.textContent = 'Incorrect guess, try again.';
  }

  guessInput.value = '';
}

