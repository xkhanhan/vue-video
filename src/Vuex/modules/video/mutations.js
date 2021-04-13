export default {
    isPlay(state, value) {
        // if (value) state.videoDom.play(); // 播放状态
        // else state.videoDom.pause(); // 暂停状态

        state.isPlay = value; // 赋值
    },
    index(state, value) {
        state.index = value;
    },
    videoSrc(state, value) {
        state.videoSrc = value;
    },
    videoDom(state, value) {
        state.videoDom = value;
    },
    nowTime(state, value) {
        state.nowTime = value
    },
    buffer(state, value) {
        state.buffer = value;
    },
    nowVoice(state, value) {
        state.nowVoice = value;
    },
    allVoice(state, value) {
        state.allVoice = value
    },
    oldVoice(state, value) {
        state.oldVoice = value;
    },
    isMute(state, value) {
        state.isMute = value;
    },
    isScreen(state, value) {
        if (value) state.contentDom.requestFullscreen(); // 进入全屏
        else document.exitFullscreen(); // 退出全屏

        state.isScreen = value;
    },
    isList(state, value) {
        state.isList = value
    },
    contentDom(state, value) {
        state.contentDom = value
    }
}