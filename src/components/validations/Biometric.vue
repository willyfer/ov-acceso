<template>
  <div class="biometric__container">
    <v-card max-width="400">
      <div id="fPhiWidgetContainer" style="min-height: 400px">
        <div v-show="buttonWidgetStart">
          <slot></slot>
        </div>
      </div>
      <div class="d-flex flex-column justify-center align-center py-4">
        <v-btn
          v-if="buttonWidgetStart"
          dark
          large
          color="#FF7729"
          :loading="loading"
          @click="iniciarBiometria"
          >Iniciar Selfie</v-btn
        >
        <v-btn
          v-if="buttonWidgetRetry"
          dark
          large
          color="#FF7729"
          @click="reintentarBiometria"
          >Reintentar</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Biometric',
  props: ['loading'],
  data() {
    return {
      buttonWidgetRetry: false,
      buttonWidgetStart: true,
      widgetObj: null,
      attempts: 0,
    }
  },
  methods: {
    iniciarBiometria() {
      try {
        this.buttonWidgetRetry = false
        this.buttonWidgetStart = false
        var widgetConfiguration = this.getWidgetConfiguration()
        this.widgetObj = new FPhi.Selphi.Widget(widgetConfiguration)
        this.widgetObj.Start()
        this.$emit('iniciarBiometria', 'iniciarBiometria')
      } catch (error) {
        console.log("errorIniciarBiometria: ", error)
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'error',
          tituloModal: '¡Lo sentimos!',
          msgModal:
            'En estos momentos no podemos iniciar su identificación, por favor intentelo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
        })
      }
    },
    reintentarBiometria() {
      try {
        this.widgetObj.Stop()
        this.iniciarBiometria()
      } catch (error) {
        console.log("errorIniciarBiometria: ", error)
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'error',
          tituloModal: '¡Lo sentimos!',
          msgModal:
            'En estos momentos no podemos iniciar su identificación, por favor intentelo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
        })
      }
    },
    getWidgetConfiguration() {
      try {
        var widgetConfiguration = new FPhi.Selphi.ConfigurationManager()

        var widgetContainer = document.querySelector('#fPhiWidgetContainer')
        widgetConfiguration.setContainer(widgetContainer)

        // Initialize configuration properties
        widgetConfiguration.setMode(FPhi.Selphi.Mode['Authenticate'])
        widgetConfiguration.setLivenessMode(FPhi.Selphi.LivenessMode['Passive'])

        widgetConfiguration.setInteractible(false)
        widgetConfiguration.setTutorial(false)
        widgetConfiguration.setStabilizationStage(false)

        widgetConfiguration.setCameraWidth(1280)
        widgetConfiguration.setCameraHeight(720)

        widgetConfiguration.setCameraType(FPhi.Selphi.CameraType['Front'])

        widgetConfiguration.setLogImages(false)
        widgetConfiguration.setCropFactor(1.7) // Ajustadas a la cara o no
        widgetConfiguration.setImageFormat(FPhi.Selphi.ImageFormat['image/png'])

        widgetConfiguration.setVideoRecord(false)
        widgetConfiguration.setVideoRecordType(FPhi.Selphi.RecorderType.Remote)
        widgetConfiguration.setVideoRecordScale(
          widgetConfiguration.getCameraWidth() < 1280 ? 1 : 0.5
        )

        // Setup widget event handlers
        widgetConfiguration.setOnModuleLoaded(this.onModuleLoaded)
        widgetConfiguration.setOnStabilizing(this.onStabilizing)
        widgetConfiguration.setOnExtractionFinish(this.onExtractionFinish)
        widgetConfiguration.setOnUserCancel(this.onUserCancel)
        widgetConfiguration.setOnExceptionCaptured(this.onExceptionCaptured)
        widgetConfiguration.setOnLivenessError(this.onLivenessError)
        widgetConfiguration.setOnLivenessErrorButtonClick(
          this.onLivenessErrorButtonClick
        )
        widgetConfiguration.setOnExtractionTimeout(this.onExtractionTimeout)
        widgetConfiguration.setOnTimeoutErrorButtonClick(
          this.onTimeoutErrorButtonClick
        )
        widgetConfiguration.setOnTrackStatus(this.onTrackStatus)

        return widgetConfiguration
      } catch (error) {
        throw new Error('Error en getWidgetConfiguration')
      }
    },
    onModuleLoaded(eventData) {
      console.warn('[Selphi] onModuleLoaded')
    },
    onExtractionFinish(extractionResult) {
      try {
        let bestImageFormat
        if (extractionResult.detail.bestImage) {
          bestImageFormat = extractionResult.detail.bestImage.src.split(',')[1]
        } else {
          bestImageFormat = null
        }

        const dataExtractionFinish = {
          token2: extractionResult.detail.templateRaw,
          bestImage: bestImageFormat,
        }
        this.$emit('onExtractionFinish', dataExtractionFinish)
      } catch (error) {
         throw new Error('Error en onExtractionFinish')
      }
    },
    onUserCancel() {
      /* Si el usuario cancela el widget */
      /* console.warn('[Selphi] onUserCancel') */
    },
    onExceptionCaptured(exceptionResult) {
      /* Implementar un contador con 3 o 5 intentos */
      console.log('onExceptionCaptured', this.attempts++)
      console.warn('[Selphi] onExceptionCaptured: ', exceptionResult)
      this.$emit('onExceptionCaptured', exceptionResult)
    },
    onLivenessError(livenessErrorResult) {
      console.log('onLivenessError', this.attempts++)
       this.$emit('onLivenessError', livenessErrorResult)
    },
    onLivenessErrorButtonClick() {
      this.widgetObj.Stop()
    },
    onExtractionTimeout(extractionTimeoutResult) {
      /* Implementar un contador con 3 o 5 intentos */
      console.warn('[Selphi] onExtractionTimeout')
      console.log('onLivenessEronExtractionTimeoutror', this.attempts++)
      this.buttonWidgetRetry = true
    },
    onTimeoutErrorButtonClick() {
      console.warn('[Selphi] onTimeoutErrorButtonClick')
      this.widgetObj.Stop()
    },
  },
}
</script>

<style scoped>
.biometric__container {
  min-width: 315px;
}
.containerFPhiWidgetContainer {
  min-height: 550px !important;
}
@media (min-width: 360px) {
  .biometric__container {
    min-width: 350px;
  }
}
</style>