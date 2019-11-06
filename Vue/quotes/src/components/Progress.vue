<template>
  <div>
    <a-progress :percent="quoteLength * 10" />
  </div>
</template>

<script>
  export default {
    props: {
      quoteLength: Number
    }
  }
</script>

<style scoped>

</style>