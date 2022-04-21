<pre>
var data = {
  name: "Lê Minh Cường",
  age: 23,
  gender: "male",
  likes: ["milk", "soda", "cookies"],
};

// data is mutation
// change data.a -> vm.a was also changed

// When this data changes, the view will re-render.
// It should be noted that properties in data are only reactive if they existed when the instance was created

// life cycle 

var vm = new Vue({
  data: data,
  el: "#app",
  beforeCreate: function () {
    console.log("beforeCreate");
  },
  created: function () {
    console.log("created");
  },
  beforeMount: function () {
    console.log("beforeMount");
  },
  mounted: function () {
    console.log("mounted");
  },
});

</pre>

v-once: render chỉ 1 lần

<pre>
  <span v-once>This will never change: {{ msg }}</span>
</pre>

v-html: chèn html vào trong 1 thẻ

v-bind: bind các attributes

v-on: bắt sự kiện

v-if v-else v-else-if

v-for

v-bind:is

<pre>
  <component v-bind:is='tên của component'></component>
</pre>

## Lưu ý nhỏ trong component

- data là 1 function

- Vue public luôn biến event trong handler ([link](https://v2.vuejs.org/v2/guide/events.html?redirect=true#Event-Modifiers))

## computed vs methods

computed properties are cached based on their reactive dependencies

nó chỉ chạy lại khi reactive dependency changed. Nếu như trong nó không có reactive dependency thì never đổi

## A Single Root Element

every component must have a single root element

## Listening to Child Components Events

<pre>
  - Ở cha dùng v-on:function-name='bất cứ hàm gì hoặc chạy code js'

  - Ở con $emit(function-name, arg)

  - default function-name sẽ nhận vào first parameter là args nếu chúng ta chỉ ghi tên
</pre>

## Todo

- Viết cái debounce giống ReactJS

- v-model component

## Day 1

### Daily Report: 2022-04-20

### Training VueJS

DONE:

- Research VueJS
  - Vue instance
  - Template syntax
  - Computed & watched
  - Class & Styled
  - List rendering
  - Event handling
  - Form input binding
  - Component Basic

INPROGRESS:

- Component In Depth
- Do Grade 1: Basic

## v-on & $emit

- Trong child component sẽ $emit một cái event bất kì của chính nó
- v-on:event-được-gọi sẽ chạy hàm trong đây

<pre>
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
</pre>

- component này nên nhận vào 1 props value và xài props value này
- khi event input thì nó sẽ gọi $emit('input', $event.target.value)
- khúc này có nghĩa là nó trigger cái event 'input' của chính component và truyền parameter là $event.target.value
- v-model nó thực ra là
  - v-bind:value=variableValue
  - v-on:input=variableValue = newValue

[link](https://v2.vuejs.org/v2/guide/components.html#Using-v-model-on-Components)

Như vậy để dùng được cái này thì component sẽ nhận vào 1 props là value và bên trong component sẽ $emit cái input event. Để tí ở ngoài v-model sẽ viết hàm lại theo kiểu passedVariable(biến truyền vào v-mode) = argument ở trong $emit

Chúng ta có thể thay đổi được props và event truyền vào thông qua [đây](https://v2.vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model) (Thay vì default là value và input)

## keep alive + v-bind:is

Cache lại tab

## Access global state

this.$root

This can be convenient for demos or very small apps with a handful of components. However, the pattern does not scale well to medium or large-scale applications, so we strongly recommend using Vuex to manage state in most cases.

## Nên coi lại các properties có trong 1 VueComponent (console.log(this) in component)

## this.refs

ref 1 DOM hoặc component bất kì

## this.$el -> element DOM

## render in VueJS

App beforeCreate
App created
App beforeMount
button-component beforeCreate
button-component created
button-component beforeMount
button-component mounted
App mounted
