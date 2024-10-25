<template>
  <v-container class="creditos__container d-flex flex-column">
    <v-col class="text-center">
      <template>
        <v-row class="d-flex flex-row mt-2 justify-center">
          <span class="secondary--text class-title">{{
            tituloAprobracion
          }}</span>
        </v-row>
        <v-row class="d-flex flex-row justify-center" cols="12">
          <span class="secondary--text class-title">{{ datos.nombres }}</span>
        </v-row>
        <v-row class="d-flex flex-row justify-center mb-3" cols="12">
          <span class="secondary--text class-title">{{
            subTituloAprobacion
          }}</span>
        </v-row>

        <v-col cols="12">
          <v-select
            v-model="marca"
            v-validate="'required'"
            solo
            flat
            :items="select_marcas"
            item-text="nombre"
            item-value="codModelo"
            :error-messages="errors.collect('marca')"
            placeholder="Marca de celular"
            background-color="white"
            data-vv-name="marca"
            data-vv-as="Marca de celular"
            :color="color"
            required
            @change="changeMarca"
          />
        </v-col>
        <v-col cols="12" v-show="marca ? true : false">
          <v-select
            v-model="codModeloSelect"
            v-validate="'required'"
            solo
            flat
            :items="select_modelos"
            item-text="name"
            item-value="codModelo"
            :error-messages="errors.collect('modelo')"
            placeholder="Modelo de celular"
            background-color="white"
            data-vv-name="modelo"
            data-vv-as="Modelo de celular"
            :color="color"
            required
          /> 
        </v-col>

        <v-col cols="12">
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="250"
            max-width="200"
            width="200"
            height="250"
            style="margin: 9px auto"
            :src="img_a20"
          ></v-img>
          <p v-if="selectModelo">

            Costo de equipo: S/.{{selectModelo.data.precioEquipo}} TEA:{{selectModelo.data.tea*100}}% Cuota mensual: {{selectModelo.data.cuotaMensual}} Plazo:{{selectModelo.data.numCuotas}}
            {{selectModelo.data.tipCuotas}}
          </p>
        </v-col>

        <div v-if="isBtnConfirmar">
          <v-row class="d-flex flex-row justify-center mt-4" md="6">
            <v-col md="12" class="d-flex flex-row justify-center">
              <v-btn
                class="white--text"
                style="border-radius: 7px; background-color: #ff7729"
                dark
                :loading="loading"
                @click="confirmaPrestamo"
                >Confirmar</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </template>
    </v-col>
    <v-dialog v-model="isModalDetallePrestamo" max-width="500">
      <div class="container-poup">
        <div class="container-close d-flex justify-end">
          <v-icon color="white" small @click="isModalDetallePrestamo = false"
            >close</v-icon
          >
        </div>
        <img class="img-popup" :src="imgPopup" alt="Fae_finalizado" />
      </div>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  components: {},
  props: {
    color: String,
    tituloAprobracion: {
      type: String,
      default: '¡Felicitaciones ',
    },
    subTituloAprobacion: {
      type: String,
      default: 'tienes un crédito aprobado por acceso!',
    },
  },
  data() {
    return {
      isBtnConfirmar: true,
      Cabecera:
        '<b>¡Gracias!<b/> <br/> No olvides recoger <br/> tu efectivo presentando <br/> tu DNI',
      dialogstate: false,
      condiciones: '',
      loading: false,
      loadingSimulacion: false,
      documentNumber: '', //required
      isModalDetallePrestamo: false,
      imgPopup: require('@/assets/detalle-prestamo-pos.png'),

      marca: '',
      items_modelo: ['a10', 'a20', 'a10s', 'a30'],
      codModeloSelect: '',
      img_a20: require('@/assets/img/celulares/samsung_a20.jpg'),
    }
  },

  computed: {
    ...mapGetters('express', ['datos', 'plazos']),
    ...mapState('users', ['promotor']),
    ...mapState('celulares', ['lista_marcas_cel', 'lista_modelos_cel']),
    select_marcas() {
      return this.lista_marcas_cel
    },
    select_modelos() {
      return this.lista_modelos_cel
    },
    selectModelo() {
      let elem=null
      this.select_modelos.find((el) => {
        if (el.codModelo == this.codModeloSelect) {
          console.log(el.codModelo,this.codModeloSelect)
          elem = el
        }
      })
      console.log('elem',elem)
      return elem
    },
  },
  async mounted() {
    if (this.promotor.codigoUsuario) {
      this.isBtnConfirmar = false
    } else {
      this.isBtnConfirmar = true
    }
    await this.$store.dispatch('celulares/getMarcasCel')
    this.$ga.event('Celulares', 'aprobacion')
    this.$fb.track('Aprobado')

    this.documentNumber = this.datos.documento
  },
  methods: {
    confirmaPrestamo() {
      this.loading = true
      this.$ga.event('Celulares', 'Boton-confirmación')
      this.loading = false
      this.dialogstate = true
      this.$store.commit('celulares/SET_STEP', 4) //4
    },
    async changeMarca() {
      try {
        await this.$store.dispatch('celulares/getModelosCel')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.creditos__container {
  max-width: 450px !important;
}
.v-text-field--outlined .v-input__control {
  padding: 0;
}
.class-title {
  font-size: 28px;
  font-weight: bold;
}
.ld-title {
  font-size: 30px;
  line-height: 40px;
  font-weight: 600;
  font-style: italic;
  letter-spacing: -1px;
}

.ld-subtitle {
  font-size: 18px;

  margin-bottom: 0px;
}
.mainLayout {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.mainImage {
  width: 80%;
  height: auto;
}
@media (max-width: 991px) {
  .class-title {
    font-size: 23px;
    font-weight: bold;
  }
  .mainImage {
    max-width: 200px;
    width: 100%;
  }
  .ld-final {
    display: flex;
    justify-content: center;
  }
}
.container-poup {
  display: flex;
  position: relative;
}

.img-popup {
  width: 100%;
  height: 100%;
}

.container-close {
  position: absolute;
  right: 0;
}
.container-close .v-icon {
  background-color: #005092 !important;
  border-radius: 50%;
  padding: 5px;
}
</style>
