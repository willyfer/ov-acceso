<template>
    <v-container class="d-flex flex-column" fluid pa-0>
        <v-row class="d-flex flex-row">     
            <v-col md="12" >
                <formCuenta 
                @actualizarCuenta="actualizarCuenta" 
                @cancelarUpdateCuenta="cancelarUpdateCuenta" 
                v-if="disabledForm" 
                @modalNoCoinciden="modalNoCoinciden" 
                @camposSinValidar="camposSinValidar" 
                :codigoContrato="form" 
                :sendDataForm="sendDataForm" 
                @modalDiferentCuenta="modalDiferentCuenta" 
                :sendResponseData="sendResponseData"  />
            </v-col>
        </v-row>
        <ModalTokenExpired v-if="dialog" :openDialogAlert="openDialogAlert" @closeModal="closeModal"/>
        <ModalTokenCuenta v-if="dialogToken" :sendDataForm="sendDataForm" :sendResponseData="sendResponseData" @sendToken="sendTokenValidate" />
  </v-container>
    
</template>

<script>
import ModalTokenExpired from '@/components/modals/ModalTokenExpired'
import ModalTokenCuenta from '@/components/modals/ModalTokenCuenta'
import { mapState } from 'vuex'
const jwt = require('jsonwebtoken')
export default {
    components: {
        FormCuenta: () => import('./FormCuenta'),
        ModalTokenExpired,
        ModalTokenCuenta
    },
    data(){
        return {
            dialogToken: false, 
            key: null,
            dataForm: {
                "documento": "08279624",
            	"placa": "F5Z632",
            },
            form: {
	            "codigoContrato" : "E4692002"
            },
            disabledForm: false, //false 
            openDialogAlert: {
            imgModal: null,
            tituloModal: null,
            msgModal: null,
            maxWidth: 400,
            estadoModal: false,
            isReset: false,
            isResetRetanqueo: false,
            msmButton: '',
            actionButton: false,
            pushRouter: ''
            },
            dialog: false,
            case: null,
            sendDataForm: null,
            telefono: null,
            sendResponseData: null,
            dataActualizacion: null
        }
    },
    created() {
      
    },
    async mounted() {
      this.getParams();           
      await this.varifyToken(); 
      
    },
    methods: {
        async actualizarCuenta(v){
            this.dataActualizacion = v
         
            const res = await this.$store.dispatch('express/generateTokenCuentaBancaria', v.dataSend)
            if(res.estado == "ok"){
                this.dialogToken = true
            
            }
                          
        },
        cancelarUpdateCuenta(v){
         //   console.log(v)
            this.$router.push('/')
        },
        modalNoCoinciden(v){
            this.showAlertToken(
                'warning', 
                '¡Lo sentimos!', 
                v.msm,
                'Ingrese nuevamente',
           
            )
            this.dialog = true
        },
        closeModal(v){
            this.dialog = v
        },
        camposSinValidar(v){
            this.showAlertToken(
                'warning', 
                '¡Lo sentimos!', 
                v.msm,
                'Ingresar nuevamente.',
           
            )
            this.dialog = v.bool
        },
        modalDiferentCuenta(m){
            this.showAlertToken(
                'warning', 
                '¡Lo sentimos!', 
                m.msm,
                'Por favor, ingrese nuevamente.',
                false,
                ''
           
            )
            this.dialog = true
        },

        getParams(){
            let params = new URLSearchParams(location.search);
            var key = params.get('key');
            this.key = key
        },
        showAlertToken(type, title, msm, msmButton, actionButton, pushRouter){
            this.openDialogAlert.imgModal = type
            this.openDialogAlert.tituloModal = title
            this.openDialogAlert.msgModal = msm   
            this.openDialogAlert.msmButton = msmButton
            this.openDialogAlert.actionButton = actionButton,
            this.openDialogAlert.pushRouter = pushRouter
        },
       async varifyToken(){
            try{
                /* const stringJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudG8iOiI0MDIzNTYzOCIsInBsYWNhIjoiRDRCMDY3IiwiaWF0IjoxNTkwMjY0NTAwLCJleHAiOjE1OTAzNTA5MDB9.Pi7kx661705TRT-J7KEgdug1-ZeeLeeihbEtcWpMhqs" */
                const decoded = await jwt.verify(this.key, '4cc3s0123');
                /* const decoded = await jwt.verify(stringJWT, '4cc3s0123'); */
                //console.log("este es el encoded de jwt" , decoded)    
                this.sendResponseData = await jwt.verify(this.key, '4cc3s0123');
               /*  this.sendResponseData = await jwt.verify(stringJWT, '4cc3s0123'); */
               console.log("decoded: ", decoded);
                const res = await this.$store.dispatch('express/validaJWT', decoded.codigoContrato)                
                    if(res.estado){
                    /* if(true){ */
                        this.disabledForm = true
                    }else{
                        this.showAlertToken(
                            'warning', 
                            '¡Lo sentimos!',
                            'En estos momentos no podemos procesar tu solicitud',
                            'Solicite nuevamente aqui',                           
                            true,
                            'home'
                            )
                            this.dialog = true
                    }
           
       
            }catch(error){
                //this.$router.push('/')
                if(error.name == "JsonWebTokenError"){
                    this.showAlertToken(
                        'warning', 
                        '¡Lo sentimos!',
                        'Asegúrese de usar correctamente el enlace.',
                        'Ok',
                        true,
                        'home'
                    )
                    this.dialog = true
                    //this.$router.push('/')
                }else if(error.name == "TokenExpiredError"){
                     this.showAlertToken(
                        'warning', 
                        '¡Lo sentimos!',
                        'Se venció el tiempo para actualizar los datos de tu cuenta bancaria.',
                        'Nueva solicitud aquí ',
                        true,
                        'home'
                    )
                    this.dialog = true
                   // this.$router.push('/')
                }else{
                    this.showAlertToken(
                        'warning', 
                        '¡Lo sentimos!',
                        'En estos momentos no podemos realizar tu solicitud.',
                        'Ok',
                        false,
                        'home'
                    )
                    this.dialog = true
                }
               
            }
        },
        async sendTokenValidate(v){
            const bodyToken = {
                codigoToken : "CREDINSTANTE",
                documento : this.sendResponseData.documento,
                token : v
            }
            const res = await this.$store.dispatch('express/validatedTokenCuentaBancaria', bodyToken)
            if( res.estado == "ok"){  
             
                //console.log("se ejecuto correctamtne")     
                this.dialogToken = false
                this.disabledForm =  false
                const response = await this.$store.dispatch('express/updateTokenCuentaBancaria', this.dataActualizacion.body )
                if(response.codRes == "00"){
                    this.showAlertToken(
                        'success', 
                        '¡Felicidades!', 
                        ' Se actualizó satisfactoriamente ',
                        'Ok',
                        true,
                        'home'
                    )
                    this.dialog = true
                }else{
                     this.showAlertToken(
                        'warning', 
                        '¡Lo sentimos!', 
                        ' En estos momentos no podemos procesar tu solicitud de actualizar tus datos',
                        'Ok',
                        true,
                        'home'
                    )
                    this.dialog = true
                }
                
            }else{
                 this.showAlertToken(
                        'warning', 
                        '¡Lo sentimos!', 
                        ' En estos momentos no podemos procesar tu solicitud ',
                        'Ok',
                        true,
                        'home'
                    )
                    this.dialog = true
            }
        }
    },

}
</script>