const chessboard = document.querySelector('.chessboard');
const turnIndicator = document.querySelector('.turn-indicator');

const initialPieces = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

let currentPlayer = 'white';
let selectedPiece = null;
let selectedSquare = null;

// Create the chessboard
toDrawBoard();
function toDrawBoard() {
    chessboard.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.row = row;
            square.dataset.col = col;
            
            // Set board colors to green
            square.style.backgroundColor = (row + col) % 2 === 0 ? '#769656' : '#eeeed2';

            const piece = initialPieces[row][col];
            if (piece) {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add('piece');
                pieceElement.textContent = piece;
                pieceElement.dataset.player = row < 2 ? 'black' : 'white';
                pieceElement.setAttribute('draggable', true);
                pieceElement.style.color = row < 2 ? '#ddd' : '#222'; // Darken white, lighten black
                pieceElement.style.fontWeight = 'bold';
                pieceElement.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.6)';
                pieceElement.addEventListener('dragstart', dragStart);
                pieceElement.addEventListener('dragend', dragEnd);
                square.appendChild(pieceElement);
            }

            square.addEventListener('dragover', dragOver);
            square.addEventListener('drop', drop);
            square.addEventListener('dragenter', dragEnter);
            square.addEventListener('dragleave', dragLeave);
            chessboard.appendChild(square);
        }
    }
}

function dragStart(e) {
    selectedPiece = e.target;
    selectedSquare = e.target.parentElement;
    setTimeout(() => (e.target.style.display = 'none'), 0);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    if (e.target.classList.contains('square')) {
        e.target.classList.add('highlight');
    }
}

function dragLeave(e) {
    if (e.target.classList.contains('square')) {
        e.target.classList.remove('highlight');
    }
}

function drop(e) {
    e.preventDefault();
    if (selectedPiece && e.target.classList.contains('square')) {
        if (selectedPiece.dataset.player === currentPlayer) {
            e.target.appendChild(selectedPiece);
            e.target.classList.remove('highlight');
            switchTurn();
        }
    }
}

function dragEnd(e) {
    setTimeout(() => {
        e.target.style.display = 'block';
        selectedPiece = null;
        selectedSquare = null;
    }, 0);
}

function switchTurn() {
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    turnIndicator.textContent = `${currentPlayer === 'white' ? "White's" : "Black's"} Turn`;
}