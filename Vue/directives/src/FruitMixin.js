export const fruitMixin = {
  data() {
    return {
      filterText: "",
      fruits: ["apple", "lemon", "banana", "mango", "mangustin", "melon"]
    };
  },
  computed: {
    filteredFruits() {
      return this.fruits.filter(fruit => fruit.startsWith(this.filterText));
    }
  }
}
