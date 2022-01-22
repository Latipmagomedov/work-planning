<template>
  <div class="camera">
    <div class="camera__header">
      <div class="camera__close" @click="$emit('close')">
        <img src="@/assets/images/icons/x.svg" alt="close">
      </div>
    </div>
    <div class="camera__wrapper">
      <qrcode-stream class="camera__stream"
                     @decode="onDecode"></qrcode-stream>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onDecode(decodedString) {
      this.$emit('scanned', decodedString)
    }
  }
}
</script>

<style lang="scss" scoped>
.camera {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $bg-col;

  &__header {
    max-width: 400px;
    width: 90%;
    height: 60px;
    display: flex;
    align-items: center;
  }

  &__close img {
    max-width: 20px;
  }

  &__wrapper {
    max-width: 400px;
    width: 90%;
    height: calc(100vh - 100px);
    display: flex;
    align-items: center;
  }


  &__stream {
    width: 100%;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>
