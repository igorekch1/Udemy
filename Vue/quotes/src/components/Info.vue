
<template>
  <div>
    <a-alert :message="message" type="info" style="text-align: center"/>
  </div>
</template>

<script>
  export default {
    props: {
      message: String
    }
  }
</script>

<style scoped>

</style>