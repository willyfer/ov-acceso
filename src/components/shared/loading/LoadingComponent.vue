<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <h3 class="acceso--text my-3  text-center " :class="color + '--text'">
      Estamos evaluando tu información,
      <br />
      por favor espera unos segundos
    </h3>
    <v-progress-circular indeterminate :color="color" :size="80" :width="7" />
  </div>
</template>
<script>
export default {
  props: ['color']
}
</script>
