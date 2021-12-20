<template>
  <div class="banner container">
    <div class="banner__content">
      <div class="banner__left">
        <h1 class="banner__hi">
          Hi, {{ user ? `${user.name} ${user.surname}` : "User" }}
        </h1>
        <div class="banner__date-time">
          <p class="banner__time">{{ fullTime }}</p>
          <p class="banner__date">{{ fullDate }}</p>
        </div>
      </div>

      <div class="banner__right">
        <h2 class="banner__tasks-number">10</h2>
        <p class="banner__tasks-text">Задач</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      fullDate: "",
      fullTime: "",
      user: "",
    };
  },
  mounted() {
    if (localStorage.user) this.user = JSON.parse(localStorage.user);

    this.date();
    setInterval(this.date, 1000);
  },
  methods: {
    date() {
      const date = new Date();

      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 < 10
          ? "0" + Number(date.getMonth() + 1)
          : date.getMonth() + 1;
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      const hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

      this.fullDate = `${day}.${month}.${year}`;
      this.fullTime = `${hours}:${minutes}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  &__content {
    height: 150px;
    padding: 13px 15px;
    border-radius: 13px;
    display: flex;
    justify-content: space-between;
    background-color: $brand-col;
    background: linear-gradient(to bottom right, $brand-col, #FFC709);
  }

  &__left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__hi {
    max-width: 60%;
    font-size: 23px;
    line-height: 1;
  }
  &__time {
    font-size: 23px;
    font-weight: 700;
  }
  &__date {
    font-size: 12px;
    font-weight: 600;
  }

  &__right {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  &__tasks-number {
    font-size: 27px;
    line-height: 1;
  }
  &__tasks-text {
    font-size: 13px;
  }
}
</style>