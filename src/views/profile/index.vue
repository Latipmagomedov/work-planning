<template>
  <div class="profile">
    <div class="profile__content">
      <desktop-menu ref="desktopMenu"/>
      <div class="profile__wrapper container">
        <div class="profile__info">
          <div class="profile__ava">{{ user.username ? user.username[0].toUpperCase() : 'U' }}</div>
          <div class="profile__name">{{ user.username ? user.username : 'User' }}</div>
          <button class="profile__signout" @click="logout">Выйти</button>
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
  },
  data() {
    return {
      user: ''
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const headers = {
        'Authorization': `Bearer ${this.$store.getters.token}`,
      }
      try {
        const response = await this.$auth.getProfile(headers);
        this.user = response.data
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    },
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push('/auth')
    }
  }
};
</script>

<style lang="scss" scoped>
.profile {
  padding-top: 30px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__info {
    width: 100%;
    max-width: 400px;
    height: 300px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $main-col;
  }

  &__ava {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $brand-col;
    font-size: 40px;
    font-weight: 700;
  }

  &__name {
    margin-top: 7px;
    font-size: 30px;
    font-weight: 600;
  }

  &__signout {
    margin-top: 30px;
    width: 120px;
    height: 35px;
    border-radius: 4px;
    font-size: 16px;
    background-color: $warning;
  }
}
</style>
