

export const updateGame = (data)=>{
    // console.log('hahah', data);


    const socketStore = useSocketStore();
    const userStore = useUserStore();
    const gameStore = useGameStore();

    socketStore.gameOver = false;
    socketStore.modalStatus = "Are you willing to play again?";

    userStore.oppName = data.players.find(p=> p.id !== socketStore.socket.id)?.name;

    userStore.symbol = data.players.find(p=> p.id === socketStore.socket.id)?.symbol;
    userStore.oppSymbol = data.players.find(p=> p.id !== socketStore.socket.id)?.symbol;

    userStore.board = data.board;

    //Find current players name
    const currentPlayer = data.currentPlayer === socketStore.socket.id ? useGameStore().name :
    data.players.find(p=> p.id !== socketStore.socket.id)?.name;

    let winner = null;
    userStore.gameState = `Current turn: ${currentPlayer}`;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    const board = userStore.board;
    
    // Check for a winner first
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) { // Each board cell is actually the player's name
            winner = board[a];
        }
    });
    
    if (winner) {
        userStore.gameState = `${winner == userStore.symbol ? (useGameStore().name || userStore.name) : userStore.oppName} wins!`;
        socketStore.gameOver = true;
    } else if (board.every(cell => cell)) { // Check for a draw only if there's no winner
        userStore.gameState = "It's a draw!";
        socketStore.gameOver = true;
    }

    if(winner == userStore.symbol){
        if(gameStore.jsConfetti !== (null || undefined)){
            gameStore.jsConfetti?.addConfetti({
                emojis: ["❌", "⭕", "🎉"]
            })
        }
    }

    if(data.previousPlayer !== null){
        userStore.previousPlayer = data.previousPlayer;
    }
    
}