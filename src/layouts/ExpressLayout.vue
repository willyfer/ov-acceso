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
  min-height: 100vh;
  height: 100% !important;
  background: #244242;
  background: linear-gradient(
    72deg,
    #128c7e 0%,
    #128c7e 32%,
    #128c7e 55%,
    #075e54 55%,
    #075e54 100%
  );
}
@media (max-width: 991px) {
  .mainLayout {
    background: #128c7e;
  }
}
</style>
