<template>
  <div>
    <div>- This is custom input using component binding</div>
    <div>- Using v-director to check if field value</div>
    <div>+ is required</div>
    <div>+ is a number</div>
    <custom-input
      label="Phone number"
      name="phoneNumber"
      v-model="phoneNumber"
    ></custom-input>

    <hr />
    <div>- This is custom input using component binding</div>
    <div>- Using v-director to check if field value</div>
    <div>+ is required</div>
    <div>+ is a number</div>
    <div>Purpose: VND to any unit currency</div>
    <custom-input
      label="VND Currency"
      name="valueCurrency"
      v-model="valueCurrency"
      v-bind:title="valueCurrency | currency"
    ></custom-input>
    <div>{{ valueCurrency | currency }}</div>

    <hr />
    <div>Using vue moment to format text time</div>
    <input v-model="dateTime" type="date" />
    <div>MMMM Do YYYY: {{ dateTime | moment("MMMM Do YYYY") }}</div>
    <div>
      YYYY-MM-DDTHH:mm:ss: {{ dateTime | moment("YYYY-MM-DDTHH:mm:ss") }}
    </div>
    <div>
      YYYY-MM-DDTHH:mm:ss.SSS:
      {{ dateTime | moment("YYYY-MM-DDTHH:mm:ss.SSS") }}
    </div>
    <div>
      YYYY-MM-DD
      {{ dateTime | moment("YYYY-MM-DD") }}
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/form/CustomInput.vue";
export default {
  components: { CustomInput },
  data: function () {
    return {
      phoneNumber: "",
      valueCurrency: "0",
      dateTime: "",
    };
  },
};
</script>