
export const difficulty = ()=> useState('difficulty', ()=> "superDifficult");
export const board = ()=> useState('boardOffline', ()=> Array(9).fill(null));
export const currentPlayer = ()=> useState('currentPlayerOffline', ()=> 'X'); // Player starts with 'X'
export const statusMessage = ()=> useState('statusMsgOffline', ()=> 'Your Turn');
export const aiTurn = ()=> useState('aiTurnOffline', ()=> false);

export const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board().value[a] && board().value[a] === board().value[b] && board().value[a] === board().value[c]) {
        return board().value[a];
      }
    }
    
    if (!board().value.includes(null)) {
      return 'Draw';
    }
    
    return null; // Game is ongoing
  };

export const makeMoveOffline = (index) => {
    if (!board().value[index] && !checkWinner() && !aiTurn().value) {
      board().value[index] = currentPlayer().value;
      const winner = checkWinner();
      if (winner) {
        statusMessage().value = winner === 'Draw' ? "It's a draw!" : `${winner} wins!`;
        return;
      }
      // Switch turn
      currentPlayer().value = currentPlayer().value === 'X' ? 'O' : 'X';

      if (currentPlayer().value === 'O') {
        statusMessage().value = "AI turn";
        aiTurn().value = true;
        setTimeout(() => {
            aiMove();
            aiTurn().value = false;
        }, 500);
      }

    }
  };

export const aiMove = () => {
    const current = currentPlayer().value;

    // Function to get an empty cell indices
    const getEmptyCells = () => {
        return board().value.map((val, index) => (val === null ? index : null)).filter(v => v !== null);
    };

    const makeMove = (index, player) => {
        board().value[index] = player;
    };

    const undoMove = (index) => {
        board().value[index] = null;
    };

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board().value[a] && board().value[a] === board().value[b] && board().value[a] === board().value[c]) {
                return board().value[a]; // 'X' or 'O'
            }
        }
        
        if (!board().value.includes(null)) {
            return 'Draw';
        }
        
        return null; // Game is ongoing
    };

    const findWinningMove = (player) => {
        const emptyCells = getEmptyCells();
        for (const index of emptyCells) {
            makeMove(index); // Temporarily make the move
            if (checkWinner() === player) {
                undoMove(index);
                return index;
            }
            undoMove(index);
        }
        return null; // No winning move
    };

    const minimax = (depth, isMaximizing) => {
        let winnerResult = checkWinner();
        if (winnerResult === 'O') return 10 - depth; // AI win
        if (winnerResult === 'X') return depth - 10; // Player win
        if (getEmptyCells().length === 0) return 0; // Draw

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (const index of getEmptyCells()) {
                makeMove(index, 'O');
                let score = minimax(depth + 1, false);
                undoMove(index);
                bestScore = Math.max(score, bestScore);
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (const index of getEmptyCells()) {
                makeMove(index, 'X');
                let score = minimax(depth + 1, true);
                undoMove(index);
                bestScore = Math.min(score, bestScore);
            }
            return bestScore;
        }
    };

    const getBestMove = () => {
        let bestScore = -Infinity;
        let bestMove;
        for (const index of getEmptyCells()) {
            makeMove(index, 'O');
            let score = minimax(0, false);
            undoMove(index);
            if (score > bestScore) {
                bestScore = score;
                bestMove = index; // Store the index of the best move
            }
        }
        return bestMove;
    };

    // Determine the AI move based on the current difficulty level
    if (difficulty().value === 'superDifficult') {
        const bestMove = getBestMove();
        makeMove(bestMove, 'O');
    } else if (difficulty().value === 'difficult') {
        const winningMove = findWinningMove('O') || findWinningMove('X');
        
        if (winningMove !== null) {
            makeMove(winningMove, 'O');
        } else {
            const emptyCells = getEmptyCells();
            const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            makeMove(randomMove, 'O');
        }
    } else {
        // Simple AI strategy
        const emptyCells = getEmptyCells();
        const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        makeMove(randomMove, 'O');
    }

    const winner = checkWinner();
    if (winner) {
        statusMessage().value = winner === 'Draw' ? "It's a draw!" : `${winner} wins!`;
        return;
    }

    currentPlayer().value = current === 'X' ? 'O' : 'X';
    statusMessage().value = "Your Turn";
};

