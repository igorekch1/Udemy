<template>
  <div>
    <h1>The User Page</h1>
    <hr />
    <button @click="navigateToHome">Go to Home</button>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  methods: {
    navigateToHome() {
      this.$router.push("/");
    }
  }
};
</script>
