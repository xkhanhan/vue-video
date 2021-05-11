<template>
  <div
    class="video-content"
    ref="content"
    @mousemove="handleMove"
    @mouseleave="handleLeave"
  >
    <!-- 头部视频信息 -->
    <div class="video-header" :class="{ move: show }">
      <div class="title">{{ videoObject.title || "" }}</div>
    </div>

    <!-- 视频 -->
    <video
      @click="play = !isPlay"
      width="95%"
      ref="video"
      autobuffer
      :src="src"
    ></video>

    <!-- loading -->
    <xk-loading v-show="loading"></xk-loading>

    <!-- 弹幕 -->
    <!-- <xk-barrage v-if="barrage"></xk-barrage> -->

    <!-- 控件 -->
    <xk-control class="control-content" :class="{ move: show }"></xk-control>
  </div>
</template>

<script>
import xkControl from "../control/index";
import xkLoading from "../loading/index";
// import xkBarrage from "../barrage/index";

export default {
  name: "xkVideo",

  components: {
    xkControl,
    xkLoading,
    // xkBarrage, 
  },
  props: {
    /**
     * 视频播放路径
     */
    videoObject: {
      type: Object,
      required: true,
    },

    isNext: {
      type: Boolean,
      default: false,
    },
    barrage: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  provide() {
    return {
      video: this,
    };
  },
  data() {
    return {
      isPlay: false, // 是否播放
      videoDom: null, // video 标签

      nowTime: 0, // 视频当前时间
      allTime: 0, // 视频总时间
      buffer: 0, // 缓存

      nowVoice: 1, // 当前音量
      allVoice: 1, // 总音量
      oldVoice: 0, // 上一次音量
      isMute: false, // 是否静音

      isScreen: false, // 是否全屏

      contentDom: null, // 容器

      show: false, // 控件和头部是否展示

      // 定时器
      endedTimeout: null,
      moveTimeout: null,

      loading: false, // 加载动画

      speed: 1, // 倍速
    };
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
          this.validation("handlePlay", "play");
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
        this.$emit("ended");
      });
    });
  },
  computed: {
    src() {
      return this.videoObject.src;
    }, // 视频路径
    token() {
      return this.videoObject.token || false;
    },
    limit() {
      return this.videoObject.limit || 0;
    },
    play:{
      set(value) {
        if(value) {
         this.validation("handlePlay", "play", this.nowTime);
        } else {
           this.validation("handlePause", "pause");
        }
      },
      get() {
        return this.isPlay;
      }
    }
  },
  methods: {
    /**
     * 中间验证器
     * 用于使用者对控件的功能做出限制处理
     * @param { String } name 父级事件名
     * @param { String } callckName 子项触发的事件名
     * @param { * } e 参数
     */
    validation(callckName, name, e) {
      /**
       * 当该视频需要验证，
       * 且控件是点击进度条、播放暂停按钮，
       * 且跳转的进度大于设置的限制进度
       * 进行触发钩子函数
       * 使用者可在 deal 钩子中调用传入的函数，并对该函数传入一个 boolean 值，来决定是否进行下一步操作
       */
      if (this.token && name && this.isVisti(e)) {
        this.src = "";

        this.$emit("deal", (boolean) => {
          if (!boolean) {
            return;
          } else {
            this.src = this.videoObject.src;
            this[callckName](e); // 进行下一步控件
          }
        });
      } else {
        this[callckName](e);
      }
    },

    /**
     * 传入的时间是否大于等于规定的时间
     * @param {Number} e 传入的时间
     * @return {Boolean} 返回布尔类型
     */
    isVisti(e) {
      if (!e) return false;
      if(!this.limit) return false 
      return Math.floor(e) >= this.limit;
    },

    /**
     * 以下均为控件事件
     */
    handlePlay() {
      this.isPlay = true;
      this.videoDom.play();
    },
    handlePause() {
       this.isPlay = false;
      this.videoDom.pause();
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
      this.$emit("next");
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
    handleSpeed(e) {
      this.speed = e;
      this.videoDom.playbackRate = e;
    },
    /**
     * 以下为鼠标移出，移入视频时，控件的显示方法
     */
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
  left: 0;
  color: #fff;
  margin: 10px;
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

.control-content {
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
  z-index: 999;
}

.video-header.move {
  top: 0px;
  opacity: 1;
}
.control-content.move {
  bottom: 0px;
  opacity: 1;
}
</style>