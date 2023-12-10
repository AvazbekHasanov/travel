<template>
  <swiper
    :loop="true"
    :slidesPerGroup="1"
    :slidesPerView="4"
    :spaceBetween="20"
    :centeredSlides="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :breakpoints="{
                320: {
                 slidesPerView: 1,
             		},
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1300: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1587: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                }, 
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
