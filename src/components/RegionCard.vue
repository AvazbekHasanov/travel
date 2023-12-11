<template>
  <router-link :to="`/dashboard/destinations/region_info?id=${this.card.id}`">

    <div class="card_container box_shadow" @click="gotToBuy">
    <img :src="card.photo" alt="RegionImage" class="region_image">
    <div class="card_content">
      <div class="card_content-item">
         <span class="region_name"> {{ card.name }} </span>
        <p class="region_advantage">{{ card.desciption }}</p>
      </div>
    </div>
    <div class="blur_card">

    </div>
  </div>

  </router-link>
</template>
<script>
export default {
  props:['card'],
  methods:{
    gotToBuy(){
      // window.location.assign(`destinations/region_info?id=${this.card.id}`)
    },
  },
}
</script>
<style scoped>
  .card_container{
   position: relative;
   /* width: 300px; */
   height: 400px;
   border-radius: 10px;
   transition: all 0.2s ease-in;
   border-radius: 10px;
   cursor: pointer;
  }

  .card_container:hover .region_advantage{
    transform: translate(10px, 0px);
    display: flex;
  }
  .region_image{
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 0;
   border-radius: 10px;
  }
  .blur_card{
    position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 1;
   border-radius: 10px;
  }
  .card_content{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
  }
.card_content-item{
 width: 100%;
 display: flex;
 flex-direction: column;
 /* gap: 20px; */
 height: fit-content;
 backdrop-filter: blur(2px);
 justify-content: center;
 align-items: center;
 transition: all 0.2s ease-in;

}
  .region_name{
    font-size: 34px;
    color: #fff;
    font-family: 'Prata', serif;
    text-align: center;
  }
.region_advantage{
  color: #fff;
  transition: all 0.2s ease-in;
  transform: translate(10px, 120px);
  display: none;

}
</style>