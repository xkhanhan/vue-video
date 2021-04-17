<template>
  <div>
    <div
      class="video-content"
      ref="content"
      @mousemove="handleMove"
      @mouseleave="handleLeave"
    >
      <!-- 头部视频信息 -->
      <div class="video-header" :class="{ move: show }">
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
      <xk-loading v-show="loading"></xk-loading>

      <!-- 控件 -->
      <xk-control class="control-content" :class="{ move: show }"></xk-control>
    </div>
  </div>
</template>

<script>
import xkControl from "../control/index";
import xkLoading from "../loading/index";

export default {
  name: "xkVideo",
  components: {
    xkControl,
    xkLoading,
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
      allTime: 1000, // 视频总时间
      buffer: 0, // 缓存

      nowVoice: 1, // 当前音量
      allVoice: 1, // 总音量
      oldVoice: 0, // 上一次音量
      isMute: false, // 是否静音

      isScreen: false, // 是否全屏

      contentDom: null, // 容器

      show: false,

      endedTimeout: null,
      moveTimeout: null,

      loading: false,
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
        if (this.isVisti(this.nowTime)) {
          this.handlePause();
        }
      });

      /**
       * 加载时
       */
      videoDom.addEventListener("waiting", () => {
        this.loading = true;
      });

      videoDom.addEventListener("playing", () => {
        this.loading = false;
      });

      /**
       * 当视频结束播放对播放按钮进行改变
       */
      videoDom.addEventListener("ended", () => {
        this.isPlay = false;
        if (this.endedTimeout) clearTimeout(this.endedTimeout);
        this.endedTimeout = setTimeout(() => {
          this.handleNext();
        }, 5000);
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
      return this.srcList[this.index].token;
    },
  },
  methods: {
    /**
     * 中间验证器
     * 用于用户对控件的功能做出限制处理
     * @param { String } name 父级事件名
     * @param { String } callckName 子项触发的事件名
     * @param { * } e 参数
     */
    validation(callckName, name, ...e) {
      if (this.token && name && this.isVisti(e)) {
        this.$emit(name, (boolean) => {
          if (boolean) {
            this[callckName](...e);
          }
        });
      } else {
        this[callckName](...e);
      }
    },
    isVisti(e) {
      if (!e) return false;
      return Math.floor(e) >= this.nowTime;
    },
    handlePlay() {
      if (this.allTime == 0) return;
      this.videoDom.play();
      this.isPlay = true;
    },
    handlePause() {
      this.videoDom.pause();
      this.isPlay = false;
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
    handleScreen() {
      let isScreen = !this.isScreen;
      if (isScreen) this.contentDom.requestFullscreen();
      else document.exitFullscreen();
      this.isScreen = isScreen;
    },
    handleNext() {
      let { index, srcList } = this;
      if (index == srcList.length - 1) return;

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
    handleMove() {
      if (!this.show) {
        this.show = true;
        if (this.moveTimeout) clearInterval(this.moveTimeout);
        this.moveTimeout = setTimeout(() => {
          this.show = false;
        }, 3000);
      } else {
        if (this.moveTimeout) clearInterval(this.moveTimeout);
        this.moveTimeout = setTimeout(() => {
          this.show = false;
        }, 3000);
      }
    },
    handleLeave() {
      this.show = false;
    },
  },
  destroyed() {
    clearInterval(this.moveTimeout);
    clearInterval(this.endedTimeout);

    this.setTimeout = null;
    this.endedTimeout = null;
  },
};
</script>

<style scoped>
@import url("../../css/iconfont.css");

.video-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  display: flex;
  align-items: center;
  top: -42px;
}
.video-header .title {
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.control-content{
  padding: 0 0 10px 0;
  position: absolute;
  bottom: -55px;
}

.video-header,
.control-content {
  transition: all 0.5s;
  z-index: 99;
  left: 0px;
  opacity: 0;
}

.video-header.move{
  top: 0px;
  opacity: 1;
}
.control-content.move{
  bottom: 0px;
  opacity: 1;
}


</style>