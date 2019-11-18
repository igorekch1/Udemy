<template>
  <div>
    <p>Counter: {{doubleCounter}}</p>
    <p>Number of click: {{stringCounter}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../store/types";

export default {
  computed: {
    myComputedProperty() {},
    ...mapGetters({
      doubleCounter: types.DOUBLE_COUNTER,
      stringCounter: types.CLICK_COUNTER
    })
  }
};
</script>