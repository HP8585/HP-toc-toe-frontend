  <script setup>
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

onMounted(()=>{
    tippy('#tooltipCon', {
        content: props.content
    });
})
  
  </script>

<template>
      <slot></slot>
      <div id="tooltipCon">{{ content }}</div>
  </template>
  

  
  <style scoped>
  .tooltip {
    position: absolute;
    background: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    z-index: 1;
    /* Add any additional styles you wish */
  }
  </style>