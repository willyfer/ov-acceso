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
//
</script>
<style scoped>
.mainLayout {
  background: radial-gradient(
    ellipse at center,
    #3288be 0,
    #005e98 50%,
    #00436c 100%
  );
}
</style>
