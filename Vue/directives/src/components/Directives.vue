<template>
  <div>
    <h1>Built-in directives</h1>
    <p v-text="'Some Text'"></p>
    <p v-html="'<strong>Some strong text</strong>'"></p>
    <div>
      <p v-highlight:background.delayed="'red'">Color this</p>
    </div>
    <div>
      <p
        v-local-highlight:background.delayed.blink="{mainColor: 'red', secondColor: 'green', delay: 1000}"
      >Color this</p>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    "local-highlight": {
      bind(el, binding, vnode) {
        let delay = 0;

        if (binding.modifiers["delayed"]) {
          delay = binding.value.delay;
        }

        if (binding.modifiers["blink"]) {
          let mainColor = binding.value.mainColor;
          let secondColor = binding.value.secondColor;
          let currentColor = secondColor;

          setTimeout(() => {
            setInterval(() => {
              currentColor =
                currentColor === mainColor ? secondColor : mainColor;

              if (binding.arg === "background") {
                el.style.backgroundColor = currentColor;
              } else {
                el.style.color = currentColor;
              }
            }, 1000);
          }, delay);
        }
      }
    }
  }
};
</script>

<style scoped>
</style>