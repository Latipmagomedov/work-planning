<template>
  <transition name="fade">
    <div class="message container" v-if="isOpen">
      <div
        class="message__content"
        :class="{
          message__content_error: type === 'error',
          message__content_success: type === 'success',
        }"
      >
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
      type: "default",
      content: {
        title: "",
        desc: "",
      },
    };
  },
  methods: {
    open(parapms) {
      this.isOpen = true;
      this.type = parapms.type;
      this.content.title = parapms.title;
      this.content.desc = parapms.text;
      if (this.isOpen === true) {
        setTimeout(() => {
          this.isOpen = false;
        }, parapms.time);
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
  max-width: 480px;
  z-index: 9999;

  &__content {
    padding: 13px 15px;
    border-radius: 8px;
    background-color: $main-col;

    &_error {
      background-color: $error;
    }

    &_success {
      background-color: $brand-col;
    }
  }

  &__title {
    font-size: 20px;
  }

  &__desc {
    margin-top: 3px;
    font-size: 15px;
  }
}
</style>