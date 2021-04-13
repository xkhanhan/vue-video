import Vue from 'vue'
import App from './App.vue'
import xkUI from './components/index';
import store from './Vuex/index';


Vue.use(xkUI);
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store
}).$mount('#app')