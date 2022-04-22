<template>
  <div class="form-item">
    <label style="display: block" for="">{{ label }}</label>
    <input
      :title="title"
      v-validator="'required|number'"
      @input="$emit('input', $event.target.value)"
      :value="value"
      :name="name"
      type="text"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    name: String,
    value: String,
    title: String,
  },
};
</script>