<template>
  <div class="sign container">
    <div class="sign__content">
      <div class="sign__auth">
        <h2 class="sign__title">
          {{ formType === "register" ? "Регистрация" : "Вход" }}
        </h2>
        <div class="sign__form">
          <div
            class="sign__inp"
            :class="{
              sign__inp_error:
                $v.form.name.$dirty &&
                (!$v.form.name.required || !$v.form.name.minLength),
            }"
          >
            <input
              type="text"
              id="name"
              autocomplete="off"
              placeholder="Ваш логин"
              v-model="form.name"
            />
            <label
              for="name"
              class="sign__label"
              v-if="$v.form.name.$dirty && !$v.form.name.required"
              >Это обязательное поле</label
            >
            <label
              for="name"
              class="sign__label"
              v-if="$v.form.name.$dirty && !$v.form.name.minLength"
              >Минимальное количество символов 4</label
            >
          </div>
          <div
            class="sign__inp"
            :class="{
              sign__inp_error:
                $v.form.name.$dirty &&
                (!$v.form.password.required || !$v.form.password.minLength),
            }"
          >
            <input
              type="password"
              placeholder="Пароль"
              v-model="form.password"
            />
            <label
              for="name"
              class="sign__label"
              v-if="$v.form.password.$dirty && !$v.form.password.required"
              >Это обязательное поле</label
            >
            <label
              for="name"
              class="sign__label"
              v-if="$v.form.password.$dirty && !$v.form.password.minLength"
              >Минимальное количество символов 8</label
            >
          </div>
          <div
            class="sign__inp"
            :class="{
              sign__inp_error:
                $v.form.name.$dirty &&
                (!$v.form.confirmPassword.required ||
                  !$v.form.confirmPassword.minLength ||
                  !$v.form.confirmPassword.sameAsPassword),
            }"
            v-if="formType === 'register'"
          >
            <input
              type="password"
              placeholder="Повторите пароль"
              v-model="form.confirmPassword"
            />
            <label
              for="name"
              class="sign__label"
              v-if="
                $v.form.confirmPassword.$dirty &&
                !$v.form.confirmPassword.required
              "
              >Это обязательное поле</label
            >
            <label
              for="name"
              class="sign__label"
              v-if="
                $v.form.confirmPassword.$dirty &&
                !$v.form.confirmPassword.minLength
              "
              >Минимальное количество символов 8</label
            >
            <label
              for="name"
              class="sign__label"
              v-if="
                $v.form.confirmPassword.$dirty &&
                $v.form.confirmPassword.minLength &&
                $v.form.confirmPassword.required &&
                !$v.form.confirmPassword.sameAsPassword
              "
              >Пароли не совпадают</label
            >
          </div>

          <div class="sign__toggle" @click="toggleForm">
            {{
              formType === "register"
                ? "У меня уже есть аккаунт"
                : "У меня нет аккаунта"
            }}
          </div>

          <div class="sign__btns">
            <button
              class="sign__btn-next"
              :class="{ 'sign__btn-next_login': formType === 'login' }"
              @click="next"
            >
              Продолжить
            </button>
            <button
              class="sign__btn-camera"
              v-if="formType === 'login'"
              @click="openCamera"
            >
              <img src="@/assets/images/icons/qr.svg" alt="qr" />
            </button>
          </div>
        </div>
      </div>

      <full-modal-window>
        <template slot="body">
          <camera-scanner v-if="this.$store.getters.modalName === 'camera'" />
        </template>
      </full-modal-window>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import CameraScanner from "@/components/fullModalWindow/modalBodies/cameraScanner";

export default {
  components: {
    CameraScanner,
  },
  data() {
    return {
      formType: "register",
      camera: false,
      form: {
        name: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  validations() {
    if (this.formType === "register") {
      return {
        form: {
          name: {
            required,
            minLength: minLength(4),
          },
          password: {
            required,
            minLength: minLength(8),
          },
          confirmPassword: {
            required,
            minLength: minLength(8),
            sameAsPassword: sameAs("password"),
          },
        },
      };
    } else {
      return {
        form: {
          name: {
            required,
            minLength: minLength(4),
          },
          password: {
            required,
            minLength: minLength(8),
          },
        },
      };
    }
  },
  methods: {
    next() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.formType === "register") {
        this.register();
      } else {
        this.login();
      }
    },
    async register() {
      try {
        const body = {
          username: this.form.name,
          password: this.form.password,
        };
        await this.$auth.signUp(body);
        this.toggleForm();
      } catch (error) {
        this.$message.open({
          title: "Ошибка",
          text: error.response.data.message,
          type: "error",
          time: 3000,
        });
        console.log(error.response);
      }
    },
    async login() {
      const body = {
        username: this.form.name,
        password: this.form.password,
      };
      try {
        const response = await this.$auth.signIn(body);
        this.$store.dispatch("user/login", response.token);
        this.$router.push("/");
      } catch (error) {
        this.$message.open({
          title: "Ошибка",
          text: error.response.data.message,
          type: "error",
          time: 3000,
        });
        console.log(error.response);
      }
    },
    toggleForm() {
      if (this.formType === "register") {
        this.formType = "login";
      } else {
        this.formType = "register";
      }
    },
    openCamera() {
      this.$store.dispatch("modal/toggle", "camera");
    },
  },
};
</script>

<style lang="scss" scoped>
$pc-version: 480px;
.sign {
  width: 100%;
  max-width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;

  &__content {
    height: 100%;
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (min-width: $pc-version) {
      width: 100%;
      max-width: 900px;
      height: 100%;
      padding-bottom: 100px;
      justify-content: center;
    }
  }

  &__auth {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (min-width: $pc-version) {
      max-width: 450px;
    }
  }

  &__title {
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

    input {
      width: 100%;
    }

    &_error input {
      border: 1px solid $error;
    }
  }

  &__label {
    display: block;
    margin-top: 3px;
    margin-bottom: 3px;
    margin-left: 3px;
    color: $error;
    font-size: 10px;
  }

  &__btns {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  &__btn-next {
    width: 170px;
    height: 50px;
    border-radius: 13px;
    font-size: 16px;

    &_login {
      width: 80%;
    }
  }

  &__btn-camera {
    width: 17%;
    height: 50px;
    border-radius: 13px;
    font-size: 16px;

    img {
      max-width: 24px;
    }
  }

  &__toggle {
    margin-top: 7px;
    color: $brand-col;
    font-size: 13px;
    cursor: pointer;
  }
}
</style>
