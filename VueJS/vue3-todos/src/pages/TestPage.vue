
<template>
  <div>
    <test-component
      :name="object.name"
      :age="object.age"
      :object="object"
      :friends="object.friends"
      :_name="_name"
      :_age="objectRefInKey.age"
      :_friends="_friends"
      :_mom="_mom"
    ></test-component>

    <button @click="object.name += ' changed'">update name</button>
    <button @click="object.age += 1">update age</button>
    <button @click="object.friends.push('friend ' + object.friends.length)">
      update friends
    </button>

    <div>
      <h2>objectRefInKey</h2>
      <div>_name _age _friends</div>
      <div>{{ _name }} {{ _age }} {{ _friends.join(",") }}</div>

      <button @click="objectRefInKey.name.value += ' changed'">
        update _name
      </button>
      <button @click="objectRefInKey.age.value += 1">update _age</button>
      <button
        @click="
          objectRefInKey.friends.value.push(
            'friend ' + object.friends.value.length
          )
        "
      >
        update _friends
      </button>
      <button @click="name += ' changed'">update name</button>
      <button @click="_name += ' changed'">update _name</button>
      <button @click="onlyName += ' changed'">{{ onlyName }}</button>
      <button @click="_mom.name += ' changed'">
        {{ _mom.name }} - {{ objectRefInKey.mom.name }} -
        {{ objectRefInKey.mom.value.name }}
      </button>
    </div>
  </div>
</template>


<script setup>
/* eslint-disable no-unused-vars */

import { reactive, ref } from "@vue/reactivity";
import TestComponent from "../components/TestComponent.vue";

const object = reactive({
  name: "John",
  age: 23,
  friends: Array.from({ length: 3 }).map((_, i) => "friend " + i),
});

const name = object.name; //primitive type
const age = object.age; // primitive type
const friends = object.friends; // reference type

const objectRefInKey = {
  name: ref("John"),
  age: ref(23),
  friends: Array.from({ length: 3 }).map((_, i) => "friend " + i),
  mom: ref({
    name: "Annie",
    age: 59,
    job: "household",
  }),
};

const _name = objectRefInKey.name; // reference type
const _age = objectRefInKey.age; // reference type
const _friends = objectRefInKey.friends; // reference type
const _mom = objectRefInKey.mom; // reference type

const onlyName = ref("John");
console.log(_name, onlyName);

// objectRefInKey.age.value tương tự với objectRefInKey.age trong {{  }}
// dùng luôn đừng tính toán thì ok
// nếu mà dùng tính toán thì nên đưa về cái top-level prop

const unwrapObjectRefInKey = reactive(objectRefInKey);

//
// console.log(unwrapObjectRefInKey.name);
// console.log(unwrapObjectRefInKey.age);
// console.log(unwrapObjectRefInKey.friends);

const objectRef = ref({
  name: "John",
  age: 23,
  friends: Array.from({ length: 3 }).map((_, i) => "friend " + i),
});

/* 
  { value: reactive: ({
      name: "John",
      age: 23,
      friends: Array.from({ length: 3 }).map((_, i) => "friend " + i),
    })
  } 
*/

// trong template nếu như là top-level rồi thì ref không cần dùng .value
// nếu như không phải top-level thì nên dùng cả .value để tính toán

// trong template _name là ref được unwrap nên không phải .value và có thể reactive dc
// trong khi name là string bình thường không có khả năng reactive

// :_age="objectRefInKey.age" -> không phải top-level nên objectRefInKey.age trả về object
// :_age="_age" -> là 1 top-level -> unwrap nên không ghi .value, nhưng vẫn reactive dc -> trả về cái primitive

// [KHÔNG PHẢI TOP-LEVEL, KHÔNG UNWRAP THÌ TRẢ VỀ OBJECT]

// objectRefInKey.mom === objectRefInKey.mom.value => true
// nhưng mà objectRefInKey.mom.name ('') === objectRefInKey.mom.value.name ('Annie)
</script>

<script setup>
</script>

<style>
input,
button {
  border: 1px solid #111 !important;
  display: block;
  margin: 10px;
}
</style>