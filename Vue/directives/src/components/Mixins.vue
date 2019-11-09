<template>
  <div>
    <h1>Filters and Mixins</h1>
    <p>{{text | toUpperCase}}</p>
    <p>{{text | toLowerCase | sliceThree}}</p>
    <hr />
    <input type="text" v-model="filterText" />
    <ul>
      <li v-for="fruit in filteredFruits" :key="fruit">{{fruit}}</li>
    </ul>
    <app-list></app-list>
  </div>
</template>

<script>
import List from "./List";
import { fruitMixin } from "../FruitMixin";

export default {
  components: {
    "app-list": List
  },
  mixins: [fruitMixin],
  data() {
    return {
      text: "heLLow tHere"
    };
  },
  filters: {
    toUpperCase(value) {
      return value.toUpperCase();
    }
  }
};
</script>

<style scoped>
</style>