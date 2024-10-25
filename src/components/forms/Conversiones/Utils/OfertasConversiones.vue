<template>
  <div>
    <v-row class="d-block d-flex flex-row justify-center">
      <v-col md="12">
        <span
          class="pa-1 secondary--text d-flex flex-row justify-center"
          style="border-radius:7px; width:100%; color: white !important; background-color: #797979"
          >Condiciones del crédito {{ tipoCredito }}</span
        >
      </v-col>
    </v-row>
    <v-row class="d-flex flex-row justify-center" cols="12">
      <v-col cols="12" pa-4 sm="12" md="12">
        <v-row class="d-flex flex-column">
          <v-row>
            <v-row cols="12" class="d-flex flex-row justify-center">
              <span
                style="padding-left: 10px !important;"
                class="text-color--primary"
                >Préstamo</span
              >
            </v-row>
            <v-row
              cols="12"
              class="d-flex flex-row justify-center"
              style="padding-right: 8px !important;"
            >
              <span class="pl-6 text-color--primary"
                >S/.
                {{
                  datosOferta.importeFinanciar
                    ? datosOferta.importeFinanciar.toFixed(2)
                    : '00.00'
                }}</span
              >
            </v-row>
          </v-row>
          <v-divider color="#AAAAAA" class="ma-2"></v-divider>
          <v-row>
            <v-row cols="12" class="d-flex flex-row justify-center">
              <span class="pr-8 text-color--primary">Plazo</span>
            </v-row>
            <v-row cols="12" class="d-flex flex-row justify-center">
              <span class="pr-2 text-color--primary"
                >{{ datosOferta.cuotas }} meses</span
              >
            </v-row>
          </v-row>
          <v-divider color="#AAAAAA" class="ma-2"></v-divider>
          <v-row>
            <v-row cols="12" class="d-flex flex-row justify-center">
              <span class="pr-7 text-color--primary">Cuota</span>
            </v-row>
            <v-row cols="12" class="d-flex flex-row justify-center">
              <span class="pr-3 text-color--primary"
                >S/.
                {{
                  datosOferta.importeCuotas
                    ? datosOferta.importeCuotas.toFixed(2)
                    : '00.00'
                }}</span
              >
            </v-row>
          </v-row>
          <v-divider color="#AAAAAA" class="ma-2"></v-divider>
          <v-row>
            <v-row
              cols="12"
              class="d-flex flex-row justify-center"
              style="padding-right: 8px !important;"
            >
              <span class="pr-6 text-color--primary">TCEA</span>
            </v-row>
            <v-row
              cols="12"
              class="d-flex flex-row justify-center"
              style="padding-right: 12px !important;"
            >
              <span class="pr-2 text-color--primary"
                >{{
                  datosOferta.tasa
                    ? (datosOferta.tasa * 100).toFixed(2)
                    : '00.00'
                }}%</span
              >
            </v-row>
          </v-row>
          <v-divider color="#AAAAAA" class="ma-2"></v-divider>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'OfertasConversiones',
  props: ['datosOferta'],
  computed: {
    ...mapState('conversiones', ['datos']),
    tipoCredito() {
      if (this.datosOferta.codigoProducto === 24) {
        return 'LD'
      } else {
        return 'GNV'
      }
    }
  }
}
</script>

<style></style>
