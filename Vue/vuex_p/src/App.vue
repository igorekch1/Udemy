<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <app-counter></app-counter>
        <hr />
      </div>
      <div class="col-12">
        <app-result></app-result>
      </div>
      <div class="col-12">
        <app-another-result></app-another-result>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "./components/Counter";
import Result from "./components/Result";
import AnotherResult from "./components/AnotherResult";

export default {
  name: "app",
  components: {
    "app-counter": Counter,
    "app-result": Result,
    "app-another-result": AnotherResult
  }
};
</script>
