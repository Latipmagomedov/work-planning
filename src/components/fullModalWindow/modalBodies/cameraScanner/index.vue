<template>
  <div class="camera" v-if="show">
    <qrcode-stream class="camera__stream" @decode="onDecode"></qrcode-stream>
  </div>
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

        try {
          const response = await this.$profile.getProfile();
          if (response.username) this.$router.push("/");
        } catch (error) {
          // this.$message.open({
          //   title: "Ошибка",
          //   text: error.response.data.message,
          //   type: "error",
          //   time: 3000,
          // });
          console.log(error.response);
        }
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
