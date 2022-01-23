<template>
  <div class="qr-code">
    <div class="qr-code__close" @click="$emit('closeQrCode')">
      <img src="@/assets/images/icons/x.svg" alt="close">
    </div>
    <div class="qr-code__wrapper">
      <qrcode-vue :value="qrCode.value"
                  :size="qrCode.size"
                  background="#fff"
                  foreground="#000"
                  level="L"/>
    </div>
    <p class="qr-code__text">Сканируйте этот qr код через экран авторизации на телефоне и войдите в аккаут</p>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue
  },
  data() {
    return {
      qrCode: {
        value: this.$store.getters.token,
        size: 220,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.qr-code {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  &__close {
    position: absolute;
    right: 15px;
    top: 13px;
    cursor: pointer;

    img {
      max-width: 20px;
    }
  }

  &__wrapper {
    margin-top: 15px;
    padding: 15px;
    border-radius: 8px;
    background-color: #fff;
  }

  &__text {
    max-width: 300px;
    margin-top: 17px;
    font-size: 14px;
    text-align: center;
  }
}
</style>
