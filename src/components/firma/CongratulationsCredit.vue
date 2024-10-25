<template>
  <v-container class="d-flex flex-column pt-1">
    <v-row class="pt-0">
      <v-col cols="12" class="pt-0">
        <SharedHeaderWithoutStepper>
          <div class="headerCongratulationsCredit">
            <img :src="imgBanner" />
          </div>
        </SharedHeaderWithoutStepper>
        <div
          class="contentCongratulationsCredit contentCongratulationsCredit--text"
        >
          El concesionario te estará contactando para la entrega de tu moto.
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <SharedContentInfo typeInfo="email">
          Hemos enviado los <a href="#">documentos contractuales</a> a los
          medios de contacto que registraste.
        </SharedContentInfo>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <SharedButton
          text="Finalizar"
          :buttonOrange="true"
          :totalWidth="60"
          @click="endCongratulations"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SharedHeaderWithoutStepper from '@/components/shared/SharedHeaderWithoutStepper'
import SharedContentInfo from '@/components/shared/SharedContentInfo'
import SharedButton from '@/components/shared/SharedButton'
export default {
  name: 'CongratulationsCredit',
  components: {
    SharedHeaderWithoutStepper,
    SharedContentInfo,
    SharedButton,
  },
  data() {
    return {
      imgBanner: require('@/assets/img/firma/congratulations.png'),
    }
  },
  methods: {
    endCongratulations() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.headerCongratulationsCredit {
  height: 100px;
}
.headerCongratulationsCredit img {
  position: relative;
  top: -45px;
  height: 150px;
}
.contentCongratulationsCredit {
  margin: 0 22px 0px 22px;
  padding: 20px 10px;
  border-bottom: 1px solid #ff4e00;
  border-left: 1px solid #ff4e00;
  border-right: 1px solid #ff4e00;
  border-radius: 0 0 20px 20px;
}
.contentCongratulationsCredit--text {
  color: #ff4e00;
  font-size: 0.9em;
  text-align: center;
}
</style>