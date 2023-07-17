const words = ['HELLO', 'WORLD', 'OPENAI', 'SKIPCIPHER']; // Array of words for skip cipher
let selectedWord = ''; // Stores the selected word
let skip = 0; // Number of positions to skip
let attempts = 0; // Number of attempts made

const puzzleText = document.getElementById('puzzle-text');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const resultText = document.getElementById('result-text');

initializeGame();

submitButton.addEventListener('click', checkGuess);

function initializeGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  skip = Math.floor(Math.random() * selectedWord.length);
  attempts = 0;
  puzzleText.textContent = generatePuzzleText(selectedWord, skip);
  guessInput.value = '';
  resultText.textContent = '';
}

function generatePuzzleText(word, skip) {
  let puzzle = '';
  for (let i = 0; i < word.length; i++) {
    if (i % skip === 0) {
      puzzle += word[i];
    } else {
      puzzle += '_';
    }
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
