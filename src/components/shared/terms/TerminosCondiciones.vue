<template>
  <v-card>
    <v-col cols="12" text-right pa-2 @click="closeTerms">
      <v-btn icon class="primary" dark>
        <v-icon>clear</v-icon>
      </v-btn>
    </v-col>
    <div>
      <v-card-title
        v-html="tituloCabecera"
        class="headline text-center"
      ></v-card-title>
      <v-card-text v-html="contenido" style="color: #666666"></v-card-text>
    </div>
    <v-card-title v-if="!isNoTratamientoDatos" class="headline text-center"
      >POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES</v-card-title
    >
    <v-card-text v-if="!isNoTratamientoDatos">
      <p align="justify">
        <b align="justify">Autorización de Datos Personales</b>
      </p>
      <p align="justify">
        Quien/es suscribe/n el presente documento (en adelante
        <strong>EL/LOS CLIENTE/S</strong>
        ) autoriza/n a
        <strong>EDPYME ACCESO</strong>
        de forma libre, inequívoca y expresa para que pueda dar tratamiento y
        hacer uso de mis/nuestros datos personales, por tiempo indefinido,
        obtenidos a través de la información que le proporcione/mos a
        <strong>EDPYME ACCESO</strong>
        de manera libre y voluntaria, cuando acceda/mos a sus sitios webs o
        landings page, participe/mos en eventos y/o promociones, envíe/mos
        consultas o comunique/mos incidencias, en general a través de cualquiera
        de sus plataformas
        <strong>,</strong>
        sea interacciones web, telefónica, presencial, documentaria y además de
        la información que se derive del uso de los servicios contratos con
        <strong>EDPYME</strong>
      </p>
      <p align="justify">
        <b align="justify">ACCESO</b>
      </p>
      <p align="justify">
        De conformidad con la Ley N° 29733 - Ley de Protección de Datos
        Personales y su Reglamento, aprobado mediante Decreto Supremo N°
        003-2013-JUS, y cualquier otra disposición aplicable o modificatorias,
        sustitutorias y revocatorias (en adelante “La Norma”),
        <strong>EDPYME ACCESO,</strong>
        garantiza la absoluta confidencialidad de la información que recolecte o
        le proporcione/n
        <strong>EL/LOS CLIENTE/S</strong>
        , en especial sobre sus datos personales, para lo cual emplea altos
        estándares de seguridad, tomando
        <u>
          las medidas técnicas, organizativas y legales necesarias a fin de
          evitar su alteración, perdida, tratamiento o acceso no autorizado.
        </u>
      </p>
      <p align="justify">
        Por su parte
        <strong>, EL/LOS CLIENTE/S</strong>
        garantiza/n a
        <strong>EDPYME ACCESO</strong>
        , la exactitud, veracidad y autenticidad de los datos personales
        proporcionados, comprometiéndose a mantenerlos en vigencia.
        <strong>EL/LOS CLIENTE/S</strong>
        declara/n conocer que la falsedad de los datos personales
        proporcionados, constituye una falta grave frente a
        <strong>EDPYME ACCESO</strong>
        .
      </p>
      <p align="justify">
        Asimismo
        <strong>, EL/LOS CLIENTE/S</strong>
        declara/n y autoriza/n a
        <strong>EDPYME ACCESO</strong>
        :
      </p>
      <p align="justify">
        A utilizar sus datos personales en la gestión administrativa, comercial,
        para los fines referidos en actividades relacionadas con el objeto
        social en materia financiera, procesamiento de datos, formalizaciones
        contractuales, cobro de deudas, gestión de operaciones financieras,
        evaluar su comportamiento en el sistema crediticio y capacidad de pago,
        remisión de correspondencia, entre otros, la misma que podrá ser
        realizada a través de terceros.
      </p>
      <p align="justify">
        <strong>
          De acuerdo a lo que señala el Decreto Legislativo N° 1930 que modificó
          la Ley N° 29571, Código de Protección y Defensa del Consumidor;
        </strong>
        Al remitirle información comercial y/o publicitaria de los servicios y
        productos que ofrece
        <strong>EDPYME ACCESO</strong>
        , directamente o por medio de terceros debidamente autorizados, a través
        del teléfono fijo o celular, dirección de correo electrónico y otros
        medios que
        <strong>EDPYME ACCESO</strong>
        tenga a su disposición. Por su parte,
        <strong>EL/LOS CLIENTE/S</strong>
        podrá manifestar su voluntad de rechazar o renunciar la recepción de
        información bastando para ello una comunicación a
        <strong>ACCESO</strong>
        a través de la siguiente dirección URL
        <u>
          <a
            target="_blank"
            href="http://ftp.edpymeaccesocrediticio.com.pe:8080/emailPaginaWebArco/envioEmailPanel.do?%20tipo_proyecto=AR"
            >http://ftp.edpymeaccesocrediticio.com.pe:8080/emailPaginaWebArco/envioEmailPanel.do?%20tipo_proyecto=AR</a
          >
        </u>
        , y de esa manera revocar en cualquier momento y conforme a la normativa
        que rige la protección de datos personales.
      </p>
      <p align="justify">
        A usar, ceder, disponer, compartir o transferir bajo cualquier título,
        oneroso o gratuito, sus datos personales con las empresas vinculadas a
        <strong>EDPYME</strong>
        <strong>ACCESO</strong>
        o lo conformen en el futuro, así como con sus socios comerciales o
        cualquier otra empresa, organización o persona natural, tanto dentro
        como fuera del país, nacionales o extranjeros, públicos o privados, para
        que estos le den el tratamiento legal que consideren oportuno para sus
        propios fines de conformidad con La Norma.
      </p>
      <p align="justify">
        A ofrecerle productos o servicios financieros o relacionados,
        desarrollar acciones comerciales, realizar estudios de
      </p>
      <p align="justify">
        mercado, elaborar perfiles de compra, enviar o remitir publicidad,
        obsequios, ofertas e información en general (personalizada o general)
        por cualquier medio, lo que se podrá realizar a través de terceras
        personas.
      </p>
      <p align="justify">
        Actualizar los registros y programas de sistemas de
        <strong>EDPYME ACCESO</strong>
        o utilizarlos en los casos de fusión, escisión o adquisición de
        <strong>EDPYME ACCESO</strong>
        , o en el caso de cambio de razón o denominación social
      </p>
      <p align="justify">
        A el tratamiento de sus datos personales para fines de auditoría
        interna, externa o en cumplimiento a los requerimientos por parte de
        cualquier autoridad competente, sea policial, judicial o administrativa
        o para salvaguardar el interés público o, así como contribuir con la
        administración de justicia.
      </p>
      <p align="justify">
        De acuerdo a lo dispuesto en La Norma,
        <strong>EL/LOS CLIENTE/S</strong>
        declara/n conocer que le asisten los derechos de acceso, rectificación,
        oposición y cancelación de los datos personales, los cuales podrá
        ejercer mediante la opción de contacto con
        <strong>EDPYME ACCESO</strong>
        a través de la siguiente dirección URL
        <a
          target="_blank"
          href="http://ftp.edpymeaccesocrediticio.com.pe:8080/emailPaginaWebArco/envioEmailPanel.do?%20tipo_proyecto=AR"
          >http://ftp.edpymeaccesocrediticio.com.pe:8080/emailPaginaWebArco/envioEmailPanel.do?%20tipo_proyecto=AR</a
        >
        es indispensable que la persona solicitante sea el Titular de los Datos,
        o, su representante legal, por lo que en ambos casos deberá ser
        acreditada documentalmente con la que se ostente.
      </p>
      <p align="justify">
        <strong>EL/LOS CLIENTE/S</strong>
        ratifica/n su expreso consentimiento para que
        <strong>EDPYME ACCESO</strong>
        utilice la información de sus datos personales, de acuerdo a lo
        detallado en el presente documento. Por su parte,
        <strong>EDPYME ACCESO,</strong>
        garantiza el derecho fundamental a la protección de los datos personales
        de
        <strong>EL/LOS CLIENTE/S</strong>
        a través de su tratamiento adecuado; en un marco de respeto de los demás
        derechos fundamentales que en ella se reconocen.
      </p>
    </v-card-text>
    <v-card-title v-if="isPoliticaPrivacidad" class="headline text-center"
      >POLÍTICA DE PRIVACIDAD</v-card-title
    >
    <v-card-text v-if="isPoliticaPrivacidad">
      <p align="justify">
        EDPYME ACCESO CREDITICIO S.A. con RUC Nº 20438563084, domiciliado en Av.
        Canaval y Moreyra N°452, piso 11, distrito de San Isidro, provincia y
        departamento de Lima (en adelante “ACCESO”) se preocupa por la
        protección y privacidad de los datos personales de sus clientes y
        público en general. Por ello, se ha comprometido a garantizar la
        absoluta confidencialidad de la información que recolecten o les
        proporciones, en especial sobre tus datos personales; para lo cual,
        emplean altos estándares de seguridad, a fin de evitar su alteración,
        pérdida, tratamiento o acceso no autorizado, conforme a lo establecido
        en la Ley de Protección de Datos Personales – Ley Nº 29733, su
        Reglamento aprobado por el Decreto Supremo N° 003-2013-JUS y cualquier
        otra disposición aplicable o modificatorias, sustitutorias y
        revocatorias (en adelante “las normas”).
      </p>
      <p align="justify">
        ACCESO quiere estar cerca de ti, por ello, al aceptar está Política de
        Privacidad, estás aceptando haber leído el contenido de la misma y, en
        consecuencia, otorgas tu consentimiento libre, informado, expreso,
        gratuito e indubitable para que ACCESO pueda dar tratamiento y hacer uso
        de tus datos personales, siendo el Titular del Banco de Datos
        Personales. De acuerdo a ello, en este documento te detallamos cuál es
        nuestra finalidad a fin de que estés correctamente informado y tomes
        conocimiento del uso de tus datos personales.
      </p>
      <p align="justify">
        Asimismo, es importante mencionar que la suscripción de la presente
        autorización es de carácter libre y voluntaria y que, por tanto, no
        condiciona la adquisición u otorgamiento de ninguno de los productos o
        servicios financieros ofrecidos por ACCESO o por sus aliados.
      </p>
      <ol align="justify">
        <li>
          <p><b>¿Qué información califica como “Datos Personales”?</b></p>
          <p>
            De acuerdo a lo establecido en las normas, se entiende por “datos
            personales” a toda información, numérica, alfabética, gráfica,
            fotográfica, acústica, sobre hábitos personales, o de cualquier otro
            tipo concerniente a una personal natural que la identifica o la hace
            identificable, a través de medios que puede ser razonablemente
            utilizados. Por ejemplo la información que lo identifica se refiere
            a nombres, apellidos, nacionalidad, estado civil, documento de
            identidad, ocupación, estudios, domicilio, correo electrónico,
            teléfono, estado de salud, actividad que realiza, ingresos
            económicos, patrimonio, gastos, entre otros. Mientras que la
            información que lo hace identificable son los referidos a rasgos
            físicos y/o de conducta, voz, huella dactilar, imagen, etc.
          </p>
        </li>
        <li>
          <p><b>¿Qué información será recolectada?</b></p>
          <ol type="i">
            <li>
              Los datos personales que brindes de manera libre, inequívoca y
              voluntaria al momento de efectuar un pedido, realices consultas de
              cotizaciones, envíes solicitudes, contratación de productos o
              servicios financieros de ACCESO a través de cualquiera de sus
              plataformas o cuando accedas a sus sitios web o landings page,
              participes en eventos y/o promociones, organizadas por ACCESO o
              envíes consultas o comuniques incidencias, y en general cualquier
              interacción web, telefónica, presencial, documentaria y además de
              la información que se derive del uso de servicios que pudieras
              tener contratados con ACCESO.
            </li>
            <li>
              Los datos personales que proporciones a ACCESO o que éste los haya
              obtenido válidamente por terceros, sobre sus aspectos laborales,
              académicos, patrimoniales, migratorios, biométricos, incluyendo
              los datos sensibles relativos a sus ingresos económicos y
              financieros o cualquier otro.
            </li>
            <li>
              Información que se acumula de manera pasiva como consecuencia de
              la utilización de los productos y/o servicios de ACCESO. Esta
              información se refiere, de manera enunciativa más no limitativa, a
              información detallada sobre el uso de los servicios que ofrece
              ACCESO, mientras navegas en sus plataformas webs, sus datos de
              ubicación, dirección IP e información sobre el dispositivo
              utilizado, modelo de hardware, versión de sistema operativo,
              información sobre software, entre otros.
            </li>
            <li>
              Datos personales que se encuentren disponibles en fuentes
              accesibles al público. Esta información se refiere a aquella
              contenida en medios de comunicación electrónica, óptica y de otra
              tecnología concebida para facilitar información al público y que
              esté abierto a la consulta general, guías telefónicas, diarios y
              revistas, medios de comunicación social, listas profesionales,
              repertorios de jurisprudencia anonimizados, registros públicos
              administrados por la Superintendencia Nacional de Registros
              Públicos (SUNARP), así como todo registro o banco de datos
              calificado como público conforme a ley y la información que se
              encuentre en las entidades de la Administración Pública y que deba
              ser entregada conforme a la normativa vigente en materia de
              transparencia y acceso a la información pública.
            </li>
            <li>
              Datos obtenidos a través de centrales de información crediticia,
              la cual resulta ser necesaria para elaborar el perfil del usuario
              solicitante (se recopila información sobre antecedentes
              financieros, comerciales, tributarios, laborales, entre otros).
            </li>
            <li>
              Información obtenida a través de redes sociales, redes
              profesionales y/o proveedores de servicios de correo electrónico
              (se utiliza para recopilar información sobre el perfil del usuario
              solicitante, a través de permisos sólo de lectura).
            </li>
          </ol>
        </li>
        <li>
          <p><b>¿Para qué serán utilizados tus datos personales?</b></p>
          <p>
            Si brindas tu autorización, tus datos serán tratados de acuerdo a
            las normas señaladas en la introducción, por ACCESO y/o sus empresas
            vinculadas, de manera directa o a través de proveedores, ya sea en
            el país o el extranjero, el cual tendrá las siguientes finalidades:
          </p>
          <ol type="i">
            <li>
              Verificar y validar la identidad del cliente y del potencial
              cliente
            </li>
            <li>
              Evaluar el otorgamiento del(los) productos(s) y/o servicio(s)
              financieros que solicites o dar cumplimiento de los servicios y/o
              productos ofrecidos por sus aliados.
            </li>
            <li>
              Realizar evaluaciones financieras, procesamiento de datos,
              formalizaciones contractuales, cobro de deudas, gestión de
              operaciones financieras, evaluar su comportamiento en el sistema
              crediticio y capacidad de pago, remisión de correspondencia, entre
              otros, la misma que podrá ser realizada a través de tercero.
            </li>
            <li>
              Ofrecerle productos o servicios financieros o relacionados,
              desarrollar acciones comerciales, realizar estudios de mercado,
              elaborar perfiles de compra, enviar o remitir publicidad,
              obsequios, ofertas e información en general (personalizada o
              general) por cualquier medio, lo que se podrá realizar a través de
              terceras personas.
            </li>
            <li>
              Usar, compartir o transferir bajo cualquier título, sus datos
              personales con las empresas vinculadas a ACCESO o lo conformen en
              el futuro, así como con sus socios comerciales o cualquier otra
              empresa, organización o persona natural, tanto dentro como fuera
              del país, nacionales o extranjeros, públicos o privados, para que
              estos le den el tratamiento legal que consideren oportuno para sus
              propios fines.
            </li>
            <li>
              Actualizar los registros y programas de sistemas o utilizarlos en
              los casos de fusión, escisión o adquisición de ACCESO.
            </li>
            <li>
              Para fines de auditoría interna, externa o en cumplimiento a los
              requerimientos por parte de cualquier autoridad competente, sea
              policial, judicial o administrativa o para salvaguardar el interés
              público o, así como contribuir con la administración de justicia.
            </li>
          </ol>
        </li>
        <li>
          <p><b>¿Por cuánto tiempo serán tratados tus datos?</b></p>
          <p>
            Tus datos personales se almacenarán mientras su tratamiento sea
            necesario para cumplir con las finalidades descritas; sin exceder el
            plazo de 10 años de acuerdo a lo dispuesto por la Ley General del
            Sistema Financiero. Por otro lado, recuerda que puedes, en cualquier
            momento, revocar, rectificar o cancelar el consentimiento que nos
            otorgues, acercándote a nuestra oficina de ACCESO indicada
            inicialmente.
          </p>
        </li>
        <li>
          <p><b>COOKIES Y TECNOLOGÍAS SIMILARES</b></p>
          <p>
            Para brindar un mejor servicio, ACCESO utiliza Cookies o tecnologías
            similares los cuales son pequeños archivos que se almacenan en las
            computadoras y que permiten recordar características o preferencias
            de la navegación de los usuarios de ACCESO en su página web.
            Asimismo, los Cookies se utilizan para analizar la experiencia de
            los usuarios de Internet y de esa forma brindarles mejores servicios
            y mostrar contenido personalizado. De cualquier modo, tú puedes
            configurar tu navegador para aceptar o rechazar la instalación de
            los Cookies o tecnología similar o suprimirlos una vez que hayan
            finalizado su navegación en nuestros sitios webs. Mediante la
            aceptación de la presente Política de Privacidad, consientes al uso
            de Cookies y tecnologías similares.
          </p>
        </li>
        <li>
          <p><b>CONSENTIMIENTO</b></p>
          <p>
            Al aceptar esta Política de Privacidad, estas otorgando tu
            consentimiento previo, libre, expreso, inequívoco y gratuito, para
            el tratamiento de tus datos personales para las finalidades
            expuestas anteriormente. Para el caso de información que califique
            como sensible, reconoces que tu voluntad inequívoca queda demostrada
            por los siguientes actos: (a) El otorgamiento o llenado de tu
            información personal para acceder a cualquier de los servicios de
            ACCESO, más aún cuando, de ser el caso, proporciones tu foto y copia
            de tus documentos para verificar tu identidad; y, (b) haber
            expresado tu aceptación a la presente Política de Privacidad.
            Tomando ello en consideración, tu conducta evidencia que has
            consentido inequívocamente, no admitiéndose dudas al respecto.
          </p>
        </li>
        <li>
          <p><b>BANCO DE DATOS</b></p>
          <p>
            Los datos personales registrados serán almacenados por ACCESO en el
            banco de datos personales inscrito en el Registro Nacional de
            Protección de Datos Personales, conforme lo establece las normas
            mencionadas en la introducción del presente documento.
          </p>
        </li>
        <li>
          <p><b>DERECHOS ARCO</b></p>
          <p>
            De acuerdo a lo indicado en el numeral 4, los titulares de datos
            personales o sus representantes legales podrán ejercer los derechos
            que las normas de Protección de Datos Personales les otorga para
            solicitar en cualquier momento el acceso, rectificación, cancelación
            u oposición sobre el uso de sus datos personales. Para ello, deberá
            presentar una solicitud escrita en la oficina de ACCESO, descrita en
            la introducción del presente documento, y deberá acompañar la
            solicitud con una copia del documento de identidad del solicitante o
            documento equivalente, en caso de representantes legales,
            adicionalmente se deberá presentar el título que acredite dicha
            representación, o también podrá ingresar al siguiente link:
            <a
              href="https://datos.acceso.com.pe/"
              target="_blank"
              >https://datos.acceso.com.pe/</a
            >
            para hacer efectivo su solicitud. La presente Política de Privacidad
            podrá ser modificada por ACCESO. De producirse cualquier cambio o
            modificación de la presente Política, el texto vigente de la misma
            será publicado en nuestro portal web.
          </p>
        </li>
        <li>
          <p><b>EMPRESAS VINCULADAS A ACCESO </b></p>
          <ol type="i">
            <li>ACCESOCAR S.A.C.</li>
            <li>AUTOCLASS RETAIL S.A.C.</li>
            <li>PIDE1TAXI S.A.C.</li>
            <li>TKOBRO S.A.C</li>
            <li>ACCESO CORP S.A.</li>
          </ol>
        </li>
      </ol>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: [
    'color',
    'tituloCabecera',
    'contenido',
    'isNoTratamientoDatos',
    'isPoliticaPrivacidad',
  ],
  computed: {
    ...mapState('default', ['terms']),
  },
  methods: {
    closeTerms() {
      this.$store.commit('default/UPDATE_MODAL_TERMS', false)
      this.$emit('close', 'close')
    },
  },
}
</script>
