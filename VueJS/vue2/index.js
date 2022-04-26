const mixin = {
  data: function () {
    return {
      $error: "",
      $dirty: "",
      $isToucher: "",
    };
  },
  mounted: function () {
    console.log(this.$options);
  },
};

console.log("Vue.version", Vue.version);

Vue.nextTick(function () {
  console.log("DOM updated");
});

Vue.use({
  install: function (Vue, options) {
    Vue.globalSum = function () {
      console.log("global sum", this);
    };

    Vue.directive("my-directive", {
      bind: function () {
        console.log("My plugins directive");
      },
      inserted: function () {},
      updated: function () {},
      unbind: function () {},
    });

    // Vue.mixin({
    //   created: function () {
    //     console.log("my plugins mixin");
    //   },
    // });

    Vue.prototype.$globalSum = function () {
      console.log("Vue.prototype.$globalSum", this);
    };
  },
});

Vue.component("todo-item", {
  props: ["todo"],
  data: function () {
    return {
      thisBeforeCreate: null,
      thisCreated: null,
      thisBeforeMount: null,
      thisMounted: null,
      count: 0,
    };
  },
  template: `
    <div class='todo-item'>
      <div class='todo-item__title'>{{ todo.title }}</div>
      <div class='todo-item__description'>{{ todo.description }}</div>
      <button @click='$emit("handleEdit", todo.id)'>edit</button>
      <button @click='count++'>count {{ count }}</button>{{ count }}
      <button @click='handleChangeThisTitle'>handleChangeThisTitle</button>
    </div>
  `,
  // beforeCreate: function () {
  //   console.log("todo-item beforeCreate", this);
  //   this.thisBeforeCreate = Object.assign(this, {});
  // },
  // created: function () {
  //   console.log("todo-item created", this);
  //   this.thisCreated = Object.assign(this, {});
  // },
  // beforeMount: function () {
  //   console.log("todo-item beforeMount", this);
  //   this.thisBeforeMount = Object.assign(this, {});
  // },
  // mounted: function () {
  //   console.log("todo-item mounted", this);
  //   this.thisMounted = Object.assign(this, {});
  // },
  beforeUpdate: function () {},
  updated: function () {
    console.log(`todo-item ${this.todo.id} updated`);
  },
  methods: {
    alert: function (...arg) {
      console.log(arg);
    },
    handleChangeThisTitle: function () {
      this.todo.title = this.todo.title + " changed";

      this.$nextTick(function () {
        console.log(this.refs);
      });
    },
    handleChangeCount: function () {
      this.count = this.count + 1;

      this.$nextTick(function () {
        console.log(this.refs);
      });
    },
  },
});

Vue.component("base-table", {
  data: function () {
    return {
      timeCreated: new Date().toUTCString(),
    };
  },
  mounted: function () {
    // console.log(this);
  },
  template: `
    <table border>
      <thead>
        <slot name='head'></slot>
      </thead>
      <tbody>
        <slot name='default'></slot>
        <slot name='footer' v-bind:timeCreate='timeCreated'>Default {{ timeCreated }}</slot>
      </tbody>
    </table>
  `,
});

Vue.component("custom-input", {
  data: function () {
    return {
      value: "",
    };
  },
  model: {
    props: "value",
    event: "input",
  },
  mixins: [mixin],
  inject: ["callApi"],
  template: `
    <input :value='value' @input='$emit("input", $event.target.value)' />
  `,
  mounted: function () {
    console.log("custom-input", this, this.$options.validators);
  },
  validators: {
    required: true,
    email: true,
  },
});

function debounce(fn, delay) {
  let t = null;
  return function () {
    if (t) {
      clearTimeout(t);
    }

    t = setTimeout(() => {
      fn();
    }, delay);
  };
}

Vue.directive("debounce", {
  bind: function (el, { value: delay = 500 }, vnode) {
    // console.log(el);
    el.oninput = debounce(function () {
      el.dispatchEvent(new Event("customEvent"));
    }, delay);
  },
  inserted: function (el) {},
  updated: function (el) {},
  unbind: function () {},
});

var app = new Vue({
  data: {
    name: "John",
    names: ["a", "b", "c", "d"],
    valueInput: "",
    todoItem: {
      id: 1,
      title: "Todo item title",
      description: "Todo item description",
    },
    vegetables: Array.from({ length: 10 }).map((_, index) => ({
      id: index + 1,
      title: "Title" + index,
      description: "Description" + index,
    })),
    valueInputDebounce: "",
    valueModelDebounce: "Cường",
  },
  methods: {
    handleAlert: function (e) {
      console.log("handleAlert", e);
    },
    handleChangeDebouncedValue: function (event) {
      console.log(event.target.value);
      valueInputDebounce = event.target.value;
      this._debounce();
    },
    callApi: function () {
      console.log("callApi", this);
      return Promise.resolve(100);
    },
  },
  provide: function () {
    return {
      callApi: this.callApi,
    };
  },
  template: `
    <div>
      <div>Name: {{ name }} </div>
      <div v-if='false'>Now you see me</div>
      <ul>
        <li v-for='n in names' :key='n'>{{ n }}</li>
      </ul>
      <div>
        <button v-on:click='handleAlert'>handleAlert</button>
      </div>
      <div>
        <p>Two-way binding</p>
        <input placeholder='v-mode' v-model='valueInput' />
        <input placeholder='normal input' v-bind:value='valueInput' @input='valueInput = $event.target.value' />
        <span>{{ valueInput }}</span>
      </div>

      <todo-item 
        title='Title todo' 
        class='todo-item' 
        :todo='todoItem'
      >
      </todo-item>

      <div>
        <h2>Todo list</h2>
        <todo-item
          v-for='todo in vegetables'
          :todo='todo'
          :key='todo.id'
        >
        </todo-item>
      </div>

      <div>
        <h2>Debounce value input</h2>
        <input :value='valueInputDebounce' @input='handleChangeDebouncedValue' />
      </div>

      <div>
        <h2>Slot base-table</h2>
        <base-table>
          <template v-slot:head>
            <tr>
              <td>id</td>
              <td>title</td>
              <td>description</td>
              <td>actions</td>
            </tr>
          </template>
          <template v-slot:default>
            <tr>
              <td>id</td>
              <td>title</td>
              <td>description</td>
              <td>
                <button>edit</button>
                <button>delete</button>
              </td>
            </tr>
          </template>
          <template v-slot:footer='slotProps'>
            {{ slotProps.timeCreate }}
          </template>
        </base-table>
      </div>

      <div>
        <h2>Mixin</h2>
        <custom-input></custom-input>
      </div>

      <div>
        <h2>Directive debounce</h2>
        <input v-debounce='1000' :value='valueModelDebounce' @customEvent='valueModelDebounce = $event.target.value' />
        <input v-debounce='1000' v-model.lazy='valueModelDebounce' />
        {{ valueModelDebounce }}
      </div>

      <div>
        <h2>Demo reactive observation</h2>
        {{ reactiveObject.name }}
      </div>

      <div>
        <h2>Data chưa reactive</h2>
        <div>{{ $data.unReactiveVar }}</div>
      </div>
    </div>
  `,
  beforeCreate: function () {
    console.log("app beforeCreate");
  },
  created: function () {
    console.log("app created");
  },
  beforeMount: function () {
    // cho phép tạo reactive data nếu như chưa tạo dc ở data
    this.reactiveObject = Vue.observable({
      name: "Cường",
      age: 23,
    });

    // https://v2.vuejs.org/v2/api/#Vue-set
    this.$set(this.reactiveObject, "school", "SGU");

    // nếu là un reactive var thì nó sẽ không hiển thị trên this.data cũng như là không gọi trực tiếp
    // phải gọi thông qua $data.unReactiveVar
    // nếu mình đã change biến rồi thì phải dùng this.$forceUpdate thì nó mới hiển thị lên
    // app.$data.unReactiveVar = 'change now'
    // app.$forceUpdate()

    this.$data.unReactiveVar = "unReactiveVar";
  },
  mounted: function () {
    const debounce = function (cb, delay = 500) {
      let t;

      return function () {
        if (t) {
          clearTimeout(t);
        }

        t = setTimeout(() => {
          console.log(`After ${delay} times: the cb runed`);
          cb();
        }, delay);
      };
    };

    this._debounce = debounce(this.callApi.bind(this), 1000);

    console.log(this);
  },
  beforeUpdate: function () {},
  updated: function () {
    console.log("app updated");
  },
});

console.log(app);

app.$mount("#app");
