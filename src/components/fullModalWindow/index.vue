<template>
  <transition name="fade">
    <div class="modal-window" v-if="this.$store.getters.modalName">
      <div class="modal-window__warapper container">
        <div class="modal-window__header">
          <div
            class="modal-window__back"
            @click="$store.dispatch('modal/toggle')"
          >
            <img src="@/assets/images/icons/arrow-left.svg" alt="close" />
          </div>
        </div>
        <div class="modal-window__content">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CameraScanner from "@/components/fullModalWindow/modalBodies/cameraScanner";
export default {
  name: "fullModalWindow",
  components: {
    CameraScanner,
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

  &__warapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

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

  &__content {
    width: 100%;
    height: calc(100vh - 130px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
