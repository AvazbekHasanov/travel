<template >
  <div class="weither_main">
 <div class="container">
            <div class="weather__header">
                <form class="weather__search" @submit.prevent="searchCity">
                    <input type="text" placeholder="Search for a city..." class="weather__searchform" v-model="currCity">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </form>
                <div class="weather__units">
                    <span class="weather_unit_celsius" @click="toggleUnits('metric')">&#176C</span>
                    <span class="weather_unit_farenheit" @click="toggleUnits('imperial')">&#176F</span>
                </div>
            </div>
            <div class="weather__body" >
                <h1 class="weather__city">{{ weatherData.city }}</h1>
                <div class="weather__datetime">{{ weatherData.datetime }}</div>
                <div class="weather__forecast">{{ weatherData.forecast }}</div>
                <div class="weather__icon">
                    <img :src="weatherData.icon" alt="Weather Icon" />
                </div>
                <p class="weather__temperature">{{ weatherData.temperature }}</p>
                <div class="weather__minmax" v-html="weatherData.minmax"></div>
            </div>
            <div class="weather__info">
                <div class="weather__card">
                    <i class="fa-solid fa-temperature-full"></i>
                    <div>
                        <p>Real Feel</p>
                        <p class="weather__realfeel">{{ weatherData.realfeel }}</p>
                    </div>
                </div>
                <div class="weather__card">
                    <i class="fa-solid fa-droplet"></i>
                    <div>
                        <p>Humidity</p>
                        <p class="weather__humidity">{{ weatherData.humidity }}</p>
                    </div>
                </div>
                <div class="weather__card">
                    <i class="fa-solid fa-wind"></i>
                    <div>
                        <p>Wind</p>
                        <p class="weather__wind">{{ weatherData.wind }}</p>
                    </div>
                </div>
                <div class="weather__card">
                    <i class="fa-solid fa-gauge-high"></i>
                    <div>
                        <p>Pressure</p>
                        <p class="weather__pressure">{{ weatherData.pressure }}</p>
                    </div>
                </div>
            </div>
        </div>

<WeekWeither :cityName="currCity" :weatherData="weatherList"/>

  </div>


</template>
<script>
import WeekWeither from '../components/WeekWeither.vue'
export default {
  el: '.container', // Select the root element for your Vue app

  comments:{
    WeekWeither
  },

  data() {
return{   
  currCity: 'Tashkent',
        units: 'metric',
        weatherData: {
            city: '',
            datetime: '',
            forecast: '',
            temperature: '',
            icon: '',
            minmax: '',
            realfeel: '',
            humidity: '',
            wind: '',
            pressure: '',
        },
        weatherList: [],
  }
  },

async mounted() {
  await this.getWeather();
  await this.getWeekWeather()
},

  methods: {


// week wither

getFutureDate(day) {
      const someDate = new Date();
      const numberOfDaysToAdd = day;
      someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

      const dd = someDate.getDate();
      const mm = someDate.getMonth();
      const y = someDate.getFullYear();
      const d = someDate.getDay();

      const month = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December',
      ];

      const days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday',
      ];

      const futureMonth = month[mm];
      const futureDay = days[d];

      return `${futureDay}, ${futureMonth} ${dd}, ${y}`;
    },
    getClouds(clouds) {
      if (clouds > 100 || clouds < 10) {
        return {
          cloudNumber: 1,
          cloudText: 'Sunny',
        };
      } else if (clouds >= 90) {
        return {
          cloudNumber: 6,
          cloudText: 'Cloudy',
        };
      } else if (clouds >= 60) {
        return {
          cloudNumber: 5,
          cloudText: 'Mostly Cloudy',
        };
      } else if (clouds >= 30) {
        return {
          cloudNumber: 4,
          cloudText: 'Partly Cloudy',
        };
      } else {
        return {
          cloudNumber: 3,
          cloudText: 'Mostly Sunny',
        };
      }
    },
    setWeather(objectFromOWM) {
      this.weatherList = [];
      const list = objectFromOWM.list;
      for (let i = 0; i < list.length; i++) {
        const futureDate = this.getFutureDate(i);
        const cloudsCondition = this.getClouds(list[i].clouds);

        const weatherList = {
          now: futureDate,
          average: Math.round(list[i].temp.day),
          high: Math.round(list[i].temp.max),
          low: Math.round(list[i].temp.min),
          morning: Math.round(list[i].temp.morn),
          nighttime: Math.round(list[i].temp.night),
          cloudInfo: cloudsCondition.cloudNumber,
          cloudInfoText: cloudsCondition.cloudText,
        };

        this.weatherList.push(weatherList);
      }
      console.log("weithet list ", this.weatherList)
    },
    async getWeekWeather() {
      if (this.currCity.trim() === "") {
        return;
      }

      const weatherUrl = `//api.openweathermap.org/data/2.5/forecast/daily?q=${this.currCity}`;
      const apiKey = "b0b34e0501286ae903bab8dde901b6ae";
      const unitType = "imperial";
      const daysTotal = 8;

      try {
        const response = await fetch(
          `${weatherUrl}&APPID=${apiKey}&units=${unitType}&cnt=${daysTotal}`
        );

        if (response.ok) {
          const objectFromOWM = await response.json();
          this.setWeather(objectFromOWM);
        } else {
          console.error("Error fetching weather data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

// week wither

    searchCity: function () {
      // Handle city search
      this.getWeather();
    },
    toggleUnits: function (unit) {
      // Handle unit toggle
      this.units = unit;
      this.getWeather();
    },
    convertCountryCode: function (country) {
      let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
    },
    convertTimeStamp: function (timestamp, timezone) {
      const convertTimezone = timezone / 3600; // convert seconds to hours 

    const date = new Date(timestamp * 1000);
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString("en-US", options)
    },
    getWeather () {
            const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5';
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.currCity}&appid=${API_KEY}&units=${this.units}`)
                .then((res) => res.json())
                .then((data) => {
                    this.weatherData.city = `${data.name}, ${this.convertCountryCode(data.sys.country)}`;
                    this.weatherData.datetime = this.convertTimeStamp(data.dt, data.timezone);
                    this.weatherData.forecast = data.weather[0].main;
                    this.weatherData.temperature = `${data.main.temp.toFixed()}&#176`;
                    this.weatherData.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                    this.weatherData.minmax = `Min: ${data.main.temp_min.toFixed()}&#176 - Max: ${data.main.temp_max.toFixed()}&#176`;
                    this.weatherData.realfeel = `${data.main.feels_like.toFixed()}&#176`;
                    this.weatherData.humidity = `${data.main.humidity}%`;
                    this.weatherData.wind = `${data.wind.speed} ${this.units === 'imperial' ? 'mph' : 'm/s'}`;
                    this.weatherData.pressure = `${data.main.pressure} hPa`;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
  },
  created() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      console.log(event.key)
      this.getWeather();
    }
  });
},

}
</script>
<style >
  
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
/* h1, h2, h3, h4, h5, p, span, div, h6{
color: !important;
} */

h1, h2, h3, h4, h5, p, span, div, h6{
color:#1e1e1e;
}

.weither_main{
display: flex;
flex-direction: row;
gap: 20px;
}

.container {
    background: #f3f3f3;
    color: #fff;
    padding: 2rem;
    height:  calc(100% - 72px);
    width: 50%;
    /* margin: 4rem auto; */
    border-radius: 10px;
}

.weather__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

input {
    border: none;
    outline: none;
    /* background: #E5F0FF; */
    color: #1e1e1e;
    padding: 0.5rem 2.5rem;
    border-radius: 5px;
    border: 1px solid #E5F0FF;
}

input::placeholder {
    color: #fff;
}

input:focus{
border: 1px solid #06f
}

.weather__search {
    position: relative;
}

.weather__search i {
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 15px;
    color: #fff;
}

.weather__units {
    font-size: 1.5rem;
}

.weather__units span {
    cursor: pointer;
}

.weather__units span:first-child {
    margin-right: 0.5rem;
}

.weather__body {
    text-align: center;
    margin-top: 3rem;
}

.weather__datetime {
    margin-bottom: 2rem;
    font-size: 14px;
}

.weather__forecast {
    background: #1e1e1e;
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 30px;
    color: wheat;
}

.weather__icon img {
    width: 100px;
}

.weather__temperature {
    font-size: 1.75rem;
}

.weather__minmax {
    display: flex;
    justify-content: center;
}

.weather__minmax p {
    font-size: 14px;
    margin: 0.5rem;
}

.weather__info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin-top: 3rem;
}

.weather__card {
    display: flex;
    align-items: center;
    background: #1e1e1e;
    padding: 1rem;
    border-radius: 10px;
    background: #e5f0ff;
  color: #06f;
  border-radius: 10px;
  box-shadow:
    0 10px 4px rgba(24, 39, 37, 0.01),
    0 6px 3px rgba(24, 39, 37, 0.05),
    0 3px 3px rgba(24, 39, 37, 0.09),
    0 1px 1px rgba(24, 39, 37, 0.1),
    0 0 0 rgba(24, 39, 37, 0.1);
}

.weather__card i {
    font-size: 1.5rem;
    margin-right: 1rem;
}

.weather__card p {
    font-size: 14px;
}

@media(max-width: 936px){
    .container {
        width: 90%;
    }

    .weather__header {
        flex-direction: column;
    }

    .weather__units {
        margin-top: 1rem;
    }
}


@media(max-width: 400px){
    .weather__info {
        grid-template-columns: none;
    }
}

</style>