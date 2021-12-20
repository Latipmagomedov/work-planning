<template>
  <div
    class="card"
    :class="{
      card_completed: task.completed,
      card_column: position == 'column',
    }"
  >
    <p class="card__date">{{ task.dateCreation }} | {{ task.timeCreation }}</p>
    <h3 class="card__title">{{ task.title }}</h3>
    <ul class="card__tasks">
      <li
        class="card__task"
        :class="{ card__task_completed: subtask.completed }"
        v-for="(subtask, index) in task.subtasks"
        :key="'subtask' + index"
      >
        {{ subtask.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    position: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-top: 3%;
  margin-left: 3%;
  width: 47%;
  min-height: 130px;
  max-height: 130px;
  padding: 10px 13px;
  border-radius: 13px;
  background-color: $main-col;
  overflow: hidden;

  &__date {
    color: $brand-col;
    font-size: 9px;
  }

  &__title {
    margin-top: 2px;
    font-size: 16px;
    font-weight: 700;
  }

  &__tasks {
    margin-top: 9px;
    display: flex;
    flex-direction: column;
    list-style: none;
  }

  &__task_completed {
    text-decoration: line-through;
    color: #727272;
  }

  &__task {
    font-size: 12px;
    &:not(:first-child) {
      margin-top: 5px;
    }
  }

  &_completed &__title {
    color: #727272;
    text-decoration: line-through;
  }

  &_completed &__task {
    color: #727272;
    text-decoration: line-through;
  }

  &_column {
    width: 100%;
  }
}
</style>