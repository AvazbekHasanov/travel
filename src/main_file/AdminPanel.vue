<script setup>
import { RouterView } from 'vue-router'
import Topbar from '../components/TopBar.vue'
import MenuItem from '../components/DashboardMenuItem.vue'
import MenuList from '../main-info/menu_data.js'
</script>

<template>
  <div class="dashboard_container">
    <div class="left-menu" :class="{ hide_sidebar: isMobile }">
      <div class="project_wrapper" :class="{ hide_logo: isMobile }">
        <img class="logo" src="../components/img/travel-icon.png" />
        <p class="project_logo" :class="{ 'd-none': isMobile }">TravelBuddy</p>
      </div>
      <div class="sidebar-menu">
        <ul class="sidebar-content">
          <li
            class="sidebar_content-item"
            v-for="(item, index) in menuList"
            :key="index"
            :class="{ active_menu: path == item.name }"
            @click="changeRouter"
          >
            <MenuItem :menuInfo="item" :isMobile="isMobile"></MenuItem>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <Topbar class="tob_bar" @hide-sidebar="hideSideBar" />
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Topbar,
    MenuItem
  },
  data() {
    return {
      isMobile: false,
      menuList: MenuList.menuList,
      path: this.$route.name
    }
  },

  watch: {
    isMobile(newValue, oldValue) {
      console.log('newValue, oldValue', newValue, oldValue)
    }
  },
  mounted() {
    console.log(this.path, this.$route.name)
  },
  methods: {
    hideSideBar(info) {
      this.isMobile = info
    },
    changeRouter() {
      setTimeout(() => {
        this.path = this.$route.name
      }, 100)
    }
  }
}
</script>

<style>
h1,
h2,
h3,
h4,
h5,
p,
span,
div,
h6 {
  color: #1a1a1a;
}

#app {
  display: flex;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  padding: 0;
  margin: 0 !important;
}
.tob_bar {
  position: sticky;
  top: 0px;
  box-shadow: none;
  border-right: 1px solid #dee1ea;
  min-height: 72px !important;
  max-height: 72px !important;
  z-index: 9;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
}
.project_wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
}
.hide_logo {
  padding-top: 20px;
}
.logo {
  width: 40px;
}
.project_logo {
  color: #1a1a1a;
  font-size: 24px;
  font-weight: 500;
  line-height: 130%;
}
.dashboard_container {
  background: #f3f3f3;
  position: relative;
  display: flex;
  width: 100%;
}
.left-menu {
  color: var(--pl-sidebar-text);
  background: #fff;
  background-attachment: fixed;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 100vh;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  max-width: 240px;
  width: 240px;
  min-width: 240px;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 20px;
  padding: 20px;
}
.hide_sidebar {
  width: 60px;
  max-width: 60px;
  min-width: 60px;
  padding: 5px;
}
.content {
  width: calc(100vw - 240px);
  height: 100vh;
  overflow: auto;
  transition: 0.2s;
  margin-left: 0;
  flex-grow: 1;
  overflow-x: hidden;
}
.content {
  scrollbar-width: 5px; /* Firefox */
  -ms-overflow-style: 5px; /* Internet Explorer and Edge */
}

.content::-webkit-scrollbar {
  width: 5px; /* Hide the scrollbar in WebKit-based browsers (e.g., Chrome, Safari) */
}

.left-menu {
  scrollbar-width: 0; /* Firefox */
  -ms-overflow-style: 0; /* Internet Explorer and Edge */
}

.left-menu::-webkit-scrollbar {
  width: 0; /* Hide the scrollbar in WebKit-based browsers (e.g., Chrome, Safari) */
}

/* sidebar */
.sidebar_content-item {
  list-style: none;
  background: #f3f3f3;
  color: #1a1a1a;
  border-radius: 10px;
}
.sidebar_content-item:hover {
  background: #e5f0ff;
  color: #06f;
  border-radius: 10px;
  box-shadow:
    0 10px 4px rgba(24, 39, 37, 0.01),
    0 6px 3px rgba(24, 39, 37, 0.05),
    0 3px 3px rgba(24, 39, 37, 0.09),
    0 1px 1px rgba(24, 39, 37, 0.1),
    0 0 0 rgba(24, 39, 37, 0.1);
}

.active_menu {
  background: #e5f0ff;
  color: #06f;
  border-radius: 10px;
  box-shadow:
    0 10px 4px rgba(24, 39, 37, 0.01),
    0 6px 3px rgba(24, 39, 37, 0.05),
    0 3px 3px rgba(24, 39, 37, 0.09),
    0 1px 1px rgba(24, 39, 37, 0.1),
    0 0 0 rgba(24, 39, 37, 0.1);
}
.active_menu span {
  color: #06f;
}
.sidebar_content-item:hover span {
  color: #06f;
}
.sidebar-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
/* sidebar */
</style>
