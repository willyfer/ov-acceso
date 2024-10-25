import { gmapApi } from 'vue2-google-maps';

export default {
  methods: {
    async addressSearch(nameRef, nameInput, modelLatitude, modelLongitude, modelAddress) {
      const map = await this.$refs[nameRef].$mapPromise;
      const google = this.google;
      const input = document.getElementById(nameInput);
      const searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });
      let markers = [];
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        console.log("places: ", places)
        if (places.length == 0) {
          return;
        }
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          markers.push(
            new google.maps.Marker({
              map,
              title: place.name,
            })
          );
          this.form[modelLatitude] = place.geometry.location.lat();
          this.form[modelLongitude] = place.geometry.location.lng();
          this.form[modelAddress] = place.formatted_address;
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    },
  },
  computed: {
    google: gmapApi,
  },
}
