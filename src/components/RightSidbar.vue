<template>
  <div class="left_saidbar">
    <div class="logo_site">
      <img class="logo" src="./img/1560.png" alt="" />
      <h3>To do app</h3>
    </div>
    <div
      class="left_saidbar_item"
      v-for="(item, index) in menu"
      :key="index"
      @click="chengeLink(index)"
    >
      <div class="sidbar_item">
        <img src="src/components/img/event.png" alt="" />
        <h4>{{ item.name }}</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          name: 'Ishlar listi',
          link: 'works',
          id: 1
        },
        {
          name: 'Boruvchi joylar',
          link: 'visits',
          id: 1
        },
        {
          name: 'Uchrashuvlar',
          link: 'meeting',
          id: 1
        },
        {
          name: 'Haftalik xarajatlar',
          link: 'expenses',
          id: 1
        }
      ]
    }
  },
  mounted() {},
  methods: {
    chengeLink(index) {
      this.$router.push(`/${this.menu[index].link}`)
      this.$emit('change-head', this.menu[index].name)
    }
  }
}
</script>
<style scoped>
.left_saidbar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 30px 30px 0px 0px;
  background: var(--secondary-secondary-100, #e1e3fe);
  box-shadow: 0px 4px 22px 0px rgba(0, 0, 0, 0.3);
}
.left_saidbar_item {
  display: flex;
  padding: 8px 15px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  cursor: pointer;
}
.left_saidbar_item:hover {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}
.sidbar_item {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.logo {
  width: 24px;
  height: 24px;
  margin: 0;
}
.logo_site {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: flex-start;
  padding: 20px 0px;
  background-color: var(--header, #7061e3);
}

.logo_site h3 {
  color: var(--neutral-neutral-100, #fff);
  text-align: center;
  font-family: Roboto;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
}
</style>
