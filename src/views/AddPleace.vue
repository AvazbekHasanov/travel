<template>
  <form @submit.prevent="submitForm">
    <div class="image_content">
      <div>
        <label for="image">Image:</label>
        <input type="file" id="image" accept="image/*" @change="getImg" />  
      </div>
      <img :src="formData.photo" alt="" v-if="formData.photo" />
    </div>

    <label for="name">Name:</label>
    <input type="text" id="name" v-model="formData.name" />

    <label for="location">Location:</label>
    <input type="text" id="location" v-model="formData.location" />

    <label for="description">Description:</label>
    <textarea id="description" v-model="formData.description"></textarea>

    <label for="cost">Cost:</label>
    <input type="number" id="cost" v-model="formData.cost" />

    <label for="currency">Currency:</label>
    <select id="currency" v-model="formData.currency">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <!-- Add more currency options as needed -->
    </select>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        photo: '',
        name: '',
        description: '',
        cost: null,
        currency: 'USD',
        location: '',
        id: null,
      },
      item: this.$route.query
    }
  },
  mounted() {
    if (this.item.id) {
      this.getPleaceInfo(this.item.id)
    }
  },
  methods: {
    getPleaceInfo(id) {
      let requestOptions = {
        method: 'GET'
      }

      fetch(`https://api.dev.realsoft.academy/api/public/get/edit/pleace?id=${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let info = result.data.get_info
          console.log('result', result, typeof result)
          this.formData.name = info.name
          this.formData.description = info.desciption
          this.formData.currency = info.currency
          this.formData.id = info.id
          this.formData.location = info.location
          this.formData.photo = info.photo
          this.formData.cost = info.traveling_cost_per_day
        })
        .catch((error) => console.log('error', error))
    },

    getImg(event) {
      let file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          this.formData.photo = reader.result
        }
        reader.readAsDataURL(file)
      }
      console.log('file', file, this.fileUrlImg)
    },
    submitForm() {
      let myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      let raw = JSON.stringify(this.formData)

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch('https://api.dev.realsoft.academy/api/public/set/new/pleace', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log('result', result, typeof result)
          let id = result.data.insert_data.id ?? result.data.update_data.id;
          history.pushState({}, '', `addpleace?id=${id}`)
          window.location.reload()
        })
        .catch((error) => console.log('error', error))

      // Handle form submission here
      console.log('Form submitted with data:', this.formData)
    }
  }
}
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.image_content{
display: flex;
flex-direction: row;
gap: 20px;
}

.image_content img{
 width: 100px;
 object-fit: cover;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: bold;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #4caf50;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}
</style>
