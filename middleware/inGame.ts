

export default defineNuxtRouteMiddleware((to, from)=>{
    const gameStore = useGameStore();

    if(gameStore.isInGame){
        if(to.fullPath === '/'){
            return navigateTo(`/${gameStore.room}`)
        }
    }else if(!gameStore.isInGame){
        if(to.fullPath !== '/'){
            return navigateTo('/')
        }
    }
})