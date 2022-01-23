<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
  background-color: $bg-col;
  color: $text-col;
  font-family: "Open Sans", sans-serif;
}

h1 {
  font-size: 30px;
}

h2 {
  font-size: 26px;
}

input {
  height: 45px;
  padding-left: 15px;
  border-radius: 8px;
  background-color: $main-col;
  color: $text-col;
  font-size: 14px;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
  box-shadow: none;
  border: none;
  outline: none;

  &::placeholder {
    font-size: 14px;
    font-weight: 500;
    color: #636363;
  }
}

textarea {
  padding-top: 10px;
  padding-left: 15px;
  border-radius: 8px;
  background-color: $main-col;
  color: $text-col;
  font-size: 14px;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
  resize: none;
  box-shadow: none;
  border: none;
  outline: none;

  &::placeholder {
    font-size: 14px;
    font-weight: 500;
    color: #636363;
  }

  &::-webkit-scrollbar {
    width: 0;
  }
}

button {
  height: 45px;
  padding: 0 10px;
  border-radius: 8px;
  background-color: $brand-col;
  color: $text-col;
  font-size: 14px;
  line-height: 0;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
  box-shadow: none;
  border: none;
  outline: none;
  user-select: none;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: $brand-col-hover;
  }
}

img {
  pointer-events: none;
}

.container {
  width: 100%;
  max-width: 700px;
  padding: 0 13px;
  margin: 0 auto;
}

.inp-error {
  border: 1px solid $error;
}

.checkbox {
  min-width: 17px;
  min-height: 17px;
  max-width: 17px;
  max-height: 17px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #727272;
  transition: 0.3s;
  cursor: pointer;

  span {
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #fff;
  }

  &_active {
    background-color: $brand-col;
  }
}

// Effects
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s;
}

.slide-fade-enter {
  transform: translateX(100%);
}

.slide-fade-leave-to {
  transform: translateX(-100%);
}

// ------------------ //

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// ------------------ //

.bounce-enter-active {
  animation: bounce-in 0.6s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(7);
  }
  50% {
    transform: scale(5);
  }
  70% {
    transform: scale(3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
