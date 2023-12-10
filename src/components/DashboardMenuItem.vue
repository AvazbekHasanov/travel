<template>
  <router-link :to="`/dashboard/${menuInfo.path}`" class="menu_item">
    <img width="20" height="20" :src="menuInfo.imglink" alt="home--v1" />
    <span class="" :class="{ 'd-none': isMobile }">{{ menuInfo.text }}</span>
    <!-- <span class="menu_pleaseholder" v-if="isMobile">{{ menuInfo.text }}</span> -->
  </router-link>
</template>
<script>
export default {
  props: ['menuInfo', 'isMobile'],
  data() {
    return {}
  },
  mounted() {
    console.log(this.$route.path)
  }
}
</script>
<style>
.menu_item {
  background: transparent;
  position: relative;
  transition: all 0.1s;
  text-decoration: none;
  border-radius: 10px;
  height: 44px;
  padding: 0.6rem 0.81rem 0.6rem 0.81rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}
.menu_item:hover {
  background-color: transparent;
}
.menu_pleaseholder {
  position: absolute;
  top: 0;
  left: 70px;
  border-radius: 10px;
  border: 1px solid black;
  display: none;
}
.menu_item:hover .menu_pleaseholder {
  display: flex;
}
</style>
