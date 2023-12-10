<template>
  <div class="card_container">
    <img :src="card.backImg" alt="back_img" class="card_back_img" />
    <div class="slide_content">
      <div class="title_wrap">
        <h2 class="slide_title">{{ card.title }}</h2>
      </div>
      <p class="text">
        {{ card.subtitle }}
      </p>
      <div class="buttons">
        <a href="/dashboard" class="btn button" tabindex="-1">Подробнее</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['card']
}
</script>
<style scoped>
.slide_title {
  font-size: 157px;
  font-family: 'Prata', serif;
  color: #fff;
  width: auto;
  line-height: 1;
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

a:hover {
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
}
.card_back_img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 0;
}
.card_container {
  position: relative;
  height: 700px;
}
.text{
  color: rgba(255, 255, 255, 0.9);
    font-size: 20px;
    max-width: 565px;
    clear: both;
    /* transform: translateX(-100vw); */
    transition: all 0.4s ease-out;
}
.slide_content {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
