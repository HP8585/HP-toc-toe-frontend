export const useGameStore = defineStore('gameStore', ()=>{

    const isInGame = ref(false); ; //meant for middleware
    const room = ref(null);
    const name = ref(null);

    const jsConfetti = ref(null);

    return{
        isInGame,
        room,
        name,
        jsConfetti
    }
},{
    persist:{
        storage: persistedState.localStorage,
    }
}
)
