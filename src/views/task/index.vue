<template>
  <div class="task">
    <div class="container">
      <div class="task__header">
        <div class="task__back" @click="$router.push('/')">
          <img src="@/assets/images/icons/arrow-left.svg" alt="back">
        </div>
        <p class="task__header-title" @click="deleteTask">Удалить</p>
      </div>
      <div class="task__wrapper">
        <div class="task__wrapper-header" @click="completedTask">
          <div class="checkbox"
               :class="{'checkbox_active': task.completed}">
            <span></span>
          </div>
          <h1 class="task__title">{{ task.title }}</h1>
        </div>
        <p class="task__deadline">{{ task.deadline }}</p>
        <p class="task__description" v-if="task.description">{{ task.description }}</p>
        <ul class="task__subtasks" v-if="task.subtasks">
          <li class="task__subtask"
              v-for="(subtask, index) in task.subtasks"
              :key="subtask.id"
              @click="completedSubtask(index)">
            <div class="checkbox"
                 :class="{'checkbox_active': subtask.completed}">
              <span></span>
            </div>
            <p class="task__subtask-title">{{ subtask.title }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskId: null,
      task: {}
    }
  },
  async created() {
    this.taskId = this.$route.params.id
    const headers = {
      'Authorization': `Bearer ${this.$store.getters.token}`,
    }

    try {
      const response = await this.$task.getTask(this.taskId, headers);
      this.task = response.data[0]
      console.log(response.data[0])
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async deleteTask() {
      const headers = {
        'Authorization': `Bearer ${this.$store.getters.token}`,
      }

      try {
        const response = await this.$task.deleteTask(this.taskId, headers);
        this.$router.push('/')
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    async updateTask() {
      const headers = {
        'Authorization': `Bearer ${this.$store.getters.token}`,
      }

      try {
        const response = await this.$task.updateTask(this.task, headers);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
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

  &__deadline {
    margin-top: 5px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(150, 149, 149, 0.99);
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

  &__subtask-title {
    margin-left: 10px;
    font-size: 16px;
  }
}
</style>
