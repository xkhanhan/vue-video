<template>
  <div>
    <div class="video-content" ref="content">
      <!-- 头部视频信息 -->
      <div class="video-header">
        <div class="title">{{ title }}</div>
      </div>

      <!-- 视频 -->
      <video
        @click="handlePlay"
        width="95%"
        ref="video"
        autobuffer
        :src="videoSrc"
      ></video>

      <!-- 控件 -->
      <xk-control class="control-content" :token="token"></xk-control>
    </div>
  </div>
</template>

<script>
import xkControl from "../control/index";

export default {
  name: "xkVideo",
  components: {
    xkControl,
  },
  props: {
    /**
     * 视频播放路径
     */
    srcList: {
      type: Array,
      required: true,
    },
  },
  provide() {
    return {
      video: this,
    };
  },
  data() {
    return {
      isPlay: false,
      index: 0, //存在视频列表时，当前视频路径下标
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
    };
  },
  created() {
    const { srcList } = this;
    if (srcList.length == 0) throw Error("请传入视频路径"); // 两个都没有传入报错

    if (srcList.length > 1) {
      this.isList = true; // 当视频路径数组长度大于1时,渲染下一个按钮和视频列表
    }
  },
  mounted() {
    const videoDom = this.$refs.video; // 获取视频元素
    const contentDom = this.$refs.content; // 获取容器

    this.videoDom = videoDom;
    this.contentDom = contentDom;

    new Promise((resolve) => {
      /**
       * 当视频加载完成，对总时间进行赋值
       */
      videoDom.addEventListener("loadeddata", () => {
        this.allTime = videoDom.duration;
        this.nowVoice = videoDom.volume;
        resolve();
      });
    }).then(() => {
      /**
       * 对视频播放进行监听并改变当前时间
       */
      videoDom.addEventListener("timeupdate", () => {
        this.nowTime = videoDom.currentTime;
      });

      // video_dom.addEventListener("emptied", () => {
      //   console.log("emptied");
      // });

      /**
       * 当视频结束播放对播放按钮进行改变
       */
      videoDom.addEventListener("ended", () => {
        this.isPlay = false;
      });
    });
  },
  computed: {
    videoSrc() {
      return this.srcList[this.index].src;
    },
    title() {
      return this.srcList[this.index].title;
    },
    isNext() {
      return this.srcList.length > 1;
    },
    token() {
      return this.srcList[this.index].token
    }
  },
  methods: {
    validation(name, callckName, e){
        this.$emit(name, () => {
          this[callckName](e);
        });
    },
    handlePlay() {
      if (this.allTime == 0) return;

      let isPlay = !this.isPlay;

      if (isPlay) this.videoDom.play();
      else this.videoDom.pause();

      this.isPlay = isPlay;
    },
    handleScreen() {
      let isScreen = !this.isScreen;

      if (isScreen) this.contentDom.requestFullscreen();
      else document.exitFullscreen();

      this.isScreen = isScreen;
    },
    handleVoice() {
      let isMute = !this.isMute;

      if (isMute) {
        this.oldVoice = this.nowTime;
        this.videoDom.volume = 0;
      } else {
        this.videoDom.volume = this.oldVoice;
      }
    },
    handleNext() {
      let { index, srcList } = this;
      if (index == srcList.length) return;

      this.index++;
    },
    changeVoice(e) {
      this.nowVoice = e;
      this.videoDom.volume = e;
    },
    changeProgress(e) {
      if (this.allTime == 0) return;
      this.nowTime = e;
      this.videoDom.currentTime = e;
    },
  },
};
</script>

<style scoped>
@import url("../../css/iconfont.css");

.video-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  overflow: hidden;
  position: relative;
  color: #fff;
}

/**
    头部信息的样式
 */
.video-header {
  width: 100%;
  height: 42px;
  position: absolute;
  left: 10px;
  top: 0;
  display: flex;
  align-items: center;
}
.video-header .title {
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-header,
.control-content {
  opacity: 0;
  transition: 0.3s;
}

.video-content:hover .video-header,
.video-content:hover .control-content {
  opacity: 1;
}

.video-progress:hover .progress-bg {
  height: 7px;
}
</style>