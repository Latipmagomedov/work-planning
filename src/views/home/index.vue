<template>
  <div class="home">
    <start-screen v-if="!auth" @closeStartScreen="auth = true" />
    <div class="home__content" v-if="auth">
      <header-search @search="search" @togglePostion="togglePostion" />
      <banner-home class="home__banner" />
      <div class="home__wrapper container">
        <h2 class="home__title">задачи</h2>
        <div
          class="home__tasks"
          :class="{ home__tasks_col: position == 'column' }"
        >
          <task-card
            v-show="task.show"
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            :position="position"
          />
        </div>
      </div>
      <add-task-btn />
      <nav-menu />
    </div>
  </div>
</template>

<script>
import BannerHome from "@/components/banner";
import HeaderSearch from "@/components/header";
import StartScreen from "@/components/startScreen";
import TaskCard from "@/components/card";
import NavMenu from "@/components/navMenu";
import AddTaskBtn from "@/components/addTaskBtn";

export default {
  name: "Home",
  components: {
    BannerHome,
    HeaderSearch,
    StartScreen,
    TaskCard,
    NavMenu,
    AddTaskBtn
  },
  data() {
    return {
      auth: false,
      position: "grid",
      tasks: [
        {
          id: 1,
          show: true,
          completed: false,
          dateCreation: "28.12.2021",
          timeCreation: "17:00",
          deadline: new Date(),
          title: "Разработка SPA",
          subtasks: [
            {
              completed: false,
              title: "Тех задание",
            },
            {
              completed: false,
              title: "Дизайн",
            },
            {
              completed: false,
              title: "Разработка",
            },
            {
              completed: false,
              title: "Тех задание",
            },
            {
              completed: true,
              title: "Дизайн",
            },
            {
              completed: false,
              title: "Разработка",
            },
          ],
        },
        {
          id: 2,
          show: true,
          completed: false,
          dateCreation: "28.12.2021",
          timeCreation: "17:00",
          deadline: new Date(),
          title: "Дизайн",
          subtasks: [
            {
              completed: false,
              title: "Тех задание",
            },
            {
              completed: true,
              title: "Дизайн",
            },
            {
              completed: false,
              title: "Разработка",
            },
          ],
        },
        {
          id: 3,
          show: true,
          completed: false,
          dateCreation: "28.12.2021",
          timeCreation: "17:00",
          deadline: new Date(),
          title: "Приложение",
          subtasks: [
            {
              completed: false,
              title: "Тех задание",
            },
            {
              completed: true,
              title: "Дизайн",
            },
            {
              completed: false,
              title: "Разработка",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    if (localStorage.auth) {
      this.auth = true;
    } else {
      this.auth = false;
    }
  },
  methods: {
    search(value) {
      this.tasks.forEach((item, index) => {
        if (item.title.toLowerCase().indexOf(value.toLowerCase()) < 0) {
          item.show = false;
        } else {
          item.show = true;
        }
      });
    },
    togglePostion(position) {
      this.position = position;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  &__banner {
    margin-top: 10px;
  }

  &__title {
    margin-top: 13px;
    font-size: 25px;
  }

  &__tasks {
    margin-top: 0;
    margin-left: -2%;
    padding-bottom: 15px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  &__tasks_col {
    flex-direction: column;
  }
}
</style>