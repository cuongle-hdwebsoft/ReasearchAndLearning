<template>
  <div>
    <h1>App</h1>
    <custom-input></custom-input>
    <button @click="getData" class="load-more hidden">load data</button>
    <ul>
      <li
        class="todo-item"
        v-for="todo in todos" 
        :key="todo.id">
        {{ todo.id }} - {{ todo.title }} - {{ todo.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import CustomInput from './components/CustomInput.vue'
import instance from '@/instance'
import TestMixin from '@/mixins/testMixin'

export default {
  name: 'App',
  components: {
    CustomInput
  },
  mixins: [TestMixin],
  data: function() {
    return {
      count: 0,
      todos: []
    }
  },
  methods: {
    getData: async function() {
      let rs = await instance({
        method: 'GET',
        url: '/todos'
      })

      this.todos = rs.data
    }
  },
  mounted: function() {
    this.getData()
  }
}
</script>

<style>
.hidden {
  visibility: hidden;
  width: 0;
  height: 0;
}
</style>
