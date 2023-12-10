<template>
  <div class="add_course_card">
    <div>
      <i class="fas fa-plus"></i>
      <span>Kurs qo'shish</span>
    </div>
  </div>
</template>
<script>
export default {
  // props: ['course'],
  data() {
    return {
      course: {
        duration: '2 oy',
        type: 'Online',
        name: 'Kichik biznesni rivojlantirish asoslari'
      }
    }
  }
}
</script>
<style>
.add_course_card {
  border-radius: 26px;
  border: 1px solid #124a9d;
  width: 308px;
  height: 375px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 15px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
