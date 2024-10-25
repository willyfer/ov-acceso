<template>
    
    <v-form  ref="form" lazy-validation @submit.prevent="confirmarDatos()">

    <v-card class="ld-modal" max-width="500" style="margin-top: 0%">
        <v-card-title>
          Actualiza tu cuenta 
          <br />       
          Interbancaria (CCI)
        </v-card-title>
        <v-card-subtitle>
         {{'Solo deberás registrar la cuenta bancaria del titular del DNI'}}
          <!--<p v-html="speech"></p>-->
        </v-card-subtitle>

        <v-card-text  style="padding-top: 0px !important; margin-top: -20px ">
                <v-row>
                    <v-col  class="d-flex"  cols="12">
                        <v-select
                        v-model="selectTipoCuenta"
                        :items="listaTipoCuenta"
                        label="Tipo de Cuenta"
                        outlined
                        return-object
                        item-text="tipo"
                        item-value="id"    
                        v-on:change="changeTipo(`${selectTipoCuenta.id}`)" 
                        required
                        :rules="rulesSelect"
                        ></v-select>
                    </v-col>                    
                   <v-col  class="d-flex" cols="12" >
                        <v-select
                        v-model="selectEntidadBancaria"
                        :items="listaTipoEntidad"
                        label="Entidad Bancaria"
                        outlined
                        return-object
                        item-text="siglas"
                        item-value="codigoBanco"                        
                        v-on:change="changeBanco(`${selectEntidadBancaria.codigoBanco}`)"   
                        required    
                        :rules="rulesSelect"
                         v-validate="'required'"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>   

            <v-card-text v-if="disabledNewCI" style="padding-top: 0px !important; margin-top: -10px ">
     
            <v-row no-gutters>
                <v-col cols="12">
                     <v-text-field 
                      label="Cuenta Bancaria" outlined
                      v-model="newCI"
                      counter
                      :maxlength="longitudMax"                  
                      :rules="rules"      
                      @keypress="isNumber"          
                    required
                     ></v-text-field>       
                </v-col>   
                <v-col cols="12">
                     <v-text-field label="Confirmar Cuenta Bancaria" outlined
                      v-model="newConfirmCI"
                      counter
                      :maxlength="longitudMax"   
                      :rules="rules"
                      v-validate="'required'"
                      required
                      @keypress="isNumber"
                     ></v-text-field>       
                </v-col>   
                <v-col>
                  Registra correctamente tu cuenta bancaria. 
                  De lo contrario solo tendrás una oportunidad de corregirla, 
                  dentro de un plazo de 3 días desde que se te notifique. 
                </v-col>            
            </v-row>
            </v-card-text>

             <v-card-text v-if="disabledNewCCI" style="padding-top: 0px !important; margin-top: -10px ">
            <!-- <slot name="inputs-modal"></slot> -->     
            <v-row no-gutters>
                <v-col cols="12">
                     <v-text-field label="CCI" outlined
                      v-model="newCCI"
                      counter
                      :maxlength="longitudMax"
                      :rules="rules"           
                      v-validate="'required'"
                      required
                      @keypress="isNumber"    
                     ></v-text-field>       
                </v-col>   
                <v-col cols="12">
                     <v-text-field label="Confirmar CCI" outlined
                      v-model="newConfirmCCI"
                      counter
                      :maxlength="longitudMax"
                      :rules="rules"
                      v-validate="'required'"
                      required
                      @keypress="isNumber"
                     ></v-text-field>       
                </v-col>  
                <v-col>
                  Registra correctamente tu cuenta bancaria. 
                  
                </v-col>                          
            </v-row>
            </v-card-text>  

          

              
          
          


              <v-card-actions style="margin-top: 0px">
          <v-row no-gutters>
            <v-col cols="12" order-md="2" md="6" class="text-center pa-1">
              <v-btn rounded class="ld-btn" style="border-radius:5px; background-color: #FF7729;" 
               type="submit"  :color="color">CONFIRMAR</v-btn>
            </v-col>
            <v-col cols="12" order-md="1" md="6" class="text-center pa-1">
              <v-btn rounded  class="ld-btn-secondary" @click="cancelar()">CANCELAR</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
   
        </v-card>
    </v-form>


</template>
<script>
import { mapState } from 'vuex'
import { mixins } from '@/mixins/mixin.js'
import { selectDistritoCallao, selectDistritoLima } from '@/utils/ubigeo.js'

import {
  getMarca,
  getModelo,
  getOficinas,
  getBancos
} from '@/api/catalogue'
import {
  listSectorEconomico,
} from '@/utils/catalogo'


export default {
  components: {
    
  },
  $_veeValidate: {
    validator: 'new'
  },
  mixins: [mixins],
  props: {
  sendDataForm: Object,
  codigoContrato: Object,
  sendResponseData: Object
  },
  async mounted() {
    getOficinas(this.$axios)
      .then((res) => {
        if (res.codRes == '00') {
          this.oficinas = res.lugares
        } else if (res.codRes == '99') {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: '¡Lo sentimos!',
            msgModal:
              'En estos momentos no se puede obtener las oficinas, por favor inténtelo más tarde.',
            maxWidth: 350,
            estadoModal: true,
            isReset: true
          })
          setTimeout(() => {
            this.$store.commit('ui/UPDATE_STEP', 1)
          }, 4000)
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

   
  // console.log("este es selectEntidadBancaria", JSON.stringify(this.selectEntidadBancaria))
   
    getBancos(this.$axios)
      .then((res) => {
        if (res.codRes == '00') {
          this.listaTipoEntidad = res.arrayBancos
         // this.selectEntidadBancaria = this.listaTipoEntidad[0]
          this.cantidadDigitosAhorro = this.listaTipoEntidad[0].cantidadDigitosAhorro
          this.cantidadDigitosCorriente =this.listaTipoEntidad[0].cantidadDigitosCorriente
          this.codigoBanco = this.listaTipoEntidad[0].codigoBanco
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
          setTimeout(() => {
            this.$store.commit('ui/UPDATE_STEP', 1)
          }, 4000)
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

  //  console.log(this.datos)
  },
  computed: {
    ...mapState('users', ['promotor']),
    ...mapState('express', [
      'datos',
      'codigoEvaluacion',
      'body_valida',
      'resElegirOferta',
      'ofertas'
    ]),
    ...mapState('default', ['terms']),
    selectSectoreconomico() {
      return listSectorEconomico
    },
    direccion: {
      get() {
        return this.datos.direccion
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { direccion: v })
      }
    },
    sectorEconomico: {
      get() {
        let newVal = this.datos.sectorEconomico
        if (!newVal) {
          newVal = 28
        }
        const filterList = this.listaActividadeconomica.filter(
          (val) => val.fk === newVal
        )
        this.selectActividadeconomica = filterList
        return newVal
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { sectorEconomico: v })
      }
    },
    actividadEconomica: {
      get() {
        if (this.datos.actividadEconomica) {
          return this.datos.actividadEconomica
        } else {
          return 357
        }
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { actividadEconomica: v })
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
        this.$store.commit('express/UPDATE_DATOS', { profesion: v })
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
        this.$store.commit('express/UPDATE_DATOS', { marca: v })
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
        this.$store.commit('express/UPDATE_DATOS', { modelo: v })
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
        this.$store.commit('express/UPDATE_DATOS', { ubigeo: v })
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
    }
  },
  data() {
    return {
      
      isValidaNumCuenta: false,
      selectTipoCuenta: null,
      selectEntidadBancaria: null,
      numeroCuenta: null,
      numeroCuentaConfirm: null,
      tipoDesembolso: 1,
      colorForm: '#005092',
      loader: null,
      loading: false,
      oficinas: [],
      activeBtn: -1,
      tyc: '1',
      colorCkeckBox: '#005092',
      isModalPagos: false,
      tipoPago: -1,
      payloadModal: {
        formaPago: null,
        speech: null
      },
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
      selectDepartamento: [
        {
          dep: 'Lima',
          id: '15'
        }
      ],
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
      datosInputCuenta: {
        label: null,
        maxlength: 0,
        minlength: 0,
        counter: 0,
        dataVvAs: null
      },
      datosInputConfirmCuenta: {
        label: null,
        maxlength: 0,
        minlength: 0,
        counter: 0,
        dataVvAs: null
      },
      disabledText: true,
       
            CI: '',
            newCI: '',
            newConfirmCI: '',
            newConfirmCCI: '',
            newCCI: '',
            disabledNewCI : true,
            disabledNewCCI : false,
            itemsTipoBancario: [
                {
                    id: 1, text: "Cuenta Corriente"
                },
                {
                    id: 2, text: "Cuenta Ahorros"
                }
            ],
            itemsEntidadBancaria: [],
            //selectEntidadBancaria: {},            
           
            cantidadDigitosAhorro: 0,
            cantidadDigitosCorriente: 0,
            entidadBancariaOrigen: 0,
            codigoBanco: 0,
            rules: [
                v => v.length <= this.longitudMax || `Cantidad de digitos superada.`,  
                v => !!v || 'Campo obligatorio.',
                v => (v && v.length == this.longitudMax) || 'Cantidad de digitos no alcanzada.'
            ],
            rulesSelect: [
              v => !!v || 'Campo obligatorio.',
            ],
            tipoCuentaBancaria: '',
            longitudMax: 0,
            entidadBancariaOrigen: 0
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      this.loader = null
    },
    async marca(val) {
      /* console.log('marca') */

      await this.getModelo(val)
    }
  },
  methods: {
      cancelar(){
          this.$emit('cancelarUpdateCuenta', false)
      },
    changeEntidadBancaria() {
      this.numeroCuenta = null
      this.numeroCuentaConfirm = null
      this.$validator.reset()
      if (this.selectEntidadBancaria.cuentaInterbancaria) {
        this.datosInputCuenta = {
          maxlength: 20,
          minlength: 20,
          counter: 20,
          label: 'CCI',
          dataVvAs: 'CCI'
        }
        this.datosInputConfirmCuentaCuenta = {
          maxlength: 20,
          minlength: 20,
          counter: 20,
          label: 'Confirmar CCI',
          dataVvAs: 'Confirmar CCI'
        }
      } else {
        this.datosInputCuenta = {
          maxlength: this.selectEntidadBancaria.cantidadDigitos,
          minlength: this.selectEntidadBancaria.cantidadDigitos,
          counter: this.selectEntidadBancaria.cantidadDigitos,
          label: 'Número de Cuenta',
          dataVvAs: 'Número de Cuenta'
        }
        this.datosInputConfirmCuentaCuenta = {
          maxlength: this.selectEntidadBancaria.cantidadDigitos,
          minlength: this.selectEntidadBancaria.cantidadDigitos,
          counter: this.selectEntidadBancaria.cantidadDigitos,
          label: 'Confirmar Número de Cuenta',
          dataVvAs: 'Confirmar Número de Cuenta'
        }
      }
    },
    validaNumCuenta() {
      if (
        this.numeroCuenta === this.numeroCuentaConfirm &&
        this.numeroCuenta.length == this.datosInputCuenta.counter &&
        this.numeroCuentaConfirm.length ==
          this.datosInputConfirmCuentaCuenta.counter
      ) {
        this.isValidaNumCuenta = true
      } else {
        this.isValidaNumCuenta = false
      }
    },
    async getModelo(params) {
      /* console.log('modelo') */
      this.listaModel = await getModelo(this.$axios, params)
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
    },
    clickBanco() {
      this.resetFormEfectivo()
      this.payloadModal = {
        formaPago: 'Banco',
        speech: 'Completa los datos del banco'
      }
      this.tipoPago = 1
      this.isModalPagos = true  
    },
    clickEfectivo() {
      this.resetFormEntidadBancaria()
      this.payloadModal = {
        formaPago: 'Efectivo',
        speech: 'Selecciona la oficina donde recogerás tu desembolso.'
      }
      this.tipoPago = 3
      this.isModalPagos = true
      /* this.$validator.validateAll().then(async (result) => {
        if (result) {

        }
      }) */
    },
    clickTarjeta() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.payloadModal = {
            formaPago: 'Tarjeta',
            speech: `Para poder recoger la tarjeta favor seleccione una de nuestras oficinas:
              <br />Tiempo de recarga a partir del recojo de la tarjeta :
              <b>30 minutos</b>`
          }
          this.tipoPago = 2
          this.isModalPagos = true
        }
      })
    },
    openTerms() {
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
    },
    modalPagosClose() {
      this.isModalPagos = false
      ;(this.tipoPago = -1), 
        (this.payloadModal = {
          formaPago: null,
          speech: null
        })
    },
    modalPagosConfirm() {
      this.modalPagosClose()
    },
     async confirmarDatos() {
    //  this.$refs.form.validate()
  //  console.log("cci", this.disabledNewCCI)
   // console.log("ci", this.disabledNewCI)
       this.$validator.validateAll().then( async (result) => {
         if(result){           

            if( this.disabledNewCI  ) {
           //  console.log("entro al CI")
              if(this.newCI == this.newConfirmCI){
                if(this.newCI.length < this.longitudMax){
                  const msm = {
                    msm : "Cuenta bancarias no alcanza el número de digitos aceptados"
                  }
                  this.$emit('modalNoCoinciden', msm)
                }else{
                  const dataSend = {
                          codigoToken : "CREDINSTANTE",
                          documento : this.sendResponseData.documento,// "48342422",//this.sendDataForm.documento,
                          telefono : this.sendResponseData.telefono//"984998320",//this.sendDataForm.telefono
                      }
                   //   console.log(dataSend)
                       const body = {
                          codigoContrato: this.sendResponseData.codigoContrato,
                          entidadBancariaOrigen: this.entidadBancariaOrigen,
                          entidadBancariaDestino: this.codigoBanco,
                          tipoCuenta: this.selectTipoCuenta.id,//cuenta corriente o ahorros
                          numeroCuentaBancaria: this.newCI ? this.newCI : null,
                          numeroCuentaInterbancaria: this.newCCI ? this.newCCI : null

                        }

                      const dataTotal = {
                        dataSend: dataSend,
                        body: body
                      }
                        this.$emit('actualizarCuenta', dataTotal)
                     
                 }
                     
                  
              }else{
               const msmFallido = {
                   msm: "Las cuentas bancarias no coinciden"
                 }
                 this.$emit('modalDiferentCuenta', msmFallido)
              }
            }
           
           
         }else{
        
           if(this.disabledNewCCI){
             // console.log("entro al CCI")
               //this.newCCI == this.newConfirmCCI ? null : alert("no son iguales CCI")
               if(this.newCCI == this.newConfirmCCI){
                 if( this.newCCI.length < this.longitudMax){
                    const msm = {
                    msm : "Cuenta bancarias no alcanza el número de digitos aceptados"
                    }
                    this.$emit('modalNoCoinciden', msm)
                 }else{

                 const dataSend = {
                          codigoToken : "CREDINSTANTE",
                          documento : this.sendResponseData.documento,//this.sendDataForm.documento,
                          telefono : this.sendResponseData.telefono,//this.sendDataForm.telefono
                      }
                 //     console.log(dataSend)
                       const body = {
                          codigoContrato: this.sendResponseData.codigoContrato,
                          entidadBancariaOrigen: this.entidadBancariaOrigen, //ok
                          entidadBancariaDestino:this.codigoBanco,
                          tipoCuenta: this.selectTipoCuenta.id, 
                          numeroCuentaBancaria: this.newCI ? this.newCI : null,
                          numeroCuentaInterbancaria: this.newCCI ? this.newCCI : null

                        }

                         const dataTotal = {
                        dataSend: dataSend,
                        body: body
                      }
                        this.$emit('actualizarCuenta', dataTotal)
                    
                 }
                 
               }else {
                 const msmFallido = {
                   msm: "Las cuentas interbancarias no coinciden"
                 }
                 this.$emit('modalDiferentCuenta', msmFallido)
               }
            } 
         }
       })
      
     
    
    },
  
    resetFormEntidadBancaria() {
      this.selectTipoCuenta = null
      this.selectEntidadBancaria = null
      this.numeroCuenta = null
      this.numeroCuentaConfirm = null
    },
    resetFormEfectivo() {
      this.$store.commit('express/UPDATE_DATOS', { selectOficina: null })
    },
    igualdadCI(){
      if(this.newCI == this.newConfirmCI)
        return true
      else
      return false 
    },
    igualdadCCI(){
      if(this.newCCI == this.newConfirmCCI)
        return true
      else
      return false 
    },
    noEmpty(){
      //validar campos vacios
    },

    //añadido por dq
    changeBanco(v){   
      const res = this.listaTipoEntidad.find(r => r.codigoBanco == v) //bisca la entidad en especifica    
            if(res){
                if(res.cuentaInterbancaria){
               //   console.log(res.cuentaInterbancaria)
                    this.disabledNewCCI = true
                    this.disabledNewCI = false          
                    this.codigoBanco = res.codigoBanco  
                    this.entidadBancariaOrigen =  res.entidadBancariaOrigen
                   //   console.log(" cuando se cambia de entidadBancariaOrigen" ,this.entidadBancariaOrigen)
                       //this.longitudMax = 20
                         this.tipoCuentaBancaria == '' ? this.tipoCuentaBancaria = 1 : this.tipoCuentaBancaria = 2
                    if(this.tipoCuentaBancaria == 1){
                      this.changeTipoOnBanco(this.tipoCuentaBancaria)                   
                    }else if(this.tipoCuentaBancaria == 2){
                      this.changeTipoOnBanco(this.tipoCuentaBancaria) 
                    }
                    
                }else
                {
                 // console.log(res.cuentaInterbancaria)
                    this.disabledNewCCI = false
                    this.disabledNewCI = true
                    this.cantidadDigitosAhorro = res.cantidadDigitosAhorro           
                    this.cantidadDigitosCorriente = res.cantidadDigitosCorriente
                    this.codigoBanco = res.codigoBanco   
                    this.entidadBancariaOrigen = res.entidadBancariaOrigen
                 //     console.log(" cuando se cambia de entidadBancariaOrigen" ,this.entidadBancariaOrigen)
                    // console.log(res.cantidadDigitosAhorro+' '+res.cantidadDigitosCorriente)
                    this.tipoCuentaBancaria == '' ? this.tipoCuentaBancaria = 1 : this.tipoCuentaBancaria = 2
                     if(this.tipoCuentaBancaria == 1){
                      this.changeTipoOnBanco(this.tipoCuentaBancaria)                   
                    }else if(this.tipoCuentaBancaria == 2){
                      this.changeTipoOnBanco(this.tipoCuentaBancaria) 
                    }
                 
                }
            }
        },
    touch(){
      this.disabledText = true
    },
    changeTipo(v){
      //id = 1 corriente id=2 ahorros
    //  console.log("tipo de cuenta", this.selectTipoCuenta.id)
      
    //   console.log("tipo de cuenta", this.selectEntidadBancaria)
      this.tipoCuentaBancaria = v
       if(v == 2){
        const res = this.listaTipoEntidad.find(r => r.codigoBanco == this.codigoBanco)
    //    console.log(res)
        if(res.cuentaInterbancaria){
          //this.longitudMax = res.cantidadDigitosCorriente
          this.longitudMax = 20
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
      //    console.log(" cuando se cambia de tipoi de cuenta" ,res.cantidadDigitosCorriente)
      //      console.log(" cuando se cambia de entidadBancariaOrigen" ,this.entidadBancariaOrigen)
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }else{
          this.longitudMax = res.cantidadDigitosCorriente          
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
      //    console.log(" cuando se cambia de tipoi de cuenta" ,res.cantidadDigitosCorriente)
      //      console.log(" cuando se cambia de entidadBancariaOrigen" ,this.entidadBancariaOrigen)
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }
        
      }else if(v == 1){
        const res = this.listaTipoEntidad.find(r => r.codigoBanco == this.codigoBanco)
        if(res.cuentaInterbancaria){
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
          //this.entidadBancariaOrigen = 20
       //   console.log(" cuando se cambia de tipoi de cuenta" ,res.cantidadDigitosAhorro)
      //    console.log(" cuando se cambia de entidadBancariaOrigen" ,this.entidadBancariaOrigen)
          this.longitudMax = 20//res.cantidadDigitosAhorro
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }else{
          this.entidadBancariaOrigen = res.entidadBancariaOrigen     
     //     console.log(" cuando se cambia de tipoi de cuenta" ,res.cantidadDigitosAhorro)
     //     console.log(" cuando se cambia de entidadBancariaOrigen" ,this.entidadBancariaOrigen)
          this.longitudMax = res.cantidadDigitosAhorro
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }
        
      }
     
    },
    changeTipoOnBanco(t){
       if(t == 2){
        const res = this.listaTipoEntidad.find(r => r.codigoBanco == this.codigoBanco)
   //     console.log(" cuando se cambia de tipoi de cuenta" ,res.cantidadDigitosCorriente)
        if(res.cuentaInterbancaria){
          this.longitudMax = 20//res.cantidadDigitosCorriente
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }else{
           this.longitudMax = res.cantidadDigitosCorriente
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }
        
      }else if(t == 1){
        const res = this.listaTipoEntidad.find(r => r.codigoBanco == this.codigoBanco)
    //    console.log(" cuando se cambia de tipoi de cuenta" ,res.cantidadDigitosAhorro)
        if(res.cuentaInterbancaria){
          this.longitudMax = 20//res.cantidadDigitosAhorro
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }else{
          this.longitudMax = res.cantidadDigitosAhorro
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }
        
      }
    }
  }
}
</script>
<style>