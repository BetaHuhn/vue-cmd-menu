import Vue, { VNode } from 'vue';
import Dev from './index.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h): VNode => h(Dev),
}).$mount('#app');
