<template>
  <div>
    <button @click="toggle">Toggle</button>
    <div v-if="show1">Hello, world!</div>
    <div v-if="show2">Hello, world22222!</div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const show1 = ref(true)
    const show2 = ref(false)
    function toggle() {
      if(show1.value===true){
        show2.value=true;
        show1.value=false;
      }
      else{
        show1.value=true;
        show2.value=false;
      }
    }

    return {
      show1,
      show2,
      toggle
    }
  }
}
</script>
