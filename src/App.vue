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

</style>
