<template>
  <div>
    <p>Counter: {{counter}}</p>
  </div>
</template>

<script>
import * as types from "../store/types";
import { mapGetters } from "vuex";

export default {
  computed: {
    myComputedProperty() {},
    ...mapGetters({
      counter: types.CLICK_COUNTER
    })
  }
};
</script>