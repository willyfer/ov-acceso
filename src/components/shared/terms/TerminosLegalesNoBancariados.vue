<template>
  <v-card>
    <v-col cols="12" text-right pa-2 @click="closeTerms">
      <v-btn icon class="primary" dark>
        <v-icon>clear</v-icon>
      </v-btn>
    </v-col>
    <v-card-title class="headline text-center"
      >TÉRMINOS Y CONDICIONES GENERALES</v-card-title
    >
    <v-card-text>
      <p align="justify">
        Edpyme Acceso Crediticio S.A. (en adelante “ACCESO”), otorga créditos a
        los Usuarios no bancarizados, por el monto de S/300.00. El desembolso
        del crédito está sujeto a aprobación por parte de ACCESO de acuerdo a
        sus políticas internas. El plazo para cancelar el crédito es de 6 meses,
        cuyo monto aproximado de la cuota es de S/59.69. La Tasa efectiva anual
        (TEA) en base a 360 días será de 83%. La Tasa de interés moratoria
        efectiva anual calculada en base a 360 días: 120% aplicable sobre el
        importe de la cuota vencida desde el primer día de atraso. Tipo de
        cambio referencial S/ 3.72. Dicha información se proporciona con arreglo
        de la Ley N° 28587, “Ley Complementaria a la ley de Protección al
        Consumidor en Materia de Servicios Financieros” y a la Resolución SBS N°
        3274-2017, “Reglamento de Gestión de Conducta de Mercado”. Para mayor
        información sobre tasa de interés, comisiones y gastos, consulta el
        tarifario en:
        <a href="https://acceso.com.pe/" target="_blank"
          >https://acceso.com.pe/</a
        >
      </p>
      <p align="justify">
        Cabe señalar que, los Usuarios no bancarizados son aquellos clientes que
        no tienen registro en el RCC (Sistema financiero regulado) en los
        últimos 24 meses y que no tengan deudas en mora > a S/. 1,000.00 en
        cooperativas.
      </p>
      <p align="justify">
        Por otro lado, ante la activación del crédito “Bancarizador” de S/300.00
        y pago puntual de sus cuotas por parte del Usuario, ACCESO le ofrecerá
        créditos adicionales, conforme a lo siguiente:
      </p>
      <div class="term-table mb-2">
        <table class="mb-1">
          <tr>
            <th>Monto del crédito</th>
            <th>Tasa efectiva anual (TEA)*</th>
            <th>Tasa de interés moratoria efectiva anual</th>
            <th>Monto aproximado de la cuota</th>
            <th>Condición</th>
          </tr>
          <tr>
            <td>S/600.00</td>
            <td>75%</td>
            <td>120%</td>
            <td>S/117.86</td>
            <td>
              Efectuar el pago puntual de todas las cuotas del crédito de
              S/300.00
            </td>
          </tr>
          <tr>
            <td>S/900.00</td>
            <td>70%</td>
            <td>120%</td>
            <td>S/175.32</td>
            <td>
              Efectuar el pago puntual de todas las cuotas del crédito de
              S/600.00
            </td>
          </tr>
        </table>
        <span
          >*La TEA y la Tasa de interés moratoria efectiva anual es calculada en
          base a 360 días.</span
        >
      </div>
      <p align="justify">
        ACCESO ofrecerá los créditos adicionales a los Usuarios que efectúen sus
        pagos de manera puntual, así como a quienes se les haya otorgado
        previamente el crédito de S/300 y S/600, respectivamente. El plazo para
        cancelar las cuotas de cada crédito, según corresponda, es de 6 meses,
        desde su activación.
      </p>
      <p align="justify">
        vUna vez firmado los documentos contractuales, ACCESO remitirá al
        Usuario el Contrato, la Hoja Resumen y demás documentos correspondiente
        al crédito solicitado, al correo electrónico o vía sms al número de
        teléfono registrado por el Usuario Solicitante en el “Portal Web” de
        ACCESO.
      </p>
      <p align="justify">
        Asimismo, a fin de efectuar el desembolso, el Usuario proporciona a
        ACCESO de forma libre y voluntaria su número de cuenta de ahorros o una
        cuenta corriente en cualquiera de las siguientes entidades financieras:
        BCP, Scotiabank, Interbank y BBVA, donde se destinará el desembolso del
        crédito solicitado u ofrecido por ACCESO, el cual es de su titularidad.
        En caso ACCESO verifique que la cuenta designada por éste es errónea, le
        solicitará de forma facultativa y por única vez, que realice la
        corrección del número de cuenta al teléfono consignado en la solicitud
        de crédito en un plazo máximo de 3 días calendarios de comunicado a fin
        de proceder con la culminación del proceso de desembolso, en caso el
        Usuario no cumpla con la corrección en el plazo señalado o ingrese una
        cuenta errónea por segunda vez se dejará sin efecto los documentos de
        crédito suscrito digitalmente por el Usuario, y en consecuencia al no
        proceder con el desembolso se le comunicará la resolución del contrato
        al correo electrónico designado en la solicitud de crédito, sin
        penalización alguna en su contra, quedando eximida ACCESO de toda
        responsabilidad u obligación frente al Usuario.
      </p>
      <p align="justify">
        ACCESO efectuará el desembolso en las próximas 72 horas hábiles contados
        desde la firma de los documentos contractuales por parte del Usuario.
      </p>
      <p align="justify">
        En caso de existir alguna observación con la información brindada por el
        Usuario, ACCESO queda facultado, más no obligado, a comunicarle y
        solicitarle subsane las observaciones existentes para culminar con el
        proceso de aprobación del crédito; sin embargo, es responsabilidad del
        Usuario brindar información clara y veraz.
      </p>
      <p align="justify">
        El Usuario Solicitante al aceptar los términos y condiciones generales
        descritos en el presente documento, declara estar conforme con estos.
      </p>
      <p align="justify">
        Más información en <a href="https://acceso.com.pe/" target="_blank"
          >https://acceso.com.pe/</a
        >. Dirección: Av. 28 de Julio 334, Jesús María y/o Teléfono: (01) 605
        5555.
      </p>
      <p align="justify">
        El Usuario declara que los datos personales proporcionados al momento de
        la solicitud del crédito, son de su titularidad, por lo que cualquier
        comunicación respecto al crédito se realizará a cualquiera de ellos. De
        existir error u omisión en los datos consignados, ACCESO quedará
        liberado de cualquier responsabilidad.
      </p>
    </v-card-text>
    <v-card-title class="headline text-center"
      >POLÍTICA DE PRIVACIDAD – TRATAMIENTO DE DATOS PERSONALES</v-card-title
    >
    <v-card-text>
      <p align="justify">
        ACCESO se preocupa por la protección y privacidad de los datos
        personales de sus Clientes. Por ello, se ha comprometido a garantizar la
        absoluta confidencialidad de la información que recolecten o le sea
        proporcionada, en especial sobre datos personales; para lo cual, emplea
        altos estándares de seguridad, a fin de evitar su alteración, pérdida,
        tratamiento o uso no autorizado.
      </p>
      <p align="justify">
        Los Clientes autorizan expresamente a ACCESO hacer uso y trato de los
        datos personales que brinde durante la presente Campaña, así como la
        información que se derive del mismo, de conformidad con sus Políticas de
        Privacidad contenidas en el siguiente link: https://acceso.com.pe/
      </p>
      <p align="justify">
        Los Clientes declaran haber leído y entendido el contenido de las
        mismas, en consecuencia, aceptas sus términos y condiciones y otorga su
        consentimiento libre, expreso, gratuito e indubitable para que ACCESO
        pueda dar tratamiento y hacer uso de sus datos personales de conformidad
        con sus Políticas de Privacidad.
      </p>
      <p align="justify">
        Asimismo, en cualquier momento podrá revocar la autorización para el
        tratamiento de sus datos personales, de conformidad con lo previsto en
        la Ley 29733 y el Reglamento. Para ejercer este derecho, o cualquier
        otro previsto en dichas normas, deberás presentar tu solicitud entrando
        al link indicado en el párrafo precedente.
      </p>
      <p align="justify">
        Cabe señalar que, el Usuario Solicitante podrá efectuar la solicitud del
        crédito en la Oficina Virtual de ACCESO, por lo que, en señal de
        conformidad del mismo, deberá consignar su firma electrónica, el cual
        consiste en la remisión de una clave de cuatro dígitos a su número de
        teléfono consignado.
      </p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: ['color'],
  methods: {
    closeTerms() {
      this.$emit('close', 'close')
    },
  },
}
</script>
<style scoped>
.term-table {
  font-size: 12px;
  line-height: 1;
  overflow: scroll;
  overflow: auto;
  text-align: center;
}

table,
th,
td {
  border: 1px solid #5b5b5b;
  border-collapse: collapse;
}

th,
td {
  padding: 2px;
}
</style>
