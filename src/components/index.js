import xkCollapse from './collapse/index';
import xkCollapseItem from './collapseItem/index';
import xkProgress from './progress/index';
import xkVideo from './video/index';

const components = [
    xkCollapse,
    xkCollapseItem,
    xkProgress,
    xkVideo
]

const install = (Vue, option = {}) => {
    console.log(option);
    components.forEach(component => {
        Vue.component(component.name, component);
    })
}

export default {
    install
}