<template>
  <div class="d-flex flex-column secondary--text">
    <v-row class="text-center pa-3 justify-center">
      <h1>{{ tituloAprobracion }}</h1>
    </v-row>
    <v-row cols="6" sm="4" class="text-center pa-3 justify-center">
      <h2 class="font-weight-black">{{ subTituloAprobacion }}</h2>
    </v-row>
    <v-row class="text-center pa-3 justify-center">
      <h3>{{ subTituloRecojo }}</h3>
    </v-row>
    <v-row justify="center">
      <v-col cols="10" sm="4" md="6">
        <v-row class="border-acceso d-flex flex-column">
          <v-row justify="center" class="secondary--text">
            <v-col cols="12">
              <span class="font-weight-black">Dirección</span>
            </v-col>
            <v-col cols="12">
              <span>{{ direccion }}</span>
            </v-col>
          </v-row>
          <v-row justify="center" class="secondary--text">
            <v-col cols="12">
              <span class="font-weight-black">Referencia:</span>
            </v-col>
            <v-col cols="12">
              <span>{{ referencia }}</span>
            </v-col>
          </v-row>
          <v-row justify="center" class="secondary--text">
            <v-col cols="12">
              <span class="font-weight-black">Horario:</span>
            </v-col>
            <v-col cols="12">
              <span>{{ horario }}</span>
            </v-col>
          </v-row>
        </v-row>
      </v-col>
      <v-col md="0" cols="12"></v-col>
    </v-row>
    <v-row justify="center">
      <img src="@/assets/asesor.png" />
      <span
        class="d-flex flex-column justify-center subtitle-2 font-weight-black"
        >En breve un asesor se pondrá en contacto contigo</span
      >
    </v-row>
    <v-row justify="center">
      <v-btn to="/">IR A MENU PRINCIPAL</v-btn>
    </v-row>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import { selectSede } from '@/utils/catalogo'
/* const socket =  {
  transports: ['websocket']
}) */
export default {
  props: {
    color: String,
    tituloAprobracion: {
      type: String,
      default: '¡Gracias!'
    },
    subTituloAprobacion: {
      type: String,
      default: 'No olvides recoger tu efectivo presentando tu DNI'
    },
    subTituloRecojo: {
      type: String,
      default: 'Recoge aquí tu dinero en efectivo'
    }
  },
  computed: {
    ...mapState('express', ['datos']),
    direccion() {
      const direccion = null
      const abc = selectSede.filter((e) => e.id === this.datos.sede)
      return abc[0].direccion
    },
    referencia() {
      const direccion = null
      const abc = selectSede.filter((e) => e.id === this.datos.sede)
      return abc[0].Referencia
    },
    horario() {
      const direccion = null
      const abc = selectSede.filter((e) => e.id === this.datos.sede)
      return abc[0].Horario
    }
  },
  data() {
    return {
      openDialog: true,
      procesos: [
        {
          logo: require('@/assets/revision_Export.png'),
          title: 'Obteniendo información',
          subtitle: '',
          estado: 0
        },
        {
          logo: require('@/assets/revision_Export.png'),
          title: 'Verificando información',
          subtitle: '',
          estado: 0
        },
        {
          logo: require('@/assets/revision_Export.png'),
          title: 'Validando información',
          subtitle: '',
          estado: 0
        },
        {
          logo: require('@/assets/revision_Export.png'),
          title: 'Corriendo políticas',
          subtitle: '',
          estado: 0
        }
      ]
    }
  },
  mounted() {
    this.$ga.event('Prospecciones', 'FelicitacionPage')
  },
  methods: {
    goHome() {
      this.$store.dispatch('express/resetStates')
    }
  }
}
</script>

<style>
.style-titulo {
  font-size: 1.3rem;
}
</style>
