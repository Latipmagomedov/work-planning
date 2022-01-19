<template>
  <div class="task" :class="{'task_skeleton': !onload}">
    <div class="container">
      <div class="task__header">
        <div class="task__back" @click="$router.push('/')">
          <img src="@/assets/images/icons/arrow-left.svg" alt="back">
        </div>
        <p class="task__header-title" @click="deleteTask">Удалить</p>
      </div>
      <div class="task__wrapper">
        <div class="task__wrapper-header"
             @click="completedTask">
          <div class="checkbox"
               :class="{'checkbox_active': task.completed}"
               v-if="onload">
            <span></span>
          </div>
          <h1 class="task__title">{{ task.title }}</h1>
        </div>
        <p class="task__deadline">{{ date }}</p>
        <p class="task__description" v-if="task.description">{{ task.description }}</p>
        <ul class="task__subtasks">
          <li class="task__subtask"
              v-if="onload"
              v-for="(subtask, index) in task.subtasks"
              :key="subtask.id"
              @click="completedSubtask(index)">
            <div class="checkbox"
                 :class="{'checkbox_active': subtask.completed}">
              <span></span>
            </div>
            <p class="task__subtask-title">{{ subtask.title }}</p>
          </li>
          <li class="task__subtask"
              v-if="!onload"
              v-for="item in 14"
              :key="item"></li>
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
      taskId: null,
      task: {}
    }
  },
  computed: {
    date() {
      if (!this.task.deadline) return
      const date = new Date(this.task.deadline).toLocaleString()
      return date
    }
  },
  async created() {
    this.getTask()
  },
  methods: {
    getTask() {
      this.taskId = this.$route.params.id
      const headers = {
        'Authorization': `Bearer ${this.$store.getters.token}`,
      }
      this.$load(async () => {
        const response = await this.$task.getTask(this.taskId, headers);
        this.task = response.data[0]
        if (response.data) this.onload = true
      })
    },
    async deleteTask() {
      const headers = {
        'Authorization': `Bearer ${this.$store.getters.token}`,
      }
      this.$load(async () => {
        const response = await this.$task.deleteTask(this.taskId, headers);
        this.$router.push('/')
      })
    },
    async updateTask() {
      const headers = {
        'Authorization': `Bearer ${this.$store.getters.token}`,
      }

      this.$load(async () => {
        const response = await this.$task.updateTask(this.task, headers);
      })
    },
    completedTask() {
      this.task.completed = !this.task.completed
      if (this.task.completed === true) {
        this.task.subtasks.forEach(item => {
          item.completed = true
        })
      } else {
        this.task.subtasks.forEach(item => {
          item.completed = false
        })
      }
      this.updateTask()
    },
    completedSubtask(index) {
      this.task.subtasks[index].completed = !this.task.subtasks[index].completed
      if (this.task.subtasks.every(elem => elem.completed === true)) this.task.completed = true
      if (this.task.subtasks[index].completed === false) this.task.completed = false

      this.updateTask()
    },
  }
}
</script>

<style lang="scss" scoped>
.task {
  &__header {
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }

  &__back {
    cursor: pointer;
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
