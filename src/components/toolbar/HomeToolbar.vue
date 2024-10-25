<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-row no-gutters align-center>
        <v-col cols="12" class="titleItem">
          <h2 class="text-left">Productos digitales</h2>
        </v-col>
        <v-col cols="12" class="listItem">
          <n-link tag="button" to="/credinstante" class="buttonLayout">
            <v-row no-gutters align-center>
              <v-col cols="3" class="v-icon-center">
                <img
                  :src="require('@/assets/icono_libredisponibilidad.png')"
                  style="width: 25px; height: 25px"
                />
              </v-col>
              <v-col cols="9" text-left class="white--text">Credinstante</v-col>
            </v-row>
          </n-link>
        </v-col>
        <v-col cols="12" class="listItem">
          <n-link tag="button" to="/autoclass" class="buttonLayout">
            <v-row no-gutters align-center>
              <v-col cols="3" class="v-icon-center">
                <img
                  :src="require('@/assets/gas.png')"
                  style="width: 25px; height: 25px"
                />
              </v-col>
              <v-col cols="9" text-left class="white--text"
                >Conversiones GNV</v-col
              >
            </v-row>
          </n-link>
        </v-col>        
        <v-col cols="12" class="listItem">
          <n-link tag="button" to="/" class="buttonLayout">
            <v-row no-gutters align-center>
              <v-col cols="3" class="v-icon-center">
                <img
                  src="@/assets/home.png"
                  style="width: 25px; height: 25px"
                />
              </v-col>
              <v-col cols="9" text-left class="white--text">Inicio</v-col>
            </v-row>
          </n-link>
        </v-col>
        <v-col cols="12" class="listItem">
          <n-link tag="button" to="/promotor" class="buttonLayout">
            <v-row no-gutters align-center>
              <v-col cols="3" class="v-icon-center">
                <v-icon dark class="icon-perm">perm_identity</v-icon>
              </v-col>
              <v-col cols="9" text-left class="white--text">Promotor</v-col>
            </v-row>
          </n-link>
        </v-col>
        <v-col v-if="promotor.state" cols="12" class="listItem">
          <button class="buttonLayout" @click="cerrarSesion">
            <v-row no-gutters align-center>
              <v-col cols="3" class="v-icon-center">
                <v-icon dark>clear</v-icon>
              </v-col>
              <v-col cols="9" class="white--text" text-left
                >Cerrar sesión</v-col
              >
            </v-row>
          </button>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    
    <v-app-bar app fixed hide-on-scroll>
      <section class="mainToolbar">
        <n-link to="/">
          <img src="@/assets/logo_header.svg" class="imageToolbar" />
        </n-link>
        <v-spacer />
        <h4 v-if="isMobil" class="mr-2 hidden-sm-and-up acceso--text">
          {{ promotor.id }}
        </h4>
        <v-menu
          v-if="isDesktop"
          v-model="menu"
          :close-on-content-click="false"
          bottom
          origin="center center"
          transition="scale-transition"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn class="user" v-on="on">
              <h3
                class="mainPromotor acceso--text pr-2 text-uppercase font-weight-bold body-2 subheading"
              >
                {{ promotor.id }}
              </h3>
              <v-icon color="acceso">account_circle</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <v-icon large color="acceso">account_circle</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ promotor.id }}</v-list-tile-title>
                  <v-list-tile-sub-title>Promotor Acceso</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider class="my-2"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="acceso" dark @click="cerrarSesion"
                >cerrar sesión</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-btn
          icon
          dark
          class="elevation-1 hidden-md-and-up acceso"
          @click.stop="drawer = !drawer"
        >
          <v-icon>menu</v-icon>
        </v-btn>
      </section>
    </v-app-bar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeToolbar',
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
      baseUrl: process.env.NUXT_ENV_BASE_URL,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ACCESO Crédito Vehicular',
      isCreated: false
    }
  },
  computed: {
    ...mapState('users', ['promotor']),
    isMobil() {
      if (
        this.isCreated &&
        this.promotor.state &&
        this.$vuetify.breakpoint.name === 'xs'
      ) {
        return true
      } else {
        return false
      }
    },
    isDesktop() {
      if (
        this.isCreated &&
        this.promotor.state &&
        this.$vuetify.breakpoint.name != 'xs'
      ) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.isCreated = true
  },
  methods: {
    async cerrarSesion() {
      this.menu = false
      await this.$store.dispatch('users/logoutPromotor')
      this.$router.push('/promotor')
    }
  }
}
</script>
<style>
button.buttonLayout {
  width: 100%;
  text-decoration: none !important;
  border: none !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center;
}

.titleItem {
  height: 56px;
  background-color: #fff;
  color: #005489;
  display: flex;
  padding-left: 24px;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600 !important;
}

.listItem {
  height: 56px;
  background-color: #005489;
  /*color: #fff;*/
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-bottom: 1px solid #fff;

  line-height: 36px;
}

.theme--light.v-list {
  border-radius: 4px !important;
  border: 1px solid #ffffff !important;
}

.theme--light.v-list.listToolbar {
  /*color: #fff;*/
  border-radius: 4px !important;
  border: 1px solid #005489 !important;
}

.mainList {
  background-color: #fff;
}

.icon-perm {
  color: rgb(255, 255, 255);
  font-size: 25px;
  font-weight: normal;
  opacity: 0.6;
}

.v-icon-center {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.user {
  height: 22px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: transparent !important;
  box-shadow: 0px 0px 0px transparent !important;
  padding: 0px !important;
  margin: 0px !important;
}
.transparent {
  background-color: transparent !important;
  box-shadow: 0px 0px 0px !important ;
}

@media only screen and (max-width: 768px) {
  .v-sheet.theme--light.v-toolbar.v-app-bar.v-app-bar--fixed {
    margin: 8px 12px 0 12px !important;
    border-radius: 20px;
  }
  .v-navigation-drawer {
    background-color: #005489 !important;
  }

  .home-icon-toggle {
    color: #fff !important;
    width: 40px;
    border-radius: 80%;

    background-color: #eb7531;
  }

  .home-icon-toggle i {
    color: #fff !important;
    font-size: 28px !important;
    border-radius: 80%;

    background-color: #eb7531;
  }

  .v-toolbar {
    background: #fff !important;
    display: block !important;
  }

  .mainToolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100% !important;
    max-width: 1024px !important;
  }

  .imageToolbar {
    height: 40px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .v-navigation-drawer {
    background-color: #005489 !important;
  }

  .home-icon-toggle i {
    color: #eb7531 !important;
    font-size: 35px !important;
  }

  .imageToolbar {
    height: 56px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .v-toolbar {
    background: rgba(0, 0, 0, 0) !important;
  }

  .mainToolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100% !important;
    max-width: 1024px !important;
  }

  .v-toolbar__content {
    width: 100%;
    color: #555555;
    border: 0;
    z-index: 1029;
    position: fixed;
    transition: all 150ms ease 0s;

    box-shadow: none;
    padding-top: 0px;
    margin-bottom: 0;
    border-bottom: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom 1px center;
    background-color: #fff;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
}

@media only screen and (min-width: 1025px) {
  .home-icon-toggle i {
    color: #eb7531 !important;
    font-size: 35px !important;
    display: none;
  }

  .imageToolbar {
    height: 56px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .v-toolbar {
    background: rgba(0, 0, 0, 0) !important;
    height: 0px !important;
  }

  .mainToolbar {
    display: flex !important;
    justify-content: center !important;
    width: 100% !important;
    padding: 24px;
    max-width: 1024px !important;
  }

  .v-toolbar__content {
    width: 100%;
    color: #555555;
    border: 0;
    z-index: 1029;
    position: fixed;
    transition: all 150ms ease 0s;
    box-shadow: none;
    padding-top: 0px;
    margin-bottom: 0;
    border-bottom: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom 1px center;
    background-image: url('~assets/header-oficinavirtual-main.svg') !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
}
</style>
