<template>
  <div>
    <div class="mainUploader" @click="upModal">
      <div class="titleUploader" v-html="files.title" />
      <div class="image-upload ma-3">
        <img :src="codigoArchivo ? check : defaultImage" class="imgLayout" />
      </div>
      <div />
    </div>
    <a
      v-if="codigoArchivo"
      class="viewfile"
      small
      flat
      dark
      :href="url"
      target="_blank"
      >Ver Archivo</a
    >
  </div>
</template>
<script>
export default {
  props: ['files'],
  data() {
    return {
      default: require('@/assets/defaultUpload.png'),
      check: require('@/assets/check.png'),
      loading: false
    }
  },
  computed: {
    bussines() {
      return this.$store.state.default.bussines
    },
    defaultImage() {
      if (
        this.bussines.codigoProducto == 33 &&
        this.bussines.codigoSubProducto == 2
      ) {
        return this.default
      } else {
        return this.default
      }
    },
    url() {
      return `${process.env.DEFAULT_URL}/apiacr/file?co_arcadj=${this.codigoArchivo}&idf=y`
    },
    arrayDocuments() {
      return this.$store.state.default.arrayDocuments
    },
    codigoArchivo() {
      return this.$store.state.default.arrayDocuments[this.files.pos]
    }
  },
  methods: {
    upModal(event) {
      this.$store.commit('default/SET_DIALOG_UPLOAD', {
        state: true,
        files: this.files
      })
      this.$ga.event('Documentacion', `Abrió ${this.files.title}`)
    }
  }
}
</script>
<style scoped>
img {
  width: auto;
  max-width: 100px !important;
  height: 72px !important;
}

.mainUploader {
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}

.image-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto !important;
  max-width: 100px !important;
}

/* .image-upload>input {
    visibility: hidden;
    display: none;
    width: 100%;
    cursor: pointer;
  } */

.titleUploader {
  text-align: center;
  padding: 8px;
  /* color: #eb7531 !important; */
  height: 48px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.viewfile {
  color: #0f4070 !important;
}
</style>
