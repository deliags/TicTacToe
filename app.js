const gameLoop = (() => {
  let playerTwoTurn;
  const xClass = 'x';
  const oClass = 'o';
  const cells = document.querySelectorAll('[data-cell]');
  const resultMessage = document.getElementById('game-result');
  const resultText = document.querySelector('[data-game-result-text]');
  const restartBtn = document.getElementById('restartBtn');

  const GameBoard = () => {
    const board = document.getElementById('board');
    const winningCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [0, 4, 8],
      [2, 4, 6]
    ];
    return {
      board,
      cells,
      winningCombo
    };
  };

  const setHoverClass = () => {
    board.classList.remove(xClass);
    board.classList.remove(oClass);
    if (playerTwoTurn) {
      board.classList.add(oClass);
    } else {
      board.classList.add(xClass);
    }
  };

  function handleClick(e) {
    const cell = e.target;
    const currentClass = playerTwoTurn ? oClass : xClass;
    placeMark(cell, currentClass);
    //to take out
    if (checkWin(currentClass)) {
      showResult(false);
    } else if (isDraw()) {
      showResult(true);
    } else {
      swapTurns();
      setHoverClass();
    }
    return {
      cell,
      currentClass
    }
  };

  const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
  };

  const resetBoard = () => {
    cells.forEach(cell => {
      cell.classList.remove(xClass);
      cell.classList.remove(oClass);
      cell.removeEventListener('click', handleClick);
      cell.addEventListener('click', handleClick, {
        once: true
      });
    });
  };

  const startGame = () => {
    playerTwoTurn = false;
    resetBoard();
    setHoverClass();
    resultMessage.classList.remove('show')
  };

  const showResult = draw => {
    restartBtn.addEventListener('click', startGame);

    if (draw) {
      resultText.textContent = 'Draw!';
    } else {
      resultText.textContent = `${playerTwoTurn ? "Player Two" : "Player One"} Wins!`;
    }
    resultMessage.classList.add('show');
  };



  const isDraw = () => {
    return [...cells].every(cell => {
      return cell.classList.contains(xClass) || cell.classList.contains(oClass);
    })
  }

  const swapTurns = () => {
    playerTwoTurn = !playerTwoTurn;
  }

  const checkWin = (currentClass) => {
    return GameBoard().winningCombo.some(combo => {
      return combo.every(index => {
        return cells[index].classList.contains(currentClass);
      })
    })
  }

  startGame();
})();