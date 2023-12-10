<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :loop="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="false"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="card in cardInfos" :key="card" >
      <MainCard :card="card" v-if="typeCard == 'header'"/>
      <RegionCard :card="card" v-if="typeCard == 'regioncard'"/>
    </swiper-slide>
  </swiper>
</template>
<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import MainCard from '../components/LendinMainCard.vue';
  import RegionCard from '../components/RegionCard.vue'
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  // import required modules
  import { Autoplay, Pagination, Navigation } from 'swiper/modules';

  export default {
    props: ['typeCard', 'cardInfos'],
    components: {
      MainCard,
      Swiper,
      SwiperSlide,
      RegionCard,
    },
    setup() {
      return {
        modules: [Autoplay, Pagination, Navigation],
      };
    },
    data() {
      return {

      }
    },
  };
</script>
