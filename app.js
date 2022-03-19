const gameLoop = (() => {
  const xClass = 'x';
  const oClass = 'o';
  let playerOneTurn;

  const GameBoard = () => {
    const board = document.getElementById('board');
    const cells = document.querySelector('[data-cell]');
    const winningCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [0, 4, 8],
      [2, 4, 6]
    ]
    return {
      board,
      cells,
      winningCombo
    }
  };

  const handleClick = ((e) => {
    const cell = e.target;
    const currentClass = playerOneTurn ? xClass : oClass;
    placeMark(cell, currentClass);
  })()

  const placeMark = ((cell, currentClass) => {
    cell.classList.add(currentClass)
  })()

  const resetBoard = (() => {
    cells.forEach(cell => {
      cell.classList.remove(xClass)
      cell.classList.remove(oClass)
      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, {
        once: true
      });
    })
  })()

  const setHoverClass = (() => {
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    if (playerOneTurn) {
      board.classList.add(xClass);
    } else {
      board.classList.add(oClass);
    }
  })();

  const startGame = (() => {
    playerOneTurn = false;
    resetBoard();
    setHoverClass();
  })()

  const showResult = () => {
    const resultMessage = document.getElementById('game-result');
    const resultText = document.querySelector('[data-game-result-text]')
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', startGame);
  }




})();