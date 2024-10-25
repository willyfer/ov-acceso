<template>
  <div>
    <v-row no-gutters align-center class="text-center">
      <v-col cols="12" md="12">
        <h2 class="ld-h2-title-form" :class="`${color}--text`">
          Tu crédito está casi listo, envíanos tus documentos para terminar
        </h2>
      </v-col>
      <v-row>
        <v-col>
          <FileUploader :files="dni" dark />
        </v-col>
        <v-col>
          <FileUploader :files="tarjetaPropiedad" dark />
        </v-col>
      </v-row>
      <!--       <v-col cols="12" py-3>
        <v-row no-gutters align-content-center>
          <v-col cols="6" sm="4">
            <FileUploader :files="dni" dark />
          </v-col>
          <v-col cols="6" sm="4">
            <FileUploader :files="tarjetaPropiedad" dark />
          </v-col>
        </v-row>
      </v-col> -->
      <v-col
        cols="12"
        sm="6"
        class="text-center pa-2"
        order-cols="2"
        order-sm="1"
      >
        <v-btn class="ld-btn-secondary" @click="goOficina">
          <b>PRESENTAR EN OFICINA</b>
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="text-center pa-2"
        order-xs="1"
        order-sm="2"
      >
        <v-btn class="ld-btn" :color="color" @click.native="enviarDocumentos">
          <b>{{ buttonDinamic }}</b>
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
      dni: {
        title: 'DNI*',
        subtitle: 'Documento de Identidad',
        pos: 0,
        obligatorio: 1,
        items: [
          {
            title: 'Foto DNI (Frontal)'
          }
        ]
      },
      tarjetaPropiedad: {
        title: 'Tarjeta de Propiedad*',
        subtitle: 'Tarjeta de Propiedad',
        pos: 1,
        obligatorio: 2,
        items: [
          {
            title: 'Frontal'
          },
          {
            title: 'Posterior'
          }
        ]
      },
      soat: {
        title: 'SOAT*',
        subtitle: 'SOAT',
        pos: 2,
        obligatorio: 1,
        items: [
          {
            title: 'Image Frontal'
          }
        ]
      },
      revisionTecnica: {
        title:
          "Revision Técnica <br/> <span style='font-size:10px'>*obligatorio si es mayor a 3 años</span>",
        subtitle: 'Revision Técnica',
        pos: 4,
        obligatorio: 1,
        items: [
          {
            title: 'Imagen Frontal'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('default', ['datos', 'arrayDocuments']),
    buttonDinamic() {
      const files = this.arrayDocuments.filter((v) => v)
      const obligatorio = this.documentos.filter((val) => val.isUp).length
      if (files.length >= obligatorio) {
        return 'TERMINAR'
      }
      return 'GUARDAR'
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
    // this.$ga.event('Documentacion', 'Visualizacion')
  },
  methods: {
    goOficina() {
      this.$store.dispatch('default/enviarDocumentos', { oficina: false })
    },
    enviarDocumentos() {
      this.$store.dispatch('default/enviarDocumentos', {
        oficina: true,
        documentos: this.documentos
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
