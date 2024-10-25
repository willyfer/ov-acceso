<template>
  <div>
    <v-form ref="form1" autocomplete="nope" @submit.prevent="validaForm">
      <v-row dense justify="center" align="center">
        <v-col cols="12" sm="8" md="10">
          <v-row dense justify="center" align="center">
            <v-col cols="12" class="d-flex flex-column justify-center" style="padding:4px">
              <h2
                class="ld-h2-title-form headline"
                :class="`${color}--text`"
              >Porfavor, Verifica los datos del cliente</h2>
            </v-col>
            <v-col cols="12" sm="12" class="text-center lighten-2">
              <v-row dense justify="center" style="padding:4px">
                <div class>
                  <img class="contenedor-datos-cliente" v-bind:src="url" alt />
                </div>
              </v-row>
            </v-col>

            <v-col cols="12" md="6" class="text-center py-3" order-md="2">
              <v-btn class="ld-btn" :loading="loading" type="submit" :color="color">CONTINUAR</v-btn>
            </v-col>
            <v-col cols="12" md="6" class="text-center py-3" order-md="1">
              <v-btn
                class="ld-btn"
                :loading="loading"
                type="button"
                @click="modalConfirmar=true"
                color="red"
              >DECLINAR</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
    <v-dialog v-model="modalConfirmar" persistent max-width="350">
      <v-card shaped style="border-radius: 15px;">
        <v-card-title>
          <v-row class="d-flex flex-row justify-center text-center title justify">
            <b
              style="word-break: break-word;"
              class="secondary--text justify"
            >¿Está seguro que desea declinar el crédito?</b>
          </v-row>
        </v-card-title>
        <v-card-actions class="d-flex flex-row justify-center">
          <v-btn color="red" class="white--text" @click="modalConfirmar=false">Cancelar</v-btn>
          <v-btn
            :loading="loading"
            color="express"
            class="white--text"
            @click="declinaForm"
          >Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { format, parseISO } from 'date-fns'
import { selectDistritoCallao, selectDistritoLima } from '@/utils/ubigeo.js'
import { getMarca, getModelo } from '@/api/catalogue'
import { listSectorEconomico } from '@/utils/catalogo'
import { mixins } from '@/mixins/mixin.js'
import { fraudeLD } from '@/utils/template/templateFraude.js'
import { enviarCorreo } from '@/api/email';
import { getNameUsers } from '@/api/user';
export default {
  $_veeValidate: {
    validator: 'new'
  },
  mixins: [mixins],
  props: ['color'],
  computed: {
    ...mapState('express', ['datos', 'openDialog']),
    ...mapState('users', ['promotor']),
    provincia: {
      get() {
        if (this.datos.ubigeo) {
          return this.datos.ubigeo.slice(0, 4)
        }
        return '1501'
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { ubigeo: v })
      }
    },
    ubigeo: {
      get() {
        if (this.datos.ubigeo) {
          return this.datos.ubigeo
        }
        return null
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { ubigeo: v })
      }
    },
    formatFechaNacimiento() {
      if (this.datos.fechaNacimiento) {
        return format(parseISO(this.datos.fechaNacimiento), 'dd/MM/yyyy')
      }
      return null
    },
    selectDistrito() {
      if (this.provincia === '1501') {
        return selectDistritoLima
      }
      if (this.provincia === '0701') {
        return selectDistritoCallao
      }
      return []
    },
    url() {
      /* console.log('body fi_ficren: ', this.datos) */
      /* console.log('fi_ficren: ', this.datos.jsonReniec.fi_ficren) */
      if (this.datos.jsonReniec.fi_ficren) {
        /* console.log('Codigo Arcadj: ', this.datos.jsonReniec.fi_ficren) */
        return `${process.env.DEFAULT_URL}/apiacr/file?co_arcadj=${this.datos.jsonReniec.fi_ficren}&idf=y`
      }
    }
  },
  data() {
    return {
      menu: false,
      loading: false,
      departamento: {
        dep: 'Lima',
        id: '15'
      },
      selectDepartamento: [
        {
          dep: 'Lima',
          id: '15'
        }
      ],
      selectProvincia: [
        {
          pro: 'Lima',
          id: '1501'
        },
        {
          pro: 'Callao',
          id: '0701'
        }
      ],
      modalConfirmar: false
    }
  },
  watch: {},
  methods: {
    async declinaForm() {
      await this.$store.dispatch('express/updateProspecto', {
        codigoProducto: this.datos.codigoProducto,
        codigoUsuario: this.promotor.codigoUsuario,
        codigoProcurador: this.promotor.codigoUsuario,
        placa: this.datos.placa,
        documento: this.datos.documento,
        estadoProspecto: 12,
        codigoProspecto: this.datos.codigoProspecto,
        isFraude: true,
        jsonReniec: this.datos.jsonReniec, // Se agrego jsonReniec
        estadoBio: true
      })
      this.modalConfirmar = false
      const respEnviarCorreo = this.enviarCorreoFraude()
      this.$store.commit('ui/SET_OPENDIALOG', {
        estado: true,
        mensaje: 'Se procedió a declinar el crédito.'
      })
    },
    async validaForm() {
      await this.$store.dispatch('express/updateProspecto', {
        codigoProducto: this.datos.codigoProducto,
        codigoUsuario: this.promotor.codigoUsuario,
        codigoProcurador: this.promotor.codigoUsuario,
        placa: this.datos.placa,
        documento: this.datos.documento,
        estadoProspecto: this.datos.estadoProspecto,
        codigoProspecto: this.datos.codigoProspecto,
        jsonReniec: this.datos.jsonReniec,
        estadoBio: true
      })
      this.$store.commit('ui/UPDATE_STEP', 4)
    },
    async enviarCorreoFraude() {
      /* console.log('this.datos.codigoProspecto', this.datos.codigoProspecto) */
      const result = await getNameUsers(this.$axios, this.datos.codigoProspecto)
      /* console.log('userAsegurador', result) */
      const { usuAsegurador, usuProcurador, usuPromotor } = result
      const tipoCanal = this.catalogoCanal(this.datos.canalAtencion)
      const tipoOrigen = this.catalogoOrigen(this.datos.origen)
      const dataTemplate = {
        apellidoPaterno: this.datos.apellidoPaterno,
        apellidoMaterno: this.datos.apellidoMaterno,
        nombres: this.datos.nombres,
        documento: this.datos.documento,
        placa: this.datos.placa,
        tipoCanal: tipoCanal,
        tipoOrigen: tipoOrigen,
        nombreAsegurador: usuAsegurador ? usuAsegurador.no_usuper : 'No aplica',
        nombreProcurador: usuProcurador ? usuProcurador.no_usuper : 'No aplica',
        nombrePromotor: usuPromotor ? usuPromotor.no_usuper : 'No aplica'
      }
      /* console.log('template: ', dataTemplate) */
      const jsonCorreo = {
        de: 'Acceso Corp <workflow@acceso.com.pe>',
        para: 'renzo.aquije@acceso.com.pe',
        cc:
          'jorge.bardales@acceso.com.pe; ana.bocanegra@acceso.com.pe; ignacio.quezada@acceso.com.pe; erika.ramos@acceso.com.pe; magaly.terreros@acceso.com.pe; lorena.martinez@acceso.com.pe; pilar.fonseca@acceso.com.pe; valeria.hidalgo@acceso.com.pe; alejandra.herrera@acceso.com.pe;',
        asunto: `INTENTO DE FRAUDE EN “LD-FR” – CLIENTE: ${this.datos.apellidoPaterno} / DNI: ${this.datos.documento}`,
        html: fraudeLD(dataTemplate),
        adjuntos: []
      }
      const respEnviarCorreo = await enviarCorreo(this.$axios, jsonCorreo)
      return respEnviarCorreo
    },
    catalogoOrigen(idOrigen) {
      let tipoOrigen = null
      switch (idOrigen) {
        case 0:
          tipoOrigen = 'Indeterminado'
          break
        case 1:
          tipoOrigen = 'Google'
          break
        case 2:
          tipoOrigen = 'Facebook'
          break
        case 3:
          tipoOrigen = 'WhatsApp'
          break
        case 4:
          tipoOrigen = 'Organico'
          break
        case 5:
          tipoOrigen = 'Promotor'
          break
        case 6:
          tipoOrigen = 'Asesor'
          break
        default:
          tipoOrigen = 'Indeterminado'
      }
      return tipoOrigen
    },
    catalogoCanal(idCanal) {
      let tipoCanal = null
      switch (idCanal) {
        case 1:
          tipoCanal = 'Digital  '
          break
        case 2:
          tipoCanal = 'Aliados Comerciales  '
          break
        case 3:
          tipoCanal = 'Promotor externo  '
          break
        case 4:
          tipoCanal = 'Promotor interno  '
          break
        case 5:
          tipoCanal = 'Atención presencial  '
          break
        default:
          tipoCanal = 'Indeterminado'
      }
      return tipoCanal
    }
  }
}
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.contenedor-datos-cliente {
  width: 720px;
  height: 480px;
  background-color: #e0e0e0 !important;
}
</style>
