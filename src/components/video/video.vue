<template>
  <div class="video">
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
    <div class="list-barrage">
      <xk-collapse v-model="activeList"  v-if='isNext'>
        <xk-collapse-item title="剧集列表" name="1">
          <div class="button-content">
            <xk-button
              class="button"
              size="small"
              v-for="(item, index) in srcList"
              :key="index"
              @click="handleButton(index)"
              >{{ index + 1 }}</xk-button
            >
          </div>
        </xk-collapse-item>
      </xk-collapse>
    </div>
  </div>
</template>

<script>
import xkControl from "../control/index";
import xkLoading from "../loading/index";
import xkCollapse from "../collapse/index";
import xkButton from "../button/index";

export default {
  name: "xkVideo",
  components: {
    xkControl,
    xkLoading,
    xkCollapse,
    xkButton,
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
      index: 0, //当前视频路径下标
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

      show: false,

      endedTimeout: null,
      moveTimeout: null,

      loading: false,

      activeList: ["1"],
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

        this.$emit("ended", (boolean = true) => {
          if (!boolean) {
            return;
          } else {
            this.handleNext();
          }
        });
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
    token() {
      return this.srcList[this.index].token || false;
    },
    limit() {
      return this.srcList[this.index].limit || 0;
    },
    isNext() {
      return this.srcList.length > 1;
    },
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
        let index = this.index; // 暂存当前视频下标

        /**
         * 传入一个空的视频地址，防止控制台命令播放视频
         */
        this.srcList.push({
          src: "",
          title: "",
        });

        this.index = this.srcList.length - 1; // 使用空视频地址

        this.$emit("deal", (boolean) => {
          if (!boolean) {
            return;
          } else {
            this.srcList.pop(); // 删除空地址
            this.index = index; // 使用被限制的视频地址
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
      return Math.floor(e) >= this.limit;
    },

    /**
     * 以下均为控件事件
     */
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
    handleNext(value = 1) {
      let { index, srcList } = this;
      let now = (srcList.length + (index + value)) % srcList.length;

      this.index = now;
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
    handleButton(e) {
      this.index = e;
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
.video {
  display: flex;
  box-sizing: border-box;
}
.video-content {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
  overflow: hidden;
  position: relative;
  color: #fff;
  margin: 10px;
}
.list-barrage {
  flex: 1;
  margin: 10px;
}
.button-content {
  display: flex;
  flex-wrap: wrap;
}
.button-content .button{
  margin: 5px 5px;
  width: calc(100% / 5 - 10px);
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