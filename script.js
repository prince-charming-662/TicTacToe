let currentPlayer = 'O';
let gridSize = 3;
let grid = [];

function startGame(size) {
    gridSize = size;
    grid = Array(size).fill(null).map(() => Array(size).fill(null));
    document.getElementById('tic-tac-toe-grid').style.gridTemplateColumns = `repeat(${size}, 60px)`;
    document.getElementById('tic-tac-toe-grid').style.gridTemplateRows = `repeat(${size}, 60px)`;
    renderGrid();
    document.getElementById('restart-button').style.display = 'inline-block';
    document.getElementById('select-new-grid').style.display = 'inline-block';
    document.querySelector('.grid-size-selector').style.display = 'none';
}

function renderGrid() {
    const gridElement = document.getElementById('tic-tac-toe-grid');
    gridElement.innerHTML = '';
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => handleClick(i));
        gridElement.appendChild(cell);
    }
}

function handleClick(index) {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    if (grid[row][col] || checkWinner()) return;

    grid[row][col] = currentPlayer;
    const cells = document.querySelectorAll('#tic-tac-toe-grid div');
    cells[index].textContent = currentPlayer;
    cells[index].style.color = currentPlayer === 'O' ? 'blue' : 'red';

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    } else {
        currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
    }
}

function checkWinner() {
    // Check rows, columns, and diagonals
    for (let i = 0; i < gridSize; i++) {
        if (grid[i].every(cell => cell === currentPlayer) || grid.map(row => row[i]).every(cell => cell === currentPlayer)) {
            return true;
        }
    }
    if (grid.every((row, i) => row[i] === currentPlayer) || grid.every((row, i) => row[gridSize - 1 - i] === currentPlayer)) {
        return true;
    }
    return false;
}

function restartGame() {
    startGame(gridSize);
}

function showGridSizeSelector() {
    document.querySelector('.grid-size-selector').style.display = 'block';
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('select-new-grid').style.display = 'none';
}
