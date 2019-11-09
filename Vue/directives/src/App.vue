<template>
  <div id="app">
    <app-directives></app-directives>
    <hr />
    <app-mixins></app-mixins>
  </div>
</template>

<script>
import Directives from "./components/Directives";
import Mixins from "./components/Mixins";

export default {
  components: {
    "app-directives": Directives,
    "app-mixins": Mixins
  }
};
</script>

<style>
</style>
