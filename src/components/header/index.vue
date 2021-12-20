<template>
  <header class="header">
    <div class="container">
      <div class="header__search">
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
  name: "Header",
  data() {
    return {
      position: "grid",
    };
  },
  methods: {
    togglePostion(position) {
      this.position = position;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;

  &__search {
    min-width: 100%;
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $main-col;
    border-radius: 8px;
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