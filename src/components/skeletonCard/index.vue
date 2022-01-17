<template>
  <div class="card-skeleton" :class="{'card-skeleton_column': position === 'column'}">
    <div class="card-skeleton__title"></div>
    <ul class="card-skeleton__subtasks">
      <li class="card-skeleton__subtask" v-for="item in 4" :key="item"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SkeletonCard",
  props: {
    position: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-skeleton {
  position: relative;
  margin-top: 2%;
  margin-left: 2%;
  width: 48%;
  min-height: 130px;
  max-height: 130px;
  padding: 10px 13px;
  border-radius: 13px;
  background-color: $main-col;
  overflow: hidden;
  cursor: pointer;

  &_column {
    width: 100%;
  }

  &__title {
    width: 100%;
    max-width: 230px;
    height: 15px;
    border-radius: 10px;
    background-color: $skeleton-col;
  }

  &__subtasks {
    max-width: 230px;
    margin-top: 15px;
    list-style: none;
  }

  &__subtask {
    width: 70%;
    height: 10px;
    border-radius: 10px;
    background-color: $skeleton-col;

    &:not(:first-child) {
      margin-top: 8px;
    }

    &:nth-child(even) {
      width: 50%;
    }
  }
}
</style>
