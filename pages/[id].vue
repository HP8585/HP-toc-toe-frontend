<script setup>

const socketStore = useSocketStore();
const userStore = useUserStore();
const gameStore = useGameStore();

onMounted(()=>{
    if(gameStore.isInGame){
        setTimeout(() => {
            socketStore.socket?.emit("createGame", gameStore.room, gameStore.name);
        }, 500);
    }
})

function makeMove(index){
    socketStore.socket.emit('makeMove', gameStore.room, index);
    
}

function leaveRoom(){
    socketStore.gameOver = false;

      //middleware
      gameStore.isInGame = false;
      gameStore.room = null;
      gameStore.name = null;

    navigateTo('/',{
        external: true
    });
};

definePageMeta({
    middleware: ['in-game']
});
</script>

<template>
    <ClientOnly>
    <div class="mainGameBox">
        <h1 class="turn">{{ userStore.gameState }}</h1>
        <div class="statusBox">
            <div class="flex flex-col items-center">
                <label>Your name: {{ gameStore.name }}</label>
                <label>Your symbol: {{ userStore.symbol }}</label>
            </div>
            <div class="flex flex-col items-center">
                <label>Opponent name: {{ userStore.oppName || "Waiting..." }}</label>
                <label>Opponent symbol: {{ userStore.symbol === "X" ? "O" : "X" }}</label>
            </div>
        </div>

        <div class="w-fit mx-auto">
            <ul class="cells">
                <li v-for="(cell, idx) in userStore.board" :key="idx"
                class="cell" @click="makeMove(idx)">
                    {{ cell }}
                </li> 
            </ul>
            <button class="leave" @click="leaveRoom">Leave</button>
        </div>
    </div>
</ClientOnly>
</template>

<style scoped>
.mainGameBox{
    @apply w-fit mx-auto mt-20
}
h1.turn{
    @apply text-3xl text-center mb-4 font-bold text-orange-500;
    text-shadow: 0 0 10px #f97316, 0 0 20px #f97316;
}
ul.cells{
    @apply grid grid-cols-3 gap-0.5 w-fit mx-auto mt-6
}
.cell{
    @apply bg-slate-800 w-24 h-24 hover:bg-orange-500 hover:shadow-2xl
    cursor-pointer grid place-items-center text-5xl text-orange-500
    hover:text-slate-100
}
.statusBox{
    @apply flex gap-6 text-left font-semibold text-[1.05rem]
}
button.leave{
    @apply bg-red-600 w-full mt-4 py-1 rounded
}
</style>