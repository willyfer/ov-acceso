<template>
  <div>
    <v-form ref="form1" autocomplete="nope" @submit.prevent="nextStep">
      <v-row dense>
        <v-col cols="12" md="12">
          <h2
            class="ld-h2-title-form"
            :class="`${color}--text`"
          >Porfavor, completa y verifica los datos del cliente</h2>
        </v-col>
        <v-col cols="12" md="12" pb-2>
          <p class="ld-form-p2">
            <b>Completa tu información personal</b>
          </p>
        </v-col>
        <v-col cols="12"  md="6"  lg="6">
          <v-text-field
            v-model="datos.apellidoPaterno"
            v-validate="'required'"
            data-vv-as="Apellido Paterno"
            :error-messages="errors.collect('datos.apellidoPaterno')"
            label="Apellido paterno"
            data-vv-name="datos.apellidoPaterno"
            required

            :color="color"
          />
        </v-col>
        <v-col cols="12"  md="6"  lg="6">
          <v-text-field
            v-model="datos.apellidoMaterno"
            v-validate="'required'"
            data-vv-as="Apellido Materno"
            :error-messages="errors.collect('datos.apellidoMaterno')"
            label="Apellido materno"
            data-vv-name="datos.apellidoMaterno"
            required

            :color="color"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-text-field
            v-model="datos.nombres"
            v-validate="'required'"
            label="Nombres"
            data-vv-as="Nombre"
            :error-messages="errors.collect('datos.nombres')"
            data-vv-name="datos.nombres"
            required

            :color="color"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="datos.email"
            v-validate="'email|max:50|min:6'"
            label="Correo electrónico"
            :error-messages="errors.collect('datos.email')"
            data-vv-name="datos.email"
            type="email"
            :maxlength="50"
            :counter="50"
            data-vv-as="email"
            :color="color"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-select
            v-model="nivelEducacion"
            v-validate="'required'"
            :items="selectnivelEducacion"
            data-vv-as="Educación"
            item-text="nivedu"
            item-value="id"
            :error-messages="errors.collect('nivelEducacion')"
            label="Nivel de educación"
            data-vv-name="nivelEducacion"
            required
            :color="color"
          />
        </v-col>
        <v-col>
          <v-select
            v-model="datos.genero"
            v-validate="'required'"
            :color="color"
            :items="selectGenero"
            data-vv-as="Genero"
            item-text="gen"
            item-value="id"
            :error-messages="errors.collect('datos.genero')"
            label="Género"
            data-vv-name="datos.genero"
            required
          />
        </v-col>
        <v-col>
          <v-select
            v-model="estadoCivil"
            v-validate="'required'"
            :items="selectestadoCivil"
            item-text="estciv"
            item-value="id"
            :error-messages="errors.collect('estadoCivil')"
            label="Estado civil"
            data-vv-name="estadoCivil"
            data-vv-as="estado civil"
            required
            :color="color"
          />
        </v-col>
      </v-row>
      <p class="ld-form-p2">
        <b>Datos Complementarios</b>
      </p>

      <v-row dense>
        <v-col cols="12"  md="6"  lg="6">
          <v-autocomplete
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
            :color="color"
          />
        </v-col>
        <v-col cols="12"  md="6"  lg="6">
          <v-autocomplete
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
            :color="color"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12"  md="6"  lg="6">
          <v-autocomplete
            v-model="profesion"
            v-validate="'required'"
            :color="color"
            :items="selectOcupacion"
            data-vv-as="ocupacion"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('profesion')"
            label="Profesión y ocupación"
            data-vv-name="profesion"
            required
          />
        </v-col>
        <v-col cols="12"  md="6"  lg="6">
          <v-select
            v-model="pep"
            v-validate="'required'"
            label="PEP"
            :color="color"
            :items="selectPep"
            data-vv-as="Pep"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('pep')"
            data-vv-name="pep"
            required
            hint="PEP = Persona expuesta politicamentte"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" pb-2>
          <p class="ld-form-p2"><b>Dirección Completa</b> </p>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col >
          <v-select
            v-model="departamento"
            v-validate="'required'"
            label="Departamento"
            :color="color"
            :items="selectDepartamento"
            data-vv-as="Departamento"
            item-text="dep"
            item-value="id"
            :error-messages="errors.collect('departamento')"
            data-vv-name="departamento"
            required
          />
        </v-col>
        <v-col >
          <v-select
            v-model="provincia"
            v-validate="'required'"
            :color="color"
            label="Provincia"
            :items="selectProvincia"
            data-vv-as="Provincia"
            item-text="pro"
            item-value="id"
            :error-messages="errors.collect('provincia')"
            data-vv-name="provincia"
            required
          />
        </v-col>
        <v-col >
          <v-autocomplete
            v-model="ubigeo"
            v-validate="'required'"
            :color="color"
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
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="datos.direccion"
            v-validate="'required'"
            :error-messages="errors.collect('datos.direccion')"
            data-vv-as="Direccion"
            label="Dirección"
            data-vv-name="datos.direccion"
            required
            :color="color"
          />
        </v-col>
      </v-row>
        <v-dialog v-model="modalToken" persistent max-width="380">
          <form @submit.prevent="validarToken">
            <v-card class="ld-modal">
              <v-card-title class="headline text-center">
                Te enviamos un código SMS a tu celular
                {{ this.datos.telefono }}
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="tokenenviado"
                  label="Número del Token"
                  data-vv-as="token"
                  :counter="6"
                  type="tel"
                  maxlength="6"
                  hint="Te enviamos un código vía SMS"
                  @keypress="isNumber"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn color="soat darken-1" flat="flat" full @click="cancelarToken()">CANCELAR</v-btn>
                <v-btn color="soat darken-1" flat="flat" full @click="enviarToken()">REENVIAR</v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="soat darken-1" dark full>VALIDAR</v-btn>
              </v-card-actions>
            </v-card>
          </form>
        </v-dialog>

        <v-col cols="12" md="12" class="text-center" mt-3>
          <v-btn class="ld-btn" type="submit" :color="color">CONTINUAR</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { selectDistritoCallao, selectDistritoLima } from '@/utils/ubigeo.js'
import { listSectorEconomico } from '@/utils/catalogo'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: ['color'],
  computed: {
    ...mapState('default', ['modalToken', 'datos']),
    pep: {
      get() {
        if (this.datos.pep) {
          return this.datos.pep
        }
        return false
      },
      set(v) {
        this.$store.commit('default/UPDATE_DATOS', { pep: v })
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
        this.$store.commit('default/UPDATE_DATOS', { ubigeo: v })
      }
    },
    sectorEconomico: {
      get() {
        if (this.$store.state.default.datos.sectorEconomico) {
          return this.$store.state.default.datos.sectorEconomico
        }
        return 1
      },
      set(v) {
        this.$store.commit('default/UPDATE_DATOS', { sectorEconomico: v })
      }
    },
    provincia: {
      get() {
        if (this.datos.ubigeo) {
          return this.datos.ubigeo.slice(0, 4)
        }
        return '1501'
      },
      set(v) {
        this.$store.commit('default/UPDATE_DATOS', { ubigeo: v })
      }
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
    selectSectoreconomico() {
      return listSectorEconomico
    },
    selectActividadeconomica() {
      if (this.datos.sectorEconomico) {
        const filterList = this.listaActividadeconomica.filter(
          (val) => val.fk === this.datos.sectorEconomico
        )
        return filterList
      }
    },
    actividadEconomica: {
      get() {
        if (this.$store.state.default.datos.actividadEconomica) {
          const filterList = this.listaActividadeconomica.filter(
            (val) => val.id === this.datos.actividadEconomica
          )
          this.$store.commit('default/UPDATE_DATOS', {
            sectorEconomico: filterList[0].fk
          })
          return this.$store.state.default.datos.actividadEconomica
        }
        return 357
      },
      set(v) {
        this.$store.commit('default/UPDATE_DATOS', { actividadEconomica: v })
      }
    },
    estadoCivil: {
      get() {
        if (this.datos.estadoCivil) {
          return this.datos.estadoCivil
        }
        return 'SO'
      },
      set(v) {
        this.$store.commit('default/UPDATE_DATOS', { estadoCivil: v })
      }
    },
    profesion: {
      get() {
        if (this.$store.state.default.datos.profesion) {
          return this.$store.state.default.datos.profesion
        }
        return 111
      },
      set(v) {
        this.$store.commit('default/UPDATE_DATOS', { profesion: v })
      }
    },
    nivelEducacion: {
      get() {
        if (this.datos.nivelEducacion) {
          return this.datos.nivelEducacion
        }
        return 'SC'
      },
      set(v) {
        this.$store.commit('default/UPDATE_DATOS', { nivelEducacion: v })
      }
    }
  },
  data() {
    return {
      tokenenviado: null,
      dialogCasado: false,
      departamento: {
        dep: 'Lima',
        id: '15'
      },
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
      selectnivelEducacion: [
        {
          nivedu: 'Secundaria Completa',
          id: 'SC'
        },
        {
          nivedu: 'Secundaria Incompleta',
          id: 'SI'
        },
        {
          nivedu: 'Técnico Completo',
          id: 'TC'
        },
        {
          nivedu: 'Técnico Incompleto',
          id: 'TI'
        },
        {
          nivedu: 'Universitario Completo',
          id: 'UC'
        },
        {
          nivedu: 'Universitario Incompleto',
          id: 'UI'
        }
      ],
      selectGenero: [
        {
          gen: 'Femenino',
          id: 'F'
        },
        {
          gen: 'Masculino',
          id: 'M'
        }
      ],
      selectestadoCivil: [
        {
          estciv: 'Soltero',
          id: 'SO'
        },
        {
          estciv: 'Casado',
          id: 'CA'
        },
        {
          estciv: 'Viudo',
          id: 'VI'
        },
        {
          estciv: 'Divorciado',
          id: 'DI'
        }
      ],
      selectDepartamento: [
        {
          dep: 'Lima',
          id: '15'
        }
      ],
      selectPais: [
        {
          id: 1,
          name: 'Peru'
        }
      ],
      selectResidencia: [
        {
          id: 1,
          name: 'Peru'
        }
      ],
      selectOcupacion: [],
      listaActividadeconomica: [],
      selectPep: [
        {
          id: true,
          name: 'SI'
        },
        {
          id: false,
          name: 'NO'
        }
      ]
    }
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  async mounted() {
    /* if (!this.datos.codigoProspecto) {
      this.$store.commit('default/UPDATE_LOGIN_MODAL', true)
    } */

    this.selectOcupacion = await this.getOcupacion()
    this.listaActividadeconomica = await this.getActividadeconomica()
  },
  methods: {
    cancelarToken() {
      this.$store.commit('default/UPDATE_LOGIN_TOKEN', false)
      this.$router.push('/')
    },
    async enviarToken() {
      // console.log('Entro a enviar el token')
      const reponseToken = await this.$axios({
        url: '/api/private/v1.0/generarTokenNew',
        method: 'POST',
        data: {
          codigoToken: 'whatsapp',
          documento: this.datos.documento,
          telefono: this.datos.telefono
        },
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        }
      })
      const tokenSms = reponseToken.data.resultado[0].co_toksms
      this.fechaToken = new Date()
      // console.log(tokenSms)
      this.enviarSms(tokenSms)
    },
    enviarSms(token) {
      // console.log('enviando msj')
      const msg = {
        mensaje: `Acceso: Su codigo de confirmacion es: ${token}. Nunca compartas con nadie esta clave. Evita el fraude.`,
        telefono: this.datos.telefono
      }
      this.$axios
        .post(`/api/private/v1.0/smsDirecto`, msg, {
          headers: {
            'content-type': 'application/json',
            Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
          }
        })
        .then((response) => {
          // console.log(response.data)
        })
        .catch((error) => {
          // console.log(error)
        })
    },
    nextStep() {
      this.$store.dispatch('express/preEvaluate')
    },
    validarToken() {
      const token = this.tokenenviado
      // const token = this.$store.dispatch('default/validateToken', this.tokenenviado)
      // console.log(token)
      const data = {
        codigoToken: 'whatsapp',
        documento: this.datos.documento,
        token: this.tokenenviado
      }
      this.$axios
        .post(`/api/private/v1.0/validarTokenNew`, data, {
          headers: {
            'content-type': 'application/json',
            Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
          }
        })
        .then((response) => {
          // console.log(response.data)
          // console.log(response.data.resultado[0].co_estado)
          if (response.data.resultado[0].co_estado === '00') {
            this.FirmaReady = 3
            this.fechaFirma = new Date()
            // console.log('Estoy en validarToken')
            this.$store.commit('default/UPDATE_LOGIN_TOKEN', false)
          } else {
            this.tokenInvalido = true
            // console.log(response.data.resultado.co_estado)
            // console.log('Token es invalido')
          }
        })
        .catch((error) => {
          // console.log('Error controlado')
          // console.log(error)
        })
    },
    isNumber(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    actualizarProspecto() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          // console.log('Actualizando Prostecto...!!')
          this.$ga.event('Expediente', 'Formulario Completo')
          this.$store.dispatch('default/actualizarProspecto')
        } else {
          // console.log('NO -- Actualiza Prostecto...!!')
          this.$ga.event('Expediente', 'Formulario Incompleto')
        }
      })
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
      // console.log(response.data)
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
      // console.log(response.data)
      return response.data
    }
  }
}
</script>
