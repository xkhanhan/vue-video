import xkProgress from './progress.vue';


xkProgress.install = (Vue) => {
    Vue.component(xkProgress.name, xkProgress);
}


export default xkProgress