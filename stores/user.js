import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', ()=>{
    const name = ref(null);
    const room = ref(null);
    const symbol = ref(null);

    const oppName = ref(null);
    const oppSymbol = ref(null);

    const previousPlayer = ref(null);

    const board = ref(Array(9).fill(null));
    const gameState = ref(null);

    return{
        name,
        room,
        board,
        symbol,
        gameState,
        oppName,
        oppSymbol,
        previousPlayer
    }
})