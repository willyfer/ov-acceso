<template>
  <div>
    <v-col cols="12" pb-3>
      <v-row justify="center">
        <v-col
          cols="12"
          md="12"
          lg="12"
          class="d-flex flex-column justify-center"
          style="padding: 4px"
        >
          <h2
            class="ld-h2-title-form display-1 secondary--text"
            style="font-size: 1.5em !important"
          >
            Revisa tus documentos contractuales
          </h2>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" pt-2>
      <v-row
        no-gutters
        wrap
        align-content-center
        style="display: flex; justify-content: space-around"
      >
        <v-col v-for="(item, key) in items" :key="key" cols="6" sm="4">
          <DocumentoFirmar
            :item="item"
            :maxItems="items.length"
          ></DocumentoFirmar>
        </v-col>
      </v-row>
    </v-col>
    <v-col v-if="!isSelectALL" cols="12" class="text-center">
      <v-checkbox
        v-model="datos.terminosCondiciones"
        type="checkbox"
        :color="color"
      >
        <div slot="label">
          <span slot="activator" class="secondary--text font">
            ¡Visualiza los contractuales y procede a firmarlos de forma
            inmediata!
          </span>
        </div>
      </v-checkbox>
    </v-col>
    <v-col cols="12" py-3>
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" class="text-center" order-xs="1" order-sm="2">
      <div v-if="FirmaReady === 1">
        <v-btn class="ld-btn" disabled :color="color">
          <b>{{ buttonDinamic }}</b>
        </v-btn>
      </div>
      <div v-if="FirmaReady === 2">
        <v-btn
          class="ld-btn"
          :loading="loading"
          :color="color"
          @click.stop=";(enviarTokenDialog = true), firmarContractuales()"
        >
          <b>FIRMAR</b>
        </v-btn>
      </div>
    </v-col>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import DocumentoFirmar from '@/components/compra-deuda/signature/DocumentoFirmar'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
export default {
  components: {
    DocumentoFirmar,
  },
  mixins: [actionsByCodeMixin],
  props: {
    currentComponent: { type: Object, default: () => ({}) },
    color: { type: String, default: null },
  },
  data() {
    return {
      tipoDesembolso: null,
      loading: false,
      items: [
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
        { id: 3, doc: 'getcontrato_ws', title: 'Contrato', title2: 'Contrato' },
        {
          id: 4,
          doc: 'getcronograma_ws',
          title: 'Cronograma',
          title2: 'Cronograma',
        },
        {
          id: 5,
          doc: 'getdecjur_comdeu_ws',
          title: 'DeclaracionJuradaCompraDeuda',
          title2: 'Declaración Jurada Compra Deuda',
        },
      ],
      dialog: false,
      FirmaReady: 1,
      tokenenviado: null,
      telefono: null,
      enviarTokenDialog: false,
      estadoModalFinal: false,
    }
  },
  computed: {
    ...mapGetters('users', ['productCode']),
    ...mapGetters('compra-deuda', ['datos', 'estadoProspecto']),
    isCheckValorados() {
      return this.datos.isCheckValorados
    },
    isSelectALL() {
      if (
        this.isCheckValorados.length === this.items.length &&
        this.items.length !== 0
      ) {
        this.$store.commit('compra-deuda/UPDATE_DATOS', {
          terminosCondiciones: true,
        })
        return true
      } else {
        return false
      }
    },
    terminosCondiciones() {
      return this.datos.terminosCondiciones
    },
    buttonDinamic() {
      if (this.isSelectALL) {
        this.FirmaReady = 2
      }
      return 'FIRMAR'
    },
  },
  watch: {
    terminosCondiciones(val) {
      if (val) {
        this.$store.commit('compra-deuda/UPDATE_DATOS', {
          isCheckValorados: this.items,
        })
        this.FirmaReady = 2
      } else {
        this.FirmaReady = 1
      }
    },
  },
  methods: {
    allSignature() {
      this.FirmaReady = 2
    },
    async firmarContractuales() {
      this.loading = true
      await this.$store.dispatch('compra-deuda/actionFacialBiometryRecord', {
        codigoProspecto: this.datos.codigoProspecto,
        documento: this.datos.documento,
        metodo: 1,
      })
       this.analyzeProspectStatus()
      this.loading = false
    },
  },
}
</script>

<style scoped>
.container {
  width: 100% !important;
}
.ld-btn {
  min-width: 100px !important;
}
.ld-btn-secondary {
  min-width: 100px !important;
}
.docvaloricon {
  font-size: 75px !important;
}
.docvalorcard {
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 991px) {
  .ld-final {
    display: flex;
    justify-content: center;
  }
}

.file_uploader {
  background: red;
  padding: 4px;
}

.font {
  font-size: 0.9em !important;
}
.logo-banco {
  display: block;
  margin: auto;
}

.titulo-modalFinal__banco {
  display: flex;
  justify-content: center;
  align-items: center;
}

.titulo-modalFinal__banco p {
  margin-bottom: 0;
  width: 100%;
  text-align: center;
  border: 1.5px solid #005092;
  border-radius: 20px;
  font-weight: bold;
  color: #ff7729;
}

.text-modalFinal__banco {
  text-align: center;
  font-weight: bold;
}

.text-parrafo__primero {
  padding: 20px 5px;
  background-color: #e3e3e3;
  color: #005092;
  border-radius: 15px;
}

.text-parrafo__segundo {
  margin: 15px 0;
}
</style>
