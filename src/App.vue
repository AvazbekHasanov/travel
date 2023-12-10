<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView class="wrapper_item_left" />
</template>

<script>
export default {
  components: {},
  data() {
    return {
      itemInfo: {
        time: '18.06.2023',
        textToDo: 'my work'
      }
    }
  },
  mounted() {},
  methods: {
    changeHead(name) {
      this.headName = name
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
body {
  /* overflow-y: scroll; */
  background: white;
}
button {
  cursor: pointer;
}
#app {
  display: flex;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  padding: 0;
  margin: 0 !important;
}
.wrapper_item_left{

}
/* Style the track */
/* ::-webkit-scrollbar-track {
  background: #f1f1f1;
} */
.d-none {
  display: none;
}
/* ::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
  width: 3px;
}

::-webkit-scrollbar-button {
  background: #555;
} */
</style>
