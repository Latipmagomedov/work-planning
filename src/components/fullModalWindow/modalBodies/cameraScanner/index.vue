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
      show: false
    }
  },
  mounted() {
    this.show = true
  },
  methods: {
    onDecode(decodedString) {
      if (decodedString) {
        this.$store.dispatch("user/login", decodedString);
        this.$store.dispatch("modal/toggle");

        this.$load(async () => {
          const response = await this.$profile.getProfile();
          if (response.data.username) await this.$router.push("/");
          else this.$message.open("Ошибка", "Пользователь не существует", 3000);
        });
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
