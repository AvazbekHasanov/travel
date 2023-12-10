<template>
  <div>
    <ul class="pagination" v-show="pages > 1">
      <li
        class="btn_pagination"
        @click="navigateToPreviousSet"
        :class="{ disabled: currentPage === 1 }"
      ></li>
      <li
        class="items_pagination"
        v-for="page in displayedPages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="setCurrentPage(page)"
      >
        {{ page }}
      </li>
      <li
        class="btn_pagination"
        @click="navigateToNextSet"
        :class="{ disabled: currentPage === pages }"
      >
        <!-- Next button content -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentPage: 1,
      pages: 20, // Initialize this to the total number of pages
      buttonsPerPage: 5,
      currentSetStart: 1
    }
  },
  computed: {
    displayedPages() {
      const end = Math.min(this.currentSetStart + this.buttonsPerPage - 1, this.pages)
      return Array.from(
        { length: end - this.currentSetStart + 1 },
        (_, index) => this.currentSetStart + index
      )
    },

    methods: {
      name() {}
    },

    currentSetEnd() {
      return Math.min(this.currentSetStart + this.buttonsPerPage - 1, this.pages)
    }
  },
  methods: {
    navigateToPreviousSet() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.setCurrentPage(this.currentPage)
        if (this.currentSetEnd < this.currentPage) {
          this.currentSetStart += this.buttonsPerPage
        }
      }
    },
    setCurrentPage(page) {
      this.currentPage = page
      const currentPageSet = Math.ceil(page / this.buttonsPerPage)
      if (this.currentPage + 1 === this.currentSetStart + this.buttonsPerPage - 1) {
        this.currentSetStart = this.currentSetStart + 1
      } else {
        this.currentSetStart = (currentPageSet - 1) * this.buttonsPerPage + 1
      }
    },
    navigateToNextSet() {
      if (this.currentPage < this.pages) {
        this.currentPage++
        this.setCurrentPage(this.currentPage)
        if (
          this.currentPage + 1 === this.currentSetStart + this.buttonsPerPage - 1 &&
          this.currentPage + 1 === this.pages
        ) {
          this.currentSetStart = this.currentSetStart + 1
        }
      }
    }
  }
}
</script>

<style>
/*.test__bottom */
.pagination {
  display: flex;
  list-style-type: none;
  padding: 0;
}

.btn_pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  background: #06f;
  color: #fff;
  padding: 10px 20px;
  border: 1px solid #06f;
}
.btn_pagination svg path {
  fill: #fff;
}
.pagination li {
  /* display: flex; */
  margin: 5px;
  text-decoration: none;
  cursor: pointer;
}
.pagination li:not(.btn_pagination) {
  color: #606060;
  padding: 10px 10px;
}

.pagination li.active {
  color: #06f;
  border-radius: 5px;
}

.pagination li:hover:not(.active) {
  background-color: #ddd;
  border-radius: 5px;
}

.pagination li:hover:not(.items_pagination) {
  color: #06f;
  background-color: #fff;
  border: 1px solid #06f;
  border-radius: 10px;
}

.pagination :hover svg path {
  fill: #06f;
}

.pagination li.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/*.test__bottom */
</style>
