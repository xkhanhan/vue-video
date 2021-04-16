import Vue from 'vue'
import App from './App.vue'
import xkUI from './components/index';

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);


Vue.use(xkUI);
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')