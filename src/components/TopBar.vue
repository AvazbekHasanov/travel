<template>
  <div>
    <button class="burger" :class="{ bars_rotate: isMobile }" @click="hideLeftSidebar">
      <svg class="bars" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
        />
      </svg>
    </button>
    <div class="modall" :class="{ hidden: !popup.display }">
      <div class="modal-message">
        {{ popup.msg }}
        <i class="mdi mdi-window-close popup-close" @click="popup.display = false"></i>
      </div>
    </div>
    <div class="profile_container">
      <div class="header_logo">
        <img
          @click="openInput"
          class="search_mobile"
          src="https://expert.uz/media/store/new_images/search-platform.svg"
          alt=""
        />
      </div>
      <div class="search_platform">
        <input
          placeholder="Поиск"
          class="search_platform-input"
          id="global_search"
          type="text"
          v-model="globSearch"
          @keyup.enter="globalSearch"
        />
        <div :class="{ active: searchResult.length > 0 }" class="search_result-list">
          <div v-for="(result, index) in searchResult" :key="index" class="search_result-item">
            <p class="search__result__item-text">
              {{ result.name }}
            </p>
            <p class="search__result__item-status">
              {{ result.status }}
            </p>
          </div>
        </div>
        <label for="global_search">
          <img
            @click="globalSearch"
            class="search_image"
            src="https://expert.uz/media/store/new_images/search-platform.svg"
            alt=""
          />
        </label>
        <div
          @click="emptyInput"
          :class="{ active: searchResult.length > 0 }"
          class="backg_window"
        ></div>
      </div>
      <div class="topbar_notifications">
        <div class="topbar_notifications-btn" @click="isNotificationOpened = !isNotificationOpened">
          <img src="https://expert.uz/media/store/new_images/bell.svg" alt="" />
          <span class="ntf_count" v-if="notifications.length">{{ notifications.length }}</span>
        </div>
        <a href="/pages/explat_messages" class="topbar_notifications-btn">
          <img src="https://expert.uz/media/store/new_images/comment.svg" alt="" />
          <span v-if="userInfo.unread_messages > 0" class="ntf_count">
            {{ userInfo.unread_messages }}
          </span>
        </a>
        <a href="/pages/explat_favourites_page?tab=courses" class="topbar_notifications-btn">
          <img src="https://expert.uz/media/store/new_images/heart_notifications.svg" alt="" />
          <span v-if="userInfo.chosen_items > 0" class="ntf_count">
            {{ userInfo.chosen_items }}
          </span>
        </a>
      </div>
      <div :class="{ active: isProfileOpened }" class="new_profile-wrapper">
        <div @click="openProfile" class="new_profile-inner">
          <img
            :class="{ active: isProfileOpened }"
            class="new_profile-arrow"
            src="https://expert.uz/media/store/new_images/chevron-bottom-blue.svg"
            alt="arrow"
          />
          <div class="new_profile-image">
            <img
              v-if="userInfo.photo"
              class="new_profile-ava"
              :class="{ active: isProfileOpened }"
              :src="userInfo.photo"
              alt=""
            />
            <img
              v-else
              class="new_profile-ava"
              :class="{ active: isProfileOpened }"
              src="https://expert.uz/media/store/new_images/default_user_ava.jpeg"
              alt=""
            />
          </div>
        </div>
        <div :class="{ active: isProfileOpened }" class="new_profile-menu">
          <span class="profile_line"></span>
          <button @click="logout" class="new_profile_menu-item logout">
            Выйти из аккаунта
            <img src="https://expert.uz/media/store/new_images/download.svg" alt="" />
          </button>
        </div>
      </div>
      <div @click="openProfile" :class="{ active: isProfileOpened }" class="backg_window"></div>
      <div :class="{ active: isNotificationOpened }" class="notifications_wrapper">
        <div class="ntf_header">
          <span class="ntf_title">Xabarnomalar</span>
          <!--         <span class="ntf_btn" title="Xabarlar tarixi"><i class="fas fa-history"></i></span> -->
          <span class="ntf_btn" title="O'qilgan qilib belgilash" @click="setAllNotificationsRead"
            ><i class="mdi mdi-checkbox-multiple-marked-outline"></i
          ></span>
        </div>
        <div class="ntf_body">
          <div class="notification" v-for="(nt, i) in notifications" :key="i">
            <div class="ntf_msg">{{ nt.message }}</div>
            <div class="ntf_sent_time">{{ nt.sent_time }}</div>
          </div>
          <div class="no_ntf" v-if="notifications.length === 0">
            <div class="no_ntf_bell"><i class="mdi mdi-bell-off-outline"></i></div>
            <span class="no_ntf_msg">Xabarlar mavjud emas</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      popup: {
        msg: null,
        display: false
      },
      centrifuge: '',
      isProfileOpened: false,
      isNotificationOpened: false,
      user: {
        username: 'Avazbek',
        id: 413
      },
      languages: [
        { img: 'RU', code: 'ru', name: 'Русский' },
        { img: 'UZ', code: 'uz', name: 'Ўзбекча' },
        { img: 'GB', code: 'en', name: 'English' },
        { img: 'UZ', code: 'la', name: 'Oʻzbekcha' }
      ],
      hideLang: false,
      globSearch: null,
      searchResult: [],
      notifications: [],
      isMobile: false,
      userInfo: JSON.parse(localStorage.getItem('auth_users')),
    }
  },
  props: {
    value: Boolean // Define a value prop of type Boolean
  },
  mounted() {},
  computed: {
    currentLang() {
      return this.getPlatonLocaleLang()
    }
  },
  methods: {
    openInput() {
      let searchBar = document.querySelector('.search_platform')
      if (searchBar.style.display == 'none') {
        searchBar.style.display = 'flex'
        document.querySelector('.header_logo').style.display = 'none'
        searchBar.style.marginRight = 0
        searchBar.style.order = '-1'
        searchBar.style.width = '300px'
      } else {
        searchBar.style.display = 'none'
        document.querySelector('.header_logo').style.display = 'flex'
        searchBar.style.marginRight = '200px'
        searchBar.style.order = 'initial'
      }
    },

    hideLeftSidebar() {
      this.isMobile = !this.isMobile
      this.$emit('hide-sidebar', this.isMobile)
    },

    popupIt(msg) {
      this.popup.msg = msg
      this.popup.display = true
    },
    closeAllModals(event) {
      if (
        !event.target.closest('.notifications_wrapper') &&
        !event.target.closest('.modal-message') &&
        !event.target.closest('.topbar_notifications-btn')
      ) {
        this.popup.display = false
        this.isNotificationOpened = false
      }
    },

    async globalSearch() {
      await this.api.post('v1/search', { query: this.globSearch.toLowerCase() }).then((res) => {
        const result = res.data.data
        this.searchResult = result.search_result
        // console.log("result", result);
      })
    },

    emptyInput() {
      // setTimeout(() => {
      this.searchResult = []
      this.globSearch = null
      // }, 1000);
    },
    toggleLang() {
      this.hideLang = !this.hideLang
    },
    getPlatonLocaleLang() {
      let forceLang = localStorage.getItem('platon_locale')
      let enableLang = forceLang || 'uz'
      return this.languages.find((item) => item.code == enableLang).name
    },

    changeLanguage(item) {
      this.hideSelect = !this.hideSelect
      localStorage.setItem('platon_locale', item.code)
      // location.reload()
    },
    openProfile() {
      this.isProfileOpened = !this.isProfileOpened
    },
    logout() {
          localStorage.removeItem('auth_users')
          location.reload()
    }
  }
}
</script>
<style>
/* ------------- POP UP MESSAGE ---------------- */
.modall {
  position: fixed; /* Stay in place */
  z-index: 10000; /* Sit on top */
  padding-top: 200px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.burger {
  width: 35px;
  height: 35px;
  background: transparent;
  border: none;
  transition: transform 0.05s ease-in-out;
  cursor: pointer;
}
.modal-message {
  background-color: #fefefe;
  margin: 0 auto;
  padding: 1.5rem;
  border: 1px solid #888;
  width: 25%;
  border-radius: 10px;
  position: relative;
  padding-top: 2rem;
}
.bars {
  width: 61%;
  transform: rotate(90deg);
}
.bars_rotate {
  transform: rotate(270deg);
}
.popup-close {
  position: absolute;
  top: 0.3rem;
  right: 0.5rem;
  font-size: 1.3rem;
  cursor: pointer;
}

.hidden {
  display: none;
}

/* ------------------------- SEARCH -------------------------------*/
.backg_window {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  transform: scale(0);
}
.backg_window.active {
  z-index: 99;
  transform: scale(1);
}
.search_platform {
  position: relative;
  max-width: 600px;
  width: 100%;
  margin-right: 200px;
  display: flex;
  align-items: center;
}
.search_platform-input {
  background: none;
  outline: none;
  border: none;
  position: relative;
  width: 600px;
  border: 1px solid #e5f0ff;
  border-radius: 10px;
  background: var(--5, #fff);
  padding: 15px 10px;
  z-index: 9999;
  transition: all 0.3s ease;
}
.search_platform-input:focus {
  border: 1px solid #0066ff;
}
.search_image {
  position: absolute;
  cursor: pointer;
  right: 14px;
  top: 14px;
  z-index: 9999;
}
.search_result-list {
  position: absolute;
  top: calc(100% + 22px);
  left: 0;
  padding: 15px 10px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--11, #e5f0ff);
  background: var(--5, #fff);
  box-shadow:
    0px 18px 88px -4px rgba(24, 39, 75, 0.14),
    0px 8px 28px -6px rgba(24, 39, 75, 0.12);
  opacity: 0;
  max-height: 210px;
  overflow-y: scroll;
  z-index: -999;
  transition: all 0.3s ease-in-out;
}
.search_result-list.active {
  opacity: 1;
  z-index: 9999;
}
.search_result-item {
  width: 100%;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search__result__item-text {
  color: var(--2, #1a1a1a);
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
}

.search__result__item-status {
  color: var(--2, #1a1a1a);
  font-size: 11px;
  font-weight: 400;
  line-height: 120%;
  opacity: 0.7;
}

.search_result-item:hover {
  background: var(--11, #e5f0ff);
  color: #0066ff;
}
.search_platform.hide-topbar {
  z-index: -1 !important;
}

.topbar.hide-topbar {
  position: unset !important;
}

/*----------------------------NEW PROFILE-----------------------------*/
.profile_container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}
.topbar_notifications {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: 60px;
}
.new_profile-wrapper {
  position: relative;
  max-height: 52px;
  height: 100%;
  overflow: hidden;
  transition: all 0.4s ease-in-out;
}
.new_profile-wrapper.active {
  /* max-height: 400px; */
  overflow: visible;
}
.new_profile-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.new_profile-ava {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid var(--11, #e5f0ff);
  transition: all 0.3s ease;
  object-fit: cover;
  /*   border: 2px solid #06f; */
}
.new_profile-ava.active {
  border: 2px solid #06f;
}
.new_profile-menu {
  position: absolute;
  top: calc(100% + 22px);
  right: calc(100% - 50px);
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  border-radius: 10px;
  border: 1px solid var(--11, #e5f0ff);
  background: var(--5, #fff);
  box-shadow:
    0px 18px 88px -4px rgba(24, 39, 75, 0.14),
    0px 8px 28px -6px rgba(24, 39, 75, 0.12);
  opacity: 0;
  transition: all 0.3s ease-in-out;
}
.new_profile-menu.active {
  opacity: 1;
  z-index: 9999;
}
.new_profile_menu-item.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #ff3838;
}
.new_profile_menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: 10px;
  background: var(--4, #f3f3f3);
  width: 100%;
  padding: 10px 15px;
  color: var(--2, #1a1a1a);
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
  transition: all 0.3s ease;
  border: none;
}
.new_profile_menu-item:hover {
  opacity: 0.7;
}
.new_profile_menu-item img {
  width: 14px;
}
.new_profile_menu-item-lang {
  cursor: pointer;
  border-radius: 10px;
  background: var(--4, #f3f3f3);
  width: 100%;
  padding: 10px 15px;
  color: var(--2, #1a1a1a);
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
  max-height: 38px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.new_profile-language-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  transition: all 0.3s ease;
}
.new_profile_menu-item-lang.active {
  max-height: 300px;
}
.language_list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.language_list-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.profile_line {
  display: block;
  width: 100%;
  background: #f3f3f3;
  height: 2px;
  margin: 10px 0;
}
.new_profile-arrow {
  filter: brightness(0.5);
  transition: all 0.3s ease;
}
.new_profile-arrow.active {
  filter: brightness(1);
  transform: rotate(-180deg);
}
.lang_arrow {
  /*   transform: rotate(-180deg); */
  transition: all 0.3s ease;
}
.lang_arrow.active {
  transform: rotate(180deg);
}
.header_logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  width: 100%;
  display: none;
}
.search_mobile {
  display: none;
}
/* ----------------- NOTIFICATIONS ------------------------ */

.topbar_notifications-btn {
  cursor: pointer;
  position: relative;
}

.ntf_count {
  position: absolute;
  top: -12px;
  left: -12px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--1, #06f);
  color: var(--5, #fff);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
}

.notifications_wrapper {
  display: none;
  position: absolute;
  top: 4rem;
  right: 8vw;
  width: 25rem;
  height: 25rem;
  background: white;
  box-shadow: 0px 0px 7px 0px #c9c9c9;
  border-radius: 10px;
  overflow: hidden;
  max-width: 90vw;
}
.notifications_wrapper.active {
  display: flex;
  flex-direction: column;
}

.notification {
  padding: 0.5rem 1rem;
  color: #56678f;
  border-radius: 10px;
  background: #f3f3f3;
  margin: 0.5rem;
  cursor: pointer;
  transition: 0.4s;
}

.notification:hover {
  transform: scale(0.95);
}

.ntf_header {
  height: 3.3rem;
  background: #448fff;
  color: white;
  padding: 0 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.ntf_body {
  flex: 1;
  overflow-y: scroll;
}

.ntf_title {
  flex: 1;
  font-weight: 600;
}

.ntf_btn {
  padding: 7px;
  background: white;
  color: #448fff;
  line-height: 1;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.4s;
}

.ntf_btn:hover {
  background: #448fff;
  color: white;
}

.ntf_msg {
  cursor: pointer;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.ntf_sent_time {
  font-size: 12px;
}

.no_ntf {
  color: #123870;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  align-items: center;
}

.no_ntf_bell {
  font-size: 4rem;
}

.no_ntf_msg {
  font-size: 1.2rem;
}
@media only screen and (max-width: 1400px) {
  .search_platform {
    margin-right: 40px;
  }
  .new_profile-wrapper {
    width: 100%;
  }
}
@media only screen and (max-width: 1200px) {
  .form-layout,
  .platon-dialog {
    padding-top: 65px;
  }
}
@media only screen and (max-width: 768px) {
  .tg_txt {
    display: none;
  }
  .topbar {
    z-index: 9 !important;
  }
  .right_bar h3 {
    display: none;
  }
  .search_platform {
    display: none;
  }
  .topbar_notifications,
  .new_profile-wrapper {
    display: flex;
    transition: all 0.3s ease;
  }
  .content.collapsed .topbar_notifications,
  .content.collapsed .new_profile-wrapper {
    display: none;
  }

  .search_mobile,
  .header_logo {
    display: none;
    transition: all 0.3s ease;
  }
  .content.collapsed .search_mobile,
  .content.collapsed .header_logo {
    display: flex;
  }
}

@media only screen and (max-width: 400px) {
  .notifications_wrapper {
    left: 10px;
    right: 10px;
  }
}
</style>
