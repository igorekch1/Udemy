<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-offset-2">
        <h1 class="text-center">Routing</h1>
        <hr />
        <!-- <app-header></app-header> -->
        <router-view name="header-top"></router-view>
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
        <router-view name="header-bottom"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "app",
  components: {
    "app-header": Header
  }
};
</script>

<style scoped>
.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
}
.slide-leave {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-active {
  transition: opacity 1s ease;
  opacity: 0;
  animation: slide-out 1s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-30px);
  }
}
</style>
