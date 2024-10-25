<template>
  <v-col id="ldForm" class="crLayoutForm" :style="backgroundStyle">
    <div class="mainForm">
      <div class="headerLayout" :style="bg">
        <h2 class="white--text text-center">{{ tituloCabecera }}</h2>
      </div>
      <div class="cr-column-right pa-2">
        <v-form
          ref="form"
          autocomplete="nope"
          class="pa-2 pa-sm-4 pa-lg-5"
          @submit.prevent="sendRabbit"
        >
          <v-row dense>
            <v-col cols="12" lg="12">
              <h3 class="ld-h2-title-form" :class="`${color}--text`">
                Completa tus datos
              </h3>
            </v-col>
            <v-col cols="12" no-gutters>
              <v-text-field
                v-model="datos.documento"
                v-validate="'required|digits:' + docLen"
                :maxlength="docLen"
                :minlength="docLen"
                :error-messages="errors.collect('datos.documento')"
                solo
                flat
                label="Número de Documento (DNI)"
                data-vv-name="datos.documento"
                required
                data-vv-as="Documento"
                :counter="docLen"
                type="tel"
                :color="color"
                @keypress="isNumber"
              />
            </v-col>
            <v-col v-if="showfecha" cols="12">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="formatFechaNacimiento"
                    v-validate="{ required: showfecha }"
                    data-vv-delay="1000"
                    label="Fecha de nacimiento"
                    prepend-inner-icon="event"
                    :color="color"
                    solo
                    flat
                    required
                    data-vv-name="formatFechaNacimiento"
                    data-vv-as="fecha"
                    :error-messages="errors.collect('formatFechaNacimiento')"
                    maxlength="10"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="datos.fechaNacimiento"
                  locale="es"
                  max="2000-01-01"
                  min="1930-01-01"
                  no-title
                  @input="menu = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="12">
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
                solo
                flat
                :error-messages="errors.collect('placa')"
                :color="color"
                maxlength="7"
                minlength="7"
              />
            </v-col>
            <v-col cols="12" class="mb-2">
              <v-text-field
                v-model="datos.telefono"
                v-validate="
                  'required|numeric|regex:^([9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+)$'
                "
                label="Número de teléfono"
                solo
                flat
                :error-messages="errors.collect('datos.telefono')"
                data-vv-name="datos.telefono"
                type="phone"
                maxlength="9"
                minlength="9"
                required
                :counter="9"
                data-vv-as="Telf."
                :color="color"
                @keypress="isNumber"
                :messages="[
                  'Ingresa el número celular que estas usando en este momento.',
                ]"
              />
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="datos.terms"
                v-validate="'required'"
                required
                value="1"
                :error-messages="errors.collect('datos.terms')"
                data-vv-name="datos.terms"
                data-vv-as="Términos y condiciones"
                type="checkbox"
                :color="color"
              >
                <div slot="label" class="tyc-credinstante">
                  Acepto los
                  <a
                    slot="activator"
                    :class="color + '--text'"
                    @click="openTerms"
                    >Términos y Condiciones y las Políticas de Privacidad de
                    Datos</a
                  >
                </div>
              </v-checkbox>
            </v-col>
            <v-col cols="12">
              <span v-if="showError" class="body-2 red--text"
                >*Completa todos los campos por favor</span
              >
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn
                class="ld-btn"
                type="submit"
                :color="color"
                :loading="loading"
                :disbaled="loading"
                :class="color"
                >Solicítalo</v-btn
              >
            </v-col>
            <v-dialog v-model="terms" persistent max-width="700">
              <TerminosCondiciones
                :color="color"
                :tituloCabecera="tituloCabeceraT"
                :contenido="contenidoTyC"
              />
            </v-dialog>
          </v-row>
        </v-form>
      </div>
    </div>
  </v-col>
</template>
<script>
import { format, parseISO } from 'date-fns'
import { mapState } from 'vuex'
import { mixins } from '@/mixins/mixin.js'
import { selectKilometraje } from '@/utils/catalogo'

export default {
  components: {
    TerminosCondiciones: () =>
      import('@/components/shared/terms/TerminosCondiciones'),
  },
  mixins: [mixins],
  props: {
    color: String,
    background: String,
    tituloCabecera: {
      type: String,
      default: '¿Ya te evaluaste?',
    },
  },
  data() {
    return {
      isCreated: false,
      selectTipoCliente: [
        {
          id: 1,
          text: 'Particular',
        },
        {
          id: 2,
          text: 'Taxi',
        },
      ],
      duplicateDoc: false,
      showError: false,
      dialog: false,
      selectTipoDocumento: [
        {
          tipdoc: 'DNI',
          id: 1,
        },
      ],
      menu: false,
      loading: false,
      tituloCabeceraT:
        '<div style="padding-left: 10px">TÉRMINOS Y CONDICIONES</div>',
      contenidoTyC: `
      <ol>
          <li>
            <div>TÉRMINOS Y CONDICIONES DE CREDINSTANTE</div>
            <p style="text-align: justify;">
             Edpyme Acceso Crediticio S.A., en adelante “Acceso”, otorga créditos a los Usuarios Solicitantes hasta por los siguientes montos: S/. 1,000.00, S/ 1,250.00, S/ 2,000.00, S/2,500.00, S/ 3,500.00, S/4,000.00 o de S/4,500.00 sujeto a previa evaluación crediticia e información emitida por la SBS. El plazo para cancelar el crédito es de 12 o 18 meses, dependiendo el monto del crédito. El monto de las cuotas varía entre S/ 133.00 a S/ 350.00, lo cual estará sujeto al monto otorgado. Tasa de costo efectiva anual (TCEA) calculada en base a 360 días: 60% - 107%. Tasa de interés moratoria efectiva anual calculada en base a 360 días: 120% aplicable sobre el importe de la cuota vencida desde el primer día de atraso. Tipo de cambio referencial S/ 3.45 Dicha información se proporciona con arreglo de la Ley N° 28587 Ley Complementaria a la ley de Protección al Consumidor en Materia de Servicios Financieros y al Reglamento de Gestión de Conducta de Mercado, aprobado mediante Resolución SBS N° 3274-2017. Para mayor información sobre tasa de interés, comisiones y gastos, consulta el tarifario en acceso.com.pe. Por otro lado, en caso de existir alguna observación con la información brindada por el Usuario Solicitante, Acceso queda facultado, más no obligado, a comunicarle y solicitarle subsane las observaciones existentes para culminar con el proceso de aprobación del crédito; sin embargo, es responsabilidad del Usuario Solicitante brindar información clara y veraz. El Usuario Solicitante, ante la activación del crédito “CredInstante”, adquirirá de manera automática y gratuita el beneficio del Programa de “Asistencia Médica”, el cual también podrá solicitar, sin pago único, adicional o parcial, se brinde hasta a tres (3) de sus dependientes (esposa, hijos y/o padres), sin afectar al crédito otorgado por Acceso, para esto último deberá presentar su solicitud dentro de los treinta (30) primeros días calendarios de la activación de su crédito, llamando a los números telefónicos del Grupo MOK señalados al final del presente enunciado. El tiempo de activación de la “Asistencia Médica”, es por el mismo plazo de activación del crédito del Usuario Solicitante, dicha asistencia no se verá afectado si este último decide pre-cancelar la totalidad del crédito, subsistiendo así la “Asistencia Médica” hasta por el plazo que originalmente se suscribió el crédito. La información sobre la cobertura de la “Asistencia Médica”, será enviada al correo electrónico que el Usuario Solicitante haya brindado previamente en el formulario de evaluación de crédito, o de ser el caso, se enviará un mensaje de texto al número de celular designado por este, adjuntando el link de descarga de toda la información sobre el programa “Atención Médica” o la entrega de la información de manera física. El Usuario Solicitante designa a Acceso, de forma libre y voluntaria la cuenta de ahorros o cuenta corriente donde se destinará el desembolso del importe solicitado, el cual es de su titularidad. En caso Acceso verifique que la cuenta designada por éste es errónea, le solicitará por única vez que realice la corrección del número de cuenta al teléfono consignado en la solicitud de crédito en un plazo máximo de 3 días calendarios de comunicado a fin de proceder con la culminación del proceso de desembolso, en caso el Usuario Solicitante no cumpla con la corrección en el plazo señalado o ingrese una cuenta errónea por segunda vez se dejará sin efecto los documentos de crédito suscrito digitalmente por el Usuario Solicitante, y en consecuencia al no proceder con el desembolso se le comunicará la resolución del contrato al correo electrónico designado en la solicitud de crédito, sin penalización alguna en su contra. Quedando eximida Acceso de toda responsabilidad u obligación frente al Usuario Solicitante”.
            </p>
            <p>Más información en www.acceso.com.pe Dirección: Av. 28 de Julio 334, Jesús María Teléfono: (01) 605 5555 Para hacer uso de la asistencia médica, reclamos o incidencias, los clientes deben llamar a los siguientes números de Grupo MOK Lima: 7006642 - Provincia: 080074042 o comunicarse al siguiente correo de MOK: plataforma.peru@grupomok.com Cabe señalar que no se podrá hacer uso de la asistencia médica llamando directamente a las clínicas o acercándose a las mismas. Podrán hacer uso de la asistencia médica únicamente a través de MOK, llamándolos o enviándoles correo, será MOK quien gestione su solicitud para el uso de la asistencia médica.</p>
          </li>
          <li>
            <div>FACULTADES DE ACCESO</div>
            <p style="text-align: justify;">
              <b>ACCESO</b> se reserva el derecho de descartar las participaciones que pueda considerar fraudulentas, así como las que no reúnan los requisitos y condiciones establecidas en los presentes Términos y Condiciones, sin asumir ningún tipo de responsabilidad. <b>ACCESO</b> podrá introducir las modificaciones que juzgue convenientes en cuanto a las condiciones y características de la presente Campaña, sin que ello genere reclamo alguno por parte de los Clientes, lo cual los Clientes declaran conocer y aceptar.
            </p>
          </li>
          <li>
            <div>POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS</div>
            <p style="text-align: justify;">
              <b>ACCESO</b> se preocupa por la protección y privacidad de los datos personales de sus Clientes y/o usuarios. Por ello, se ha comprometido a garantizar la absoluta confidencialidad de la información que recolecten o le sea proporcionada, en especial sobre datos personales; para lo cual, emplea altos estándares de seguridad, a fin de evitar su alteración, pérdida, tratamiento o uso no autorizado. Los Clientes y/o usuarios autorizan expresamente a <b>ACCESO</b> hacer uso y trato de los datos personales que brinde durante la presente Campaña, así como la información que se derive del mismo, de conformidad con sus Políticas de Privacidad contenidas en el siguiente link: https://acceso.com.pe/transparencia-acceso/politica-de-privacidad/ Los Clientes declaran haber leído y entendido el contenido de las mismas, en consecuencia, aceptas sus términos y condiciones y otorga su consentimiento libre, expreso, gratuito e indubitable para que <b>ACCESO</b> pueda dar tratamiento y hacer uso de sus datos personales de conformidad con sus Políticas de Privacidad. Asimismo, el Cliente en cualquier momento podrá revocar la autorización para el tratamiento de sus datos personales, de conformidad con lo previsto en la Ley 29733 y el Reglamento. Para ejercer este derecho, o cualquier otro previsto en dichas normas, deberás presentar tu solicitud entrando al link indicado en el párrafo precedente.
            </p>
          </li>
          <li>
            <div>USO DE IMAGEN</div>
            <p style="text-align: justify;">
              La participación en la presente Campaña importará la expresa autorización a <b>ACCESO</b> para la difusión pública, transmisión, retransmisión, reproducción o publicación de las filmaciones, fotografías, imágenes o grabaciones de las imágenes y voces de los Clientes, en todos los medios de comunicación (incluyendo, pero sin limitarse, a gráficos, visuales, audiovisuales, televisión por aire, antena, cable o satélite, radio e Internet) con fines publicitarios sin que el Cliente tenga derecho a reclamo de indemnización, contraprestación o retribución alguna. Los Clientes garantizan que no existen terceros que tengan derechos de exclusividad sobre la exhibición, publicación, difusión, reproducción o puesta en el comercio de su imagen, voz y datos personales. En caso contrario, se comprometen a mantener libres de toda responsabilidad a <b>ACCESO</b> respecto de cualquier reclamo que por este motivo pudieran formular terceros. Asimismo, prestan su conformidad para la publicación del material relacionado a su derecho de imagen respecto de las fotografías (u otras) que se puedan tomar como parte de la Campaña cediendo a <b>ACCESO</b> los derechos sobre los mismos. Esta cesión de derechos incluye los de reproducción, comunicación pública, distribución, puesta a disposición interactiva, edición por cualquier medio y formato, para todo el mundo y durante todo el tiempo de duración de los derechos de propiedad intelectual del material en el que se utilicen, sin que ello genere derechos a favor del Cliente de recibir contraprestación alguna. Los Clientes renuncian a cualquier reclamo que pudieran efectuar por la disminución de sus ingresos o cualquier otro daño o perjuicio que se les pudiera derivar de su participación en la Campaña o por la cesión de sus derechos de imagen objeto de estos Términos y Condiciones.
            </p>
          </li>
          <li>
            <div>RESPONSABILIDAD</div>
            <p style="text-align: justify;">
              <b>ACCESO</b> no se responsabilizará por cualquier daño o perjuicio que afecte a los ganadores del Sorteo detallado en el numeral 2. por caso fortuito o fuerza mayor, siendo de responsabilidad de los Ganadores cualquier responsabilidad al respecto luego de recibido el Premio. Asimismo, los Clientes y/o usuarios, Ganadores se comprometen a mantener indemne a <b>ACCESO</b>, sus empresas vinculadas, empleados o representantes ante cualquier reclamo, indemnización por daños, obligación, pérdida, deuda, costo o gasto que pudieren surgir como consecuencia de: (i) el incumplimiento por parte del Cliente de los Términos y Condiciones; (ii) la violación por parte de los Clientes de derechos de terceros, incluidos, entre otros, los derechos de autor, de propiedad o de privacidad; (iii) cualquier reclamo administrativo, extrajudicial y/o judicial por daños y/o cualquier otro concepto, como consecuencia de la utilización del premio del Sorteo o la obtención de algún beneficio. La presente obligación de defensa e indemnidad subsistirá aún una vez extinguidos los Términos y Condiciones.
            </p>
          </li>
          <li>
            <div>NORMATIVA APLICABLE</div>
            <p style="text-align: justify;">
              Para cualquier controversia que pudiera derivarse de la realización de la Campaña, los Clientes y/o usuarios y <b>ACCESO</b> se someterán a la jurisdicción de los jueces y tribunales del distrito Judicial de Lima. Los Clientes declaran su sometimiento a dichos jueces y tribunales. En todo lo no contenido en los Términos y Condiciones, serán de aplicación las leyes vigentes peruanas. Los Clientes y/o usuarios al aceptar los términos y condiciones descritos en el presente documento, declara/n estar conforme con estos.
            </p>
          </li>
          <li>
            <div>POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES</div>
            <p style="text-align: justify;">
              <b>Autorización de Datos Personales</b>
              Quien/es suscribe/n el presente documento (en adelante <b>EL/LOS CLIENTE/S</b> ) autoriza/n a <b>EDPYME ACCESO</b> de forma libre, inequívoca y expresa para que pueda dar tratamiento y hacer uso de mis/nuestros datos personales, por tiempo indefinido, obtenidos a través de la información que le proporcione/mos a <b>EDPYME ACCESO</b> de manera libre y voluntaria, cuando acceda/mos a sus sitios webs o landings page, participe/mos en eventos y/o promociones, envíe/mos consultas o comunique/mos incidencias, en general a través de cualquiera de sus plataformas , sea interacciones web, telefónica, presencial, documentaria y además de la información que se derive del uso de los servicios contratos con EDPYME
              ACCESO
              De conformidad con la Ley N° 29733 - Ley de Protección de Datos Personales y su Reglamento, aprobado mediante Decreto Supremo N° 003-2013-JUS, y cualquier otra disposición aplicable o modificatorias, sustitutorias y revocatorias (en adelante “La Norma”), <b>EDPYME ACCESO</b>, garantiza la absoluta confidencialidad de la información que recolecte o le proporcione/n <b>EL/LOS CLIENTE/S</b> , en especial sobre sus datos personales, para lo cual emplea altos estándares de seguridad, tomando las medidas técnicas, organizativas y legales necesarias a fin de evitar su alteración, perdida, tratamiento o acceso no autorizado.
              Por su parte, <b>EL/LOS CLIENTE/S</b> garantiza/n a <b>EDPYME ACCESO</b>, la exactitud, veracidad y autenticidad de los datos personales proporcionados, comprometiéndose a mantenerlos en vigencia. <b>EL/LOS CLIENTE/S</b> declara/n conocer que la falsedad de los datos personales proporcionados, constituye una falta grave frente a <b>EDPYME ACCESO</b>.
              Asimismo, <b>EL/LOS CLIENTE/S</b> declara/n y autoriza/n a <b>EDPYME ACCESO</b>:
              A utilizar sus datos personales en la gestión administrativa, comercial, para los fines referidos en actividades relacionadas con el objeto social en materia financiera, procesamiento de datos, formalizaciones contractuales, cobro de deudas, gestión de operaciones financieras, evaluar su comportamiento en el sistema crediticio y capacidad de pago, remisión de correspondencia, entre otros, la misma que podrá ser realizada a través de terceros.
              De acuerdo a lo que señala el Decreto Legislativo N° 1930 que modificó la Ley N° 29571, Código de Protección y Defensa del Consumidor; Al remitirle información comercial y/o publicitaria de los servicios y productos que ofrece <b>EDPYME ACCESO</b> , directamente o por medio de terceros debidamente autorizados, a través del teléfono fijo o celular, dirección de correo electrónico y otros medios que <b>EDPYME ACCESO</b> tenga a su disposición. Por su parte, <b>EL/LOS CLIENTE/S</b> podrá manifestar su voluntad de rechazar o renunciar la recepción de información bastando para ello una comunicación a ACCESO a través de la siguiente dirección URL http://ftp.edpymeaccesocrediticio.com.pe:8080/emailPaginaWebArco/envioEmailPanel.do?%20tipo_proyecto=AR , y de esa manera revocar en cualquier momento y conforme a la normativa que rige la protección de datos personales.
              A usar, ceder, disponer, compartir o transferir bajo cualquier título, oneroso o gratuito, sus datos personales con las empresas vinculadas a EDPYME ACCESO o lo conformen en el futuro, así como con sus socios comerciales o cualquier otra empresa, organización o persona natural, tanto dentro como fuera del país, nacionales o extranjeros, públicos o privados, para que estos le den el tratamiento legal que consideren oportuno para sus propios fines de conformidad con La Norma.
              A ofrecerle productos o servicios financieros o relacionados, desarrollar acciones comerciales, realizar estudios de
              mercado, elaborar perfiles de compra, enviar o remitir publicidad, obsequios, ofertas e información en general (personalizada o general) por cualquier medio, lo que se podrá realizar a través de terceras personas.
              Actualizar los registros y programas de sistemas de <b>EDPYME ACCESO</b> o utilizarlos en los casos de fusión, escisión o adquisición de <b>EDPYME ACCESO</b>, o en el caso de cambio de razón o denominación social
              A el tratamiento de sus datos personales para fines de auditoría interna, externa o en cumplimiento a los requerimientos por parte de cualquier autoridad competente, sea policial, judicial o administrativa o para salvaguardar el interés público o, así como contribuir con la administración de justicia.
              De acuerdo a lo dispuesto en La Norma, <b>EL/LOS CLIENTE/S</b> declara/n conocer que le asisten los derechos de acceso, rectificación, oposición y cancelación de los datos personales, los cuales podrá ejercer mediante la opción de contacto con <b>EDPYME ACCESO</b> a través de la siguiente dirección URL http://ftp.edpymeaccesocrediticio.com.pe:8080/emailPaginaWebArco/envioEmailPanel.do?%20tipo_proyecto=AR es indispensable que la persona solicitante sea el Titular de los Datos, o, su representante legal, por lo que en ambos casos deberá ser acreditada documentalmente con la que se ostente.
              <b>EL/LOS CLIENTE/S</b> ratifica/n su expreso consentimiento para que <b>EDPYME ACCESO</b> utilice la información de sus datos personales, de acuerdo a lo detallado en el presente documento. Por su parte, <b>EDPYME ACCESO</b>, garantiza el derecho fundamental a la protección de los datos personales de <b>EL/LOS CLIENTE/S</b> a través de su tratamiento adecuado; en un marco de respeto de los demás derechos fundamentales que en ella se reconocen.
            </p>
          </li>
        </ol>`,
    }
  },
  computed: {
    ...mapState('default', ['terms']),
    ...mapState('users', ['promotor']),
    ...mapState('express', ['datos', 'openDialog']),
    placa: {
      get() {
        return this.datos.placa ? this.datos.placa : null
      },
      set(v) {
        if (v.length > 3) {
          this.$store.commit('express/UPDATE_DATOS', {
            placa: v.toUpperCase().replace('-', ''),
          })
        }
      },
    },
    kilometros() {
      return selectKilometraje
    },
    documento() {
      return this.datos.documento
    },
    telefono() {
      return this.datos.telefono
    },
    codigoReferidos() {
      return this.datos.codigoReferidos
    },
    formatFechaNacimiento() {
      if (this.datos.fechaNacimiento) {
        return format(parseISO(this.datos.fechaNacimiento), 'dd/MM/yyyy')
      }
      return null
    },
    showfecha() {
      if (this.datos.tipoDocumento == 1) {
        return false
      } else {
        return true
      }
    },
    docLen() {
      switch (this.datos.tipoDocumento) {
        case 1:
          return 8
          break
        case 2:
          return 9
          break
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
    this.$store.dispatch('express/resetStates')
    await this.isNewCreated()
    this.$store.commit('express/UPDATE_DATOS', {
      recorridoxDia: 3,
    })
    this.$store.commit('express/UPDATE_DATOS', {
      tipoDocumento: 1,
    })
  },
  mounted() {
    this.$ga.event('Credinstante', 'home')
    this.isCreated = true
  },
  methods: {
    async sendRabbit() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.$ga.event('Credinstante', 'Boton-solicitar')
          this.$fb.track('Lead')
          this.loading = true
          /* if (!this.promotor.state) {
            console.log('user')
            const token = await this.$recaptcha.execute('form')
            const isRealPerson = await this.validateCaptcha(token)
            console.log(isRealPerson)
            if (isRealPerson) {
              await this.$store.dispatch('express/preEvaluate')
              this.loading = false
            } else {
              // bot detected
              this.loading = false
              this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'error',
                tituloModal: '¡OH!',
                msgModal:
                  'Hemos detectado una actividad sospechosa...!<br> intentalo en unos minutos',
                maxWidth: 350,
                estadoModal: true,
                isReset: false,
              })
            }
          } else {
            console.log('promotor')
            await this.$store.dispatch('express/preEvaluate')
            this.loading = false
          } */
          await this.$store.dispatch('express/preEvaluate')
          this.loading = false
        }
      })
    },
    openTerms() {
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
    },
  },
}
</script>
<style scoped>
.text-info__telef {
  font-size: 12px;
}

.tyc-credinstante {
  font-size: 15px;
}
.crLayoutForm {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.mainForm {
  border-radius: 12px;
  border: 3px solid white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 500px;
  height: auto;
}
.headerLayout {
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 72px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.cr-column-right {
  border-radius: 0 0 8px 8px;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column;
  padding: 16px !important;
  width: 100% !important;
  min-height: 500px !important;
  height: 100%;
  background-color: #dcdcdc;
}

@media (max-width: 768px) {
  .crLayoutForm {
    padding: 16px !important;
    min-height: calc(100vh - 48px) !important;
  }
  .cr-column-right {
    padding: 16px;
    top: 24px !important;
    min-height: 500px !important;
    height: 100% !important;
  }
}
</style>
