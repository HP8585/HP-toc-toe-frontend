<script setup>
  
  
  const resetGame = () => {
    board().value = Array(9).fill(null);
    currentPlayer().value = 'X';
    statusMessage().value = "Your Turn";
  };
  
  watch(board().value, () => {
    const winner = checkWinner();
    if (winner) {
      currentPlayer().value = null; // Stop further moves if someone has won
    }
  });
  
  const difficulties = [{
    title: 'easy',
    value: 'easy'
  },
  {
    title: 'normal',
    value: 'difficult'
  },
  {
    title: 'ultimate',
    value: 'superDifficult'
  }];
</script>

<template>
    <div class="tic-tac-toe">
      <h1 class="status">{{ statusMessage().value }}</h1>

      <ul class="difficulties">
        <li v-for="item in difficulties" class="difficulty"
        @click="difficulty().value = item.value"
        :class="{'active': item.value === difficulty().value}">
          {{ item.title }}
        </li>
      </ul>

      <ul class="board">
        <li
          v-for="(cell, index) in board().value"
          :key="index"
          class="cell"
          @click="makeMoveOffline(index)"
        >
          {{ cell }}
        </li>
      </ul>

      <button @click="resetGame" class="playAgain">Play Again</button>
    </div>
  </template>
  
  <style scoped>
  .tic-tac-toe {
    @apply flex flex-col items-center mt-10 mx-auto w-fit
  }
  .board {
    @apply grid grid-cols-3 gap-0.5
  }
  .cell{
    @apply bg-slate-800 w-24 h-24 hover:bg-orange-500 hover:shadow-2xl
    cursor-pointer grid place-items-center text-5xl text-orange-500
    hover:text-slate-100
}

  h1.status{
    @apply text-3xl text-center mb-4 font-bold text-orange-500;
    text-shadow: 0 0 10px #f97316, 0 0 20px #f97316;
  }

  /* Difficulties */
  .difficulties{
    @apply flex justify-between gap-1 w-full mb-4
  }
  .difficulty{
    @apply text-center w-full border border-slate-800 rounded
    bg-slate-900 text-slate-500 cursor-pointer
  }
  .difficulty.active{
    @apply bg-orange-500 border-orange-600 text-slate-100;
    box-shadow: 0 0 2px #f97316, 0 0 10px #f97316;
  }
  button.playAgain{
    @apply bg-blue-500 text-slate-100 w-full py-2 rounded cursor-pointer
    hover:bg-blue-600 mt-4;
    text-shadow: 0 0 20px #2563eb, 0 0 20px #2563eb;
  }
</style>
  