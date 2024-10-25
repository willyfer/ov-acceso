<template>
  <v-dialog v-model="openDialog.estado" persistent max-width="350">
    <v-card shaped style="border-radius: 15px;">
      <v-card-title>
        <v-row class="d-flex flex-row justify-center text-center title justify">
          <b
            style="word-break: break-word;"
            class="secondary--text justify"
            v-html="openDialog.mensaje"
          ></b>
        </v-row>
      </v-card-title>
      <v-card-actions class="d-flex flex-row justify-center">
        <v-btn
          color="express"
          class="white--text"
          @click="cerrarModal"
        >{{ true ? 'ok' : 'Continuar' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['color'],
  computed: {
    ...mapState('default', ['bussines', 'datos']),
    ...mapState('users', ['promotor']),
    ...mapState('ui', ['openDialog'])
  },
  methods: {
    cerrarModal() {
      const isReset = this.openDialog.isReset
      this.$store.commit('ui/SET_OPENDIALOG', {
        estado: false,
        mensaje: null
      })

      console.log('isReset: ', isReset)
      if (!isReset) {
        this.$store.dispatch('express/resetStates')
        this.$router.push('/')
      } else {
        console.log('Here')
      }
    }
  }
}
</script>
