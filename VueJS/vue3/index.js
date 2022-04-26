const app = Vue.createApp({
  setup() {
    const state = Vue.reactive({ count: 0 });
    const count = Vue.ref(0);
    const ids = Vue.reactive(
      Array.from({ length: 5 }).map((_, index) => index)
    );
    const fruits = Vue.reactive(
      Array.from({ length: 5 }).map((_, index) => "Fruit" + index)
    );
    const lengthFruit = Vue.computed(function () {
      return fruits.length;
    });

    // reactive
    const student = Vue.reactive({
      name: "John",
      age: 23,
      friends: [
        {
          id: 1,
          name: "Annie",
        },
      ],
    });

    const student2 = {
      name: "John",
      age: Vue.ref(23),
      friends: [
        {
          id: 1,
          name: "Annie",
        },
      ],
    };

    const answer = Vue.ref("");

    const inputRef = Vue.ref(null);

    // do not reactive
    // const student = Vue.shallowReactive({
    //   name: "John",
    //   age: 23,
    //   friends: [
    //     {
    //       id: 1,
    //       name: "Annie",
    //     },
    //   ],
    // });

    const handleIncrement = function () {
      state.count++;

      Vue.nextTick(function () {
        console.log("Updated DOM");
      });
    };

    Vue.onMounted(function () {
      console.log(this);
      console.log("app mounted");
    });

    Vue.onUpdated(function () {
      console.log("app updated");
    });

    Vue.onUnmounted(function () {
      console.log("app unmounted");
    });

    const debounce = function (cb, delay) {
      let t = null;

      return function (newValue, oldValue) {
        if (t) {
          clearTimeout(t);
        }

        console.log(newValue, oldValue);

        t = setTimeout(() => {
          cb();
        }, delay);
      };
    };

    // watch 1 biến
    // watch array biến | a getter function
    // https://vuejs.org/guide/essentials/watchers.html#basic-example
    // watch dùng strict comparation
    // https://vuejs.org/guide/essentials/watchers.html#eager-watchers
    Vue.watch(
      answer,
      debounce(function () {
        console.log("Replying...");
      }, 1000)
    );

    // nếu dùng getter function thì
    // nếu như student trước và student sau khác nhau thì nó sẽ chạy
    // do mutation nên student trc và sau không thay đổi
    // combo getter function + deep = true
    // còn lại thì có thể dùng thẳng luôn object nó mặc định là deep luôn
    // When you call watch() directly on a reactive object, it will implicitly create a deep watcher
    Vue.watch(
      () => student,
      function (newValue, oldValue) {
        console.log(newValue, oldValue);
      },
      {
        deep: true,
        flush: "post",
      }
    );

    // watch - DOM update

    Vue.watchEffect(function () {});

    return {
      ids,
      inputRef,
      fruits,
      answer,
      lengthFruit,
      count,
      state,
      student,
      student2,
      handleIncrement,
    };
  },
  template: `
    <div>
      <button @click='handleIncrement'>{{ state.count }}</button>
      <div>
        <h2>Deep reactive</h2>
        <div @click='student.name += " changed"'>student.name {{ student.name }}</div>
        <div @click='student2.name += " changed"'>student2.name {{ student2.name }}</div>
        <div @click='student.friends[0].name += " changed"'>student.friends[0].name {{ student.friends[0].name }}</div>
        <div @click='ids[0] += " changed"'>ids[0] {{ ids[0] }}</div>
        <div>
          <h3>Các biến này được tạo trong beforeMount</h3>
          <div @click='value1.value ++'>value1.value {{ value1.value }}</div>
          <div @click='value2.value ++'>value2.value {{ value2.value }}</div>
          https://vuejs.org/guide/essentials/reactivity-fundamentals.html#ref-unwrapping-in-templates
          <strong>count ref:</strong> {{ count }}
        </div>
        <div>
          <h3>ref student2</h3>
          <div @click='handleClickAgeStudent2'>{{ student2.age.value + 1 }}</div>
        </div>

        <div>
          <p>Tổng cộng trái cây: {{ lengthFruit }}</p>
          <ul>
            <li v-for='fruit in fruits'>{{ fruit }}</li>
            <li><button @click='handleAddFruit'>add</button></li>
          </ul>
        </div>

        <div>
          <input placeholder='v-mode' v-model='answer' /> {{ answer }}
        </div>

        <div>
          <input placeholder='inputRef' ref='inputRef' />
        </div>

        <div>
          <h3>Custom component</h3>
          <button-component :title='"test 1"'></button-component>
          <button-component2 :title='"test 2"'></button-component2>
        </div>
      </div>
      <div>

      </div>
    </div>
  `,
  beforeMount: function () {
    this.value1 = Vue.ref(1);
    this.value2 = Vue.ref(1);

    // lúc này chưa render xuống nên không lấy dc ref
    // console.log("inputRef", this.inputRef, this.$refs.inputRef);
  },
  mounted: function () {
    console.log("app this", this);
    console.log("inputRef", this.inputRef, this.$refs.inputRef);
  },
  methods: {
    handleClickAgeStudent2: function () {
      this.student2.age.value++;
    },
    handleAddFruit() {
      this.fruits.push("Fruit" + this.fruits.length);
    },
  },
});

app.component("button-component", {
  props: ["title"],
  setup: function (props) {
    console.log(props);
  },
  template: `
    <button>My custom button 1</button>
  `,
});

app.component("button-component2", {
  setup: function () {
    const props = Vue.defineProps(["title", "click", "student"]);
    console.log(props);
    return {};
  },
  template: `
    <button>My custom button 2</button>
  `,
  mounted: function () {
    console.log("button-component2 this", this.$props);
  },
});

app.config.errorHandler = function (error) {
  console.log("app.config.errorHandler", error);
};

app.mount("#root");
