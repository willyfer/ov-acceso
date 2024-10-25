import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCgoGu-QN27ZGFI5E-nx7j_Hb34PmOii0M",
    libraries: "places"
  }
});
