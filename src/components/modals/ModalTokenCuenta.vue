<template>
  <v-dialog v-model="dialog" persistent max-width="360" height="auto">
    <form autocomplete="nope" @submit.prevent="enviarToken">
      <v-card class="ld-modal">
        <v-card-text>
          <v-row no-gutters align-center>
            <v-col cols="12" text-center>
              <h4 class="ld-modal-title" >
               <!-- <b>Ingrese el codigo enviado al número {{sendResponseData.telefono}} </b>-->
               <b>Ingrese el codigo enviado al número </b>
              </h4>
            </v-col>
           
            <v-col cols="12" text-center>
              <v-text-field
                v-model="token"
                v-validate="'required|numeric|max:6|min:6'"
                label="Ingresa token"
                :error-messages="errors.collect('token')"
                data-vv-name="token"
                required
                type="tel"
                autofocus="autofocus"
                maxlength="6"
                :counter="6"
                color="#FF7729"
                
              />
            </v-col>
         
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row dense>
            <v-col cols="12"  text-center>
              <v-btn
             style="color:white"
                type="submit"
                :loading="loading"
                :disabled="loading"
                color="#FF7729"
                block=""         
              >
                <b>continuar</b>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>
<script>
import { mixins } from '@/mixins/mixin.js'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  mixins: [mixins],
  props: {
    sendDataForm: Object,
    sendResponseData: Object
  },
  data() {
    return {
      loading: false,
      token: '',
      dialog: true
    }
  },
  computed: {
    //dialog() {
     // return true//this.$store.state.default.openToken
   // },
   /*  datos() {
      return this.$store.state.default.datos
    } */
  },
  methods: {
    
    async enviarToken(){
      this.$validator.validateAll().then( async (result) => {
        if(result){
         await this.$emit('sendToken', this.token)
        }
      })
      
    }
  }
}
</script>
<style scoped>
.ld-btn {
  min-width: 100px !important;
}
.ld-btn-secondary {
  min-width: 100px !important;
}
</style>
