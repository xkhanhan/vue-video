import xkButton from './button.vue';

xkButton.install = (Vue) => {
    Vue.component(xkButton.name, xkButton);
};

export default xkButton;