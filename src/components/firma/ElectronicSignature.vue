<template>
  <v-container class="d-flex flex-column pt-1">
    <form @submit.prevent="signElectronic">
      <v-row class="pt-0">
        <v-col cols="12" class="pt-0">
          <SharedHeaderWithStepper
            :numberSteps="currentComponent.numberSteps"
            :imgVehiculo="currentComponent.imgProductStep"
          >
            <div class="headerElectronicSignature">
              <p class="mb-0">
                Por último, enviaremos por mensaje de texto (SMS) un código de 6
                dígitos a tu celular
              </p>
              <p class="headerElectronicSignature__number mb-0">
                {{ telefono }}
              </p>
            </div>
          </SharedHeaderWithStepper>
          <div class="contentElectronicSignature">
            <div class="contentElectronicSignature__token">
              <label
                for="inputToken"
                class="contentElectronicSignature__text mb-1"
                >Ingresa el código aquí</label
              >
              <v-text-field
                class="contentElectronicSignature__input"
                v-validate="'required|max:6|min:6|numeric'"
                v-model="valueToken"
                placeholder=""
                rounded
                outlined
                dense
                data-vv-name="valueToken"
                data-vv-as="token"
                color="#ff4e00"
                :maxlength="6"
                :error-messages="errors.collect('valueToken')"
              ></v-text-field>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <SharedButton
            text="Firmar documentos"
            :buttonOrange="true"
            :totalWidth="80"
            type="submit"
            :loading="loading"
          />
        </v-col>
        <v-col cols="12" class="text-center">
          <SharedButton
            text="Cancelar"
            :buttonSilver="true"
            :totalWidth="80"
            @click="cancelSignElectronic"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <SharedContentInfo typeInfo="sms">
            <div v-show="!loading2">
              Si no recibiste un mensaje de texto (SMS), dale
              <span class="text-info" @click="reSignElectronic"
                >click aquí</span
              >
              para volver a recibirlo.
            </div>
            <div v-show="loading2">
              Si no recibiste un mensaje de texto (SMS), dale
              <span class="text-info">enviando </span>
              <img class="imgLoading" width="10" :src="imgLoading" />
              para volver a recibirlo.
            </div>
          </SharedContentInfo>
        </v-col>
      </v-row>
    </form>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import SharedButton from '@/components/shared/SharedButton'
import SharedContentInfo from '@/components/shared/SharedContentInfo'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
export default {
  name: 'ElectronicSignature',
  $_veeValidate: {
    validator: 'new',
  },
  mixins: [actionsByCodeMixin],
  components: {
    SharedHeaderWithStepper,
    SharedButton,
    SharedContentInfo,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  computed: {
    ...mapGetters('firma', [
      'estadoProspecto',
      'apellidoMaterno',
      'apellidoPaterno',
      'codigoCredito',
      'codigoExpediente',
      'productCode',
      'codigoProspecto',
      'arrayDocuments',
      'documento',
      'nombres',
      'placa',
      'telefono',
    ]),
  },
  data() {
    return {
      valueToken: null,
      loading: false,
      loading2: false,
      imgLoading: require('@/assets/img/firma/loading.gif'),
    }
  },
  methods: {
    ...mapMutations('firma', ['SET_STEP']),
    ...mapActions('firma', ['actionSendToken', 'actionGenerarContractuales']),
    async signElectronic() {
      try {        
        this.$validator.validateAll().then(async (result) => {
          if (result) {
            this.loading = true
            const dataForm = {
              apellidoMaterno: this.apellidoMaterno,
              apellidoPaterno: this.apellidoPaterno,
              nombres: this.nombres,
              codigoCredito: this.codigoCredito,
              codigoExpediente: this.codigoExpediente,
              codigoProducto: this.productCode,
              codigoProspecto: this.codigoProspecto,
              contratos: this.arrayDocuments,
              documento: this.documento,
              estadoProspecto: 4,
              placa: this.placa,
              telefono: this.telefono,
              token: this.valueToken,
            }
            await this.actionGenerarContractuales(dataForm)
            this.loading = false
            this.analyzeProspectStatus()
          }
        })
      } catch (error) {
        this.$showError(error);
      }
    },
    async reSignElectronic() {
      try {        
        this.loading2 = true
        await this.actionSendToken({
          documento: this.documento,
          telefono: this.telefono,
        })
        this.loading2 = false
      } catch (error) {
        this.$showError(error);
      }
    },
    cancelSignElectronic() {
      this.SET_STEP(103)
    },
  },
}
</script>

<style scoped>
.headerElectronicSignature {
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 1.1em;
}
.contentElectronicSignature {
  margin: 0 22px 20px 22px;
  padding: 20px 10px;
  border-bottom: 1px solid #ff4e00;
  border-left: 1px solid #ff4e00;
  border-right: 1px solid #ff4e00;
  border-radius: 0 0 20px 20px;
}
.headerElectronicSignature__number {
  margin: 10px auto;
  width: 170px;
  border-radius: 10px;
  background-color: white;
  color: #ff4e00;
}
.contentElectronicSignature__token {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.contentElectronicSignature__text {
  font-size: 0.8em;
  color: #ff4e00;
}
.contentElectronicSignature__input input {
  margin-top: 5px;
  border: 1px solid #ff4e00;
  border-radius: 20px;
}
.text-info {
  color: #0a4e88;
}
.imgLoading {
  position: relative;
  top: 2px;
}
</style>