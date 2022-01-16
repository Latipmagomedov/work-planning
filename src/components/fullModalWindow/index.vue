<template>
  <transition name="slide-fade" v-if="$store.getters.modalName">
    <div class="modal-window">
      <div class="container"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "fullModalWindow",
  data() {
    return {
      open: false,
      modalName: "",
    };
  },
  computed: {
    name() {
      return this.$store.getters.modalName
    }
  },
  methods: {
    toggle(name) {
      this.open = !this.open;
      this.open ? (this.modalName = name) : (this.modalName = "");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $bg-col;
  z-index: 990;

  &__header {
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__back {
    display: flex;
    align-items: center;
    width: 30px;
    height: 40px;
    cursor: pointer;

    img {
      width: 28px;
    }
  }

  &__title {
    color: $brand-col;
    font-size: 16px;
  }
}
</style>
