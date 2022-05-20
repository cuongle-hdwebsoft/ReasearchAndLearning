<template>
  <button @click="handleClickButton">
    <slot name="default">Custom Button </slot> {{ count }}
  </button>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  name: 'CustomButton',
  setup: function() {
    const count = ref(0);

    const handleClickButton = function() {
      count.value++
    }
    
    return {
      count,
      handleClickButton
    }
  }
}
</script>