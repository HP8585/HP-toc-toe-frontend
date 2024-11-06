<script setup>
const gameStore = useGameStore();
const conf = ref(null);

const { load, onLoaded, status } = useScriptNpm({
    packageName: 'js-confetti',
    file: 'dist/js-confetti.browser.js',
    version: '0.12.0',
    scriptOptions:{
        use(){
            return{
                JSConfetti: window.JSConfetti
            }
        }
    }
});

onMounted(()=>{
    load()
    onLoaded(({ JSConfetti })=>{
        gameStore.jsConfetti = new JSConfetti();
    })
});


</script>

