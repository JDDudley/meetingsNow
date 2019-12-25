<template>
  <v-card light class="mx-auto my-auto" max-width="200">
    <v-card-title class="justify-center">Location</v-card-title>
    <v-card-text>
      <v-select 
        :items="states" 
        v-model="chosenState" 
        label="State">
      </v-select>
      <v-select
        :items="cities"
        return-object
        item-text="name"
        v-model="chosenCity" 
        label="City">
      </v-select>
    </v-card-text>
    <v-card-actions>
      <v-btn large color="primary" class="mx-auto" @click="commit()">Select</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ca_cities from '../data/ca_cities.json';
import id_cities from '../data/id_cities.json';
import nv_cities from '../data/nv_cities.json';
import or_cities from '../data/or_cities.json';
import wy_cities from '../data/wy_cities.json';

export default {
  name: 'CityPicker',
  data: () => ({
    chosenState: '',
    chosenCity: {},
    states: [
      // { text: 'California', value: 'CA' },
      // { text: 'Hawaii', value: 'HI' },
      { text: 'California', value: 'CA' },
      { text: 'Idaho', value: 'ID' },
      { text: 'Nevada', value: 'NV' },
      { text: 'Oregon', value: 'OR' },
      { text: 'Wyoming', value: 'WY' }
    ]
  }),
  methods: {
    commit: function() {
      var newLocation = {
        state: this.chosenState,
        city: this.chosenCity.name,
        cityKey: this.chosenCity.key,
        urlSlug: this.urlSlug
      }
      this.$emit('commitLocation',newLocation)
    }
  },
  computed: {
    cities: function() {
      if (this.chosenState == 'CA') {
        return ca_cities.cities;
      } else if (this.chosenState == 'ID') {
        return id_cities.cities;
      } else if (this.chosenState == 'NV') {
        return nv_cities.cities;
      } else if (this.chosenState == 'OR') {
        return or_cities.cities;
      } else if (this.chosenState == 'WY') {
        return wy_cities.cities;
      } else {
        return [];
      }
    },
    urlSlug: function() {
      if (this.chosenState == 'ID' || this.chosenState == 'NV' || this.chosenState == 'OR' || this.chosenState == 'WY') {
        return 'https://idahoarea18aa.org/meetings?tsml-region=';
      } else if (this.chosenState == 'CA') {
        return 'http://aasandiego.org/';
      } else {
        return '';
      }
    }
  },
  mounted () {
    // check local storage for location
    if (localStorage.urlSlug) {
      this.chosenState = localStorage.state;
      this.chosenCity = localStorage.city;
    }
  }
};
</script>
