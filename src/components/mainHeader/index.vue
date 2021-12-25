<template>
  <header class="header">
    <div class="container">
      <div class="header__search">
        <div class="header__burger" @click="$emit('toggleDesktopMenu')">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <img
          src="@/assets/images/icons/search.svg"
          class="header__search-icon"
          alt="search"
        />
        <input
          type="text"
          placeholder="Поиск..."
          class="header__inp"
          @input="$emit('search', $event.target.value)"
        />
        <div class="header__toggle-cards">
          <button
            class="header__toggle-btn"
            v-if="position == 'grid'"
            @click="togglePostion('column')"
          >
            <img src="@/assets/images/icons/column.svg" alt="column" />
          </button>
          <button
            class="header__toggle-btn"
            v-if="position == 'column'"
            @click="togglePostion('grid')"
          >
            <img src="@/assets/images/icons/grid.svg" alt="grid" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
  data() {
    return {
      position: "grid",
    };
  },
  created() {
    if (localStorage.position) {
      this.position = localStorage.position;
      this.$emit("togglePostion", this.position);
    }
  },
  methods: {
    togglePostion(position) {
      this.position = position;
      localStorage.setItem("position", position);
      this.$emit("togglePostion", position);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding-top: 8px;
  width: 100%;
  display: flex;
  align-items: center;

  &__search {
    min-width: 100%;
    height: 50px;
    padding: 0 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $main-col;
    border-radius: 13px;
  }

  &__burger {
    margin-right: 15px;
    width: 25px;
    height: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    span {
      display: block;
      width: 100%;
      height: 2px;
      border-radius: 0px;
      background-color: #fff;
    }

    @media (max-width: 1160px) {
      display: none;
    }
  }

  &__search-icon {
    width: 24px;
    opacity: 0.5;
  }

  &__inp {
    height: 50px;
    width: calc(100% - 24px);
  }

  &__toggle-cards {
    display: flex;
    align-items: center;
  }

  &__toggle-btn {
    width: 24px;
    height: 24px;
    padding: 0;
    background-color: transparent;
    z-index: 9;
    img {
      width: 24px;
    }
  }
}
</style>