<template>
  <div>
    <button class="btn btn-primary" @click="increment">Increment</button>
    <button class="btn btn-primary" @click="decrement">Decrement</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["increment", "decrement"]),
    increment() {
      this.$store.dispatch("increment", 10);
    },
    decrement() {
      this.$store.dispatch("decrement", 10);
    }
  }
};
</script>