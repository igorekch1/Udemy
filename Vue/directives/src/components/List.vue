<template>
  <div>
    <input type="text" v-model="filterText" />
    <ul>
      <li v-for="fruit in filteredFruits" :key="fruit">{{fruit}}</li>
    </ul>
  </div>
</template>

<script>
import { fruitMixin } from "../FruitMixin";

export default {
  mixins: [fruitMixin]
};
</script>

<style scoped>
</style>