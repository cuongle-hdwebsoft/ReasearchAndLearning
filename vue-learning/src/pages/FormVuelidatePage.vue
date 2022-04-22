<template>
  <form @submit="handleSubmit">
    <div>
      <label for="">First name</label>
      <input type="text" v-model="firstName" />
      <div class="error" v-if="v$.firstName.$error">
        Error: {{ v$.firstName.$error }}
      </div>
    </div>
    <div>
      <label for="">Last name</label>
      <input type="text" v-model="lastName" />
    </div>
    <button type="submit">Form</button>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";

// https://vuelidate-next.netlify.app/guide.html#checking-for-validation-state
// https://vuelidate-next.netlify.app/validators.html#requiredif
// "$dirty": false,
// "$error": false,
// "$errors": [],
// "$silentErrors": [],
// "$invalid": false,
import { required } from "@vuelidate/validators";

export default {
  setup: function () {
    return { v$: useVuelidate() };
  },
  data: function () {
    return {
      firstName: null,
      lastName: null,
    };
  },
  methods: {
    handleSubmit: async function (e) {
      console.log(this.v$);
      e.preventDefault();

      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
    },
  },
  mounted: function () {},
  validations() {
    return {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
    };
  },
};
</script>