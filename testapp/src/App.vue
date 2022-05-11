<template>
  <div>
    <h1>App</h1>
    <custom-input></custom-input>
    <button @click="getData" class="load-more hidden">load data</button>
    <ul>
      <li class="todo-item" v-for="todo in todos" :key="todo.id">
        {{ todo.id }} - {{ todo.title }} - {{ todo.description }}
      </li>
    </ul>
    <div>
      <h2>Vuex</h2>
      <div>name: {{ name }}</div>
      <div>age: {{ age }}</div>
      <div>arr: {{ arr }}</div>
      <div>arrObj: {{ arrObj }}</div>
    </div>

    <div>
      <!-- <div>isLogin: {{ isLogin }}</div>
      <div>user: {{ user }}</div> -->
    </div>
  </div>
</template>

<script>
import CustomInput from "./components/CustomInput.vue";
import instance from "@/instance";
import TestMixin from "@/mixins/testMixin";
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  components: {
    CustomInput,
  },
  mixins: [TestMixin],
  data: function () {
    return {
      count: 0,
      todos: [],
    };
  },
  methods: {
    getData: async function () {
      let rs = await instance({
        method: "GET",
        url: "/todos",
      });

      this.todos = rs.data;
    },
    getDataPromise: function () {
      return instance({
        method: "GET",
        url: "/todos",
      }).then((rs) => {
        this.todos = rs.data;
      });
    },
    ...mapActions([
      "handleChangeName",
      "handleChangeAge",
      "handleChangeArr",
      "handleChangeArrObj",
    ]),
    ...mapActions("user", ["setLogin", "setUser"]),
  },
  computed: {
    ...mapState(["name", "age", "arr", "arrObj"]),
    ...mapState("USER_MODULE", ["user", "isLogin"]),
  },
  mounted: function () {
    this.getData();
    this.handleChangeName("Lê Minh Cường");
    this.handleChangeAge(23);
  },
};
</script>

<style>
.hidden {
  visibility: hidden;
  width: 0;
  height: 0;
}
</style>
