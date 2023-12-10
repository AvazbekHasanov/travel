<template>
  <div class="converter_container">
    <h1>Ajoyib valyuta konvertori</h1>
    <p class="convert">
      Konvertatsiya qilish :
      <input
        type="number"
        v-model="originalCurrencyAmount"
        placeholder="0"
        id="original-currency-amount"
      />
    </p>
    <div>
      <select v-model="fromCurrency">
        <option v-for="(currency, index) in currencies" :value="currency" :key="index">
          {{ currency }}
        </option>
      </select>
      <button @click="exchangeCurrencies" class="exchange">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20px" height="20px">
          <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
          <path
            d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"
          />
        </svg>
      </button>
      <select v-model="toCurrency" class="to_currency">
        <option v-for="(currency, index) in currencies" :value="currency" :key="index">
          {{ currency }}
        </option>
      </select>
    </div>
    <p class="exchange">
      Valyuta kursi:
      <input type="text" v-model="exchangeRate" />
    </p>
    <button @click="calculate">Valyutani almashtirish!</button>
    <p id="output-text">
      <span id="from">{{ originalCurrencyAmount }} {{ fromCurrency }}</span> aylantirildi
      <span id="to">{{ outputAmount }} {{ toCurrency }}</span>
    </p>
  </div>

  <footer>
    <a
      href="https://twitter.com/intent/tweet?text=Awesome Currency Converter 🤑%0a    by @verreauxblack%0ahttps://verreauxblack.biz/project/currency-convertor/"
      title="share"
    >
      <i class="fab fa-twitter"></i>
    </a>
  </footer>
</template>

<script>
import Valuta from '../main-info/menu_data.js'
export default {
  el: '#app',
  data() {
    return {
      originalCurrencyAmount: 1,
      fromCurrency: 'USD',
      toCurrency: 'UZS',
      exchangeRate: 0,
      outputAmount: 0,
      currencies: Valuta.currenciesData
    }
  },
  methods: {
    exchangeCurrencies() {
      ;[this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency]
      this.calculate()
    },
    calculate() {
      fetch(`https://api.exchangerate-api.com/v4/latest/${this.fromCurrency}`)
        .then((res) => res.json())
        .then((res) => {
          const rate = res.rates[this.toCurrency]
          this.exchangeRate = rate.toFixed(3)
          this.outputAmount = (this.originalCurrencyAmount * rate).toFixed(3)
        })
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sansita+Swashed&display=swap');

html,
body {
  margin: 0;
  padding: 0;
}

.converter_container {
  text-align: center;
  font-family: sans-serif;
  background-color: #00539cff;
  display: flex;
  height: calc(100% - 72px);
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

h1 {
  color: #ffd662ff;
  font-size: 3rem;
}

.convert,
.exchange {
  font-family: 'Sansita Swashed', cursive;
  font-size: 25px;
  padding-right: 20px;
}

input {
  width: 150px;
  height: 30px;
  font-size: 20px;
  margin: 5px auto;
  outline: 0;
}

#original-currency-amount {
  padding-left: 50px;
}
button {
  width: 300px;
  height: 40px;
  font-size: 20px;
  font-weight: 600;
  color: #00539cff;
  font-family: 'Sansita Swashed', cursive;
}

select {
  width: 80px;
  height: 35px;
  font-size: 20px;
  text-align: center;
  padding-left: 10px;
  outline: 0;
}

#exchange {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 20px;
  outline: 0;
  color: #00539cff;
  border: 4px solid #ffd662ff;
}

#exchange:active,
button:active {
  transform: scale(0.9);
}

#output-text {
  display: none;
  padding: 20px;
  font-size: 30px;
  color: #ffffff;
}

span {
  color: #ffd662ff;

  font-size: 35px;
}

#exchange-rate {
  cursor: default;
}

footer {
  position: absolute;
  right: 50px;
  bottom: 50px;
}

a {
  color: #ffffff;
  bottom: 0;
  font-size: 30px;
  text-decoration: none;
}
</style>
