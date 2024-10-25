<template>
  <v-col v-if="showComponent" cols="12" md="5" class="ld-column-leyenda">
    <v-row no-gutters align-center class="pa-3">
      <v-col cols="12">
        <h2 class="ld-h2-title" :style="{ borderBottomColor: titleBorder }">
          {{ leyenda.titulo }}
        </h2>
        <p class="ld-p-subtitle" v-html="leyenda.descripcion" />
      </v-col>
      <v-col cols="12" my-2>
        <section
          v-if="leyenda.arrayRequisitos && leyenda.arrayRequisitos.length > 0"
        >
          <h2 class="ld-h2">Requisitos</h2>
          <v-row
            v-for="(item, key) in leyenda.arrayRequisitos"
            :key="key"
            no-gutters
            wrap
          >
            <v-col cols="12">
              <ul>
                <li class="listaClase">
                  <span class="ld-p">{{ item.text }}</span>
                </li>
              </ul>
            </v-col>
          </v-row>
        </section>
      </v-col>
      <v-col cols="12">
        <template v-if="pasos.length > 0">
          <h2 class="ld-h2">Pasos</h2>
          <v-row
            v-for="(item, key) in pasos"
            :key="key"
            no-gutters
            wrap
            class="py-1"
          >
            <v-col cols="1">
              <span class="ld-circle">{{ key + 1 }}</span>
            </v-col>
            <v-col cols="11">
              <div class="ld-flex-row">
                <span class="ld-p">{{ item.text }}</span>
              </div>
            </v-col>
          </v-row>
        </template>
      </v-col>
      <v-col cols="12" class="hidden-sm-and-up mt-3 text-center">
        <v-btn
          class="ld-btn homeButton"
          :color="color"
          href="#ldForm"
          @click.native="goForm"
          >empezar</v-btn
        >
      </v-col>
      <v-col v-if="optional" cols="12" class="hidden-xs-only pa-2">
        <h2
          class="ld-h2-title"
          :style="{ borderBottomColor: titleBorder }"
        ></h2>
        <p class="ld-p" style="text-align: justify">{{ optional.text }}</p>
        <ul>
          <li
            v-for="(item, key) in optional.subtimes"
            :key="key"
            class="white--text"
          >
            <span class="ld-p" align-center>{{ item.text }}</span>
          </li>
        </ul>
      </v-col>
      <v-col v-if="logo" cols="12" class="mainLogo">
        <h3 class="white--text">{{ logo.text }}</h3>
        <img :height="logo.height" :src="logo.url" />
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import { mapState } from 'vuex'

export default {
  /* props: ['leyenda', 'pasos', 'titleBorder', 'color', 'logo', 'optional'], */
  props: {
    leyenda: Object,
    pasos: {
      type: Array,
      default: () => {
        return []
      }
    },
    titleBorder: {
      type: String,
      default: '#e6803f'
    },
    color: { type: String, default: '#e6803f' },
    logo: Object,
    optional: Object
  },
  data() {
    return {
      isCreated: false
    }
  },
  methods: {
    goForm() {
      this.$ga.event('Home', 'empezar')
    }
  },
  computed: {
    myRouteName() {
      return this.$route.name
    },
    ...mapState('default', ['step', 'bussines']),
    showComponent() {
      if (
        this.isCreated &&
        (this.$vuetify.breakpoint.name === 'xs' ||
          this.$vuetify.breakpoint.name === 'sm') &&
        this.step != 1
      ) {
        return false
      }
      return true
    }
  },
  mounted() {
    this.isCreated = true
  }
}
</script>

<style>
.mainLogo {
  margin: 16px 0 0 0 !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.imgFinger {
  width: 120px;
  right: 50px;
}
.ld-h2-title {
  color: #ffffff !important;
  border-bottom: 3px solid #e6803f;
  padding-bottom: 8px;
  margin-bottom: 0.5em;
  font-style: italic;
  font-size: 25px;
  line-height: 30px;
  max-width: 260px;
}
.ld-p-subtitle {
  color: #ffffff !important;
  font-size: 18px;
  line-height: 24px;
}
.ld-h2 {
  color: #ffffff !important;
  margin-bottom: 0.5em;
  font-style: italic;
  font-size: 20px;
  line-height: 24x;
}

.ld-circle {
  color: #ffffff;
  font-size: 32px;
  font-weight: 600;
  font-style: italic;
  text-align: center;
  line-height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 12px 0px 0px;
}
.ld-circle-active {
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-style: italic;
  align-items: center;
  color: #e88444;
  font-size: 32px;
  line-height: 36px;
  margin: 0px 12px 0px 0px;
}
.ld-p {
  color: #ffffff !important;
  font-size: 16px;
  line-height: 36px;
}
.ld-column-leyenda {
  display: flex !important;
  align-items: center;
  justify-content: center !important;
  min-height: calc(100vh - 56px);
  /* border: 2px solid red !important */
}
.imgDinero {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0px !important;
}

.listaClase {
  color: #fff;
  border: 1px;
}
.terms {
  color: #fff;
  font-size: 9px;
}
.dinero {
  width: 220px;
}
.ld-btn {
  font-size: 18px !important;
  font-weight: 600 !important;
  width: 280px !important;

}

@media (min-width: 769px) {
  .mainLogo {
    margin: 64px 0 0 0 !important;
    display: flex !important;
    flex-direction: column;
    justify-content: left !important;
    align-items: left !important;
  }
  .ld-column-leyenda {
    align-items: center !important;
    min-height: calc(100vh - 64px);
  }
}
@media (min-width: 1024px) {
  .ld-column-leyenda {
    margin-top: 32px;
    align-items: flex-start !important;
    min-height: 100%;
  }
  .dinero {
    width: 350px;
  }
}
</style>
