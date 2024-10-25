<template>  
  <div class="preevaluate-form">
    <div class="preevaluate-form__container">
      <div class="preevaluate-form__title">¡Solicita tu préstamo aquí!</div>
      <div class="preevaluate-form__inputs">
        <v-form ref="form">
          <v-text-field
            v-model="datos.documento"
            v-validate="'required|digits:' + docLen"
            :maxlength="docLen"
            :minlength="docLen"
            :error-messages="errors.collect('datos.documento')"
            label="Número de DNI"
            data-vv-name="datos.documento"
            required
            data-vv-as="Documento"
            type="tel"
            @keypress="isNumber"
            outlined
            dense
          />
          <v-text-field
            v-model="placa"
            v-validate="{
              required: true,
              regex: /^([a-zA-Z][A-Za-z0-9][A-Za-z0-9][0-9][0-9][0-9]+)$/,
            }"
            v-mask="'AXX-XXX'"
            onkeyup="this.value = this.value.toUpperCase();"
            label="Placa"
            data-vv-as="placa"
            data-vv-name="placa"
            required
            :error-messages="errors.collect('placa')"
            maxlength="7"
            minlength="7"
            outlined
            dense
          />
          <v-text-field
            v-model="datos.telefono"
            v-validate="
              'required|numeric|regex:^([9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+)$'
            "
            label="Número de teléfono"
            outlined
            dense
            :error-messages="errors.collect('datos.telefono')"
            data-vv-name="datos.telefono"
            type="phone"
            maxlength="9"
            minlength="9"
            required
            data-vv-as="Telf."
            @keypress="isNumber"
          />
          <v-text-field
            v-model="datos.email"
            v-validate="'email|max:50|min:6'"
            label="Correo electrónico (Opcional)"
            :error-messages="errors.collect('datos.email')"
            data-vv-name="datos.email"
            type="email"
            :maxlength="50"
            data-vv-as="email"
            outlined
            dense
          />
          <v-checkbox
            v-model="datos.terms"
            v-validate="'required'"
            required
            value="1"
            :error-messages="errors.collect('datos.terms')"
            data-vv-name="datos.terms"
            data-vv-as="Términos y condiciones"
            type="checkbox"
          >
            <template v-slot:label>
              <div class="preevaluate-form__terminos">
                Acepto los
                <span @click="openTermsConditions" class="preevaluate-form__terminos-orange">
                  Términos y Condiciones y las Políticas de Privacidad de Datos.
                </span>
              </div>
            </template>
          </v-checkbox>         
        </v-form>
      </div>
    </div>
    <div class="preevaluate-form__container-button">
      <SharedButton
        text="Lo quiero"
        :buttonOrange="true"
        :totalWidth="60"
        :loading="loading"
        @click="sendRabbit"
      />
    </div>
    <SnackbarInvalid ref='snackbarInvalid'/>
    <v-dialog v-model="terms" persistent max-width="700">
      <TerminosCondiciones
        :color="color"
        :tituloCabecera="tituloCabeceraT"
        :contenido="contenidoTyC"
      />
    </v-dialog>
  </div>   
</template>
<script>
import { format, parseISO } from "date-fns";
import { mapState } from "vuex";
import { mixins } from "@/mixins/mixin.js";
import { selectKilometraje } from "@/utils/catalogo";
import SharedButton from '@/components/shared/SharedButton'
import SnackbarInvalid from '@/components/modals/SnackbarInvalid'

export default {
  components: {
    TerminosCondiciones: () => import('@/components/shared/terms/TerminosCondiciones'),
    SharedButton,
    SnackbarInvalid,
  },
  mixins: [mixins],
  props: {
    color: String,
    background: String,
    tituloCabecera: {
      type: String,
      default: '¿Ya te evaluaste?'
    }
  },
  data() {
    return {
      isCreated: false,
      selectTipoCliente: [
        {
          id: 1,
          text: "Particular",
        },
        {
          id: 2,
          text: "Taxi",
        },
      ],
      duplicateDoc: false,
      showError: false,
      dialog: false,
      selectTipoDocumento: [
        {
          tipdoc: "DNI",
          id: 1,
        },
      ],
      menu: false,
      loading: false,
      tituloCabeceraT: '<div style="padding-left: 10px">TÉRMINOS Y CONDICIONES</div>',
      contenidoTyC: `<div style="padding-left: 10px">
        <p style="text-align: justify;">
          Edpyme Acceso Crediticio S.A., en adelante “Acceso”, otorga créditos a los Usuarios Solicitantes hasta por los siguientes montos: S/. 1,000.00, S/ 1,250.00, S/ 2,000.00 o de S/ 3,500.00 sujeto a previa evaluación crediticia e información emitida por la SBS. El plazo para cancelar el crédito es de 12 o 18 meses, dependiendo el monto del crédito. El monto de las cuotas varía entre S/ 133.00 a S/ 324.00, lo cual estará sujeto al monto otorgado. Tasa de costo efectiva anual (TCEA) calculada en base a 360 días: 60% - 107%. Tasa de interés moratoria efectiva anual calculada en base a 360 días: 120% aplicable sobre el importe de la cuota vencida desde el primer día de atraso. Tipo de cambio referencial S/ 3.45 Dicha información se proporciona con arreglo de la Ley N° 28587 Ley Complementaria a la ley de Protección al Consumidor en Materia de Servicios Financieros y al Reglamento de Gestión de Conducta de Mercado, aprobado mediante Resolución SBS N° 3274-2017. Para mayor información sobre tasa de interés, comisiones y gastos, consulta el tarifario en acceso.com.pe.
          Por otro lado, en caso de existir alguna observación con la información brindada por el Usuario Solicitante, Acceso queda facultado, más no obligado, a comunicarle y solicitarle subsane las observaciones existentes para culminar con el proceso de aprobación del crédito; sin embargo, es responsabilidad del Usuario Solicitante brindar información clara y veraz.
          El Usuario Solicitante, ante la activación del crédito “CredInstante”, adquirirá de manera automática y gratuita el beneficio del Programa de “Asistencia Médica”, el cual también podrá solicitar, sin pago único, adicional o parcial, se brinde hasta a tres (3) de sus dependientes (esposa, hijos y/o padres), sin afectar al crédito otorgado por Acceso, para esto último deberá presentar su solicitud dentro de los treinta (30) primeros días calendarios de la activación de su crédito, llamando a los números telefónicos del Grupo MOK señalados al final del presente enunciado. El tiempo de activación de la “Asistencia Médica”, es por el mismo plazo de activación del crédito del Usuario Solicitante, dicha asistencia no se verá afectado si este último decide pre-cancelar la totalidad del crédito, subsistiendo así la “Asistencia Médica” hasta por el plazo que originalmente se suscribió el crédito. La información sobre la cobertura de la “Asistencia Médica”, será enviada al correo electrónico que el Usuario Solicitante haya brindado previamente en el formulario de evaluación de crédito, o de ser el caso, se enviará un mensaje de texto al número de celular designado por este, adjuntando el link de descarga de toda la información sobre el programa “Atención Médica” o la entrega de la información de manera física.	
          El Usuario Solicitante designa a Acceso, de forma libre y voluntaria la cuenta de ahorros o cuenta corriente donde se destinará el desembolso del importe solicitado, el cual es de su titularidad. En caso Acceso verifique que la cuenta designada por éste es errónea, le solicitará por única vez que realice la corrección del número de cuenta al teléfono consignado en la solicitud de crédito en un plazo máximo de 3 días calendarios de comunicado a fin de proceder con la culminación del proceso de desembolso, en caso el Usuario Solicitante no cumpla con la corrección en el plazo señalado o ingrese una cuenta errónea por segunda vez se dejará sin efecto los documentos de crédito suscrito digitalmente por el Usuario Solicitante, y en consecuencia al no proceder con el desembolso se le comunicará la resolución del contrato al correo electrónico designado en la solicitud de crédito, sin penalización alguna en su contra. Quedando eximida Acceso de toda responsabilidad u obligación frente al Usuario Solicitante”.
        </p> 
        <p>
          Para hacer uso de la asistencia médica, reclamos o incidencias, una vez activado el crédito, deben llamar a los siguientes números de Grupo MOK:
        </p>
        <ul>
          <li>Lima: 7006642 </li>
          <li>Provincia: 080074042</li>
        </ul>
         <p>
          O comunicarse al siguiente correo de MOK:
          plataforma.peru@grupomok.com
        </p>
        <p>
          Cabe señalar que no se podrá hacer uso de la asistencia médica llamando directamente a las clínicas o acercándose a las mismas. Podrán hacer uso de la asistencia médica únicamente a través de MOK, llamándolos o enviándoles correo, será MOK quien gestione su solicitud para el uso de la asistencia médica.
        </p>
         <p>
          El Usuario Solicitante al aceptar los términos y condiciones generales descritos en el presente documento, declara estar conforme con estos.
        </p>
        <p>
          Más información en www.acceso.com.pe Dirección: Av. 28 de Julio 334, Jesús María Teléfono: (01) 605 5555
        </p>
        </div>`,
    };
  },
  computed: {
    ...mapState("default", ["terms"]),
    ...mapState("users", ["promotor"]),
    ...mapState("credinstante", ["datos", "openDialog"]),
    placa: {
      get() {
        return this.datos.placa ? this.datos.placa : null;
      },
      set(v) {
        if (v.length > 3) {
          this.$store.commit("credinstante/UPDATE_DATOS", {
            placa: v.toUpperCase().replace("-", ""),
          });
        }
      },
    },
    kilometros() {
      return selectKilometraje;
    },
    documento() {
      return this.datos.documento;
    },
    telefono() {
      return this.datos.telefono;
    },
    codigoReferidos() {
      return this.datos.codigoReferidos;
    },
    formatFechaNacimiento() {
      if (this.datos.fechaNacimiento) {
        return format(parseISO(this.datos.fechaNacimiento), "dd/MM/yyyy");
      }
      return null;
    },
    showfecha() {
      if (this.datos.tipoDocumento == 1) {
        return false;
      } else {
        return true;
      }
    },
    docLen() {
      switch (this.datos.tipoDocumento) {
        case 1:
          return 8;
          break;
        case 2:
          return 9;
          break;
      }
    },
    backgroundStyle() {
      if (this.isCreated && this.$vuetify.breakpoint.name === 'xs') {
        return { background: this.background }
      }
    },
    bg() {
      return { background: this.background }
    },
  },
  async created() {
    this.$store.dispatch("credinstante/resetStates");
    await this.isNewCreated();
    this.$store.commit("credinstante/UPDATE_DATOS", {
      recorridoxDia: 3,
    });
    this.$store.commit("credinstante/UPDATE_DATOS", {
      tipoDocumento: 1,
    });
  },
  mounted() {
    this.$ga.event("Credinstante", "home");
    this.isCreated = true
  },
  methods: {
    async sendRabbit() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.$ga.event("Credinstante", "Boton-solicitar");
          this.$fb.track("Lead");
          this.loading = true;
          if (!this.promotor.state) {
            console.log("user");
            const token = await this.$recaptcha.execute("form");
            const isRealPerson = await this.validateCaptcha(token);
            console.log(isRealPerson);
            if (isRealPerson) {
              /* await this.$store.dispatch("credinstante/preEvaluate"); */
              this.loading = false;
            } else {
              // bot detected
              this.loading = false;
              this.$store.commit("ui/SET_OPENDIALOGALERT", {
                imgModal: "error",
                tituloModal: "¡OH!",
                msgModal:
                  "Hemos detectado una actividad sospechosa...!<br> intentalo en unos minutos",
                maxWidth: 350,
                estadoModal: true,
                isReset: false,
              });
            }
          } else {
            console.log("promotor");
            /* await this.$store.dispatch("credinstante/preEvaluate"); */
            this.loading = false;
          }
        }
      });
    },
    openTermsConditions(event) {
      event.stopPropagation(); 
      event.preventDefault(); 
      event.cancelBubble = true; 
      event.stopImmediatePropagation();
      this.$store.commit("default/UPDATE_MODAL_TERMS", true);
    },
  },
};
</script>

<style lang='scss'>
.preevaluate-form {
  &__container {
    border: 1px solid #ff4e00;
    border-radius: 24px;
    padding: 6px 6px 40px 6px;
    margin: 0 22px 0 22px;
  }
  &__title {
    height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
    color: white;
    font-size: 18px;
  }
  &__subtitle {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 20px 0;
  }
  &__inputs {
    margin: 40px 16px 0 16px;
  }
  &__terminos {
    font-size: 10px;
    font-weight: bold;
    line-height: 16px;
  }
  &__terminos-orange {
    color: #ff4e00;
  }
  &__container-button {
    margin: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .v-text-field.v-text-field--enclosed.error--text .v-text-field__details {
    margin-top: 0px !important;
    margin-bottom: 14px !important;
  }
}
</style>