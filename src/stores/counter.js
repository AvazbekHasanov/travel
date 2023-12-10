import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counterStore', {
  state: () => {
    regionCard: [
      {
        regionName: 'Toshkent',
        regionAdvantage: 'Zamonaviy megapolis',
        regionImg:
          'https://uzbekistan.travel/storage/app/uploads/public/5eb/46f/6e1/thumb_764_600_0_0_0_auto.jpg'
      },
      {
        regionName: 'Samarqand',
        regionAdvantage: 'Madaniyatlar chorrahasi',
        regionImg:
          'https://uzbekistan.travel/storage/app/uploads/public/5eb/46f/ce0/thumb_765_600_0_0_0_auto.jpg'
      },
      {
        regionName: 'Buxoro',
        regionAdvantage: 'Islom madaniyatining poytaxti',
        regionImg:
          'https://uzbekistan.travel/storage/app/uploads/public/5eb/46f/e7c/thumb_766_600_0_0_0_auto.jpg'
      },
      {
        regionName: 'Xiva',
        regionAdvantage: 'Turk dunyosining poytaxti',
        regionImg:
          'https://uzbekistan.travel/storage/app/uploads/public/5eb/470/0be/thumb_767_600_0_0_0_auto.jpg'
      },
      {
        regionName: 'Shahrisabz',
        regionAdvantage: 'Amir Temurning vatani',
        regionImg:
          'https://uzbekistan.travel/storage/app/uploads/public/5eb/470/5d1/thumb_769_600_0_0_0_auto.jpg'
      },
      {
        regionName: 'Mo‘ynoq',
        regionAdvantage: 'Orol sahrosi',
        regionImg:
          'https://uzbekistan.travel/storage/app/uploads/public/5eb/473/e47/thumb_771_600_0_0_0_auto.jpg'
      },
      {
        regionName: 'Zomin',
        regionAdvantage: 'O‘zbek Shveytsariyasi',
        regionImg:
          'https://uzbekistan.travel/storage/app/uploads/public/5eb/476/f7b/thumb_774_600_0_0_0_auto.jpg'
      },
      {
        regionName: 'Termiz',
        regionAdvantage: 'Qadimiy tsivilizatsiya va din markazi',
        regionImg:
          "https://uzbekistan.travel/storage/app/uploads/public/5eb/478/9a5/thumb_776_600_0_0_0_auto.jpg"
      },
    ]
  }
})
