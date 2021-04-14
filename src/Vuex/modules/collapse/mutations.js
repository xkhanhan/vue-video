export default {
    activeList(state, list) {
        state.activeList = list;
    },
    activeValue(state, value) {
        if (state.accordion) { // 手风琴模式
            state.activeList.shift();
            state.activeList.push(value);
        } else {
            const index = state.activeList.indexOf(value);

            if (index == -1) { // 不存在，展示
                state.activeList.push(value);
            } else { // 已存在，再次点击即为折叠
                state.activeList.splice(index, 1);
            }
        }
    },
    accordion(state, value) {
        state.accordion = value;
    }

}