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
import id_cities from '../data/id_cities.json';

export default {
  name: 'CityPicker',
  data: () => ({
    chosenState: 'ID',
    chosenCity: {},
    states: [
      { text: 'California', value: 'CA' },
      { text: 'Hawaii', value: 'HI' },
      { text: 'Idaho', value: 'ID' }
    ]
  }),
  methods: {
    commit: function() {
      var newLocation = {
        state: this.chosenState,
        city: this.chosenCity.name,
        urlSlug: this.urlSlug + this.chosenCity.key
      }
      this.$emit('commitLocation',newLocation)
    }
  },
  computed: {
    cities: function() {
      if (this.chosenState == 'ID') {
        return id_cities.cities;
      } else {
        return [];
      }
    },
    urlSlug: function() {
      if (this.chosenState == 'ID') {
        return 'https://idahoarea18aa.org/meetings?tsml-region=';
      } else {
        return '';
      }
    }
  }
};
</script>
