<template>
  <div class="favorites">
    <div class="favorites__content">
      <desktop-menu ref="desktopMenu"/>
      <div class="favorites__wrapper container">
        <div class="favorites__no-content">
          <h1>Страница в разработке</h1>
        </div>
      </div>
    </div>
    <nav-menu/>
  </div>
</template>

<script>
import DesktopMenu from "@/components/desktopMenu";
import NavMenu from "@/components/navMenu";

export default {
  components: {
    NavMenu,
    DesktopMenu
  }
};
</script>

<style lang="scss" scoped>
.favorites {
  &__no-content {
    width: 100% !important;
    height: 100vh !important;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 20px;
      text-align: center;
    }
  }
}
</style>
