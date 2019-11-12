<template>
  <div>
    <input type="text" @change="handleChange" />
    <div>{{msg}}</div>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  data() {
    return {
      msg: "hello"
    };
  },
  methods: {
    handleChange(event) {
      eventBus.$emit("valueChange", event.target.value);
    }
  }
};
</script>

<style scoped>
</style>