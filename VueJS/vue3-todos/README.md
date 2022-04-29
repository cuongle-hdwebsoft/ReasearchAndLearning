# 1. Bugs phải xài ref thay vì reactive ở script setup (resolved)

- reactive cho object và array
- ref thì cho mọi thứ

<pre>
<template>
  <input type="text" v-model="value1" /> {{ value1 }}
  <input type="text" v-model="value2.value" /> {{ value2.value }}
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
const value1 = ref("");
const value2 = reactive({ value: "" });
</script>
</pre>

https://vuejs.org/guide/reusability/composables.html#conventions-and-best-practices

# 2. Bugs vuetify buộc dùng ref thay vì reactive ở script setup cho v-model text input (resolved)

- Như bug #1

# Bugs watch đã reactive object rồi [object] nhưng mà nó vẫn không deep cho mình phải ghi explicy nó ms ra

# Dynamic multiple attributes

https://vuejs.org/guide/essentials/template-syntax.html#attribute-bindings

# Kế thừa toàn bộ props cũng như là list từ cha xuống con

https://vuejs.org/guide/components/attrs.html#disabling-attribute-inheritance

# Reactive useValidation không được

# Render component Vue 3 sau khi mounted

https://stackoverflow.com/questions/69488256/vue-3-append-component-to-the-dom-best-practice

# v-bind=$attrs ???

# props cha thay đổi con có thay đổi hay không

# Cái .value của ref nó sẽ mất như thế nào

- Template thì ghi không cần . value

- Tất cả biến mình xài trong script đều .value để dùng

<pre>
<script>
import { ref } from "@vue/reactivity";
export default {
  mounted: function () {
    console.log(this.yep.a.value); // 0
  },
};
</script>

<script setup>
const a = ref(0);
const b = ref(1);

const yep = {
  a,
  b,
};

console.log(yep.a.value); // 0
</script>

</pre>

# Nếu có đồng thời cả script setup và life cycle setup

Vue sẽ ưu tiên chạy cái script setup trước tiên và bỏ luôn life cycle setup
