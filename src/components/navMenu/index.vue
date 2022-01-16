<template>
  <div class="nav-menu">
    <div class="nav-menu__wrapper container">
      <div class="nav-menu__buttons">
        <router-link
          tag="button"
          to="/"
          active-class="nav-menu__btn_active"
          class="nav-menu__btn"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.66 9.25002L20 7.74002L19.14 7.00002L12.66 1.25002C12.2825 0.91837 11.7175 0.91837 11.34 1.25002L4.86 7.00002L4 7.74002L2.34 9.25002C1.95391 9.62085 1.92835 10.23 2.28201 10.6318C2.63566 11.0337 3.24308 11.0858 3.66 10.75L4 10.45V19C4 20.6569 5.34314 22 7 22H9V16C9 14.3432 10.3431 13 12 13C13.6569 13 15 14.3432 15 16V22H17C18.6569 22 20 20.6569 20 19V10.45L20.34 10.75C20.7544 11.114 21.3852 11.0737 21.75 10.66C22.114 10.2456 22.0737 9.61477 21.66 9.25002Z"
              fill="#fff"
            />
          </svg>
        </router-link>
        <router-link
          tag="button"
          to="/favorites"
          active-class="nav-menu__btn_active"
          class="nav-menu__btn"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.39 11.6C21.9502 11.0274 22.1398 10.1878 21.88 9.43002C21.6361 8.66964 20.9802 8.11469 20.19 8.00002L15.9 7.34002C15.8595 7.32827 15.8264 7.29888 15.81 7.26002L13.93 3.26002C13.5931 2.4947 12.8362 2.0005 12 2.00002C11.1737 1.9966 10.4223 2.47801 10.08 3.23002L8.19999 7.23002C8.17925 7.26944 8.14301 7.29844 8.09999 7.31002L3.81999 8.00002C3.02895 8.11787 2.37156 8.67085 2.11999 9.43002C1.86989 10.19 2.06253 11.0261 2.61999 11.6L5.77999 14.85C5.79839 14.8914 5.79839 14.9386 5.77999 14.98L5.03999 19.52C4.89957 20.327 5.23666 21.1428 5.90582 21.6152C6.57499 22.0877 7.45647 22.1324 8.16999 21.73L11.9 19.66C11.9376 19.6405 11.9824 19.6405 12.02 19.66L15.75 21.73C16.4642 22.1236 17.3404 22.0749 18.0066 21.6045C18.6727 21.1342 19.0119 20.3248 18.88 19.52L18.19 15C18.1686 14.9629 18.1686 14.9171 18.19 14.88L21.39 11.6Z"
              fill="#fff"
            />
          </svg>
        </router-link>
        <router-link
          tag="button"
          to="/profile"
          active-class="nav-menu__btn_active"
          class="nav-menu__btn"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.6515 20.4054C20.2043 20.2902 20.5336 19.7117 20.2589 19.2183C19.6533 18.1307 18.6993 17.1749 17.4788 16.4465C15.907 15.5085 13.9812 15 12 15C10.0188 15 8.09292 15.5085 6.52112 16.4465C5.30069 17.1749 4.34666 18.1307 3.74108 19.2183C3.46638 19.7117 3.79562 20.2902 4.34843 20.4054C9.39524 21.4572 14.6047 21.4572 19.6515 20.4054Z"
              fill="white"
            />
            <circle cx="12" cy="8" r="5" fill="white" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
};
</script>

<style lang="scss" scoped>
.nav-menu {
  position: fixed;
  bottom: 15px;
  width: 100%;
  height: 50px;

  &__wrapper {
    width: 85%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    background-color: #121212;
  }

  &__buttons {
    width: 90%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__btn {
    width: 27px;
    height: 27px;
    padding: 0;
    background-color: transparent;

    &_active {
      svg {
        path {
          fill: $brand-col;
        }
      }
    }
  }

  @media (min-width: $media-pc) {
    display: none;
  }
}
</style>