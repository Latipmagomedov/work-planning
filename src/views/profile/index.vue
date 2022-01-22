<template>
  <div class="profile">
    <div class="profile__content">
      <desktop-menu ref="desktopMenu"/>
      <div class="profile__wrapper container">
        <div class="profile__info">
          <div class="profile__info-wrapper" v-if="!qrCodeOpne">
            <div class="profile__upload">
              <div class="profile__btn" @click="toggleQrCode">
                <img src="@/assets/images/icons/qr.svg" alt="qr">
              </div>
              <div class="profile__ava" v-if="!imageUrl">{{ user.username ? user.username[0].toUpperCase() : 'U' }}
              </div>
              <div class="profile__ava"
                   v-if="imageUrl"
                   :style="{backgroundImage: `url(${imageUrl})`}"
              ></div>
              <div class="profile__btn" v-if="!imageUrl">
                <p>+</p>
                <input type="file" @change="uploadImage">
              </div>
              <div class="profile__btn" v-if="imageUrl" @click="deleteImage">
                <img src="@/assets/images/icons/x.svg" alt="remove">
              </div>
            </div>
            <div class="profile__name">{{ user.username ? user.username : 'User' }}</div>
            <button class="profile__signout" @click="logout">Выйти</button>
          </div>
          <qr-code v-if="qrCodeOpne" @closeQrCode="toggleQrCode"/>
        </div>
      </div>
    </div>
    <nav-menu/>
  </div>
</template>

<script>
import DesktopMenu from "@/components/desktopMenu";
import NavMenu from "@/components/navMenu";
import QrCode from "@/components/qrCode";

export default {
  components: {
    NavMenu,
    DesktopMenu,
    QrCode
  },
  data() {
    return {
      user: '',
      imageUrl: '',
      qrCodeOpne: false,
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.$load(async () => {
        const response = await this.$profile.getProfile();
        this.user = response.data
        if (response.data.profileImage) {
          this.imageUrl = `${process.env.VUE_APP_BASE_API}${response.data.profileImage}`
        }
      })
    },
    uploadImage(e) {
      const file = e.target.files
      const formData = new FormData()
      formData.append('files', file[0])

      this.$load(async () => {
        const response = await this.$profile.uploadImage(formData)
        if (response.data) {
          this.imageUrl = `${process.env.VUE_APP_BASE_API}${response.data}`
        }
      })
    },
    deleteImage() {
      this.$load(async () => {
        await this.$profile.deleteImage()
        this.imageUrl = ''
      })
    },
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push('/auth')
    },
    toggleQrCode() {
      this.qrCodeOpne = !this.qrCodeOpne
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
    height: 400px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $main-col;
  }

  &__info-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__upload {
    display: flex;
    align-items: center;
  }

  &__ava {
    width: 100px;
    height: 100px;
    margin: 0 15px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $brand-col;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-size: 40px;
    font-weight: 700;
  }

  &__btn {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #595959;
    overflow: hidden;
    cursor: pointer;

    p {
      font-size: 35px;
    }

    input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
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
