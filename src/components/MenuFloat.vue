<template>
  <v-row no-gutters class="menu-vertical">
    <n-link
      :class="{
        'btn-menu-vertical-active': libreURL,
        'btn-menu-vertical': !libreURL
      }"
      to="/credinstante"
      class="imgContenedor"
      tag="button"
    >
      <v-row no-gutters wrap>
        <v-col md="12">
          <img :src="require('@/assets/icono_libredisponibilidad.png')" width="60" />
        </v-col>
        <v-col md="12">
          <p class="btn-menu-p" tag="button">
            Libre
            <br />disponibilidad
          </p>
        </v-col>
      </v-row>
    </n-link>
    <n-link
      :class="{
        'btn-menu-vertical-active': conversionGnv,
        'btn-menu-vertical': !conversionGnv
      }"
      to="/conversion-gnv"
      tag="button"
      class="imgContenedor"
    >
      <v-row no-gutters wrap>
        <v-col md="12">
          <img :src="require('@/assets/gas.png')" width="60" />
        </v-col>
        <v-col md="12">
          <p class="btn-menu-p" tag="button">
            Conversion
            <br />GNV
          </p>
        </v-col>
      </v-row>
    </n-link>
    <n-link
      :class="{
        'btn-menu-vertical-active': creditoURL,
        'btn-menu-vertical': !creditoURL
      }"
      to="/credito-soat-plus"
      class="imgContenedor"
      tag="button"
    >
      <v-row no-gutters wrap>
        <v-col md="12">   
          <img :src="require('@/assets/home-icon-3.png')" width="50" />
        </v-col>
        <v-col md="12">
          <p class="btn-menu-p" tag="button">
            Consulta
            <br />SOAT
          </p>
        </v-col>
      </v-row>
    </n-link>
  </v-row>
</template>
<script>
export default {
  name: 'MenuFloat',
  computed: {
    libreURL() {
      if (this.$route.name === 'libreDisponibilidad') {
        return true
      }
      return false
    },
    conversionGnv() {
      if (this.$route.name === 'conversionGnv') {
        return true
      }
      return false
    },
    soatURL() {
      if (this.$route.name === 'creditoSoat') {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
@media (max-width: 1280px) {
  .menu-vertical {
    display: none;
  }
}
@media (min-width: 1280px) {
  .menu-vertical {
    position: fixed;
    top: 200px;
    left: 0px;
    display: flex;
    flex-direction: column;
    z-index: 2;
  }
}
.btn-menu-vertical-active {
  height: 90px;
  width: 90px;
  border-radius: 12px;
  /*  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.44);*/
  box-shadow: 0px 5px 15px #000000c4;
  background: linear-gradient(#ea9864, #e5762f);
  font-size: 13px;
  text-align: center;
  color: #ffffff;
  line-height: 15px;
  font-weight: 600;
  text-transform: none !important;
  padding: 0px !important;
  margin: 5px 0px 5px 0px !important;
}
.btn-menu-vertical {
  height: 90px;
  width: 90px;
  border-radius: 12px;
  /*box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.44);*/
  box-shadow: 0px 5px 15px #000000c4;
  background: #005082 !important;
  font-size: 13px;
  text-align: center;
  color: #ffffff;
  line-height: 15px;
  font-weight: 600;
  text-transform: none !important;
  padding: 0px !important;
  margin: 5px 0px 5px 0px !important;
  /*-webkit-transition: all 0.9s ease;
  -moz-transition: all 0.9s ease;
  -o-transition: all 0.9s ease;
  -ms-transition: all 0.9s ease;*/
}
.btn-menu-vertical:hover {
  /*-webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -ms-transform: scale(1.1);
  -o-transform: scale(1.1);
  transform: scale(1.1);*/
}
.btn-menu-p {
  font-size: 11px;
  margin: 0 auto;
  padding: 0px;
  line-height: 11px;
}
/* .imgContenedor{
  -webkit-transition:all .9s ease;
-moz-transition:all .9s ease;
-o-transition:all .9s ease;
-ms-transition:all .9s ease;
width:100%;
} */
/* .imgContenedor:hover{
-webkit-transform:scale(1.25);
-moz-transform:scale(1.25);
-ms-transform:scale(1.25);
-o-transform:scale(1.25);
transform:scale(1.25);
} */
</style>
