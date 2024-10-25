<template>
  <div>
    <v-snackbar v-model="snackbar" color="acceso" :timeout="3000" top
      >No se ha encontrado un valor <br />Intentelo nuevamente
      <v-btn dark icon flat @click="snackbar = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>
    <div class="mainCanvas">
      <video id="video" ref="video" autoplay class="camera-stream"></video>
      <canvas id="canvas" ref="canvas"></canvas>
      <div class="childButton">
        <v-btn
          v-if="!loading"
          id="snap"
          icon
          color="acceso"
          dark
          @click="capture()"
        >
          <v-icon>photo_camera</v-icon>
        </v-btn>
        <v-progress-circular
          v-else
          color="acceso"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

// ES6
export default {
  data() {
    return {
      mediaStream: null,
      canvas: {},
      snackbar: false,
      captures: [],
      listCamera: [],
      index: 0,
      statusRunning: false,
      dialog: false,
      defaultImage: require('@/assets/defaultUpload.png'),
      check: require('@/assets/check.png'),
      loading: false,
      showError: false,
      ownFiles: null,
      apikey: 'AIzaSyDDl3Y3b9nt6xTk1rbfqOT7lGATmf26p5s',
      detection: null,
      backCamID: null,
      vin: null
    }
  },
  mounted() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          this.mediaStream = stream
          this.$refs.video.srcObject = stream
          this.$refs.video.play()
        })
        .catch((e) => {
          alert('no se ha encontrado una camara')
        })
    }
  },
  destroyed() {
    const tracks = this.mediaStream.getTracks()
    tracks.map((track) => track.stop())
  },
  methods: {
    capture() {
      this.loading = true
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(mediaStreamTrack)
      return imageCapture.takePhoto().then(async (blob) => {
        await this.sendFiles(blob)
        this.loading = false
      })
    },
    async sendFiles(file) {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const responseUpload = await this.$axios.post(
          `/api/private/v1.0/ocrService`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj',
              'x-request-id': '123123123123123'
            }
          }
        )
        this.$ga.event('promotor-ocr', 'Ocr detectado')
        const vinResult = responseUpload.data
        this.detection = vinResult
        if (vinResult.length > 0) {
          this.$store.commit('UPDATE_PREDICTION', vinResult)
          this.$store.commit('UPDATE_DATOS', {
            vin: vinResult[0]
          })
          this.$store.commit('UPDATE_MODAL_BARCODE', false)
        } else {
          this.snackbar = true
        }
      } catch (e) {
        this.snackbar = true
        this.$ga.event('promotor-ocr', 'Ocr error')
        this.$store.commit('UPDATE_PREDICTION', [null])
      }
    }
  }
}
</script>

<style scoped>
.mainCanvas {
  position: relative;

  padding: 0;
}
#video {
  position: relative;
  bottom: 0;
  display: flex;
}
#canvas {
  display: none;
}
.camera-stream {
  width: 100%;
  height: 100% !important;
}

.childButton {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 4px;
}
</style>
