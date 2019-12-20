<template>
  <v-app id="main">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title class="font-weight-bold">MeetingsNow</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="locationPicker = !locationPicker">
        {{ locationString }}
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content id="bg-container">
      <!-- day of week/time of day toolbar -->
      <v-toolbar color="secondary" dark>
        <v-menu transition="scroll-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <v-icon>mdi-calendar</v-icon>
              {{ dayOfWeek }}
            </v-btn>
          </template>
          <v-list color="accent">
            <v-list-item v-for="day in daysOfWeek" :key="day" @click="dayOfWeek = day">
              <v-list-item-title class="white--text">{{ day }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu transition="scroll-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              {{ timeOfDay }}
              <v-icon>mdi-clock</v-icon>
            </v-btn>
          </template>
          <v-list color="accent">
            <v-list-item v-for="time in timesOfDay" :key="time" @click="timeOfDay = time">
              <v-list-item-title class="white--text">{{ time }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        
      </v-toolbar>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col>
          <!-- location selection overlay -->
          <v-overlay :value="locationPicker">
            <CityPicker @commitLocation="updateLocation"></CityPicker>
          </v-overlay>
          <!-- content -->
          {{ this.listingUrl }}
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer app dark color="accent">
      <v-spacer></v-spacer>
      <span class="white--text">&copy; {{ new Date().getFullYear() }} <a href="https://jddudley.com" target="_blank" class="white--text font-weight-black">JD DUDLEY</a></span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<style>
  #bg-container {
    background: url('./assets/blue-light.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }
</style>

<script>
import CityPicker from './components/CityPicker';

export default {
  name: 'App',

  components: {
    CityPicker,
  },

  data: () => ({
    locationPicker: false,
    location: {
      state: '',
      city: '',
      urlSlug: ''
    },
    dayOfWeek: 'Thursday',
    timeOfDay: 'all',
    daysOfWeek: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    timesOfDay: [
      'all',
      'morning',
      'midday',
      'evening',
      'night'
    ]
  }),
  computed: {
    locationString: function() {
      if (this.location.state != '' && this.location.city != '') {
        // location present
        return this.location.city  + ", " + this.location.state;
      } else {
        return 'Choose City'
      }
    },
    dayUrl: function() {
      switch (this.dayOfWeek) {
        case 'Sunday':
          return '0';
        case 'Monday':
          return '1';
        case 'Tuesday':
          return '2';
        case 'Wednesday':
          return '3';
        case 'Thursday':
          return '4';
        case 'Friday':
          return '5';
        case 'Saturday':
          return '6';
        default:
          return 'all';
      }
    },
    timeUrl: function() {
      if (this.timeOfDay == 'all') {
        return '';
      } else {
        return this.timeOfDay;
      }
    },
    listingUrl: function() {
      // https://idahoarea18aa.org/meetings?tsml-region=boise&tsml-day=0&tsml-time=morning
      if (this.location.urlSlug == '') {
        return '';
      } else {
        var parameters = '&tsml-day=' + this.dayUrl;
        if (this.timeOfDay != '') {
          parameters = parameters + '&tsml-tmie=' + this.timeUrl;
        }
        return this.location.urlSlug + parameters;
      }
    }
  },
  methods: {
    updateLocation: function(newLocation) {
      this.location.state = newLocation.state;
      this.location.city = newLocation.city;
      this.location.urlSlug = newLocation.urlSlug;
      this.locationPicker = false;
      this.getMeetings();
    }
  }
};
</script>
