<template>
  <v-dialog v-model="modalDocumentos" persistent max-width="540">
    <v-card class="ld-modal">
      <v-row justify="end" align="center" dense>
        <v-col cols="2" class="text-center">
          <v-icon small @click="onclickOk">close</v-icon>
        </v-col>
      </v-row>
      <div v-for="item in items" :key="item.id">
        <v-row justify="center" align="center" dense>
          <v-col cols="10" align="center" justify="center">
            <img
              class="imgTitleModal"
              :src="item.imagenTitulo"
              alt
              srcset
              max-width="24"
            />
          </v-col>
        </v-row>
        <v-card-text>
          <v-row cols="12" class="d-flex flex-row">
            <v-col
              v-for="line in item.info"
              :key="line.id"
              cols="6"
              md="6"
              class="d-flex flex-column"
            >
              <v-row class="d-flex flex-row justify-center align-center pa-2">
                <img :src="line.imagen" alt srcset width="auto" height="48px" />
              </v-row>
              <span
                class="secondary--text text-center"
                v-html="line.texto"
              ></span>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
      <div class="footer-modal" style="text-align: center">
        <span v-html="footer"></span>
      </div>
      <!--         <v-card-actions>
          <v-btn class="primary " >OK</v-btn>
      </v-card-actions>-->
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('ui', ['estado'])
  },
  props: {
    modalDocumentos: {
      default: false
    },
    imagenTitulo: {
      default: '@/assets/boton--beneficios.png'
    },
    items: {
      default: function() {
        return []
      }
    },
    footer: {
      default: ''
    }
  },
  methods: {
    onclickOk() {
      this.$emit('onclickOk')
    }
  }
}
</script>
<style>
.footer-modal{
  margin-bottom: 10px;
}

@media screen and (max-width: 800px) {
  .imgTitleModal {
    width: 275px;
  }
  .footer-modal {
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>
