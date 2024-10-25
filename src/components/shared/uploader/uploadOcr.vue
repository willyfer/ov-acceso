<template>
  <div id="foo" class="image-upload ma-2">
    <label for="ocr">
      <v-progress-circular v-if="loading" indeterminate color="acceso" />
      <img v-else :src="defaultImage" />
    </label>
    <input
      id="ocr"
      type="file"
      accept=".jpg, .jpeg, .png"
      capture="camera"
      @change="setFiles"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Compressor from 'compressorjs'

export default {
  /* , "pos" */
  props: ['files'],
  data() {
    return {
      title: 'DNI',
      dialog: true,
      defaultImage: require('@/assets/defaultUpload.png'),
      check: require('@/assets/check.png'),
      loading: false,
      showError: false,
      ownFiles: null,
      apikey: 'AIzaSyDDl3Y3b9nt6xTk1rbfqOT7lGATmf26p5s',
      detection: null
    }
  },
  methods: {
    async setFiles(event) {
      this.loading = true
      this.ownFiles = null
      this.predictions = []
      const file = event.target.files[0]

      if (file) {
        this.$ga.event('promotor-ocr', 'Subiendo Imagen')
        const myFile = await this.getTiny(file)
        await this.sendFiles(myFile)
        this.loading = false
      } else {
        this.showError = true
        this.loading = false
      }
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
              Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
            }
          }
        )
        this.$ga.event('promotor-ocr', 'Ocr detectado')
        const vinResult = responseUpload.data
        this.detection = vinResult
        this.$store.commit('default/UPDATE_PREDICTION', vinResult)
        this.$store.commit('default/UPDATE_DATOS', {
          vin: vinResult[0]
        })
      } catch (e) {
        this.$ga.event('promotor-ocr', 'Ocr error')
        this.$store.commit('default/UPDATE_PREDICTION', null)
      }
    },

    getTiny(file) {
      return new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.6,
          maxWidth: 800,
          maxHeight: 800,
          success: resolve,
          error: reject
        })
      })
        .then((result) => result)
        .catch((err) => {
          window.alert(err.message)
        })
        .finally(() => {})
    }
  }
}
</script>
<style scoped>
.mainUploader {
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
}

.mainImagenesLayout {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;

  width: 20px !important;
  height: 20px !important;
}

.titleUploader {
  color: #ffffff;
  text-align: center;
}

img {
  width: 100%;
  height: auto;
  cursor: pointer;
}

.image-upload > input {
  visibility: hidden;
  display: none;
  width: 100%;
  cursor: pointer;
}
</style>
