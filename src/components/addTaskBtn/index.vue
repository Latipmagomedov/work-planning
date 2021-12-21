<template>
  <button class="add-task-btn">+</button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.add-task-btn {
  position: fixed;
  right: 10%;
  bottom: 80px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  font-size: 40px;

  @media (min-width: 700px) {
    left: 50%;
    right: auto;
    transform: translate(-50%);
  }
}
</style>