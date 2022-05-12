<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div class="notification" :style="style" v-show="visible" @mouseenter="clearTimer" @mouseleave="createTimer">
      <div class="notification__wrapper" :style="{backgroundColor: bg}">
        <div class="notification__header">
          <div class="notification__title">{{ title }}</div>
          <button class="notification__close" @click.stop.prevent="handleClose">
            <img src="@/assets/images/icons/x.svg" alt="close">
          </button>
        </div>

        <p class="notification__description">{{ description }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    title: {
      type: String,
      required: true
    },
    description: String,
    bg: {
      type: String,
      default: '#1771f1'
    }
  },
  data() {
    return {
      visible: true
    }
  },
  computed: {
    style() {
      return {}
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    afterLeave() {
      this.$emit('closed')
    },
    afterEnter() {
    },
    clearTimer() {
    },
    createTimer() {
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  right: 20px;
  top: 20px;
  width: 300px;
  z-index: 999;

  @media (max-width: 550px) {
    right: 0;
    left: 50%;
    transform: translate(-50%);
    width: calc(100% - 28px);
  }

  &__wrapper {
    position: relative;
    padding: 13px 18px;
    border-radius: 13px;
    background-color: $brand-col;
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    max-width: calc(100% - 90px);
    font-size: 18px;
  }

  &__close {
    width: 25px;
    height: 25px;
    padding: 0;
    background-color: transparent;

    img {
      width: 18px;
    }
  }

  &__description {
    margin-top: 10px;
    font-size: 13px;
  }
}
</style>
