<template>
  <div class="custom-input">
    <label class="custom-input-label" for="">{{ label }}</label>
    <input
      @input="handleChangeInput"
      class="custom-input-input"
      :value="value"
      type="text"
    />
    <div>value: {{ value }}</div>
    <div v-if="error" class="custom-input-error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: ["label", "initialValue"],
  data: function () {
    return {
      value: this.initialValue,
    };
  },
  methods: {
    initDefault: function () {
      this.value = "init data";
    },
    handleChangeInput: function (e) {
      this.value = e.target.value;
    },
  },
  computed: {
    error: function () {
      if (!this.value || !(this.value.length > 0)) {
        return "value is required";
      }

      if (this.value.length >= 5) {
        return "value.length is greater than 5";
      }

      return null;
    },
  },
  created: function () {
    this.initDefault();
  },
};
</script>

<style>
input {
  padding: 8px;
}
</style>