<template>
  <div class="add-task">
    <div class="container">
      <div class="add-task__header">
        <div class="add-task__back" @click="$router.push('/')">
          <img src="@/assets/images/icons/arrow-left.svg" alt="back"/>
        </div>
        <p class="add-task__header-title">Новая задача</p>
      </div>
      <div class="add-task__warpper">
        <input
            type="text"
            placeholder="Название задачи"
            class="add-task__inp"
            :class="{
            'inp-error': $v.task.title.$dirty && !$v.task.title.required,
          }"
            v-model="task.title"
        />
        <textarea
            class="add-task__description"
            placeholder="Описание задачи"
            v-model="task.description"
        ></textarea>
        <div class="add-task__inp-wrapper">
          <p class="add-task__inp-name">Деделайн</p>
          <div
              class="add-task__fake-inp"
              :class="{ 'add-task__fake-inp_active': task.deadline }"
              @click="showDatepicker = !showDatepicker"
          >
            <p>{{ task.deadline ? getSelectedDate : "Деделайн" }}</p>
          </div>
        </div>

        <transition name="fade">
          <date-picker
              class="add-task__datepicker"
              :min-date="new Date()"
              v-if="showDatepicker"
              v-model="task.deadline"
              mode="dateTime"
              is-dark
              is24hr
              color="blue"
          />
        </transition>
        <div class="add-task__subtasks">
          <h3 class="add-task__subtasks-title">Подзадачи</h3>
          <div
              class="add-task__subtasks-inp"
              v-for="(subtask, index) in task.subtasks"
              :key="index"
          >
            <input
                type="text"
                placeholder="Название подзадачи"
                v-model="subtask.title"
            />
            <div class="add-task__subtasks-remove" @click="removeTask(index)">
              <img src="@/assets/images/icons/x.svg" alt="remove"/>
            </div>
          </div>
          <button class="add-task__subtasks-add" @click="addSubtask">
            <span>+</span> Добавить подзадачу
          </button>
        </div>
        <button
            class="add-task__add"
            v-if="!editTaskId"
            @click="addTasks"
            :disabled="disbledBtn"
        >
          Добавить задачу
        </button>
        <button
            class="add-task__add"
            v-if="editTaskId"
            @click="editTasks"
            :disabled="disbledBtn"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";

export default {
  name: "AddTask",
  data() {
    return {
      showDatepicker: false,
      disbledBtn: false,
      editTaskId: this.$route.query.edit ? this.$route.query.edit : null,
      task: {
        completed: false,
        title: "",
        description: "",
        deadline: new Date(),
        subtasks: [
          {
            title: "",
            completed: false,
          },
        ],
      },
    };
  },
  validations: {
    task: {
      title: {
        required,
      },
    },
  },
  computed: {
    getSelectedDate() {
      return this.task.deadline.toLocaleString();
    },
  },
  created() {
    if (this.editTaskId) {
      this.getTask(this.editTaskId);
    }
  },
  methods: {
    async getTask(id) {
      try {
        const response = await this.$task.getTask(id);
        this.task = response[0];
        if (response[0].deadline)
          this.task.deadline = new Date(response[0].deadline);
      } catch (error) {
        console.log(error)
      }
    },
    addSubtask() {
      this.task.subtasks.push({title: "", completed: false});
    },
    removeTask(index) {
      this.task.subtasks.splice(index, 1);
    },
    async addTasks() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.disbledBtn = true;

      const body = [
        {
          title: this.task.title,
          description: this.task.description,
          completed: this.task.completed,
          deadline: this.task.deadline,
          subtasks:
              this.task.subtasks[0] && this.task.subtasks[0].title
                  ? this.task.subtasks
                  : [],
        },
      ];

      try {
        await this.$task.createTask(body);
        this.$router.push("/");
      } catch (error) {
        console.log(error)
      }
    },
    async editTasks() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.disbledBtn = true;

      try {
        await this.$task.updateTask(this.task);
        this.$router.push(`/task/${this.editTaskId}`);
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-task {
  width: 100%;
  height: 100vh;
  background-color: $bg-col;

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
    font-size: 16px;
    color: $brand-col;
  }

  &__warpper {
    margin-top: 15px;
    padding-bottom: 15px;
  }

  &__inp-wrapper {
    margin-top: 5px;
  }

  &__inp-name {
    color: #919191;
    font-size: 14px;
  }

  &__inp {
    width: 100%;
  }

  &__fake-inp {
    margin-top: 5px;
    width: 100%;
    height: 45px;
    padding-left: 15px;
    padding-bottom: 2px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    background-color: $main-col;
    font-size: 14px;
    font-weight: 500;
    color: #636363;
    cursor: pointer;

    &_active {
      color: #fff;
    }
  }

  &__datepicker {
    margin-top: 5px;
    width: 100%;
    background-color: $main-col !important;
    border: none !important;
  }

  &__description {
    width: 100%;
    height: 70px;
    margin-top: 10px;
  }

  &__subtasks {
    margin-top: 20px;
  }

  &__subtasks-title {
    margin-bottom: 10px;
    font-size: 16px;
  }

  &__subtasks-inp {
    width: 100%;
    height: 45px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $main-col;

    input {
      width: 100%;
      padding-right: 10px;
    }

    &:not(:first-child) {
      margin-top: 5px;
    }
  }

  &__subtasks-remove {
    padding-right: 10px;
    padding-top: 4px;
    cursor: pointer;

    img {
      max-width: 20px;
    }
  }

  &__subtasks-add {
    height: 35px;
    margin-top: 7px;
    display: flex;
    align-items: center;
    background-color: transparent;
    color: $brand-col;
    font-size: 15px;

    span {
      margin-right: 10px;
      font-size: 23px;
    }
  }

  &__add {
    width: 100%;
    margin-top: 30px;
  }
}
</style>
