import { defineStore } from "pinia";

export const useSocketStore = defineStore('socketStore', ()=>{
    const socket = ref(null);

    const gameOver = ref(false);
    const modalStatus = ref("Are you willing to play again?");

    const isInGame = ref(false); ; //meant for middleware

    return{
        socket,
        gameOver,
        modalStatus,
        isInGame
    }
})