export default {
    activeList(state, value) {
        console.log(value);
        state.activeList = value;
    },
    accordion(state, value) {
        state.accordion = value;
    }
}