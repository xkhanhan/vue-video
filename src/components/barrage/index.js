import barrage from './barrage.vue';

barrage.install = (Vue) => {
    Vue.component(barrage.name, barrage);
}

export default barrage;