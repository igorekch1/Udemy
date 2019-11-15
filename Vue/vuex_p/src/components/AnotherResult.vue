<template>
  <div>
    <p>Counter: {{doubleCounter}}</p>
    <p>Number of click: {{stringCounter}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    myComputedProperty() {},
    ...mapGetters(["doubleCounter", "stringCounter"])
  }
};
</script>