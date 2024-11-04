<script setup>
import { v4 } from "uuid";

const userStore = useUserStore();
const socketStore = useSocketStore();

const form = reactive({
    name: "",
    room: v4().toString()
})

const copyBtnHover = ref(false);
const copied = ref(false);
function copyRoom(){
    copy(form.room.toString());
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 3000);
};

function joinRoom(){
    const nameLength = !(form.name.length < 2 || form.name.length > 8);
    const roomLength = !(form.room.length < 6);

    let msg;

    if(form.name != "" && form.room !="" && roomLength && nameLength){
    userStore.name = form.name;
    userStore.room = form.room;

    useGameStore().name = userStore.name;

    socketStore.socket.emit("createGame", userStore.room, userStore.name);

    // navigateTo(`/${userStore.room}`)
    }else{
        if(form.name == "" || form.room ==""){
            msg = "Please fill all the fields";
        }else if(!nameLength){
            msg = "Name must be between 2 and 8 characters long";
        }else if(!roomLength){
            msg = "Room id must be at least 6 characters long";
        }

        alert(msg)
    }
}

definePageMeta({
    middleware: ['in-game']
  })
</script>

<template>
    <div class="mainBox">
        <h1>HP toc-toe</h1>

        <div class="flex flex-col gap-2.5">
            <div class="input-group">
                <input type="text" id="name" v-model="form.name" required autocomplete="off">
                <label for="name">Name</label>
            </div>

            <div class="input-grou">
                <p class="translate-x-2">Room</p>
                <div class="relative">
                    <input type="text" id="room" v-model="form.room" required>
                    <button @mouseover="copyBtnHover = true" @mouseout="copyBtnHover = false"
                    @click="copyRoom" class="copyBtn" v-tooltip.bottom="copied ? 'Copied':'Copy'">
                        <Icon size="22"
                        :name="copyBtnHover ? 'material-symbols:content-copy-outline':'material-symbols:content-copy'"
                        />
                    </button>
                </div>
                <p
                class="w-80 text-xs mt-0.5"
                >Give your friend the generated room-id or paste theirs here to join the room with them</p>
            </div>

            <NuxtLink to="/offline">
                <span class="playOffline">Wanna play offline?</span>
            </NuxtLink>

            <button class="join" @click="joinRoom">Join</button>
        </div>

    </div>
</template>

<style scoped>
.mainBox{
    @apply mx-auto w-fit my-6 flex flex-col gap-6 border px-4 py-6 rounded
    border-gray-800
}
h1{
    @apply text-center text-2xl text-orange-500 font-semibold;
    text-shadow: 0 0 10px #f97316, 0 0 20px #f97316;
    animation: flicker 1.5s infinite alternate;
}

@keyframes flicker {
    0%, 100% {
        text-shadow: 0 0 10px #f97316, 0 0 20px #f97316;
        opacity: 1;
    }
    20% {
        text-shadow: 0 0 5px #f97316, 0 0 10px #f97316;
        opacity: 0.9;
    }
    40% {
        text-shadow: 0 0 15px #f97316, 0 0 25px #f97316;
        opacity: 0.8;
    }
    60% {
        text-shadow: 0 0 5px #f97316, 0 0 10px #f97316;
        opacity: 0.9;
    }
    80% {
        text-shadow: 0 0 10px #f97316, 0 0 20px #f97316;
        opacity: 1;
    }
}
input#room{
    @apply w-80 pl-7
}
.copyBtn{
    @apply grid place-items-center absolute top-1/2 -translate-y-1/2
    left-1 text-slate-700 hover:text-slate-500
}
button.join{
    @apply bg-orange-500 hover:bg-orange-600 py-1 mt-3 rounded shadow-xl;
    box-shadow: 0 0 10px #f97316;
}
span.playOffline{
    @apply text-orange-500 text-sm hover:underline cursor-pointer mt-1
}
</style>