<template>
  <v-container class="d-flex flex-column pt-1">
    <form @submit.prevent="signContractDocuments">
      <v-row class="pt-0">
        <v-col cols="12" class="pt-0">
          <SharedHeaderWithStepper
            :numberSteps="currentComponent.numberSteps"
            :imgVehiculo="currentComponent.imgProductStep"
          >
            <div class="headerContractDocuments">
              En los siguientes cuadros revisa tus documentos contractuales
            </div>
          </SharedHeaderWithStepper>
          <div class="contentContractDocuments">
            <div class="d-flex flex-wrap justify-center mb-5">
              <div v-for="document in documents" :key="document.id">
                <SharedBoxContractual
                  :item="document"
                  :codigoExpediente="codigoExpediente"
                  :maxItems="documents.length"
                />
              </div>
            </div>
            <div v-if="!isCheckAll">
              <v-checkbox
                v-validate="'required'"
                :error-messages="errors.collect('terminosCondiciones')"
                v-model="terminosCondiciones"
                data-vv-name="terminos"
                required
              >
                <template v-slot:label>
                  <p class="contentContractDocuments__term mb-0">
                    ¡Visualiza los contractuales y procede a firmarlos de forma
                    inmediata!
                  </p>
                </template>
              </v-checkbox>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <SharedButton
            text="Firmar"
            type="submit"
            :buttonOrange="true"
            :totalWidth="50"
            :loading="loading"
          />
        </v-col>
      </v-row>
    </form>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import SharedBoxContractual from '@/components/shared/SharedBoxContractual'
import SharedButton from '@/components/shared/SharedButton'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
export default {
  name: 'ContractDocuments',
  $_veeValidate: {
    validator: 'new',
  },
  mixins: [actionsByCodeMixin],
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  components: {
    SharedHeaderWithStepper,
    SharedButton,
    SharedBoxContractual,
  },
  computed: {
    ...mapGetters('firma', [
      'arrayDocuments',
      'terminos',
      'estadoProspecto',
      'telefono',
      'documento',
      'codigoExpediente',
      'productCode',
    ]),
    terminosCondiciones: {
      set(value) {
        this.SET_TERMINOS(value)
      },
      get() {
        return this.terminos
      },
    },
    isCheckAll() {
      if (this.arrayDocuments.length >= this.documents.length) {
        return true
      } else {
        return false
      }
    },
  },
  data() {
    return {
      documents: [
        {
          id: 1,
          doc: 'gethoja_resumen_ws',
          title: 'HojaResumen',
          title2: 'Hoja Resumen',
        },
        {
          id: 2,
          doc: 'getsolicitud_ws',
          title: 'SolicitudDeCredito',
          title2: 'Solicitud de Crédito',
        },
        { 
          id: 3, 
          doc: 'getcontrato_ws', 
          title: 'Contrato', 
          title2: 'Contrato' 
        },
        {
          id: 4,
          doc: 'getcronograma_ws',
          title: 'Cronograma',
          title2: 'Cronograma',
        },
        {
          id: 5,
          doc: 'getcarta_instruc_ws',
          title: 'CartaInstruccionIrrevocable',
          title2: 'Carta de Instrucción Irrevocable'
        },
      ],
      loading: false,
    }
  },
  methods: {
    ...mapActions('firma', ['actionSendToken']),
    ...mapMutations('firma', ['SET_ARRAY_DOCUMENTS', 'SET_TERMINOS']),
    async signContractDocuments() {
      try {
        this.$validator.validateAll().then(async (result) => {
          if (result) {
            if (this.terminos) {
              this.SET_ARRAY_DOCUMENTS(this.documents)
            }
            this.loading = true
            await this.actionSendToken({
              documento: this.documento,
              telefono: this.telefono,
            })
            this.loading = false
            this.analyzeProspectStatus()
          }
        })        
      } catch (error) {
        this.$showError(error);
      }
    },
  },
}
</script>

<style scoped>
.headerContractDocuments {
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 1.1em;
}
.contentContractDocuments {
  margin: 0 22px 30px 22px;
  padding: 20px 10px;
  border-bottom: 1px solid #ff4e00;
  border-left: 1px solid #ff4e00;
  border-right: 1px solid #ff4e00;
  border-radius: 0 0 20px 20px;
}
.contentContractDocuments__term {
  font-size: 0.7em !important;
  line-height: 1.2;
}
</style>