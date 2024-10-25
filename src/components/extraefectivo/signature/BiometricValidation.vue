<template>
  <div class="d-flex justify-center align-center px-2">
    <Biometric
      v-if="!loadingComponent"
      @iniciarBiometria="iniciarBiometria"
      @onExtractionFinish="onExtractionFinish"
      @onExceptionCaptured="onExceptionCaptured"
      @onLivenessError="onLivenessError"
      :loading="loading"
    >
      <v-card-title class="text-blue"><b>Verificación facial</b></v-card-title>
      <v-card-text class="text-blue">
        Ahora, para verificar que eres el titular del crédito necesitamos
        validar tu identidad. A continuación, te brindamos unas recomendaciones:
      </v-card-text>
      <v-card-text>
        <ul class="lista-tutorial text-blue">
          <li
            class="lista-tutorial__item"
            v-for="recomendacion in recomendaciones"
            :key="recomendacion.id"
          >
            <div>
              <img :src="recomendacion.img" width="28" height="28" />
            </div>
            <span class="lista-tutorial__text">{{ recomendacion.text }}</span>
          </li>
        </ul>
      </v-card-text>
    </Biometric>
    <LoadingComponent color="acceso" v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Biometric from '@/components/validations/Biometric'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
export default {
  components: {
    Biometric,
    LoadingComponent,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  mixins: [actionsByCodeMixin],
  computed: {
    ...mapGetters('users', ['productCode']),
    ...mapGetters('extraefectivo', ['datos', 'estadoProspecto']),
  },
  data() {
    return {
      recomendaciones: [
        {
          img: require('@/assets/img/biometria/manual_img_1.svg'),
          text:
            'Ubíquese en un lugar con buena iluminación para evitar fotos opacas',
        },
        {
          img: require('@/assets/img/biometria/manual_img_2.png'),
          text:
            'Recuerde no hacer uso de lentes de sol, gafas, gorras y otros elementos que dificulten la identificación del rostro',
        },
        {
          img: require('@/assets/img/biometria/manual_img_3.svg'),
          text: 'Mantenga los ojos abiertos y sonría para una foto idónea.',
        },
        {
          img: require('@/assets/img/biometria/manual_img_4.svg'),
          text:
            'En caso se presente caídas de internet, puede volver a ingresar a su enlace de firma electrónica.',
        },
      ],
      loading: false,
      loadingComponent: false,
    }
  },
  methods: {
    async iniciarBiometria() {
      this.loading = true
      await this.$store.dispatch('express/actionFacialBiometryRecord', {
        codigoProspecto: this.datos.codigoProspecto,
        documento: this.datos.documento,
        metodo: 2,
      })
    },
    async onExtractionFinish(value) {
      const payload = {
        ...value,
        codigoProspecto: this.datos.codigoProspecto,
        documento: this.datos.documento,
      }
      this.loadingComponent = true
      await this.$store.dispatch('extraefectivo/actionFacialBiometriy', payload)
      this.analyzeProspectStatus()
      this.loadingComponent = false
      this.loading = false
    },
    async onExceptionCaptured(value) {
      console.log('onExceptionCaptured: ', value.detail)
      await this.$store.dispatch('extraefectivo/actionExceptionCaptured', {
        codigoProspecto: this.datos.codigoProspecto,
        documento: this.datos.documento,
        metodo: 3,
        log: { type: value.type, detail: value.detail },
      })
    },
    async onLivenessError(value) {
      await this.$store.dispatch('extraefectivo/actionExceptionCaptured', {
        codigoProspecto: this.datos.codigoProspecto,
        documento: this.datos.documento,
        metodo: 3,
        log: { type: value.type, detail: value.detail },
      })
    },
  },
}
</script>

<style scoped>
.lista-tutorial {
  list-style: none;
}
.lista-tutorial__item {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
}
.lista-tutorial__text {
  margin-left: 20px;
}
.text-blue {
  color: #3f6aa4 !important;
}
</style>