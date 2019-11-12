import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);

export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
