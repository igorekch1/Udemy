<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :span="18">
        <app-progress :quoteLength="quotes.length"></app-progress>
      </a-col>
    </a-row>
    <a-row>
      <app-quote-form :addQuote="addQuote"></app-quote-form>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col :span="18">
        <app-quote :quotes="quotes" :removeQuote="removeQuote"></app-quote>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col :span="18">
        <app-info :message="'Info: Click on a Quote to delete it'"></app-info>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="18">
        <app-test :text="'SUKA'"></app-test>
        {{test}}
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Progress from "./components/Progress";
import QuoteForm from "./components/QuoteForm";
import Quote from "./components/Quote";
import Info from "./components/Info";
import Test from "./components/Test";
import { eventBus } from "./main";

export default {
  data() {
    return {
      quotes: [],
      test: "ssssssssssssssssss"
    };
  },
  components: {
    "app-progress": Progress,
    "app-quote-form": QuoteForm,
    "app-quote": Quote,
    "app-info": Info,
    "app-test": Test
  },
  methods: {
    addQuote(quote) {
      if (this.quotes.length === 10) {
        alert("Quotes are full. Remove at first!");
        return;
      }

      this.quotes.push(quote);
    },
    removeQuote(id) {
      const quoteIndex = this.quotes.findIndex((item, index) => index === id);

      this.quotes.splice(quoteIndex, 1);
    }
  },
  created() {
    eventBus.$on("valueChange", value => (this.test = value));
  }
};
</script>

<style scoped>
h2 {
  color: blue;
}
</style>
