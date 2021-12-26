<template>
  <div class="home">
    <start-screen v-if="!auth" @closeStartScreen="auth = true" />
    <desktop-menu ref="desktopMenu" />
    <modal-window ref="modal" />
    <div class="home__content" v-if="auth">
      <main-header
        @search="search"
        @togglePostion="togglePostion"
        @toggleDesktopMenu="toggleDesktopMenu"
      />
      <welcome-banner class="home__banner" />
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
            @openTask="toggleModal('open-task')"
          />
        </div>
      </div>
      <button class="home__add-task-btn" @click="toggleModal('add-task')">
        <span>+</span>
        <p>Создать задачу</p>
      </button>
      <nav-menu />
    </div>
  </div>
</template>

<script>
import StartScreen from "@/components/startScreen";
import DesktopMenu from "@/components/desktopMenu";
import ModalWindow from "@/components/modalWindow";
import MainHeader from "@/components/mainHeader";
import WelcomeBanner from "@/components/welcomeBanner";
import TaskCard from "@/components/taskCard";
import NavMenu from "@/components/navMenu";

export default {
  name: "Home",
  components: {
    StartScreen,
    DesktopMenu,
    ModalWindow,
    MainHeader,
    WelcomeBanner,
    TaskCard,
    NavMenu,
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
    toggleDesktopMenu() {
      this.$refs.desktopMenu.toggleMenu();
    },
    toggleModal(name) {
      this.$refs.modal.toggle(name);
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
    margin-top: 15px;
    margin-left: 5px;
    font-size: 20px;
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

  &__add-task-btn {
    position: fixed;
    right: 10%;
    bottom: 80px;
    width: 50px;
    height: 50px;
    border-radius: 50px;

    span {
      display: block;
      font-size: 40px;
      line-height: 0;
    }

    p {
      display: none;
    }

    @media (min-width: $media-pc) {
      left: 50%;
      right: auto;
      bottom: 20px;
      transform: translate(-50%);
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        display: block;
        margin-left: 10px;
      }
    }
  }
}
</style>