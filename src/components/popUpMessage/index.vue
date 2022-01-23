<template>
  <transition name="fade">
    <div class="message container" v-show="isOpen">
      <div class="message__content">
        <h3 class="message__title">{{ content.title }}</h3>
        <p class="message__desc">{{ content.desc }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      isOpen: false,
      content: {
        title: "",
        desc: "",
      },
    };
  },
  methods: {
    open(title, desc, time) {
      this.isOpen = true;
      this.content.title = title;
      this.content.desc = desc;
      if (this.isOpen === true) {
        setTimeout(() => {
          this.isOpen = false;
        }, time);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  z-index: 9999;

  &__content {
    padding: 13px 20px;
    border-radius: 8px;
    background-color: $main-col;
  }

  &__title {
    font-size: 20px;
  }

  &__desc {
    margin-top: 8px;
    font-size: 15px;
  }
}
</style>