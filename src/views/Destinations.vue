<template >
  <div class="destinations" v-if="this.$route.name != 'region_info'">
    <div v-for="region, index in regionList" :key="index" >
      <RegionCard :card="region"/>
    </div>
  </div>
  <RouterView/>
</template>
<script>
import RegionCard from '../components/RegionCard.vue';
import { RouterView } from 'vue-router'
export default {
  components:{
    RegionCard,
    RouterView
  },
  data() {
    return {
      regionList : []
    }
  },
  mounted() {
    console.log("regisddfonList", this.$route)
    this.getRegionList()
  },
  methods: {
    getRegionList(){
      let requestOptions = {
        method: 'GET'
      }

      fetch(`https://api.dev.realsoft.academy/api/public/get/all/region`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.regionList = result.data.region_list;
          console.log(this.regionList)
        })
        .catch((error) => console.log('error', error))      
    },
  },
}
</script>
<style >
.destinations{
    width: 100%;
    gap: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 50px;
    padding: 30px 20px;
}
</style>