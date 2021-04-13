export default {
    isPlay: false,
    index: 0, //存在视频列表时，当前视频路径下标
    videoSrc: null, // 视频路径
    videoDom: null, // video 标签

    nowTime: 0, // 视频当前时间
    allTime: 10, // 视频总时间
    buffer: 0, // 缓存

    nowVoice: 1, // 当前音量
    allVoice: 1, // 总音量
    oldVoice: 0, // 上一次音量
    isMute: false, // 是否静音

    isScreen: false, // 是否全屏

    contentDom: null, // 容器
    isList: false, // 是否渲染列表，渲染了列表一定渲染下一个按钮
}