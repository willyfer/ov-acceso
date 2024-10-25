<template>
  <v-dialog v-model="openDialogAlert.estadoModal" persistent :max-width="openDialogAlert.maxWidth">
    <v-card>
      <div style="padding-top: 10px;" v-if="openDialogAlert.imgModal">
        <template v-if="openDialogAlert.imgModal == 'success'">
          <img
            :src="imgSuccess"
            alt
            srcset
            max-width="24"
            style="display:block; margin:auto;"     
            class="my-4"       
          />
        </template>
        <template v-else-if="openDialogAlert.imgModal == 'warning'">
          <img
            :src="imgWarning"
            alt
            srcset
            max-width="24"
            style="display:block; margin:auto;"
            class="my-4"
          />
        </template>
        <template v-else-if="openDialogAlert.imgModal == 'error'">
          <img
            :src="imgError"
            alt
            srcset
            max-width="24"
            style="display:block; margin:auto;"
            class="my-4"
          />
        </template>
        <template v-else>
          <img
            :src="openDialogAlert.imgModal"
            alt
            srcset
            max-width="24"
            style="display:block; margin:auto;"
            class="my-4"
          />
        </template>
      </div>
      <v-card-title v-if="openDialogAlert.tituloModal" style="padding-top: 0px">
        <v-row class="d-flex flex-row justify-center text-center title justify">
          <b
            style="word-break: break-word; font-size: 28px !important;"
            class="secondary--text justify"
            v-html="openDialogAlert.tituloModal"
          ></b>
        </v-row>
      </v-card-title>
      <v-card-text v-if="openDialogAlert.msgModal" style="text-align: center">
        <p style="font-size: 18px !important;" v-html="openDialogAlert.msgModal"></p>
      </v-card-text>
      <v-card-actions class="d-flex flex-row justify-center">
        <v-btn color="#005092" class="white--text" @click="closeModal">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      imgSuccess: require('@/assets/success.png'),
      imgWarning: require('@/assets/warning.png'),
      imgError: require('@/assets/fail.png')
    }
  },
  computed: {
    ...mapState('ui', ['openDialogAlert'])
  },
  methods: {
    closeModal() {
      const isReset = this.openDialogAlert.isReset
      const push = this.openDialogAlert.push
      this.$store.commit('ui/SET_OPENDIALOGALERT', {
        imgModal: null,
        tituloModal: null,
        msgModal: null,
        maxWidth: 350,
        estadoModal: false,
        isReset: false,
        push: null
      })
      if (isReset) {
        location.reload()
        this.$router.push('/')
      }
      if(push){
         this.$router.push(push)
      }
    }
  }
}
</script>
<style>
</style>
