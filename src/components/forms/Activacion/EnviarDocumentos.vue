<template>
  <div>
    <v-row no-gutters align-center text-center>
      <v-col cols="12" md="12">
        <h2 class="ld-h2-title-form" :class="`${color}--text`">
          Sube una foto de documento de Identidad
        </h2>
      </v-col>
      <v-col cols="12 mb-4">
        <v-row
          no-gutters
          align-content-center
          text-center
          align-center
          justify-center
        >
          <v-col cols="12" sm="4" offset-sm="4" class="text-center">
            <FileUploader :files="dni" dark />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6" class="text-center pa-2" order-sm="2">
        <v-btn
          class="ld-btn"
          :color="color"
          :disabled="isDisabled"
          @click.native="enviarDocumentos"
        >
          <b>{{ buttonDinamic }}</b>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" class="text-center pa-2" order-sm="1">
        <v-btn class="ld-btn-secondary" @click="goOficina">
          <b>ATRAS</b>
        </v-btn>
      </v-col>
    </v-row>
    <ModalUploader :color="color" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import FileUploader from '@/components/shared/uploader/FileUploader'
import ModalUploader from '@/components/modals/ModalUploader'

export default {
  components: {
    FileUploader,
    ModalUploader
  },
  props: ['color', 'documentos'],
  data() {
    return {
      isDisabled: true,
      dni: {
        title: 'DNI*',
        subtitle: 'Documento de Identidad',
        pos: 0,
        obligatorio: 2,
        items: [
          {
            title: 'Foto DNI (Frontal)'
          },
          {
            title: 'Foto DNI (Posterior)'
          }
        ]
      },
      reniec: {
        title: 'Ficha Reniec*',
        subtitle: 'Ficha de identidad',
        pos: 1,
        obligatorio: 1,
        items: [
          {
            title: 'Ficha Reniec (Frontal)'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('express', ['datos']),
    ...mapState('default', ['arrayDocuments']),
    buttonDinamic() {
      const files = this.arrayDocuments.filter((v) => v)
      const obligatorio = this.documentos.filter((val) => val.isUp).length
      if (files.length >= obligatorio) {
        this.isDisabled = false
        return 'CONTINUAR'
      } else {
        return 'CONTINUAR'
      }
    },
    servicios() {
      return {
        title: `Recibo de servicios ${
          this.documentos[3].isUp ? '*' : '(opcional)'
        }`,
        subtitle:
          'Recibo de servicio (luz, agua, teléfono, gas) o estado de cuenta',
        pos: 3,
        obligatorio: 1,
        items: [
          {
            title: 'Recibo'
          }
        ]
      }
    }
  },
  async mounted() {
    this.$ga.event('Activacion', 'EnviarDocumentos')
    this.$store.commit('default/SET_ARRAY_DOCUMENTS', {
      posicion: 0,
      codigoArchivo: this.datos.fileDNI
    })
  },
  methods: {
    goOficina() {
      this.$store.commit('ui/UPDATE_STEP', 1)
    },
    async enviarDocumentos() {
      await this.$store.dispatch('express/enviarDocumentos', {
        oficina: true,
        documentos: this.documentos,
        arrayDocuments: this.arrayDocuments
      })
    }
  }
}
</script>

<style scoped>
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
</style>
