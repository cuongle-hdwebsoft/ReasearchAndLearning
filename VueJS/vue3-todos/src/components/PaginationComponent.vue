<template>
  <div class="pagination">
    <div
      v-for="_page in pages"
      :class="['pagination-item', { active: page === _page }]"
      :key="_page"
      @click="$emit('update:page', _page)"
    >
      {{ _page }}
    </div>
    <select @change="$emit('update:limit', parseInt($event.target.value))">
      <option
        :selected="limit === row"
        :key="row"
        :value="row"
        v-for="row in rowPerPage"
      >
        {{ row }}
      </option>
    </select>
    <span style="padding-left: 5px">{{ total }} items</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["page", "limit", "total", "rowPerPage"]);
defineEmits(["update:limit", "update:page"]);

const pages = Math.ceil(props.total / props.limit);
</script>

<script></script>

<style scope>
.pagination {
  display: flex;
  align-items: center;
}
.pagination-item {
  padding: 5px 15px;
  border: 1px solid #ddd;
  display: block;
}
.pagination-item.active {
  background-color: #42b883;
  border: 1px solid #42b883;
}
</style>