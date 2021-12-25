<template>
  <transition name="slide-fade">
    <div class="modal-window" v-if="open">
      <div class="container">
        <div class="modal-window__header">
          <div class="modal-window__back" @click="toggle">
            <img src="@/assets/images/icons/arrow-left.svg" alt="arrow" />
          </div>
          <p class="modal-window__title">Задача</p>
        </div>
        <add-task v-if="modalName == 'add-task'" />
        <open-task v-if="modalName == 'open-task'" />
      </div>
    </div>
  </transition>
</template>

<script>
import AddTask from "@/components/modalWindow/modalBodies/addTask";
import OpenTask from "@/components/modalWindow/modalBodies/openTask";

export default {
  name: "ModalWindow",
  components: {
    AddTask,
    OpenTask,
  },
  data() {
    return {
      open: false,
      modalName: "",
    };
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
  z-index: 99;

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