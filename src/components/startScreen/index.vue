<template>
  <div class="start-screen">
    <div class="start-screen__content-greetings container" v-if="step == 1">
      <div class="start-screen__illustration-greetings"></div>
      <div class="start-screen__bottom-greetings">
        <p class="start-screen__subtitle-greetings">Task Management</p>
        <h2 class="start-screen__title-greetings">
          Создавайте свои задачи, планируйте свой день
        </h2>
        <button class="start-screen__btn" @click="next">Продолжить</button>
      </div>
    </div>
    <div class="start-screen__content-acquaintance container" v-if="step == 2">
      <div class="start-screen__illustration-acquaintance"></div>
      <div class="start-screen__bottom-acquaintance">
        <h2 class="start-screen__title-acquaintance">Давайте познакомимся</h2>
        <div class="start-screen__form">
          <input
            type="text"
            class="start-screen__inp"
            placeholder="Ваше имя"
            v-model="form.name"
          />
          <input
            type="text"
            class="start-screen__inp"
            placeholder="Ваша фамилия"
            v-model="form.surname"
          />
          <button class="start-screen__btn" @click="next">Продолжить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      form: {
        name: "",
        surname: "",
      },
    };
  },
  methods: {
    next() {
      this.step++;
      if (this.step == 3) {
        localStorage.setItem("auth", JSON.stringify(true));
        if (this.form.name || this.form.surname) {
          localStorage.setItem("user", JSON.stringify(this.form));
        }

        this.$emit("closeStartScreen");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.start-screen {
  width: 100%;
  margin: 0 auto;
  min-height: 600px;
  height: 100vh;
  background-color: #000;

  &__content-greetings {
    height: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  &__illustration-greetings {
    margin-top: 40px;
    width: 300px;
    height: 330px;
    background-image: url(../../assets/images/illustrations/start-illustration.svg);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  &__bottom-greetings {
    width: 100%;
    padding-left: 10px;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__subtitle-greetings {
    color: $brand-col;
    font-size: 14px;
    font-weight: 500;
  }
  &__title-greetings {
    margin-top: 5px;
    max-width: 90%;
    font-size: 27px;
    line-height: 1.1;
  }
  &__btn {
    margin-top: 30px;
    width: 170px;
    height: 50px;
    border-radius: 13px;
    font-size: 16px;
  }

  &__content-acquaintance {
    height: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  &__illustration-acquaintance {
    margin-top: 40px;
    width: 300px;
    height: 330px;
    background-image: url(../../assets/images/illustrations/acquaintance.svg);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  &__bottom-acquaintance {
    width: 100%;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__title-acquaintance {
    font-size: 20px;
  }
  &__form {
    margin-top: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  &__inp {
    width: 100%;

    &:not(:first-child) {
      margin-top: 7px;
    }
  }
}
</style>