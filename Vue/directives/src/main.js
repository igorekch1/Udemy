import Vue from 'vue'
import App from './App.vue'

Vue.directive('highlight', {
  bind(el, binding, vnode) {
    let delay = 0;

    if (binding.modifiers["delayed"]) {
      delay = 3000;
    }

    setTimeout(() => {
      if (binding.arg === 'background') {
        el.style.backgroundColor = binding.value;
      } else {
        el.style.color = binding.value
      }
    }, delay);
  }
});

Vue.filter('toLowerCase', function (value) {
  return value.toLowerCase();
});

Vue.filter('sliceThree', function (value) {
  return value.slice(0, 3);
});

new Vue({
  el: '#app',
  render: h => h(App)
})
