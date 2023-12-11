<template>
  <div class="main">
    <div>
      <div>
        {{ regionData.regionInfo.name }}
      </div>
      <div class="region_img">
        <img :src="regionData.regionInfo.photo" alt="">
     </div>
     <div>
        {{ regionData.regionInfo.more }}
      </div>
     <ul>
      <span>Qiziqarli hududlar</span>
      <li v-for="(item, index) in regionData.interestingPleace" :key="index">
        {{ item.text }}
      </li>
     </ul>
    </div>
    <div class="actionBtn">
      <button class="buy_btn">Zakaz berish</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      regionData:{
       regionInfo: {},
       interestingPleace: [] 
      }
    }
  },
  mounted() {
    this.getRegionInfo()
  },
  methods: {
    getRegionInfo(){
      let requestOptions = {
        method: 'GET'
      }

      fetch(`https://api.dev.realsoft.academy/api/public/get/region/info?id=${this.$route.query.id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.regionData.regionInfo = result.data.info;
          this.regionData.interestingPleace = result.data.interesting;
        })
        .catch((error) => console.log('error', error))      
    },
  },
}
</script>
<style>
  .main{
   display: flex;
   flex-direction: column;
   gap: 20px;
   padding: 30px 20px;
  }

  .buy_btn{
   border: 1px solid #06f;
   background: #06f;
   color: white;
   font-size: 14px;
   padding: 10px 20px;
   transition: all 0.3s;
  }

  .buy_btn:hover{
    background: white;
   color: #06f;
  }
</style>