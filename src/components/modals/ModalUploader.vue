<template>
  <v-dialog
    v-if="filesProp.state"
    v-model="filesProp.state"
    :max-width="filesProp.files.items.length > 1 ? '450' : '360'"
    persistent
  >
    <v-card class="ld-modal">
      <v-card-title>
        <h4
          class="ld-modal-title pa-2 text-center"
          :class="color + '--text'"
          v-html="filesProp.files.subtitle"
        ></h4>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col
            v-if="filesProp.files.descripcion"
            cols="12"
            class="white--text"
          >
            <small>{{ filesProp.files.descripcion }}</small>
          </v-col>
          <v-col cols="12" pa-2>
            <v-divider dark />
          </v-col>
          <v-col cols="12" my-2>
            <div class="mainImagenesLayout">
              <div v-for="(item, i) in filesProp.files.items" :key="i" pa-2>
                <v-row no-gutters class="mainUploader">
                  <v-col cols="12">
                    <div class="titleUploader">
                      <small>{{ item.title }}</small>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div id="foo" class="image-upload ma-2">
                      <label :for="i">
                        <v-progress-circular
                          v-if="loading"
                          :id="i"
                          indeterminate
                          color="white"
                        />
                        <img
                          v-else
                          :src="ownFiles[i] ? ownFiles[i].base64 : defaultImage"
                        />
                      </label>
                      <input
                        :id="i"
                        type="file"
                        accept=".jpg, .jpeg, .png;capture=camera"
                        capture="camera"
                        @change="setFiles($event, i)"
                      />
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col
            v-show="showError"
            cols="12"
            text-center
            :class="{
              'soat--text': $route.name === 'ConsultaSoat' ? true : false
            }"
          >
            <h3>*Por favor completa las imagenes</h3>
          </v-col>
          <v-col cols="12">
            <v-divider />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="mb-2">
        <v-row dense>
          <v-col
            cols="12"
            sm="6"
            class="text-center pa-2"
            py-1
            order-xs="1"
            order-sm="2"
          >
            <v-btn
              :loading="loading"
              class="ld-btn btn-internal-modal"
              :disabled="loading"
              :color="color"
              :class="{ soat: $route.name === 'ConsultaSoat' ? true : false }"
              @click="sendFiles"
            >
              <b>Continuar</b>
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="text-center pa-2"
            py-1
            order-cols="2"
            order-sm="1"
          >
            <v-btn
              class="ld-btn-secondary btn-internal-modal"
              @click.native="closeModal"
            >
              <b>cancelar</b>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import * as jsPDF from 'jspdf'
import axios from 'axios'
import { mapState } from 'vuex'
import Compressor from 'compressorjs'

export default {
  /* , "pos" */
  props: ['files', 'color'],
  data() {
    return {
      title: 'DNI',
      dialog: true,
      defaultImage: require('@/assets/defaultUpload.png'),
      documentosValorados: require('@/assets/documentos_valorados.png'),
      check: require('@/assets/check.png'),
      loading: false,
      showError: false,
      ownFiles: [null, null],
      checkDoc: true
    }
  },
  computed: {
    ...mapState('default', ['filesProp', 'arrayDocuments'])
  },
  mounted() {
    this.resetValues()
  },
  methods: {
    resetValues() {
      this.checkDoc = true
      this.ownFiles = [null, null]
      this.showError = false
      this.checkDoc = true
    },
    closeModal() {
      this.resetValues()
      this.$ga.event(
        'Documentacion',
        `Cerrar modal ${this.filesProp.files.title}`
      )
      this.$store.commit('default/SET_DIALOG_UPLOAD', {
        state: false
      })
    },
    async setFiles(event, pos) {
      /* this.resetValues(); */
      const file = event.target.files[0]
      const i = pos
      if (file) {
        this.$ga.event(
          'Documentacion',
          `Subió archivo ${this.filesProp.files.title} --  ${i} / ${this.filesProp.files.obligatorio}`
        )
        const url = URL.createObjectURL(file)
        const size = await this.getSize(url)
        //console.log(size);
        const myFile = await this.getTiny(file)
        //console.log(myFile);
        const base64 = await this.getBase64(myFile)

        const source = {
          base64,
          ...size
        }
        this.ownFiles.splice(i, 1, source)
      } else {
        this.showError = true
      }
    },
    async sendFiles() {
      this.loading = true
      const items = this.filesProp.files.obligatorio
      const checkFiles = this.ownFiles.filter((v) => v)
      //console.log("lista: " + checkFiles.length + "obligatorio: " + items);
      if (checkFiles.length >= items) {
        this.showError = false
        const doc = new jsPDF('p', 'pt', [595.28, 841.89])

        let i = 0
        do {
          const element = this.ownFiles[i]
          const reSize = this.dimensionar(element.width, element.height)

          doc.addImage(
            element.base64,
            'JPEG',
            10,
            10,
            reSize.width,
            reSize.height
          )
          i++
          if (i != checkFiles.length) {
            doc.addPage()
          }
        } while (i < checkFiles.length)
        const pdf = doc.output('blob')

        const result = await this.getCodigoArchivo(pdf)

        this.$store.commit('default/SET_ARRAY_DOCUMENTS', {
          posicion: this.filesProp.files.pos,
          codigoArchivo: result.codigoArchivo
        })

        this.loading = false
        this.closeModal()
      } else {
        this.showError = true
        this.loading = false
      }
    },
    async getCodigoArchivo(file) {
      const formData = new FormData()
      formData.append('file', file, 'file.pdf')
      const responseUpload = await axios.post(
        '/api/private/v1.0/uploadfile',
        formData,
        {
          headers: {
            'content-type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj',
            'x-request-id': '123123123123123'
          }
        }
      )
      this.$ga.event(
        'Documentacion',
        `Subió archivo ${this.filesProp.files.title} exitosamente`
      )
      return responseUpload.data
    },
    getSize(url) {
      const img = new Image()
      return new Promise((resolve, reject) => {
        img.onload = () => {
          const w = img.naturalWidth
          const h = img.naturalHeight
          resolve({
            width: w,
            height: h
          })
        }

        img.onerror = reject
        img.src = url
      })
    },
    dimensionar(x, y) {
      /* 595, 842 */
      const w = 560
      const h = 800
      if (x < w && y < h) {
        //console.log("1");
        return {
          width: x,
          height: y
        }
      }
      const x1 = w / x
      const y1 = h / y
      if (x < y) {
        //console.log("IMAGEN VERTICAL");
        return {
          width: x * x1,
          height: y * y1
        }
      }
      //console.log("IMAGEN HORIZONTAL");

      return {
        width: x * x1,
        height: y * x1
      }
    },
    getTiny(file) {
      return new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.9,
          maxWidth: 750,
          maxHeight: 1000,
          success: resolve,
          error: reject
        })
      })
        .then((result) => result)
        .catch((err) => {})
        .finally(() => {})
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    }
  }
}
</script>
<style scoped>
.mainImagenesLayout {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 8px !important;
}

.mainUploader {
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.image-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100px !important;
}

img {
  width: auto;
  max-width: 120px;
  height: 100px;
  max-height: 150px !important;
  cursor: pointer;
}

.titleUploader {
  text-align: center;
  padding: 8px;
}

.image-upload > input {
  visibility: hidden;
  display: none;
  width: 100%;
  cursor: pointer;
}

@media (min-width: 721px) {
  .mainUploader {
    width: 180px !important;
  }

  .image-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100px !important;
  }

  .mainImagenesLayout {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 0;
  }
}

.btn-internal-modal {
  min-width: 150px !important;
}
</style>
