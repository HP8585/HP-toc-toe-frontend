<script setup>
import io from "socket.io-client";

const socketStore = useSocketStore();
const userStore = useUserStore();
const gameStore = useGameStore();

const buttonsShown = ref(true);

onMounted(()=>{
  socketStore.socket = io("https://hp-toc-toe-backend.onrender.com/");
  
  socketStore.socket?.on("connect", () => {
        console.log("Connected to the server");
    });

    socketStore.socket?.on("updateGame", (data)=> updateGame(data));

    socketStore.socket?.on("notEnoughPlayers", () =>{
            alert("Not enough players")
    });

    socketStore.socket?.on("playAgainDeclined", ()=>{
    console.log("Play Again Declined")
      socketStore.modalStatus = "Your opponent rejected the game :(";
      buttonsShown.value = false;

      setTimeout(() => {
        gameStore.isInGame = false;
        gameStore.room = null;
        gameStore.name = null;

        socketStore.gameOver = false;
        buttonsShown.value = true;
        navigateTo('/',{
          external: true
        });
      }, 2000);
    });

    socketStore.socket?.on("previousPlayer", (player)=>{
      userStore.previousPlayer = player;
      console.log("Previous player")
    });

    socketStore.socket?.on("roomFull", ()=> alert("Room full"));

    socketStore.socket?.on("enteredRoom", (roomName)=> {
      gameStore.isInGame = true;
      gameStore.room = roomName;
      navigateTo(`/${roomName}`)
    })

});


  function playAgain(answer){
    if(answer === true){
      socketStore.socket?.emit("playAgain", useGameStore().room, true);
      socketStore.modalStatus = "Waiting for your opponent to accept the game..."
      buttonsShown.value = false;
    }else{
      socketStore.socket?.emit("playAgain", useGameStore().room, false);
      socketStore.gameOver = false;
      buttonsShown.value = true;

      //middleware
      useGameStore().isInGame = false;
      useGameStore().room = null;
      useGameStore().name = null;

      setTimeout(() => {
        navigateTo('/',{
          external: true
        });
      }, 2000);

    }
  };

  watchEffect(()=>{
    if(socketStore.gameOver) buttonsShown.value = true;
  });


</script>

<template>
  <div>
    <NuxtPage/>

    <UModal v-model="socketStore.gameOver" :overlay="false" prevent-close>
      <div class="modalStyle">
        <h1>{{ socketStore.modalStatus }}</h1>

        <div class="flex gap-4 mt-4" v-show="buttonsShown">
          <button class="No" @click="playAgain(false)">No</button>
          <button class="Yes" @click="playAgain(true)">Yes</button>
        </div>
      </div>
    </UModal>
  </div>
</template>
<style>
.modalStyle{
  @apply bg-slate-900 p-2 rounded flex flex-col justify-center items-center
}
.modalStyle h1{
  @apply text-center font-semibold text-lg text-orange-500;
  text-shadow: 0 0 10px #f97316, 0 0 20px #f97316;
}

.modalStyle .Yes{
  @apply px-4 py-0.5 text-white bg-orange-500 hover:bg-orange-600
  rounded-sm;
  box-shadow: 0 0 10px #f97316;
}
.modalStyle .No{
  @apply px-4 py-0.5 text-white bg-red-500 hover:bg-red-600
  rounded-sm;
  box-shadow: 0 0 10px #ef4444;
}
</style>