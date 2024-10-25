<template>
  <v-container fluid pa-0>
    <v-row class="d-flex flex-row">
      <v-col lg="6" md="6" class="v-col-left d-flex align-center mt-6">
        <Leftforms :logo="img" :nota="nota" />
      </v-col>
      <v-col lg="6" md="6" class="d-flex align-center">
        <Rightforms
          :background="color"
          titulo-cabecera="¡Pídelo aquí!"
          :color="color"
          :loading="loading"
          @submit="loginEmit"
        ></Rightforms>
      </v-col>
      <v-row dense>
        <v-col cols="12" class="secondary--text pa-12 caption terminos">
          <h4 class="title">TÉRMINOS Y CONDICIONES</h4>
          <ol>
            <li>
              <div>TÉRMINOS Y CONDICIONES DE LA CAMPAÑA CONTIGO</div>
              <p style="text-align: justify">
                EDPYME ACCESO CREDITICIO S.A., EN ADELANTE “ACCESO”, OFRECE UN
                CRÉDITO DE LIBRE DISPONIBILIDAD FACTOR RECAUDO – GNV, ASCENDENTE
                A S/ 10,000.00, A LOS CLIENTES QUE CUMPLAN CON LOS SIGUIENTES
                REQUISITOS: CUENTEN O HAYAN CONTADO CON UN CRÉDITO VEHICULAR CON
                ACCESO CUYO VEHÍCULO ESTE CONVERTIDO A GNV Y POR LO TANTO SEAN
                PROPIETARIO DEL MISMO. EL DESEMBOLSO DEL MONTO SEÑALADO ESTARÁ
                SUJETO A PREVIA EVALUACIÓN CREDITICIA DEL CLIENTE Y CUMPLIMIENTO
                DE LAS CONDICIONES DEL CRÉDITO, COMO INFORMACIÓN EMITIDA POR LA
                SBS. CABE SEÑALAR QUE, SÓLO SE RECIBIRÁN LAS SOLICITUDES PARA EL
                OTORGAMIENTO DEL PRESENTE CRÉDITO A TRAVÉS DEL REGISTRO DE LOS
                DATOS SOLICITADOS EN NUESTRA OFICINA VIRTUAL. EL PLAZO PARA
                CANCELAR EL CRÉDITO ES DE 24 MESES. EL MONTO REFERENCIAL DE LAS
                CUOTAS ASCIENDE A S/ 577.00. TASA EFECTIVA ANUAL, CALCULADA EN
                BASE A 360 DÍAS: 39%. TASA DE COSTO EFECTIVA ANUAL (TCEA)
                CALCULADA EN BASE A 360 DÍAS: 39%. TASA DE INTERÉS MORATORIA
                EFECTIVA ANUAL CALCULADA EN BASE A 360 DÍAS: 120% APLICABLE
                SOBRE EL IMPORTE DE LA CUOTA VENCIDA DESDE EL PRIMER DÍA DE
                ATRASO. TIPO DE CAMBIO REFERENCIAL S/. 3.45. PROMOCIÓN VÁLIDA A
                NIVEL NACIONAL. DICHA INFORMACIÓN SE PROPORCIONA CON ARREGLO DE
                LA LEY N° 28587 LEY COMPLEMENTARIA A LA LEY DE PROTECCIÓN AL
                CONSUMIDOR EN MATERIA DE SERVICIOS FINANCIEROS Y AL REGLAMENTO
                DE GESTIÓN DE CONDUCTO DE MERCADO, APROBADO MEDIANTE RESOLUCIÓN
                SBS N° 3274-2017. EN CASO EXISTA ALGUNA OBSERVACIÓN CON LA
                INFORMACIÓN BRINDADA POR EL CLIENTE, ACCESO QUEDA FACULTADO A
                COMUNICARLE Y SOLICITARLE SUBSANE LAS OBSERVACIONES EXISTENTES
                PARA CULMINAR CON EL PROCESO DE APROBACIÓN DEL CRÉDITO. PARA
                MAYOR INFORMACIÓN SOBRE TASA DE INTERÉS, COMISIONES Y GASTOS,
                CONSULTA EL TARIFARIO EN WWW.ACCESO.COM.PE. PARA MÁS INFORMACIÓN
                EN WWW.ACCESO.COM.PE DIRECCIÓN: AV. 28 DE JULIO 334, JESÚS
                MARÍA TELÉFONO: (01) 605 5555
              </p>
            </li>
            <li>
              <div>FACULTADES DE ACCESO</div>
              <p style="text-align: justify">
                ACCESO SE RESERVA EL DERECHO DE DESCARTAR LAS PARTICIPACIONES
                QUE PUEDA CONSIDERAR FRAUDULENTAS, ASÍ COMO LAS QUE NO REÚNAN
                LOS REQUISITOS Y CONDICIONES ESTABLECIDAS EN LOS PRESENTES
                TÉRMINOS Y CONDICIONES, SIN ASUMIR NINGÚN TIPO DE
                RESPONSABILIDAD. ACCESO PODRÁ INTRODUCIR LAS MODIFICACIONES QUE
                JUZGUE CONVENIENTES EN CUANTO A LAS CONDICIONES Y
                CARACTERÍSTICAS DE LA PRESENTE CAMPAÑA, SIN QUE ELLO GENERE
                RECLAMO ALGUNO POR PARTE DE LOS CLIENTES, LO CUAL LOS CLIENTES
                DECLARAN CONOCER Y ACEPTAR.
              </p>
            </li>
            <li>
              <div>POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS</div>
              <p style="text-align: justify">
                ACCESO SE PREOCUPA POR LA PROTECCIÓN Y PRIVACIDAD DE LOS DATOS
                PERSONALES DE SUS CLIENTES Y/O USUARIOS. POR ELLO, SE HA
                COMPROMETIDO A GARANTIZAR LA ABSOLUTA CONFIDENCIALIDAD DE LA
                INFORMACIÓN QUE RECOLECTEN O LE SEA PROPORCIONADA, EN ESPECIAL
                SOBRE DATOS PERSONALES; PARA LO CUAL, EMPLEA ALTOS ESTÁNDARES DE
                SEGURIDAD, A FIN DE EVITAR SU ALTERACIÓN, PÉRDIDA, TRATAMIENTO O
                USO NO AUTORIZADO. LOS CLIENTES Y/O USUARIOS AUTORIZAN
                EXPRESAMENTE A ACCESO HACER USO Y TRATO DE LOS DATOS PERSONALES
                QUE BRINDE DURANTE LA PRESENTE CAMPAÑA, ASÍ COMO LA INFORMACIÓN
                QUE SE DERIVE DEL MISMO, DE CONFORMIDAD CON SUS POLÍTICAS DE
                PRIVACIDAD CONTENIDAS EN EL SIGUIENTE LINK:
                HTTPS://ACCESO.COM.PE/TRANSPARENCIA-ACCESO/POLITICA-DE-PRIVACIDAD/
                LOS CLIENTES DECLARAN HABER LEÍDO Y ENTENDIDO EL CONTENIDO DE
                LAS MISMAS, EN CONSECUENCIA, ACEPTAS SUS TÉRMINOS Y CONDICIONES
                Y OTORGA SU CONSENTIMIENTO LIBRE, EXPRESO, GRATUITO E
                INDUBITABLE PARA QUE ACCESO PUEDA DAR TRATAMIENTO Y HACER USO DE
                SUS DATOS PERSONALES DE CONFORMIDAD CON SUS POLÍTICAS DE
                PRIVACIDAD. ASIMISMO, EL CLIENTE EN CUALQUIER MOMENTO PODRÁ
                REVOCAR LA AUTORIZACIÓN PARA EL TRATAMIENTO DE SUS DATOS
                PERSONALES, DE CONFORMIDAD CON LO PREVISTO EN LA LEY 29733 Y EL
                REGLAMENTO. PARA EJERCER ESTE DERECHO, O CUALQUIER OTRO PREVISTO
                EN DICHAS NORMAS, DEBERÁS PRESENTAR TU SOLICITUD ENTRANDO AL
                LINK INDICADO EN EL PÁRRAFO PRECEDENTE.
              </p>
            </li>
            <li>
              <div>USO DE IMAGEN</div>
              <p style="text-align: justify">
                LA PARTICIPACIÓN EN LA PRESENTE CAMPAÑA IMPORTARÁ LA EXPRESA
                AUTORIZACIÓN A ACCESO PARA LA DIFUSIÓN PÚBLICA, TRANSMISIÓN,
                RETRANSMISIÓN, REPRODUCCIÓN O PUBLICACIÓN DE LAS FILMACIONES,
                FOTOGRAFÍAS, IMÁGENES O GRABACIONES DE LAS IMÁGENES Y VOCES DE
                LOS CLIENTES, EN TODOS LOS MEDIOS DE COMUNICACIÓN (INCLUYENDO,
                PERO SIN LIMITARSE, A GRÁFICOS, VISUALES, AUDIOVISUALES,
                TELEVISIÓN POR AIRE, ANTENA, CABLE O SATÉLITE, RADIO E INTERNET)
                CON FINES PUBLICITARIOS SIN QUE EL CLIENTE TENGA DERECHO A
                RECLAMO DE INDEMNIZACIÓN, CONTRAPRESTACIÓN O RETRIBUCIÓN ALGUNA.
                LOS CLIENTES GARANTIZAN QUE NO EXISTEN TERCEROS QUE TENGAN
                DERECHOS DE EXCLUSIVIDAD SOBRE LA EXHIBICIÓN, PUBLICACIÓN,
                DIFUSIÓN, REPRODUCCIÓN O PUESTA EN EL COMERCIO DE SU IMAGEN, VOZ
                Y DATOS PERSONALES. EN CASO CONTRARIO, SE COMPROMETEN A MANTENER
                LIBRES DE TODA RESPONSABILIDAD A ACCESO RESPECTO DE CUALQUIER
                RECLAMO QUE POR ESTE MOTIVO PUDIERAN FORMULAR TERCEROS.
                ASIMISMO, PRESTAN SU CONFORMIDAD PARA LA PUBLICACIÓN DEL
                MATERIAL RELACIONADO A SU DERECHO DE IMAGEN RESPECTO DE LAS
                FOTOGRAFÍAS (U OTRAS) QUE SE PUEDAN TOMAR COMO PARTE DE LA
                CAMPAÑA CEDIENDO A ACCESO LOS DERECHOS SOBRE LOS MISMOS. ESTA
                CESIÓN DE DERECHOS INCLUYE LOS DE REPRODUCCIÓN, COMUNICACIÓN
                PÚBLICA, DISTRIBUCIÓN, PUESTA A DISPOSICIÓN INTERACTIVA, EDICIÓN
                POR CUALQUIER MEDIO Y FORMATO, PARA TODO EL MUNDO Y DURANTE TODO
                EL TIEMPO DE DURACIÓN DE LOS DERECHOS DE PROPIEDAD INTELECTUAL
                DEL MATERIAL EN EL QUE SE UTILICEN, SIN QUE ELLO GENERE DERECHOS
                A FAVOR DEL CLIENTE DE RECIBIR CONTRAPRESTACIÓN ALGUNA. LOS
                CLIENTES RENUNCIAN A CUALQUIER RECLAMO QUE PUDIERAN EFECTUAR POR
                LA DISMINUCIÓN DE SUS INGRESOS O CUALQUIER OTRO DAÑO O PERJUICIO
                QUE SE LES PUDIERA DERIVAR DE SU PARTICIPACIÓN EN LA CAMPAÑA O
                POR LA CESIÓN DE SUS DERECHOS DE IMAGEN OBJETO DE ESTOS TÉRMINOS
                Y CONDICIONES.
              </p>
            </li>
            <li>
              <div>RESPONSABILIDAD</div>
              <p style="text-align: justify">
                ACCESO NO SE RESPONSABILIZARÁ POR CUALQUIER DAÑO O PERJUICIO QUE
                AFECTE A LOS GANADORES DEL SORTEO DETALLADO EN EL NUMERAL 2. POR
                CASO FORTUITO O FUERZA MAYOR, SIENDO DE RESPONSABILIDAD DE LOS
                GANADORES CUALQUIER RESPONSABILIDAD AL RESPECTO LUEGO DE
                RECIBIDO EL PREMIO. ASIMISMO, LOS CLIENTES Y/O USUARIOS,
                GANADORES SE COMPROMETEN A MANTENER INDEMNE A ACCESO, SUS
                EMPRESAS VINCULADAS, EMPLEADOS O REPRESENTANTES ANTE CUALQUIER
                RECLAMO, INDEMNIZACIÓN POR DAÑOS, OBLIGACIÓN, PÉRDIDA, DEUDA,
                COSTO O GASTO QUE PUDIEREN SURGIR COMO CONSECUENCIA DE: (I) EL
                INCUMPLIMIENTO POR PARTE DEL CLIENTE DE LOS TÉRMINOS Y
                CONDICIONES; (II) LA VIOLACIÓN POR PARTE DE LOS CLIENTES DE
                DERECHOS DE TERCEROS, INCLUIDOS, ENTRE OTROS, LOS DERECHOS DE
                AUTOR, DE PROPIEDAD O DE PRIVACIDAD; (III) CUALQUIER RECLAMO
                ADMINISTRATIVO, EXTRAJUDICIAL Y/O JUDICIAL POR DAÑOS Y/O
                CUALQUIER OTRO CONCEPTO, COMO CONSECUENCIA DE LA UTILIZACIÓN DEL
                PREMIO DEL SORTEO O LA OBTENCIÓN DE ALGÚN BENEFICIO. LA PRESENTE
                OBLIGACIÓN DE DEFENSA E INDEMNIDAD SUBSISTIRÁ AÚN UNA VEZ
                EXTINGUIDOS LOS TÉRMINOS Y CONDICIONES.
              </p>
            </li>
            <li>
              <div>NORMATIVA APLICABLE</div>
              <p style="text-align: justify">
                PARA CUALQUIER CONTROVERSIA QUE PUDIERA DERIVARSE DE LA
                REALIZACIÓN DE LA CAMPAÑA, LOS CLIENTES Y/O USUARIOS Y ACCESO SE
                SOMETERÁN A LA JURISDICCIÓN DE LOS JUECES Y TRIBUNALES DEL
                DISTRITO JUDICIAL DE LIMA. LOS CLIENTES DECLARAN SU SOMETIMIENTO
                A DICHOS JUECES Y TRIBUNALES. EN TODO LO NO CONTENIDO EN LOS
                TÉRMINOS Y CONDICIONES, SERÁN DE APLICACIÓN LAS LEYES VIGENTES
                PERUANAS. LOS CLIENTES Y/O USUARIOS AL ACEPTAR LOS TÉRMINOS Y
                CONDICIONES DESCRITOS EN EL PRESENTE DOCUMENTO, DECLARA/N ESTAR
                CONFORME CON ESTOS.
              </p>
            </li>
            <li>
              <div>POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES</div>
              <p style="text-align: justify">
                <b>AUTORIZACIÓN DE DATOS PERSONALES</b>
                <br />
                QUIEN/ES SUSCRIBE/N EL PRESENTE DOCUMENTO (EN ADELANTE EL/LOS
                CLIENTE/S ) AUTORIZA/N A EDPYME ACCESO DE FORMA LIBRE,
                INEQUÍVOCA Y EXPRESA PARA QUE PUEDA DAR TRATAMIENTO Y HACER USO
                DE MIS/NUESTROS DATOS PERSONALES, POR TIEMPO INDEFINIDO,
                OBTENIDOS A TRAVÉS DE LA INFORMACIÓN QUE LE PROPORCIONE/MOS
                A EDPYME ACCESO DE MANERA LIBRE Y VOLUNTARIA, CUANDO ACCEDA/MOS
                A SUS SITIOS WEBS O LANDINGS PAGE, PARTICIPE/MOS EN EVENTOS Y/O
                PROMOCIONES, ENVÍE/MOS CONSULTAS O COMUNIQUE/MOS INCIDENCIAS, EN
                GENERAL A TRAVÉS DE CUALQUIERA DE SUS PLATAFORMAS , SEA
                INTERACCIONES WEB, TELEFÓNICA, PRESENCIAL, DOCUMENTARIA Y ADEMÁS
                DE LA INFORMACIÓN QUE SE DERIVE DEL USO DE LOS SERVICIOS
                CONTRATOS CON EDPYME ACCESO DE CONFORMIDAD CON LA LEY N° 29733 -
                LEY DE PROTECCIÓN DE DATOS PERSONALES Y SU REGLAMENTO, APROBADO
                MEDIANTE DECRETO SUPREMO N° 003-2013-JUS, Y CUALQUIER OTRA
                DISPOSICIÓN APLICABLE O MODIFICATORIAS, SUSTITUTORIAS Y
                REVOCATORIAS (EN ADELANTE “LA NORMA”), EDPYME ACCESO, GARANTIZA
                LA ABSOLUTA CONFIDENCIALIDAD DE LA INFORMACIÓN QUE RECOLECTE O
                LE PROPORCIONE/N EL/LOS CLIENTE/S , EN ESPECIAL SOBRE SUS DATOS
                PERSONALES, PARA LO CUAL EMPLEA ALTOS ESTÁNDARES DE SEGURIDAD,
                TOMANDO LAS MEDIDAS TÉCNICAS, ORGANIZATIVAS Y LEGALES NECESARIAS
                A FIN DE EVITAR SU ALTERACIÓN, PERDIDA, TRATAMIENTO O ACCESO NO
                AUTORIZADO. POR SU PARTE, EL/LOS CLIENTE/S GARANTIZA/N A EDPYME
                ACCESO, LA EXACTITUD, VERACIDAD Y AUTENTICIDAD DE LOS DATOS
                PERSONALES PROPORCIONADOS, COMPROMETIÉNDOSE A MANTENERLOS EN
                VIGENCIA. EL/LOS CLIENTE/S DECLARA/N CONOCER QUE LA FALSEDAD DE
                LOS DATOS PERSONALES PROPORCIONADOS, CONSTITUYE UNA FALTA GRAVE
                FRENTE A EDPYME ACCESO. ASIMISMO, EL/LOS CLIENTE/S DECLARA/N Y
                AUTORIZA/N A EDPYME ACCESO: A UTILIZAR SUS DATOS PERSONALES EN
                LA GESTIÓN ADMINISTRATIVA, COMERCIAL, PARA LOS FINES REFERIDOS
                EN ACTIVIDADES RELACIONADAS CON EL OBJETO SOCIAL EN MATERIA
                FINANCIERA, PROCESAMIENTO DE DATOS, FORMALIZACIONES
                CONTRACTUALES, COBRO DE DEUDAS, GESTIÓN DE OPERACIONES
                FINANCIERAS, EVALUAR SU COMPORTAMIENTO EN EL SISTEMA CREDITICIO
                Y CAPACIDAD DE PAGO, REMISIÓN DE CORRESPONDENCIA, ENTRE OTROS,
                LA MISMA QUE PODRÁ SER REALIZADA A TRAVÉS DE TERCEROS. DE
                ACUERDO A LO QUE SEÑALA EL DECRETO LEGISLATIVO N° 1930 QUE
                MODIFICÓ LA LEY N° 29571, CÓDIGO DE PROTECCIÓN Y DEFENSA DEL
                CONSUMIDOR; AL REMITIRLE INFORMACIÓN COMERCIAL Y/O PUBLICITARIA
                DE LOS SERVICIOS Y PRODUCTOS QUE OFRECE EDPYME ACCESO ,
                DIRECTAMENTE O POR MEDIO DE TERCEROS DEBIDAMENTE AUTORIZADOS, A
                TRAVÉS DEL TELÉFONO FIJO O CELULAR, DIRECCIÓN DE CORREO
                ELECTRÓNICO Y OTROS MEDIOS QUE EDPYME ACCESO TENGA A SU
                DISPOSICIÓN. POR SU PARTE, EL/LOS CLIENTE/S PODRÁ MANIFESTAR SU
                VOLUNTAD DE RECHAZAR O RENUNCIAR LA RECEPCIÓN DE INFORMACIÓN
                BASTANDO PARA ELLO UNA COMUNICACIÓN A ACCESO A TRAVÉS DE LA
                SIGUIENTE
                <a
                  target="_blank"
                  href="http://ftp.edpymeaccesocrediticio.com.pe:8080/EMAILPAGINAWEBARCO/ENVIOEMAILPANEL.DO?%20TIPO_PROYECTO=AR"
                  >DIRECCIÓN URL</a
                >, Y DE ESA MANERA REVOCAR EN CUALQUIER MOMENTO Y CONFORME A LA
                NORMATIVA QUE RIGE LA PROTECCIÓN DE DATOS PERSONALES. A USAR,
                CEDER, DISPONER, COMPARTIR O TRANSFERIR BAJO CUALQUIER TÍTULO,
                ONEROSO O GRATUITO, SUS DATOS PERSONALES CON LAS EMPRESAS
                VINCULADAS A EDPYME ACCESO O LO CONFORMEN EN EL FUTURO, ASÍ COMO
                CON SUS SOCIOS COMERCIALES O CUALQUIER OTRA EMPRESA,
                ORGANIZACIÓN O PERSONA NATURAL, TANTO DENTRO COMO FUERA DEL
                PAÍS, NACIONALES O EXTRANJEROS, PÚBLICOS O PRIVADOS, PARA QUE
                ESTOS LE DEN EL TRATAMIENTO LEGAL QUE CONSIDEREN OPORTUNO PARA
                SUS PROPIOS FINES DE CONFORMIDAD CON LA NORMA. A OFRECERLE
                PRODUCTOS O SERVICIOS FINANCIEROS O RELACIONADOS, DESARROLLAR
                ACCIONES COMERCIALES, REALIZAR ESTUDIOS DE MERCADO, ELABORAR
                PERFILES DE COMPRA, ENVIAR O REMITIR PUBLICIDAD, OBSEQUIOS,
                OFERTAS E INFORMACIÓN EN GENERAL (PERSONALIZADA O GENERAL) POR
                CUALQUIER MEDIO, LO QUE SE PODRÁ REALIZAR A TRAVÉS DE TERCERAS
                PERSONAS. ACTUALIZAR LOS REGISTROS Y PROGRAMAS DE SISTEMAS
                DE EDPYME ACCESO O UTILIZARLOS EN LOS CASOS DE FUSIÓN, ESCISIÓN
                O ADQUISICIÓN DE EDPYME ACCESO, O EN EL CASO DE CAMBIO DE RAZÓN
                O DENOMINACIÓN SOCIAL A EL TRATAMIENTO DE SUS DATOS PERSONALES
                PARA FINES DE AUDITORÍA INTERNA, EXTERNA O EN CUMPLIMIENTO A LOS
                REQUERIMIENTOS POR PARTE DE CUALQUIER AUTORIDAD COMPETENTE, SEA
                POLICIAL, JUDICIAL O ADMINISTRATIVA O PARA SALVAGUARDAR EL
                INTERÉS PÚBLICO O, ASÍ COMO CONTRIBUIR CON LA ADMINISTRACIÓN DE
                JUSTICIA. DE ACUERDO A LO DISPUESTO EN LA NORMA, EL/LOS
                CLIENTE/S DECLARA/N CONOCER QUE LE ASISTEN LOS DERECHOS DE
                ACCESO, RECTIFICACIÓN, OPOSICIÓN Y CANCELACIÓN DE LOS DATOS
                PERSONALES, LOS CUALES PODRÁ EJERCER MEDIANTE LA OPCIÓN DE
                CONTACTO CON EDPYME ACCESO A TRAVÉS DE LA SIGUIENTE
                <a
                  target="_blank"
                  href="HTTP://FTP.EDPYMEACCESOCREDITICIO.COM.PE:8080/EMAILPAGINAWEBARCO/ENVIOEMAILPANEL.DO?%20TIPO_PROYECTO=AR"
                  >DIRECCIÓN URL</a
                >
                ES INDISPENSABLE QUE LA PERSONA SOLICITANTE SEA EL TITULAR DE
                LOS DATOS, O, SU REPRESENTANTE LEGAL, POR LO QUE EN AMBOS CASOS
                DEBERÁ SER ACREDITADA DOCUMENTALMENTE CON LA QUE SE OSTENTE.
                EL/LOS CLIENTE/S RATIFICA/N SU EXPRESO CONSENTIMIENTO PARA
                QUE EDPYME ACCESO UTILICE LA INFORMACIÓN DE SUS DATOS
                PERSONALES, DE ACUERDO A LO DETALLADO EN EL PRESENTE DOCUMENTO.
                POR SU PARTE, EDPYME ACCESO, GARANTIZA EL DERECHO FUNDAMENTAL A
                LA PROTECCIÓN DE LOS DATOS PERSONALES DE EL/LOS CLIENTE/S A
                TRAVÉS DE SU TRATAMIENTO ADECUADO; EN UN MARCO DE RESPETO DE LOS
                DEMÁS DERECHOS FUNDAMENTALES QUE EN ELLA SE RECONOCEN.
              </p>
            </li>
          </ol>
        </v-col>
      </v-row>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="400">
      <div class="container-poup">
        <img class="img-popup" :src="imgPopup" alt="Fae_finalizado" />
      </div>
    </v-dialog>
  </v-container>
</template>
<script>
import Leftforms from '@/components/contigo/LeftForms'
import Rightforms from '@/components/contigo/RightForms'
import { mixins } from '@/mixins/init.js'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('users', ['promotor']),
    ...mapState('contigo', ['datos']),
  },

  components: {
    Leftforms,
    Rightforms,
  },
  mixins: [mixins],
  data() {
    return {
      color: '#ff7729',
      img: require('@/assets/img/contigo/imagen-pricipal.png'),
      nota: require('@/assets/img/contigo/nota.png'),
      imgPopup: require('@/assets/img/faemype/Popup_FAE.png'),
      loading: false,
      resForm: {},
      dialog: false,
    }
  },
  methods: {
    loginEmit(payload) {
      this.loading = true
      this.$store
        .dispatch('contigo/validaClienteFae', payload)
        .then((res) => {
          if (res.codRes == '00') {
            this.$gtag('event', 'conversion', {
              send_to: process.env.SEND_TO_ADS,
            })
            this.resForm.codRes = res.codRes
            this.resForm.channel = res.channel
            this.resForm.codigoProducto = res.codigoProducto
            this.resForm.documento = res.documento
            this.resForm.estadoProspecto = res.estadoProspecto
            this.resForm.codigoProspecto = res.codigoProspecto

            this.$store.commit('contigo/SET_COD_PROSP', res.codigoProspecto)
            this.$store.commit('contigo/SET_OFERTAS', res.ofertas)
            this.$store.commit('contigo/SET_BODY_VALIDA', this.resForm)
            this.$store.commit('contigo/SET_STEP', 2)
          } else if (res.codRes == '01') {
            this.$store.commit('contigo/RESET_ALL')
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Lo sentimos!',
              msgModal: `<p style="color: #005092">Usted no se encuentra calificado para esta campaña</p>`,
              maxWidth: 350,
              estadoModal: true,
            })
          } else if (res.codRes == '10') {
            this.$store.commit('contigo/RESET_ALL')
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'success',
              tituloModal: '¡Recuerda!',
              msgModal: `<p style="color: #005092">Ya tienes una solicitud en curso.`,
              maxWidth: 350,
              estadoModal: true,
            })
          } else if (res.codRes == '11') {
            this.$store.commit('contigo/RESET_ALL')
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Atención!',
              msgModal: `<p style="color: #005092">Ya tienes una solicitud en curso.`,
              maxWidth: 350,
              estadoModal: true,
            })
          } else if (res.codRes == '99') {
            this.$store.commit('contigo/RESET_ALL')
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Atención!',
              msgModal: `<p style="color: #005092"> <br> En estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos. </br> </p>`,
              maxWidth: 350,
              estadoModal: true,
            })
          } else {
            this.$store.commit('contigo/RESET_ALL')
            throw new Error(
              'En estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'
            )
          }
        })
        .catch((err) => {
          this.$store.commit('contigo/RESET_ALL')
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'error',
            tituloModal: '¡Error!',
            msgModal: err.message,
            maxWidth: 350,
            estadoModal: true,
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style scoped>
.container {
  width: 90% !important;
}
.v-col-left {
  margin: 0px auto;
}

.container-poup {
  display: flex;
}

.img-popup {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 15px !important;
}

.terminos {
  font-size: 11px !important;
}
</style>
