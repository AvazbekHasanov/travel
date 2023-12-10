<template >
  <div class="destinations">
    <div v-for="region, index in regionList" :key="index" >
      <RegionCard :card="region"/>
    </div>
<CourseCard/>
  </div>
</template>
<script>
import RegionCard from '../components/RegionCard.vue';
import region_list from '../main-info/menu_data.js'
import CourseCard from '../components/CourseCard.vue';
export default {
  components:{
    RegionCard,
    CourseCard
  },
  data() {
    return {
      regionList : region_list.regionCard
    }
  },
  mounted() {
    console.log("regionList", this.regionList)
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