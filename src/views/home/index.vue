<template>
  <div class="home">
    <div class="home__content">
      <desktop-menu ref="desktopMenu"/>
      <main-header
          @search="search = $event"
          @togglePostion="position = $event"
          @toggleDesktopMenu="$refs.desktopMenu.toggleMenu()"
      />
      <welcome-banner class="home__banner" :length="tasks.length"/>
      <div class="home__wrapper container">
        <h2
            class="home__title"
            :class="{ home__title_empty: !tasks.length && onload }"
            v-if="onload"
        >
          {{ tasks.length ? "Задачи" : "Задач пока нет (" }}
        </h2>
        <h2 class="home__title" v-if="!onload">Загрузка . . .</h2>

        <div
            class="home__tasks"
            :class="{ home__tasks_col: position === 'column' }">
          <skeleton-card
              v-show="!onload"
              v-for="item in 6"
              :key="item"
              :position="position"
          />

          <task-card
              v-show="onload"
              v-for="task in filterTasks"
              :key="task.id"
              :task="task"
              :position="position"
              @openTask="$router.push(`/task/${task.id}`)"
          />
        </div>
      </div>
      <button class="home__add-task-btn" @click="$router.push('/create-task')">
        <span>+</span>
        <p>Создать задачу</p>
      </button>
      <nav-menu/>
    </div>
  </div>
</template>

<script>
import DesktopMenu from "@/components/desktopMenu";
import MainHeader from "@/components/mainHeader";
import WelcomeBanner from "@/components/welcomeBanner";
import TaskCard from "@/components/taskCard";
import SkeletonCard from "@/components/skeletonCard";
import NavMenu from "@/components/navMenu";

export default {
  name: "Home",
  components: {
    DesktopMenu,
    MainHeader,
    WelcomeBanner,
    TaskCard,
    SkeletonCard,
    NavMenu,
  },
  data() {
    return {
      position: "grid",
      search: "",
      onload: false,
      tasks: [],
    };
  },
  computed: {
    filterTasks() {
      return this.tasks.filter(item =>
          item.title.toLowerCase()
              .includes(this.search.toLowerCase()));
    },
  },
  created() {
    if (this.$store.getters.token) this.getTasks();
  },
  methods: {
    async getTasks() {
      try {
        this.tasks = await this.$task.getTasks();
        if (this.tasks) this.onload = true;
      } catch (error) {
        console.log(error)
      }
    }
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

    &_empty {
      margin-top: 18vh;
      color: #4d4d4d;
      text-align: center;
    }
  }

  &__tasks {
    margin-top: 0;
    margin-left: -2%;
    padding-bottom: 85px;
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
