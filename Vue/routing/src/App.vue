<template>
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <div class="col-12 col-offset-2">
        <h1 class="text-center">Routing</h1>
        <hr />
        <router-view></router-view>
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

<style scoped></style>
