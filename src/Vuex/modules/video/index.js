import state from './state';
import mutations from './mutations';
import action from './action';

export default {
    state: () => state,
    mutations: mutations,
    action: action,
}