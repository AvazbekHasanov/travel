<template>
  <div class="header">
    <nav class="navbar">
      <div class="container-nav">
        <div class="project_wrapper">
          <img class="logo" src="../components/img/travel-icon.png" />
          <!-- <i class="bi-alarm" style="font-size: 2rem; color: cornflowerblue;"></i> -->
          <p class="project_logo">TravelBuddy</p>
        </div>
        <div class="data-links nav-links">
          <a href="/">Home</a>
          <a href="#about">Package</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact Us</a>
          <a href="/dashboard">Login/Sign</a>
          <font-awesome-icon icon="phone" />
        </div>
        <div class="data-icons">
          <span @click="menu">Mneu</span>
          <span @click="Mclose">close</span>
        </div>
      </div>
    </nav>
    <div class="content_lendin">
      <Slider class="slider_info" :cardInfos="cardInfos" typeCard="header"></Slider>
      <div class="about-us">
        <div class="about_float">
          <h2 class="title">O‘zbekistonni o‘zingiz uchun kashf eting!!</h2>

          <p class="description">
            O‘zbekiston Sharqning sirli mamlakatidir. U yerda tarixlar afsonalarda to‘plangan,
            quyosh yil bo‘yi porlab, tabiatning betakrorligi va odamlarning yuraklari tozaligi
            buning nishonasidir
          </p>

          <p class="content_text">
            Ushbu muborak zaminga kelgan har bir mehmon xursandchilik bilan kutib olinadi va bir
            marta tashrif buyurgan kishi yana qaytib kelishni xohlaydi.
          </p>
        </div>
      </div>
      <div class="destinations" id="services">
        <div class="title_wrap">
          <h2 class="title">
            O'zbekiston shaharlari
          </h2>

          <p class="subtitle content_text">Sayyohlar uchun mashhur yo'nalish</p>
          <div class="region_list">
            <SLiderCard class="SLiderCard_info" :cardInfos="regionList" typeCard="regioncard"></SLiderCard>
          </div>
        </div>
      </div>
      <div class="full_info">
        <div class="buttons">
        <a href="/dashboard" class="btn button" tabindex="-1">Подробнее</a>
      </div>
      </div>
      <FooterLendin></FooterLendin>
    </div>
  </div>
</template>

<script>
import Slider from '../components/slider.vue'
import headerCardInfo from '../main-info/menu_data.js'
import { useCounterStore } from '../stores/counter.js'
import RegionCard from '../components/RegionCard.vue'
import SLiderCard from '../components/SliderForCard.vue'
import FooterLendin from '../components/FooterLendin.vue'
export default {
  setup() {
    const regionCardStore = useCounterStore();
    return regionCardStore
  },
  components: {
    Slider,
    RegionCard,
    SLiderCard,
    FooterLendin
  },
  data() {
    return {
      regionList: headerCardInfo.regionCard,
      cardInfos: headerCardInfo.headerCardInfo,
    }
  },
  created() {
    // document.querySelector('.close-icon').style.display = 'none';
  },
  mounted() {
    console.log("list pins",  this.$route.fullPath)
  },
  methods: {
    menu() {
      const element = document.querySelector('.data-links')
      element.style.transform = 'translateY(0%)'
      element.style.filter = 'blur(0px)'
      document.querySelector('.menu-icon').style.display = 'none'
      document.querySelector('.close-icon').style.display = 'block'
    },
    Mclose() {
      const element = document.querySelector('.data-links')
      element.style.transform = 'translateY(-200%)'
      element.style.filter = 'blur(20px)'
      document.querySelector('.close-icon').style.display = 'none'
      document.querySelector('.menu-icon').style.display = 'block'
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

/*these classes are nessesary if you want to Use navbar only*/
:root {
  --white: white;
  --black: rgb(0, 0, 0);
  --links: 18px;
  --paragraph: 24px;
  --heading: 40px;
  --logoS: 100px;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  backdrop-filter: invert(20%);
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
  height: 60px;
}

.content_lendin {
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.slider_info {
  position: relative;
  top: 0%;
  left: 0%;
  width: 100%;
  height: fit-content;
}

.slide_title {
  font-size: 157px;
  font-family: 'Prata', serif;
  color: #fff;
  width: auto;
  line-height: 1;
}
.slide_content {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, 0);
}
 .content_text {
  color: #919193;
  font-size: 25px;
  /* max-width: 565px; */
  clear: both;
  /* transform: translateX(-100vw); */
  transition: all 0.4s ease-out;
}
.close-icon {
  display: none;
}
.btn {
  background: #dd2c00;
  height: 50px;
  line-height: 50px;
  width: auto;
  padding: 0 30px;
  font-size: 21px;
  color: #fff;
  border-radius: 8px;
  display: block;
  float: left;
}
.logo {
  width: 70px;
  padding: 10px 15px;
}

.container-nav {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project_wrapper {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
}

.project_logo {
  color: white;
}

.data-icons {
  display: none;
  padding: 10px 15px;
}

a {
  font-size: var(--links);
  text-decoration: none;
  padding: 10px 15px;
  margin: 10px;
  transition: all 0.5s;
  color: white;
  border-radius: 25px;
}

i {
  color: var(--white);
}

a:hover {
  /* background-color: white; */

  color: #fdd86a !important;
  transform: scale(1.05);
}
/* //about us */
.about-us {
  padding: 50px 0 0;
  text-align: center;
}
.about_float {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 42px;
  font-family: 'Prata', serif;
  margin-bottom: 12px;
  margin-bottom: 20px;
}
.description {
  color: #222;
  font-size: 26px;
  font-style: italic;
  /* margin-bottom: 28px; */
  max-width: 70%;
}
.about_float .text {
  font-size: 21px;
  color: #919193;
  text-align: center;
  max-width: 70%;
}
/* //about us */

/* destinations */
.destinations {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px 20px;

}
/* destinations */

.data-links {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.size {
  font-size: 30px;
  padding: 5px 7px;
}

h1 i {
  color: rgb(255, 96, 123);
}

/*these classes are temporary to just have a rich view of sreen*/
.header {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /*temporary you can remove it, i just applied it to have a full screen view of my work*/
  width: 100%;
}

.hero-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--white);
}

.hero-section h1 {
  font-size: var(--heading);
  text-transform: capitalize;
  text-align: center;
  padding: 10px 15px;
}

.hero-section p {
  font-size: var(--paragraph);
  color: rgb(165, 165, 165);
  text-transform: capitalize;
  text-align: center;
  padding: 10px 15px;
}
.buttons .btn {
    background: #DD2C00;
    height: 50px;
    line-height: 50px;
    width: auto;
    padding: 0 30px;
    font-size: 21px;
    color: #fff;
    border-radius: 8px;
    display: block;
    float: left;
}
.full_info{
  width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
