<template>
  <v-snackbar
    v-model="snackbar"
    transition="fab-transition"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      text: 'llene todos los campos por favor',
    }
  },
  methods: {
    close() {
      this.snackbar = false;
    },
    open() {
      this.snackbar = true;
    }
  }
}
</script>
<style lang='scss'>
  .v-snack.v-snack--bottom.v-snack--has-background {
    display: block !important;
    padding-top: 0 !important;
  }
</style>