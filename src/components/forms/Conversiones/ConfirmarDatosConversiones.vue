<template>
  <div class="d-flex justify-center container-principal__confirmar">
    <v-form
      ref="form1"
      autocomplete="nope"
      class="form-datos"
      slot="formulario"
    >
      <v-row>
        <v-col
          cols="12"
          md="12"
          lg="12"
          class="d-flex flex-column"
          style="padding:4px"
        >
          <h2 class="h2-titulo text-color--primary">
            Vamos a confirmar tus datos
            <v-divider class="mt-2" color="#AAAAAA"></v-divider>
          </h2>
        </v-col>
      </v-row>
      <v-row offset-cols="2">
        <v-col
          cols="12"
          md="8"
          no-gutters
          class="d-flex flex-column justify-center"
          style="padding:4px"
        >
          <span class="ld-form-p2 label-form text-color--primary"
            >Datos del domicilio</span
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" sm="6" style="padding:4px">
          <v-select
            @change="selectDep"
            outlined
            dense
            v-model="departamento"
            v-validate="'required'"
            label="Departamento"
            :color="colorForm"
            :items="selectDepartamento"
            data-vv-as="Departamento"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('departamento')"
            data-vv-name="departamento"
            required
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" style="padding:4px">
          <v-select
            @change="selectPro"
            outlined
            dense
            v-model="provincia"
            v-validate="'required'"
            :color="colorForm"
            label="Provincia"
            :items="selectProvincia"
            data-vv-as="Provincia"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('provincia')"
            data-vv-name="provincia"
            required
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" style="padding:4px">
          <v-autocomplete
            outlined
            dense
            v-model="distrito"
            v-validate="'required'"
            :color="colorForm"
            :items="selectDistrito"
            label="Distrito"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('ubigeo')"
            data-vv-name="ubigeo"
            data-vv-as="Distrito"
            required
            no-data-text="No existe este distrito"
          />
        </v-col>
        <v-col cols="12" md="6" sm="12" style="padding:4px">
          <v-text-field
            outlined
            dense
            v-model="direccion"
            v-validate="'required'"
            :error-messages="errors.collect('direccion')"
            data-vv-as="Direccion"
            label="Dirección"
            data-vv-name="direccion"
            required
            :color="colorForm"
          />
        </v-col>
      </v-row>
      <v-row offset-cols="2">
        <v-col
          cols="12"
          md="8"
          no-gutters
          class="d-flex flex-column justify-center"
          style="padding:4px"
        >
          <span class="ld-form-p2 label-form text-color--primary"
            >Datos complementarios</span
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" sm="6" style="padding:4px">
          <v-autocomplete
            outlined
            dense
            v-model="sectorEconomico"
            v-validate="'required'"
            :items="selectSectoreconomico"
            data-vv-as="Sector"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('sectorEconomico')"
            label="Sector económico"
            data-vv-name="sectorEconomico"
            required
            :color="colorForm"
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" style="padding:4px">
          <v-autocomplete
            outlined
            dense
            v-model="actividadEconomica"
            v-validate="'required'"
            :items="selectActividadeconomica"
            data-vv-as="Actividad"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('actividadEconomica')"
            label="Actividad económica"
            data-vv-name="actividadEconomica"
            required
            :color="colorForm"
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" style="padding:4px">
          <v-autocomplete
            outlined
            dense
            v-model="profesion"
            v-validate="'required'"
            :color="colorForm"
            :items="selectOcupacion"
            data-vv-as="profesion"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('profesion')"
            label="Profesión y ocupación"
            data-vv-name="profesion"
            required
          />
        </v-col>
      </v-row>
      <v-row
        offset-cols="2"
        v-if="datos.codigoProducto == 20 || datos.codigoProducto == 22"
      >
        <v-col
          cols="12"
          md="8"
          no-gutters
          class="d-flex flex-column justify-center"
          style="padding:4px"
        >
          <span class="ld-form-p2 label-form text-color--primary"
            >Escoge el medio por donde quieres que te depositemos tu
            dinero</span
          >
        </v-col>
      </v-row>
      <div v-if="datos.codigoProducto == 20 || datos.codigoProducto == 22">
        <v-radio-group v-model="tipoDesembolso">
          <div class="tipos-pagos">
            <v-radio label="En cuenta Bancaria" value="1"> </v-radio>
            <!-- <v-radio value="2">
              <template v-slot:label>
                <div class="radio-BIM">
                  <div>
                    En Billetera electrónica
                  </div>
                  <div class="ml-2 d-flex flex-column align-center">
                    <div>
                      <img :src="logoBIM" width="60" alt="logoBIM" />
                    </div>
                    <div class="text-center">
                      <span class="span-bim"
                        ><a @click="isModalInfoBim = true" href="#"
                          >¿Qué es BIM?
                        </a></span
                      >
                    </div>
                  </div>
                </div>
              </template>
            </v-radio> -->
          </div>
        </v-radio-group>
      </div>
      <div class="class-tyc">
        <v-row class="d-flex flex-row justify-center">
          <v-col
            md="12"
            sm="12"
            xs="12"
            class="d-flex flex-row justify-center"
            v-if="datos.codigoProducto == 20 || datos.codigoProducto == 22"
          >
            <v-btn
              @click="confirmarDatos"
              large
              class="content-color--primary"
              style="border-radius:5px;"
              dark
              :loading="loading"
              >CONFIRMAR</v-btn
            >
          </v-col>
          <v-col
            md="12"
            sm="12"
            xs="12"
            class="d-flex flex-row justify-center"
            v-else
          >
            <v-btn
              @click="confirmSoloDatos"
              large
              class="content-color--primary"
              style="border-radius:5px;"
              dark
              :loading="loading"
              >CONFIRMAR</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-form>
    <v-dialog v-model="isModalPagoBanco" max-width="500" persistent>
      <FormPagoBanco
        :listaTipoCuenta="listaTipoCuenta"
        :listaTipoEntidad="listaTipoEntidad"
        :loading="loading"
        @confirmPagoBanco="confirmPagoBanco"
        @closePagoBanco="closePagoBanco"
      />
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FormLayout from '@/components/FormLayout'
import { mixins } from '@/mixins/mixin.js'
import {
  arrayDepartamentos,
  arrayProvincias,
  arrayDistritos
} from '@/utils/ubigeo.js'
import {
  getMarca,
  getModelo,
  getBancos
} from '@/api/catalogue'
import {
  listSectorEconomico,
} from '@/utils/catalogo'

export default {
  components: {
    FormLayout,
    FormPagoBanco: () => import('@/components/pagosforms/FormPagoBanco')
  },
  $_veeValidate: {
    validator: 'new'
  },
  mixins: [mixins],
  props: ['color'],
  async mounted() {
    getBancos(this.$axios)
      .then((res) => {
        if (res.codRes == '00') {
          this.listaTipoEntidad = res.arrayBancos
        } else if (res.codRes == '99') {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: '¡Lo sentimos!',
            msgModal:
              'En estos momentos no se puede obtener los bancos, por favor inténtelo más tarde.',
            maxWidth: 350,
            estadoModal: true,
            isReset: true
          })
        }
      })
      .catch((err) => {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'error',
          tituloModal: '¡Error!',
          msgModal: err.message,
          maxWidth: 350,
          estadoModal: true,
          isReset: true
        })
      })

    this.selectOcupacion = await this.getOcupacion()
    this.listaActividadeconomica = await this.getActividadeconomica()
    this.listaMarca = await getMarca(this.$axios)
    if (this.datos.marca) {
      await this.getModelo(this.datos.marca)
    }
  },
  computed: {
    ...mapGetters('conversiones', ['datos']),
    direccion: {
      get() {
        return this.datos.direccion
      },
      set(v) {
        this.$store.commit('conversiones/SET_DATOS', { direccion: v })
      }
    },
    sectorEconomico: {
      get() {
        let newVal = this.datos.sectorEconomico

        if (newVal == null) {
          newVal = 28
        }
        const filterList = this.listaActividadeconomica.filter(
          (val) => val.fk === newVal
        )
        this.selectActividadeconomica = filterList
        return newVal
      },
      set(v) {
        this.$store.commit('conversiones/SET_DATOS', { sectorEconomico: v })
      }
    },
    actividadEconomica: {
      get() {
        let newVal = this.datos.actividadEconomica
        if (newVal == null) {
          newVal = 357
        } else {
          return newVal
        }
        return newVal
      },
      set(v) {
        this.$store.commit('conversiones/SET_DATOS', { actividadEconomica: v })
      }
    },
    profesion: {
      get() {
        if (this.datos.profesion) {
          return this.datos.profesion
        }
        return 111
      },
      set(v) {
        this.$store.commit('conversiones/SET_DATOS', { profesion: v })
      }
    },
    marca: {
      get() {
        let newVal = this.datos.marca
        if (!newVal) {
          newVal = null
        }
        return newVal
      },
      set(v) {
        this.$store.commit('conversiones/SET_DATOS', { marca: v })
      }
    },
    modelo: {
      get() {
        let newVal = this.datos.modelo
        if (!newVal) {
          newVal = null
        }
        return newVal
      },
      set(v) {
        this.$store.commit('conversiones/SET_DATOS', { modelo: v })
      }
    },
    departamento: {
      get() {
        if (!this.datos.ubigeo) {
          this.$store.commit('conversiones/SET_DATOS', { departamento: '15' })
          return '15'
        } else {
          return this.datos.departamento
        }
      },
      set(v) {
        this.$store.commit('conversiones/SET_DATOS', { departamento: v })
      }
    },
    provincia: {
      get() {
        if (!this.datos.ubigeo) {
          this.$store.commit('conversiones/SET_DATOS', { provincia: '1501' })
          return '1501'
        } else {
          return this.datos.provincia
        }
      },
      set(v) {
        this.$store.commit('conversiones/SET_DATOS', { provincia: v })
      }
    },
    distrito: {
      get() {
        if (!this.datos.ubigeo) {
          this.$store.commit('conversiones/SET_DATOS', {
            distrito: '150101',
            ubigeo: '150101'
          })
          return '150101'
        } else {
          return this.datos.distrito
        }
      },
      set(v) {
        this.$store.commit('conversiones/SET_DATOS', { distrito: v, ubigeo: v })
      }
    },
    selectSectoreconomico() {
      return listSectorEconomico
    },
    selectDepartamento() {
      var selectDepartamento = arrayDepartamentos.filter((va) => {
        if (
          this.datos.codigoProducto == 17 ||
          this.datos.codigoProducto == 18
        ) {
          if (va.id == '15' || va.id == '07') {
            return va
          }
        } else {
          return va
        }
      })
      return selectDepartamento
    },
    selectProvincia() {
      var selectProvincias = arrayProvincias.filter((va) => {
        if (va.id.slice(0, 2) == this.datos.departamento) {
          return va
        }
      })
      return selectProvincias
    },
    selectDistrito() {
      var selectDistritos = arrayDistritos.filter((va) => {
        if (va.id.slice(0, 4) == this.datos.provincia) {
          return va
        }
      })
      return selectDistritos
    }
  },
  data() {
    return {
      tipoDesembolso: '1',
      colorForm: '#005092',
      loader: null,
      loading: false,
      listaTipoCuenta: [
        {
          id: 1,
          tipo: 'Cuenta de Ahorros'
        },
        {
          id: 2,
          tipo: 'Cuenta Corriente'
        }
      ],
      listaTipoEntidad: [],
      selectActividadeconomica: [],
      listaActividadeconomica: [],
      selectOcupacion: [],
      listaMarca: [],
      listaModel: [],
      isDisabledModelo: false,
      isModalBim: false,
      isModalPagoBanco: false,
      logoBIM: require('@/assets/img/Bim/bimNavLogo.png')
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      this.loader = null
    },
    async marca(val) {
      await this.getModelo(val)
    }
  },
  methods: {
    selectDep() {
      this.$store.commit('conversiones/SET_DATOS', {
        provincia: null,
        distrito: null
      })
    },
    selectPro() {
      this.$store.commit('conversiones/SET_DATOS', {
        distrito: null
      })
    },
    async getModelo(params) {
      this.isDisabledModelo = true
      this.listaModel = await getModelo(this.$axios, params)
      this.isDisabledModelo = false
    },
    async getOcupacion() {
      const response = await this.$axios({
        url: '/api/private/v1.0/catalogoOcupacion',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        }
      })
      return response.data
    },
    async getActividadeconomica() {
      const response = await this.$axios({
        url: '/api/private/v1.0/catalogoActividadecomomica',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        }
      })
      return response.data
    },
    confirmarDatos() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          switch (this.tipoDesembolso) {
            case '1': {
              this.isModalPagoBanco = true
              break
            }
            case '2':
              this.isModalBim = true
              break
            default:
              this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'warning',
                tituloModal: 'Estimado Cliente!',
                msgModal: 'Debe elegir su tipo de desembolso',
                maxWidth: 350,
                estadoModal: true
              })
          }
        }
      })
    },
    async confirmSoloDatos() {
      const DATOS_FORMULARIO = this.obtenerDatosForm(0, null)
      await this.sendDatos(DATOS_FORMULARIO)
    },
    async confirmPagoBanco(payload) {
      const DATOS_FORMULARIO = this.obtenerDatosForm(1, payload)
      await this.sendDatos(DATOS_FORMULARIO)
    },
    async confirmModalBIM(e) {
      const DATOS_FORMULARIO = this.obtenerDatosForm(2, {
        cuentaBIM: this.datos.telefono
      })
      await this.sendDatos(DATOS_FORMULARIO)
    },
    closePagoBanco() {
      this.isModalPagoBanco = false
    },
    closeModalBIM() {
      this.isModalBim = false
    },
    async sendDatos(payload) {
      this.loading = true
      await this.$store.dispatch('conversiones/confirmarDatos', payload)
      this.loading = false
    },
    obtenerDatosForm(tipoDesembolso, payload) {
      let datosMedioDesembolso = null
      let datosForm = {
        tipoDocumento: this.datos.tipoDocumento == 'D' ? 1 : 1,
        documento: this.datos.documento,
        placa: this.datos.placa,
        canalAtencion: this.datos.canalAtencion,
        origen: this.datos.origen,
        canal: 1, //añadido
        codigoEvaluacion: this.datos.codigoEvaluacion,
        estadoProspecto: this.datos.estadoProspecto,
        channel: this.datos.channel,
        terms: true,
        ubigeo: this.datos.ubigeo,
        direccion: this.direccion,
        sectorEconomico: this.sectorEconomico,
        actividadEconomica: this.actividadEconomica,
        profesion: this.profesion,
        tipoDesembolso: parseInt(this.tipoDesembolso)
      }
      switch (tipoDesembolso) {
        case 1:
          datosMedioDesembolso = {
            tipoCuenta: payload.tipoCuenta,
            entidadBancariaOrigen: payload.entidadBancariaOrigen,
            entidadBancariaDestino: payload.entidadBancariaDestino,
            numeroCuentaBancaria: payload.numeroCuentaBancaria,
            numeroCuentaInterbancaria: payload.numeroCuentaInterbancaria,
            sede: null
          }
          break

        case 2:
          datosMedioDesembolso = {
            cuentaBIM: payload.cuentaBIM,
            tipoCuenta: null,
            entidadBancaria: null,
            numeroCuentaBancaria: null,
            numeroCuentaInterbancaria: null,
            sede: null
          }
          break

        default:
          datosMedioDesembolso = {
            tipoCuenta: null,
            entidadBancaria: null,
            numeroCuentaBancaria: null,
            numeroCuentaInterbancaria: null,
            sede: null
          }
      }
      datosForm = {
        ...datosForm,
        ...datosMedioDesembolso
      }
      return datosForm
    }
  }
}
</script>
<style scoped>
.container-principal__confirmar {
  max-width: 600px !important;
}
.form-datos {
  padding: 10px;
  border-radius: 10px;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
.class-tyc {
  color: #005092;
}
.h2-titulo {
  text-align: left !important;
  font-size: 26px !important;
  margin-bottom: 10px;
  font-weight: bold;
  color: #005092;
}
.h3-titulo {
  text-align: left !important;
  font-size: 20px !important;
  margin-bottom: 10px;
  font-weight: 10;
  color: #005092;
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
.label-form {
  font-size: 15px;
  font-weight: bold;
}
.radio-BIM {
  display: flex;
  align-items: center;
}
.span-bim {
  font-size: 13px;
}
@media screen and (min-width: 768px) {
  .tipos-pagos {
    display: flex;
    justify-content: space-around;
  }
}
@media (max-width: 375px) {
  .container-principal__confirmar {
    padding: 0 !important;
  }
  #ldForm {
    padding: 0 !important;
  }
}
</style>
