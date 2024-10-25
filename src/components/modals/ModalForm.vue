<template>
  <div>
    <v-dialog v-model="estado.state" persistent max-width="450">
      <v-card class="ld-modal mx-auto">
        <v-card-title>
          <v-row dense>
            <v-col cols="12" class="text-center">
              <div
                class="ld-modal-title"
                :class="color + '--text'"
                v-html="title"
              />
              <img
                v-if="estado.imageURL && bussines.marcaDeLd === 2"
                :src="estado.imageURL"
                :width="40"
              />
            </v-col>
            <v-col cols="12" class="my-2 text-center">
              <v-btn class="ld-btn" :color="color" @click.native="cerrarModal">
                {{
                  estado.id === 11 ||
                  estado.id === 2 ||
                  estado.id === 20 ||
                  estado.id === 21
                    ? 'ok'
                    : 'Continuar'
                }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['color', 'imageURL'],
  computed: {
    ...mapState('default', ['bussines', 'datos']),

    ...mapState('ui', ['estado']),
    ...mapState('users', ['promotor']),
    title() {
      const pro = this.bussines.codigoProducto
      const sub = this.bussines.codigoSubProducto
      const marcaDeLdF = this.bussines.marcaDeLd
      let title = null

      switch (this.estado.id) {
        case 1:
          if (pro === 17 && (sub === 4 || sub === 6)) {
            title =
              '<h4>¡Felicitaciones!</h4><h4>Tienes una Conversión a GNV Pre-Aprobada.</h4>'
          } else if (pro === 33 && sub === 2) {
            title =
              '<h4>¡Felicitaciones!</h4><h4>Tienes un SOAT Plus Pre Aprobado.</h4>'
          } else {
            title =
              '<h4>¡Felicitaciones!</h4><h4>Tenemos un crédito para ti.</h4>'
          }
          break
        case 2:
          title = 'Disculpa, en este momento no tenemos una oferta para ti.'
          break
        case 3:
          if (pro === 34 && sub === 7 && marcaDeLdF === 2) {
            title = `¡Bienvenido de nuevo!<br>
             Estás a un paso de recibir tu préstamo de S/3500.`
          } else {
            title =
              '¡Bienvenido de nuevo!<br> Actualiza o agrega tu información'
          }
          break
        case 4:
          title =
            'Ya hemos analizado tu solicitud,<br/> no podemos ofrecerle el producto seleccionado.'
          break
        case 5:
          title =
            '<h4>¡Estamos procesando tu solicitud!</h4> Muy pronto nos pondremos en contacto.'
          break
        case 6:
          title = 'Usted ya cuenta con un crédito activo.'
          break
        case 7:
          title =
            'Ya tienes una solicitud registrada <br/> muy pronto nos pondremos en contacto.'
          break
        case 8:
          title =
            'En estos momentos no podemos atenderte, por favor inténtalo en unos minutos.'
          break
        case 10:
          title = 'No hemos encontrado una solicitud.'
          break
        case 11:
          title =
            '¡Fotos Guardadas! <br/> Regresa pronto y termina tu evaluación.'
          break
        case 12:
          title = 'Placa no aprueba para este producto'
          break
        case 13:
          title = 'Genial, continúa con la evaluación'
          break
        case 14:
          title = this.estado.text ? this.estado.text : 'Usuario no existe'
          break
        case 15:
          title =
            "Disculpa, no podemos ofrecerte este producto, pero te invitamos a  <br/> <a target='_blank' href='https://www.mitaxipropio.pe/'><b>www.mitaxipropio.pe</b></a>"
          break
        case 16:
          if (pro === 34 && (sub === 1 || sub === 2)) {
            title =
              "<h4>¡Felicitaciones!</h4> Tienes un crédito aprobado<br> <b><u><a target='_blank' href='/instruccion/ld'>Click aquí</a></u></b> para conocer los pasos a seguir"
          } else if (pro === 17 && (sub === 4 || sub === 6)) {
            title =
              '<h4>¡Felicitaciones!</h4>Tienes una Conversión a GNV Pre-Aprobada, muy pronto nos pondremos en contacto.'
          }
          break
        case 17:
          title =
            '<h4>¡OH!</h4> <br>Hemos detectado una actividad sospechosa...!<br> intentalo en unos minutos'
          break
        case 18:
          title = 'Verificar la Fecha o Modelo y vuelva a intentar.'
          break
        case 19:
          title = `Lo sentimos, este LINK ha caducado. Para continuar el procesa de firma y entrega de dinero acerquese a nuestras <a href='https://bit.ly/2YDyo6j'>oficinas</a>`
          break
        case 20:
          title = `Hola, ya tienes un solicitud generada`
          break
        case 21:
          title = `Hola, ya tienes un crédito desembolsado para esta placa.💰`
          break
      }
      return title
    }
  },
  methods: {
    cerrarModal() {
      const pro = this.bussines.codigoProducto
      const sub = this.bussines.codigoSubProducto
      const marcaDeLdF = this.bussines.marcaDeLd
      const id = this.estado.id

      if (id === 3 || id === 1 || id === 12) {
        this.$store.commit('ui/SET_MODAL', { id: null, state: false })
      } else if (id === 14) {
        this.$router.push('/promotor')

        this.$store.commit('ui/SET_MODAL', { id: null, state: false })
      } else if (id === 15) {
        this.$ga.event('Prospecto', 'Redireccion a Mitaxipropio.com')

        this.$store.commit('ui/SET_MODAL', { id: null, state: false })
        window.open('https://www.mitaxipropio.pe', '_blank')
      } else if (id === 19) {
        this.$router.push('/instruccion/ld')
      } else if (id === 20) {
        this.$store.commit('ui/SET_MODAL', { id: null, state: false })
        this.$router.push('/')
      } else if (id === 21) {
        this.$store.commit('ui/SET_MODAL', { id: null, state: false })
        this.$router.push('/')
      } else {
        this.$store.commit('ui/SET_MODAL', { id: null, state: false })
        this.$store.commit('default/RESET_STATES')
      }
    }
  }
}
</script>
