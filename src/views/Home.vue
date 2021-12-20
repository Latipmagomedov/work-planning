<template>
  <div class="home">
    <StartScreen v-if="!auth" @closeStartScreen="auth = true" />
    <div class="home__content" v-if="auth">
      <Header @search="search" />
      <Banner class="home__banner" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import Banner from "@/components/banner";
import StartScreen from "@/components/startScreen";

export default {
  name: "Home",
  components: {
    Header,
    Banner,
    StartScreen,
  },
  data() {
    return {
      auth: false,
    };
  },
  mounted() {
    if (localStorage.auth) {
      this.auth = true;
    } else {
      this.auth = false;
    }
  },
  methods: {
    search(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  &__banner {
    margin-top: 7px;
  }
}
</style>