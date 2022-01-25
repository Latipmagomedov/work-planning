<template>
  <div class="task" :class="{ task_skeleton: !onload }">
    <div class="container">
      <div class="task__header">
        <div class="task__btn-icon" @click="$router.push('/')">
          <img src="@/assets/images/icons/arrow-left.svg" alt="back" />
        </div>
        <div class="task__btns">
          <div
            class="task__btn-icon"
            @click="
              $router.push({ path: '/create-task', query: { edit: taskId } })
            "
          >
            <img src="@/assets/images/icons/edit.svg" alt="edit" />
          </div>
          <div class="task__btn-icon" @click="deleteTask">
            <img src="@/assets/images/icons/delete.svg" alt="delete" />
          </div>
        </div>
      </div>
      <div class="task__wrapper">
        <div class="task__wrapper-header" @click="completedTask">
          <div
            class="checkbox"
            :class="{ checkbox_active: task.completed }"
            v-if="onload"
          >
            <span></span>
          </div>
          <h1 class="task__title">{{ task.title }}</h1>
        </div>
        <p class="task__deadline">{{ date }}</p>
        <p class="task__description" v-if="task.description">
          {{ task.description }}
        </p>
        <ul class="task__subtasks">
          <li
            class="task__subtask"
            v-show="onload"
            v-for="(subtask, index) in task.subtasks"
            :key="subtask.id"
            @click="completedSubtask(index)"
          >
            <div
              class="checkbox"
              :class="{ checkbox_active: subtask.completed }"
            >
              <span></span>
            </div>
            <p class="task__subtask-title">{{ subtask.title }}</p>
          </li>
          <li
            class="task__subtask"
            v-show="!onload"
            v-for="item in 14"
            :key="item"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onload: false,
      taskId: this.$route.params.id,
      task: {},
    };
  },
  computed: {
    date() {
      if (!this.task.deadline) return;
      let fullDate = new Date(this.task.deadline);
      // Временно !!!
      // Прибавляю к дате +3 часа т.к на бэке сохраняется неправильно
      fullDate.setMilliseconds(3 * 60 * 60 * 1000);

      return fullDate.toLocaleString();
    },
  },
  created() {
    this.getTask();
  },
  methods: {
    async getTask() {
      const response = await this.$task.getTask(this.taskId);
      this.task = response[0];
      if (this.task) this.onload = true;
    },
    async deleteTask() {
      await this.$task.deleteTask(this.taskId);
      this.$router.push("/");
    },
    async updateTask() {
      await this.$task.updateTask(this.task);
    },
    completedTask() {
      this.task.completed = !this.task.completed;
      if (this.task.completed === true) {
        this.task.subtasks.forEach((item) => (item.completed = true));
      } else {
        this.task.subtasks.forEach((item) => (item.completed = false));
      }
      this.updateTask();
    },
    completedSubtask(index) {
      this.task.subtasks[index].completed =
        !this.task.subtasks[index].completed;
      if (this.task.subtasks.every((elem) => elem.completed === true))
        this.task.completed = true;
      if (this.task.subtasks[index].completed === false)
        this.task.completed = false;

      this.updateTask();
    },
  },
};
</script>

<style lang="scss" scoped>
.task {
  user-select: text;
  &__header {
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }

  &__btns {
    display: flex;
  }

  &__btn-icon {
    cursor: pointer;

    &:not(:first-child) {
      margin-left: 30px;
    }

    img {
      min-width: 24px;
      max-width: 24px;
    }
  }

  &__btns &__btn-icon img {
    min-width: 22px;
    max-width: 22px;
  }

  &__header-title {
    line-height: 1;
    color: $warning;
  }

  &__wrapper {
    margin-top: 15px;
  }

  &__wrapper-header {
    display: flex;

    .checkbox {
      margin-top: 10px;
    }
  }

  &__title {
    margin-left: 15px;
    font-size: 26px;
  }

  &_skeleton &__title {
    width: 80%;
    height: 30px;
    margin-top: 3px;
    margin-left: 0px;
    border-radius: 6px;
    background-color: $skeleton-col;
    line-height: 1;
  }

  &__deadline {
    margin-top: 5px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(150, 149, 149, 0.99);
  }

  &_skeleton &__deadline {
    width: 35%;
    height: 17px;
    margin-top: 8px;
    border-radius: 3px;
    background-color: $skeleton-col;
  }

  &__description {
    max-width: 80%;
    margin-top: 5px;
    font-size: 14px;
    color: rgba(150, 149, 149, 0.99);
  }

  &__subtasks {
    margin-top: 25px;
    list-style: none;
  }

  &__subtask {
    display: flex;
    align-items: center;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  &_skeleton &__subtask {
    width: 65%;
    height: 20px;
    border-radius: 4px;
    background-color: $skeleton-col;

    &:nth-child(even) {
      width: 40%;
    }
  }

  &__subtask-title {
    margin-left: 10px;
    font-size: 16px;
  }
}
</style>
