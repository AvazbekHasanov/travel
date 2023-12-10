<template lang="">
  <div class="header_container">
    <div class="back_container">
      <img src="./img/Vector.png" alt="Back" @click="$router.back()" />
    </div>
    <h3>{{ headName }}</h3>
    <div class="back_container">
      <img src="./img/mi_home.png" alt="Home" />
      <img src="./img/mdi_dots-vertical.png" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    headName: String
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped>
.header_container {
  display: flex;
  padding: 20px 60px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  background: var(--header, #373a5b);
  width: 100%;
}
.header_container h3 {
  color: var(--neutral-neutral-100, #fff);
  text-align: center;

  /* Title/large */
  font-family: Roboto;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 127.273% */
}
.back_container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
