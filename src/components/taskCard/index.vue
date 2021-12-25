<template>
  <div
    class="card"
    :class="{
      card_completed: task.completed,
      card_column: position == 'column',
    }"
    @click="$emit('openTask')"
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
    <div class="card__shadow"></div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
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

  &__shadow {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(
      to top,
      rgba(25, 25, 25, 1),
      rgba(25, 25, 25, 0.85),
      rgba(25, 25, 25, 0)
    );
  }

  &__date {
    color: #ffffff7c;
    font-size: 9px;
  }

  &__title {
    margin-top: 2px;
    font-size: 14px;
    font-weight: 700;
  }

  &__tasks {
    margin-top: 7px;
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