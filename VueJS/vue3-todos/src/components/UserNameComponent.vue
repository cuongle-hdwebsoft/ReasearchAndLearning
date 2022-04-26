<template>
  <div>
    <label for="">username</label>
    <input
      :value="username"
      @input="$emit('update:username', $event.target.value)"
      type="text"
      placeholder="username"
    />
    {{ username }}
  </div>
  <div>
    <label for="">password</label>
    <input
      :value="password"
      @input="$emit('update:password', $event.target.value)"
      type="text"
      placeholder="password"
    />
    {{ password }}
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["username", "password"]);
defineEmits(["update:username", "update:password"]);
</script>

<script>
export default {
  mounted: function () {
    console.log(this);
  },
};

// <CustomInput v-model="searchText" />
/* 
    By default, v-model on a component uses modelValue as the prop and update:modelValue as the event
    
    <CustomInput 
      :value='username'
      @input='username = $event.target.value'
    /> 

    <CustomInput 
      :value='username'
      @update:value='(param) => value = param'
    /> 
*/
</script>