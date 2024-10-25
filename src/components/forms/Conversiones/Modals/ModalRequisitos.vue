<template>
  <div>
    <v-dialog v-model="isModal" persistent max-width="400">
      <v-card class="card-container">
        <v-row justify="end" align="center" dense class="ma-0">
          <v-col cols="2" class="d-flex justify-end align-center">
            <v-icon small @click="close">close</v-icon>
          </v-col>
        </v-row>
        <div class="contenido-modal">
          <div class="contenido-modal__header text-color--primary mb-4">
            <p class="mb-0 contenido-modal__header-text">Requisitos</p>
          </div>
          <div class="contenido-modal__body">
            <ul class="contenido-modal__lista d-flex flex-wrap justify-center">
              <li class="contenido-modal__item d-flex flex-column align-center justify-center" v-for="item in itemsRequisitos" :key="item.id">
                <div class="contenido-modal__container-img mb-2">
                  <v-img
                    class="contenido-modal__img"
                    :src="item.img"
                    alt="imagenModal"
                    max-width="60"
                  />
                </div>
                <p class="contenido-modal__texto text-color--primary" v-html="item.text"></p>
              </li>
            </ul>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalRequisitos',
  props: ['isModal'],
  data() {
    return {
      itemsRequisitos: [
        {
          img: require('@/assets/img/Conversiones/documento.png'),
          text: '<b>DNI</b>'
        },
        {
          img: require('@/assets/img/Conversiones/auto-2.png'),
          text: 'Auto menor a <br/> <b>10 años de antiguedad</b>'
        },
        {
          img: require('@/assets/img/Conversiones/documento.png'),
          text: '<b>Tarjeta de propiedad </b><br/> del auto a convertir'
        },
      ]
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.card-container {
  box-shadow: inset 10px 10px 70px 5px #716F73;
}
.contenido-modal {
  text-align: center;
  font-size: 16px;
}
.contenido-modal__header {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.3em;
}
.contenido-modal__header-text {
  margin: 0 30px;
  border-bottom: 3px solid #ff7729;
  padding-bottom: 5px;
}
.contenido-modal__lista {
  list-style: none;
  padding: 0;
}
.contenido-modal__item {
  width: 150px;
  margin: 5px;
  padding: 0 5px;
}
.contenido-modal__texto {
  font-size: .95em;
  line-height: 1.2;
}
</style>
