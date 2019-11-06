<template>
  <a-list :grid="{ gutter: 16, column: 4 }" :dataSource="quotes">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-card @click="removeQuote(index)">{{item}}</a-card>
    </a-list-item>
  </a-list>
</template>

<script>
  export default {
    props: {
      quotes: Array,
      removeQuote: Function
    }
  }
</script>

<style scoped>

</style>