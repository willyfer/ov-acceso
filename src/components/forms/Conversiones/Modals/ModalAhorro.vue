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
            <p class="mb-0 contenido-modal__header-text">Ahorro</p>
          </div>
          <div class="contenido-modal__body">
            <p class="contenido-modal__hero">
              Mira lo que
              <b class="text-color--primary"
                >ahorrarías <br />
                en un año</b
              >
              convirtiendo <br />
              tu auto a GNV
            </p>
            <div class="comparativa">
              <v-img
                :src="imgComparativa"
                max-width="60"
                alt="comparativa"
                class="comparativa-img"
              />
              <p class="mb-0 ml-2 comparativa-texto">
                Ejemplo comparativo <br />
                para un consumo <br />
                diario de 18 m<span>3</span>
                por un año
              </p>
            </div>
            <div class="box-gasolina content-color--primary">
              <p class="box-gasolina__text mb-0 text-color--secondary">
                Consumo anual con gasolina
              </p>
              <p class="box-gasolina__monto mb-0 text-color--secondary">
                S/ 27,872.73
              </p>
            </div>
            <div class="d-flex justify-center">
              <v-img alt="flecha" max-width="20" :src="imgFlecha"/>
            </div>
            <div class="box-gnv content-color--primary">
              <p class="box-gnv__text mb-0 text-color--secondary">
                Consumo anual con GNV
              </p>
              <p class="box-gnv__monto mb-0 text-color--secondary">
                S/ 8,212.50
              </p>
            </div>
            <div class="footer">
              <p class="footer__text text-color--primary mb-1">
                Súper ahorro de
              </p>
              <div class="footer__monto-container">
                <p class="footer__monto text-color--secondary">S/ 19,660.23</p>
                <div class="footer__container-check">
                  <img
                    class="footer__check"
                    width="70"
                    :src="imgCheck"
                    alt="check"
                  />
                </div>
              </div>
            </div>
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
      imgComparativa: require('@/assets/img/Conversiones/calendario.png'),
      imgCheck: require('@/assets/img/Conversiones/check.png'),
      imgFlecha: require('@/assets/img/Conversiones/Flecha.png')
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
.contenido-modal__hero {
  font-size: 1.5em;
  line-height: 1.2;
}
.comparativa {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  margin: 0 auto 20px auto;
}
.comparativa-texto {
  font-size: 0.9em;
  line-height: 1.2;
}
.box-gasolina {
  width: 240px;
  margin: 0 auto 10px auto;
  padding: 5px 0;
  border-radius: 10px;
}
.box-gasolina__text {
  font-size: 0.9em;
  font-weight: bold;
}
.box-gasolina__monto {
  font-weight: bold;
}
.box-gnv {
  width: 240px;
  margin: 10px auto 20px auto;
  padding: 5px 0;
  border-radius: 10px;
}
.box-gnv__text {
  font-size: 0.9em;
  font-weight: bold;
}
.box-gnv__monto {
  font-weight: bold;
}
.footer__text {
  font-size: 1.5em;
  font-weight: bold;
  text-transform: uppercase;
}
.footer__monto {
  background-color: #005197;
  width: 260px;
  margin: 0 auto;
  font-size: 1.5em;
  font-weight: bold;
  border-radius: 10px;
}
.footer__container-check {
  padding: 0 80px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.footer__check {
  position: relative;
  top: -27px;
  right: 0;
}
</style>
