<template>
  <div class="wrapper">
    <div class="container">
      <form @submit.prevent="getWeather">
        <input
          type="text"
          v-model="cityName"
          class="textbox"
          placeholder="Type city (i.e., 'London')"
        />
        <button type="submit" class="button">Get 7-Day Weather Forecast</button>
      </form>
      <h2 id="results" class="results">
        <div class="initial">Get Your 7-day Weather Forecast</div>
      </h2>
      <div class="clearfix"></div>
      <div v-for="(day, index) in weatherData" :key="index" class="section">
        <h2 class="date">{{ day.now }}</h2>
        <div class="weather-description">
          <div id="weather-info">
            <h2>Average: {{ day.average }}&deg;</h2>
            <h3>High: {{ day.high }}&deg;</h3>
            <h3>Low: {{ day.low }}&deg;</h3>
            <h3>Morning: {{ day.morning }}&deg;</h3>
            <h3>Night: {{ day.nighttime }}&deg;</h3>
            <img
              :src="'https://troyrowthampro.com/dump/clouds/cloud-' + day.cloudInfo + '.jpg'"
              :alt="day.cloudInfoText"
              :title="day.cloudInfoText"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['weatherData'],
  data() {
    return {
      cityName: 'London'
    }
  },
  mounted() {
    console.log('cityName', this.cityName, this.weatherData)
  }
  // You can add your component's logic here
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
