let secretPhrase = ''; // Stores the secret phrase
let rows = []; // Stores the rows of the puzzle
let columns = []; // Stores the columns of the puzzle
let isSolved = false; // Flag to check if the puzzle is solved
let selectedCell = null; // Reference to the currently selected cell

const puzzleContainer = document.getElementById('puzzle-container');
const resultText = document.getElementById('result-text');

initializeGame();

puzzleContainer.addEventListener('click', handleCellClick);
document.addEventListener('keydown', handleKeyPress);

function initializeGame() {
  secretPhrase = generateSecretPhrase();
  rows = secretPhrase.split(' ');
  columns = [];
  isSolved = false;
  resultText.textContent = '';

  const maxRowLength = Math.max(...rows.map(row => row.length));

  for (let col = 0; col < maxRowLength; col++) {
    const column = [];
    for (let row = 0; row < rows.length; row++) {
      const letter = row < rows.length && col < rows[row].length ? rows[row][col] : '';
      column.push(letter);
    }
    columns.push(column);
  }

  for (let row = 0; row < rows.length; row++) {
    const rowElement = document.createElement('div');
    rowElement.className = 'row';

    const rowTitleElement = document.createElement('div');
    rowTitleElement.className = 'row-title';
    rowTitleElement.textContent = `${row + 1}.`;

    rowElement.appendChild(rowTitleElement);

    for (let col = 0; col < columns.length; col++) {
      const letter = columns[col][row];
      const cellElement = document.createElement('div');
      cellElement.className = 'cell';
      cellElement.textContent = letter;
      cellElement.setAttribute('data-row', row);
      cellElement.setAttribute('data-col', col);
      rowElement.appendChild(cellElement);
    }

    puzzleContainer.appendChild(rowElement);
  }
}

function generateSecretPhrase() {
  const phrases = ['HELLO WORLD', 'OPENAI IS AWESOME', 'ZODIAC KILLER CIPHER', 'SECRET PHRASE'];
  return phrases[Math.floor(Math.random() * phrases.length)].toUpperCase();
}

function handleCellClick(event) {
  if (isSolved) {
    resultText.textContent = 'Puzzle already solved.';
    return;
  }

  const cell = event.target;
  if (cell.className === 'cell') {
    selectedCell = cell;
    cell.classList.add('selected');
  } else {
    selectedCell = null;
    document.querySelectorAll('.cell.selected').forEach(el => el.classList.remove('selected'));
  }
}

function handleKeyPress(event) {
  if (selectedCell && event.key.match(/^[a-z]$/i)) {
    selectedCell.textContent = event.key.toUpperCase();
    const row = parseInt(selectedCell.getAttribute('data-row'), 10);
    const col = parseInt(selectedCell.getAttribute('data-col'), 10);
    columns[col][row] = event.key.toUpperCase();
    checkSolution();
  }
}

function checkSolution() {
  const solution = columns.map(column => column.join('')).join(' ');
  if (solution === secretPhrase) {
    isSolved = true;
    resultText.textContent = 'Congratulations! You solved the puzzle!';
  } else {
    resultText.textContent = 'Incorrect solution. Please try again.';
  }
}

