<template>
  <v-dialog v-model="dialog" persistent :max-width="openDialogAlert.maxWidth">
    <v-card>
      <div style="padding-top: 10px;" v-if="openDialogAlert.imgModal">
        <template v-if="openDialogAlert.imgModal == 'success'">
          <img
            class="imgTitleModal"
            :src="imgSuccess"
            alt
            srcset
            max-width="24"
            style="display:block; margin:auto;"
          />
        </template>
        <template v-else-if="openDialogAlert.imgModal == 'warning'">
          <img
            class="imgTitleModal"
            :src="imgWarning"
            alt
            srcset
            max-width="24"
            style="display:block; margin:auto;"
          />
        </template>
        <template v-else-if="openDialogAlert.imgModal == 'error'">
          <img
            class="imgTitleModal"
            :src="imgError"
            alt
            srcset
            max-width="24"
            style="display:block; margin:auto;"
          />
        </template>
        <template v-else>
          <img
            class="imgTitleModal"
            :src="openDialogAlert.imgModal"
            alt
            srcset
            max-width="24"
            style="display:block; margin:auto;"
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
        <v-btn color="#005092" class="white--text" @click="closeModal">{{openDialogAlert.msmButton}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    //dialog: Boolean,
    openDialogAlert: Object
  },
  data() {
    return {
      imgSuccess: require('@/assets/success.png'),
      imgWarning: require('@/assets/warning.png'),
      imgError: require('@/assets/fail.png'),
      dialog: true
    }
  },
  computed: {
    //...mapState('ui', ['openDialogAlert'])
  },
  methods: {
    closeModal() {
      /* const isReset = this.openDialogAlert.isReset
      this.$store.commit('ui/SET_OPENDIALOGALERT', {
        imgModal: null,
        tituloModal: null,
        msgModal: null,
        maxWidth: 350,
        estadoModal: false,
        isReset: false
      })
      if (isReset) {
        location.reload()
        this.$router.push('/credinstante')
      } */      
   
    
      if(this.openDialogAlert.actionButton){
        if(this.openDialogAlert.pushRouter == 'home'){
          this.$router.push('/')
        }else if(this.openDialogAlert.pushRouter == 'credinstante'){
          this.$router.push('/credinstante')
        }else {
          this.$router.push('/')
        }
      }else{
        this.$emit('closeModal', false)
      }
 
    }
  },
}
</script>
<style>
</style>
