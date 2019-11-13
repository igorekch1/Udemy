<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/" tag="li" exact>
          <a class="nav-link">
            Home
          </a>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/user" tag="li">
          <a class="nav-link">
            User
          </a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
