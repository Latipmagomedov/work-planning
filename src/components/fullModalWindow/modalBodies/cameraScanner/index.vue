<template>
  <transition name="bounce">
    <div class="camera" v-if="show">
      <qrcode-stream class="camera__stream" @decode="onDecode"></qrcode-stream>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    async onDecode(decodedString) {
      if (decodedString) {
        this.$store.dispatch("user/login", decodedString);
        this.$store.dispatch("modal/toggle");

        const response = await this.$profile.getProfile();
        if (response.data.username) this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss">
.camera {
  width: 100%;
  max-width: 350px;
  height: 300px;
  border-radius: 8px;
  border: 1px solid #ffffff36;
  overflow: hidden;

  &__stream {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>
