<template>
  <div>
    <v-form ref="form1" autocomplete="nope" @submit.prevent="validarRimac()">
      <v-layout wrap row>
        <v-flex xs12 sm12 md="12" lg12>
          <h5 class="ld-h2-title-form soat--text">
            Por favor, completa los detalles del vehículo
          </h5>
          <span v-if="errorInterno" class="red--text"
            >*Verifique la fecha de vencimiento, si el problema persiste
            comuníquese con soporte</span
          >
        </v-flex>
        <!--<v-flex xs12 sm12 md="12" lg12>-->
        <!--<span class="red&#45;&#45;text" v-if="errorInterno">*Verifique la fecha de vencimiento, si el problema persiste comuníquese con soporte</span>-->
        <!--</v-flex>-->

        <v-flex xs12 sm12 md="12" lg12 pb-2>
          <p class="ld-form-p2">Completa los siguientes datos</p>
        </v-flex>

        <v-flex xs12 sm12 md="6" lg6>
          <v-select
            v-model="datos.claseVehiculo"
            v-validate="'required'"
            class="ld-form-input"
            label="Clase de vehículo"
            :items="selectClaseVehiculo"
            data-vv-as="datos.claseVehiculo"
            :error-messages="errors.collect('datos.claseVehiculo')"
            data-vv-name="datos.claseVehiculo"
            color="soat"
            required
            item-text="name"
            item-value="name"
          />
        </v-flex>
        <v-flex xs12 md="6" lg6>
          <v-select
            v-model="datos.tipoVehiculo"
            v-validate="'required'"
            class="ld-form-input"
            label="Tipo de vehículo"
            :items="selectTipoVehiculo"
            data-vv-as="datos.tipoVehiculo"
            :error-messages="errors.collect('datos.tipoVehiculo')"
            data-vv-name="datos.tipoVehiculo"
            color="soat"
            item-text="name"
            item-value="name"
          />
        </v-flex>
        <v-flex xs12 md="6" lg6>
          <v-autocomplete
            v-model="datos.marcaVehiculo"
            v-validate="'required'"
            class="ld-form-input"
            label="Marca"
            :items="listaMarca"
            data-vv-as="marca"
            :error-messages="errors.collect('datos.marcaVehiculo')"
            data-vv-name="datos.marcaVehiculo"
            required
            :color="color"
            item-text="marca"
            item-value="id"
            return-object
          />
        </v-flex>
        <v-flex xs12 md="6" lg6>
          <v-autocomplete
            v-model="datos.modeloVehiculo"
            v-validate="'required'"
            class="ld-form-input"
            label="Modelo"
            :items="listaModel"
            data-vv-as="modelo"
            item-text="modelo"
            item-value="modelo"
            :error-messages="errors.collect('datos.modeloVehiculo')"
            data-vv-name="datos.modeloVehiculo"
            :color="color"
            required
          />
        </v-flex>
        <v-flex xs12 md="12" lg12 pb-2>
          <br />
          <p class="ld-form-p2">Completa la siguiente información</p>
        </v-flex>
        <v-flex xs12 md="6" lg6>
          <v-text-field
            v-model="datos.anioFabricacion"
            v-validate="'required'"
            class="ld-form-input"
            data-vv-as="Apellido Materno"
            :error-messages="errors.collect('datos.anioFaricacion')"
            label="Año de Fabricación"
            data-vv-name="datos.anioFabricacion"
            required
            color="soat"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md="6" lg6>
          <v-text-field
            v-model="datos.numeroMotor"
            v-validate="'required'"
            class="ld-form-input"
            data-vv-as="Numero Motor"
            :error-messages="errors.collect('datos.numeroMotor')"
            label="Nro. de Motor"
            data-vv-name="datos.numeroMotor"
            required
            color="soat"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md="6" lg6>
          <v-text-field
            v-model="datos.numeroSerie"
            v-validate="'required'"
            class="ld-form-input"
            data-vv-as="Numero de serie"
            :error-messages="errors.collect('datos.numeroSerie')"
            label="Nro. de Serie"
            data-vv-name="datos.numeroSerie"
            required
            color="soat"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md="6" lg6>
          <div class="ld-form-input" style="margin:8px 0 0 0">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              color="soat"
            >
              <v-text-field
                slot="activator"
                v-model="formatoVigencia"
                v-validate="'required'"
                label="Fecha de emisión de SOAT"
                prepend-icon="event"
                class="ld-datepicker"
                required
                data-vv-name="formatoVigencia"
                data-vv-as="Fecha Vigencia"
                :error-messages="errors.collect('formatoVigencia')"
                maxlength="10"
                readonly
                color="soat"
              ></v-text-field>
              <v-date-picker
                ref="picker"
                v-model="datos.fechaVigencia"
                locale="es"
                max="2020"
                min="2018-12"
                no-title
                color="soat"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
        </v-flex>
        <v-flex xs12>
          <span v-if="showError" class="body-2 red--text"
            >*Completa todos los campos por favor</span
          >
        </v-flex>
        <v-flex xs12 sm12 md="12" lg12 text-xs-center>
          <v-btn
            class="ld-btn"
            color="soat"
            type="submit"
            :loading="loading"
            :disbaled="loading"
            >Evaluar</v-btn
          >
        </v-flex>
      </v-layout>
    </v-form>
    <!--{{ $data }}-->
  </div>
</template>
<script>
/* import VueRecaptcha from "vue-recaptcha"; */
import { format } from 'date-fns'
import { mixins } from '@/mixins/mixin.js'

export default {
  components: {
    TerminosCondiciones: () => import('@/components/shared/terms/TerminosCondiciones')
  },
  mixins: [mixins],
  data() {
    return {
      listaModel: [],
      listaMarca: [],
      showError: false,
      errorInterno: false,
      menu: false,
      loading: false,
      selectClaseVehiculo: [
        {
          name: 'Automovil',
          id: '39905'
        },
        {
          name: 'Camioneta',
          id: '39908'
        }
      ],
      selectTipoVehiculo: [
        {
          name: 'Auto',
          id: '39929'
        },
        {
          name: 'Rural',
          id: '39911'
        }
      ],
      listVehiculos: []
    }
  },
  computed: {
    datos() {
      return this.$store.state.datos
    },
    marca() {
      try {
        return this.datos.marcaVehiculo.coMarca
      } catch (e) {
        console.log(e)
      }
    },
    formatoVigencia() {
      if (this.datos.fechaVigencia) {
        return format(this.datos.fechaVigencia, 'dd/MM/yyyy')
      } else {
        return null
      }
    },
    selectMarcaVehiculo() {
      return this.listVehiculos
    },
    selectModeloVehiculo() {
      return this.listVehiculos
        .filter((v) => v.coMarca === this.datos.marcaVehiculoAcceso)
        .sort()
    }
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    marca(val) {
      if (val) {
        this.getModelo(val)
      }
    }
  },

  async mounted() {
    const response = await this.$axios({
      url: '/api/private/v1.0/getSoatMarca',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      }
    })
    // console.log(response.data);
    this.listaMarca = response.data

    console.log('ID de Tercero')
    console.log(this.datos.idetercero)
  },
  methods: {
    async getModelo(params) {
      const response = await this.$axios({
        url: '/api/private/v1.0/getSoatModelo',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data: {
          codigoMarca: params
        }
      })
      console.log(response.data)
      this.listaModel = response.data
    },
    // getNombre () {
    //   const claseVehi = this.selectClaseVehiculo.filter(v=>v.id == this.datos.claseVehiculo)
    //   const tipoVehi = this.selectTipoVehiculo.filter(v=>v.id == this.datos.tipoVehiculo)
    //   const marcaVehi = this.listVehiculos.filter(v => v.coMarca === this.datos.marcaVehiculoAcceso)
    //   // const modeloVehi = this.selectModeloVehiculo.filter(v=>v.id == this.datos.modeloVehiculoAcceso)
    //   console.log(claseVehi[0].name)
    //   console.log(tipoVehi[0].name)
    //   console.log(marcaVehi[0].marca)
    //   console.log(marcaVehi[0].modelo)
    //   // console.log(modeloVehi[0].name)
    // },
    actualizarProspecto() {
      // const vehiMarca = this.datos.marcaVehiculoAcceso
      // const vehiModel = this.datos.modeloVehiculoAcceso
      // this.$store.commit('UPDATE_DATOS', {
      //   marcaVehiculo : vehiMarca,
      //   modeloVehiculo  :vehiModel
      // })
      // enviarExpediente
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.$ga.event('Detalle', 'Formulario Completo')
          // this.$store.dispatch("enviarDetalleVehiculo");
        } else {
          this.$ga.event('Detalle', 'Formulario Incompleto')
        }
      })
      // this.$store.dispatch('actualizarProspecto')
      this.$store.dispatch('enviarDetalleVehiculo')
      this.$store.commit('UPDATE_STEP', 5)
      console.log(this.datos)
      // this.$validator.validateAll().then(async result => {
      //   if (result) {
      //     ga("send", "event",'Expediente', 'Formulario Completo')
      //     this.$store.dispatch('actualizarProspecto')
      //   } else {
      //     ga("send", "event",'Expediente', 'Formulario Incompleto')
      //   }
      // })
    },
    async validarRimac() {
      // const claseVehi = this.selectClaseVehiculo.filter(v=>v.id == this.datos.claseVehiculo)
      // const tipoVehi = this.selectTipoVehiculo.filter(v=>v.id == this.datos.tipoVehiculo)
      // const marcaVehi = this.listVehiculos.filter(v => v.coMarca === this.datos.marcaVehiculoAcceso)
      //
      // this.$store.commit('UPDATE_DATOS', {
      //   claseVehi: claseVehi[0].name,
      //   tipoVehi: tipoVehi[0].name,
      //   marcaVehiMar: marcaVehi[0].marca,
      //   marcaVehiMod: marcaVehi[0].modelo,
      // })

      console.log('entro a validar')
      const header = {
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        }
      }
      const validarR = {
        idetercero: this.datos.idetercero,
        numDocumento: this.datos.documento,
        tipoPersona: 'N',
        nombre: this.datos.nombres,
        apellidoPaterno: this.datos.apellidoPaterno,
        apellidoMaterno: this.datos.apellidoMaterno,
        fecNacimiento: this.datos.fechaNacimiento,
        paisNacimiento: '80',
        sexo: this.datos.genero,
        estadoCivil: this.datos.estadoCivil,
        correo: this.datos.email,
        telefono: this.datos.telefono,
        idptipovia: this.datos.tipoVia,
        nomvia: this.datos.numeroVia,
        numcasa: this.datos.direccion,
        stsTercero: this.datos.stsTercero,
        indMntTerc: this.datos.indCrearTercero,
        indMntDirc: this.datos.indRequiereDireccion,
        placaRodaje: this.datos.placa,
        clasesVehiculo: this.datos.claseVehiculo,
        tiposVehiculos: this.datos.tipoVehiculo,
        marcasVehiculos: this.datos.marcaVehiculo.marca,
        modelosVehiculos: this.datos.modeloVehiculo,
        anosFabricacion: this.datos.anosFabricacion,
        numeroMotor: this.datos.numeroMotor,
        numeroSerie: this.datos.numeroSerie,
        distrito: this.datos.distritoNombre,
        idedistrito: this.datos.ubigeo,
        provincia: this.datos.provinciaNombre,
        departamento: this.datos.departamentoNombre,
        transaccionCanal: 1234,
        fechaInicioVig: this.datos.fechaVigencia,
        direccioncompleta: this.datos.direccioncompleta
      }
      console.log(validarR)
      // this.$store.commit('UPDATE_DATOS', {
      //   evalu: asdasd,
      //   })
      // this.$store.dispatch('actualizarProspecto')
      this.$store.commit('UPDATE_STEP', -1)
      await this.$axios
        .post(`/api/private/v1.0/validarinformacion`, validarR, header)
        .then((response) => {
          console.log('Respuesta de validarRimac')
          const msg = response.data
          console.log(msg)
          if (msg.codigoresultado == 99) {
            this.$store.commit('UPDATE_STEP', 3)
            this.$store.commit('SET_MODAL', {
              id: 18,
              state: true
            })
            this.errorInterno = true
          } else {
            console.log(msg.transaccion)
            this.$store.commit('UPDATE_DATOS', {
              transaccionCanalEmitir: msg.transaccion
            })
            this.actualizarProspecto()
            // this.enviarExpediente()
            // this.guardarEmisionSoat()
            // this.$store.dispatch('guardarEmisionSoat')
          }
        })
        .catch((error) => {
          console.log('Fallo el servicio de validarRimac')
          console.log(error)
          this.$store.commit('UPDATE_STEP', 3)
          this.$store.commit('SET_MODAL', {
            id: 18,
            state: true
          })
        })
    },
    // enviarExpediente() {
    //   this.$validator.validateAll().then(async result => {
    //     if (result) {
    //       this.$ga.event("Detalle", "Formulario Completo");
    //       this.$store.dispatch("enviarDetalleVehiculo");
    //     } else {
    //       this.$ga.event("Detalle", "Formulario Incompleto");
    //     }
    //     this.$store.commit('UPDATE_STEP', 5)
    //   });
    //
    // },
    openTerms() {
      this.$ga.event('Prospecto', 'Abrió Terminos y condiciones')
      this.$store.commit('UPDATE_MODAL_TERMS', true)
    },
    async evaluarProspecto() {
      this.loading = true
      await this.$store.dispatch('preEvaluate')
      this.loading = false
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },
    async getClient(documento) {
      const responseCliente = await this.$axios({
        url: '/api/private/v1.0/validarCliente',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data: {
          documento
        }
      })
      if (responseCliente.data.cliente) {
        this.$store.commit('UPDATE_DATOS', responseCliente.data)
      }
    }
  }
}
</script>
