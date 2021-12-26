<template>
  <div class="add-task">
    <input
      type="text"
      placeholder="Название задачи"
      class="add-task__inp"
      v-model="task.title"
    />
    <div
      class="add-task__fake-inp"
      :class="{ 'add-task__fake-inp_active': task.deadline }"
      @click="showDatepicker = !showDatepicker"
    >
      <p>{{ task.deadline ? getSelectedDate : "Деделай" }}</p>
    </div>
    <transition name="fade">
      <date-picker
        class="add-task__datepicker"
        v-if="showDatepicker"
        v-model="task.deadline"
        mode="dateTime"
        is-dark
        is24hr
        color="blue"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      showDatepicker: false,
      task: {
        title: "",
        deadline: "",
        subtasks: [""],
      },
    };
  },
  computed: {
    getSelectedDate() {
      const date = this.task.deadline;
      const fullDate = `${
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      }.${
        Number(1 + date.getMonth()) < 10
          ? "0" + Number(1 + date.getMonth())
          : Number(1 + date.getMonth())
      }.${date.getFullYear()}`;
      const fullTime = `${
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
      }:${
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      }`;

      return `${fullDate} ${fullTime}`;
    },
  },
  methods: {
    addSubtask() {
      this.task.subtasks.push("");
    },
    addTasks() {
      const date = new Date();
      const subtasks = [];
      this.task.subtasks.forEach((item) =>
        subtasks.push({ completed: false, title: item })
      );

      const task = {
        id: 1,
        show: true,
        completed: false,
        dateCreation: date,
        deadline: this.task.deadline,
        title: this.task.title,
        subtasks: subtasks,
      };
      console.log(task);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-task {
  &__inp {
    width: 100%;
  }

  &__fake-inp {
    margin-top: 7px;
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
}
</style>