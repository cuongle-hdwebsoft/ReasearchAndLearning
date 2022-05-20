<template>
  <div>App</div>
  <custom-button></custom-button>
  <img :src="qrImage" />
</template>

<script>
import CustomButton from './components/CustomButton.vue';
import qrImage from './assets/images/qr.png';

export default {
  name: 'App',
  components: {
    CustomButton
  },
  setup: function() {
    console.log(qrImage);
    return {
      qrImage
    }
  }
}
</script>