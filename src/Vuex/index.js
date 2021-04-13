/**
 * Vuex 总入口
 */
import Vue from 'vue';
import Vuex from 'vuex';
import collapse from './modules/collapse/index';
import video from './modules/video/index';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        collapse,
        video,
    }
})