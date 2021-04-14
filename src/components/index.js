/**
 * 框架入口文件
 */
import xkCollapse from './collapse/index';
import xkCollapseItem from './collapseItem/index';
import xkProgress from './progress/index';
import xkVideo from './video/index';
import xkControl from './control/index';

const components = [
    xkCollapse,
    xkCollapseItem,
    xkProgress,
    xkVideo,
    xkControl
]

/**
 * 全局注册
 * @param {*} Vue 
 * @param {*} option 
 */
const install = (Vue, option = {}) => {
    console.log(option);
    components.forEach(component => {
        Vue.component(component.name, component);
    })
}

export default {
    install
}