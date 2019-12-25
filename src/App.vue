<template>
  <v-app id="main">
    <v-app-bar app color="primary" dark>
      <!-- <v-toolbar-title class="font-weight-bold">MeetingsNow</v-toolbar-title> -->
      <v-btn text @click="locationPicker = !locationPicker">
        <v-icon>mdi-map-marker</v-icon>
        {{ locationString }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-menu transition="scroll-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            {{ daysOfWeekStr[dayOfWeek] }}
            <v-icon>mdi-calendar</v-icon>
          </v-btn>
        </template>
        <v-list color="accent">
          <v-list-item v-for="day in daysOfWeek" :key="day" @click="dayOfWeek = day">
            <v-list-item-title class="white--text">{{ daysOfWeekStr[day] }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content id="bg-container">
      <!-- location selection overlay -->
      <v-overlay :value="locationPicker">
        <CityPicker @commitLocation="updateLocation"></CityPicker>
      </v-overlay>
      <!-- div for frame -->
      <div id="listing-frame" show="listingFrame" full-height>
        <iframe id="the-frame" :src="listingUrl" width="100%" frameborder="0">
        </iframe>
      </div>
    </v-content>
    <v-footer app dark color="accent">
      <v-spacer></v-spacer>
      <span class="white--text caption">
        &copy; {{ new Date().getFullYear() }} 
        <a href="https://jddudley.com" target="_blank" class="white--text">JD DUDLEY</a>.
        Listings managed by respective committees.
      </span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<style>
body {
  height: 100%;
}
#bg-container {
  background: url("./assets/blue-light.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
#the-frame {
  height: 100vh;
}
</style>

<script>
import CityPicker from "./components/CityPicker";

export default {
  name: "App",

  components: {
    CityPicker
  },

  data: () => ({
    locationPicker: false,
    listingFrame: false,
    location: {
      state: "",
      city: "",
      urlSlug: ""
    },
    dayOfWeek: 0,
    dayOfWeekStr: "",
    daysOfWeek: [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    daysOfWeekStr: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  }),
  computed: {
    locationString: function() {
      if (this.location.state != "" && this.location.city != "") {
        // location present
        return this.location.city + ", " + this.location.state;
      } else {
        return "Choose City";
      }
    },
    dayUrl: function() {
      switch (this.dayOfWeek) {
        case "Sunday":
          return "0";
        case "Monday":
          return "1";
        case "Tuesday":
          return "2";
        case "Wednesday":
          return "3";
        case "Thursday":
          return "4";
        case "Friday":
          return "5";
        case "Saturday":
          return "6";
        default:
          return "all";
      }
    },
    timeUrl: function() {
      if (this.timeOfDay == "all") {
        return "";
      } else {
        return this.timeOfDay;
      }
    },
    listingUrl: function() {
      // https://idahoarea18aa.org/meetings?tsml-region=boise&tsml-day=0&tsml-time=morning
      if (this.location.urlSlug == '') {
        return "";
      } else if (this.location.state == 'CA') {
        return this.location.urlSlug + this.dayOfWeekStr + '.html';
      } else {
        var parameters = "&tsml-day=" + this.dayUrl;
        if (this.timeUrl != '') {
          parameters = parameters + "&tsml-time=" + this.timeUrl;
        }
        return this.location.urlSlug + this.location.cityKey + parameters + "#table-wrapper";
      }
    }
  },
  methods: {
    updateLocation: function(newLocation) {
      this.location.state = newLocation.state;
      this.location.city = newLocation.city;
      this.location.urlSlug = newLocation.urlSlug;
      this.locationPicker = false;
      // record to local storage
      localStorage.state = newLocation.state;
      localStorage.city = newLocation.city;
      localStorage.urlSlug = newLocation.urlSlug;
    }
  },
  mounted() {
    // get day of week
    var dayToday = new Date().getDay();
    this.dayOfWeek = dayToday;
    // check local storage for location
    if (localStorage.urlSlug) {
      this.location.state = localStorage.state;
      this.location.city = localStorage.city;
      this.location.urlSlug = localStorage.urlSlug;
    } else {
      // blank, load city picker
      this.locationPicker = true;
    }
  }
};
</script>
