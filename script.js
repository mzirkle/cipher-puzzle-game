let secretPhrase = ''; // Stores the secret phrase
let rows = []; // Stores the rows of the puzzle
let currentRow = 0; // Index of the current row
let currentCell = 0; // Index of the current cell in the row
let isSolved = false; // Flag to check if the puzzle is solved

const puzzleContainer = document.getElementById('puzzle-container');
const inputBox = document.getElementById('input-box');
const submitButton = document.getElementById('submit-button');
const resultText = document.getElementById('result-text');

initializeGame();

submitButton.addEventListener('click', handleInput);

function initializeGame() {
  secretPhrase = generateSecretPhrase();
  rows = [];
  currentRow = 0;
  currentCell = 0;
  isSolved = false;
  resultText.textContent = '';

  const words = secretPhrase.split(' ');

  words.forEach(word => {
    const row = document.createElement('div');
    row.className = 'row';

    for (let i = 0; i < word.length; i++) {
      const cell = document.createElement('div');
      cell.className = 'input-cell';
      row.appendChild(cell);
    }

    rows.push(row);
    puzzleContainer.appendChild(row);
  });
}

function generateSecretPhrase() {
  const phrases = ['HELLO WORLD', 'OPENAI IS AWESOME', 'ZODIAC KILLER CIPHER', 'SECRET PHRASE'];
  return phrases[Math.floor(Math.random() * phrases.length)].toUpperCase();
}

function handleInput() {
  if (isSolved) {
    resultText.textContent = 'Puzzle already solved.';
    return;
  }

  const input = inputBox.value.toUpperCase();

  if (input.length !== 1) {
    resultText.textContent = 'Please enter a single letter.';
    return;
  }

  const currentCellElement = rows[currentRow].children[currentCell];
  currentCellElement.textContent = input;

  if (currentCell === rows[currentRow].children.length - 1) {
    currentRow++;
    currentCell = 0;
  } else {
    currentCell++;
  }

  if (currentRow === rows.length) {
    checkSolution();
  }

  inputBox.value = '';
}

function checkSolution() {
  const solution = rows.map(row => Array.from(row.children).map(cell => cell.textContent).join('')).join(' ');
  if (solution === secretPhrase) {
    isSolved = true;
    resultText.textContent = 'Congratulations! You solved the puzzle!';
  } else {
    resultText.textContent = 'Incorrect solution. Please try again.';
  }
}
