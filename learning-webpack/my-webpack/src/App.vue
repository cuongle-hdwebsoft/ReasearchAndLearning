<template>
  <header-component>
    <custom-button></custom-button>
    <img :src="qrImage" />
  </header-component>
</template>

<script>
import qrImage from './assets/images/hello-kitty.png';
import HeaderComponent from './components/Header.vue'
import CustomButton from './components/CustomButton.vue';

export default {
  name: 'App',
  components: {
    CustomButton,
    HeaderComponent
  },
  setup: function() {
    console.log(qrImage);
    return {
      qrImage
    }
  }
}
</script>