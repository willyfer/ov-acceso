<template>
  <v-app light>
    <HomeToolbar></HomeToolbar>
    <v-main class="mainLayout">
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
import HomeToolbar from '@/components/toolbar/HomeToolbar'

export default {
  components: {
    HomeToolbar,
  }
}
</script>

<style scoped>
.mainLayout {
  /*background-image: linear-gradient(to top right, #005092 70%, #eb7531 70.1%)*/
  background: rgba(0, 81, 148, 1);
  background: linear-gradient(
    72deg,
    rgba(0, 81, 148, 1) 0%,
    rgba(0, 81, 148, 1) 32%,
    rgba(0, 81, 148, 1) 55%,
    rgb(255, 119, 41) 55%,
    rgb(255, 119, 41) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#005194', endColorstr='#ff7729', GradientType=1 );
}
@media (max-width: 991px) {
  .mainLayout {
    background: radial-gradient(
      ellipse at center,
      #3288be 0,
      #005e98 50%,
      #00436c 100%
    );
  }
}
</style>
