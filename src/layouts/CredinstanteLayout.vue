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
  background: rgba(225, 227, 228, 1);
  background: -moz-linear-gradient(
    45deg,
    rgba(225, 227, 228, 1) 0%,
    rgba(225, 227, 228, 1) 47%,
    rgba(225, 227, 228, 1) 82%,
    rgba(255, 119, 41, 1) 82%,
    rgba(255, 119, 41, 1) 100%
  );
  background: -webkit-gradient(
    left bottom,
    right top,
    color-stop(0%, rgba(225, 227, 228, 1)),
    color-stop(47%, rgba(225, 227, 228, 1)),
    color-stop(82%, rgba(225, 227, 228, 1)),
    color-stop(82%, rgba(255, 119, 41, 1)),
    color-stop(100%, rgba(255, 119, 41, 1))
  );
  background: -webkit-linear-gradient(
    45deg,
    rgba(225, 227, 228, 1) 0%,
    rgba(225, 227, 228, 1) 47%,
    rgba(225, 227, 228, 1) 82%,
    rgba(255, 119, 41, 1) 82%,
    rgba(255, 119, 41, 1) 100%
  );
  background: -o-linear-gradient(
    45deg,
    rgba(225, 227, 228, 1) 0%,
    rgba(225, 227, 228, 1) 47%,
    rgba(225, 227, 228, 1) 82%,
    rgba(255, 119, 41, 1) 82%,
    rgba(255, 119, 41, 1) 100%
  );
  background: -ms-linear-gradient(
    45deg,
    rgba(225, 227, 228, 1) 0%,
    rgba(225, 227, 228, 1) 47%,
    rgba(225, 227, 228, 1) 82%,
    rgba(255, 119, 41, 1) 82%,
    rgba(255, 119, 41, 1) 100%
  );
  background: linear-gradient(
    45deg,
    rgba(225, 227, 228, 1) 0%,
    rgba(225, 227, 228, 1) 47%,
    rgba(225, 227, 228, 1) 82%,
    rgba(255, 119, 41, 1) 82%,
    rgba(255, 119, 41, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e1e3e4', endColorstr='#ff7729', GradientType=1 );
}
@media (max-width: 991px) {
  .mainLayout {
    background: rgba(225, 227, 228, 1) !important;
  }
}
</style>
