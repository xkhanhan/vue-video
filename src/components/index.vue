<template>
  <div class="video-content">
    <!-- 头部视频信息 -->
    <div class="video-header">
      <div class="title">选奶救不了队友的亮眼表现_20-07-31_22-37-39</div>
    </div>

    <!-- 视频 -->
    <video
      @click="handleVideo"
      width="95%"
      ref="video"
      autobuffer
      :src="src"
    ></video>

    <!-- 进度条 -->
    <div class="video-progress">
      <xk-progress
        :now="nowTime"
        :all="allTime"
        :buffer="buffer"
        @chartChange="chartChange"
      />
    </div>

    <!-- 控件 -->
    <div class="video-control">
      <div class="control-left">
        <div
          class="video-playAndpause iconfont"
          :class="{ play: isPause, pause: isPlay }"
          @click="handlPlay"
        ></div>
        <div class="video-next iconfont next"></div>
        <div class="video-time">
          <span> {{ formatNowTime }} </span>
          /
          <span> {{ formatAllTime }} </span>
        </div>
      </div>
      <div class="control-right">
        <div class="video-clarity">720p高清</div>
        <div class="video-speed">倍速</div>
        <div class="video-voice iconfont voice">
          <div class="voice-content">
            <xk-progress
              :now="nowTime"
              :all="allTime"
              :buffer="buffer"
              @chartChange="chartChange"
            />
          </div>
        </div>
        <div class="video-sitting iconfont sitting"></div>
        <div class="video-screen iconfont screen"></div>
      </div>
    </div>
  </div>
</template>

<script>
import xkProgress from "./progress";

export default {
  components: {
    xkProgress,
  },
  props: {
    /**
     * 视频播放路径
     */
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      video_dom: null, // video 标签

      isPlay: false, // 是否播放状态

      nowTime: 0, // 视频当前时间
      allTime: 0, // 视频总时间
      buffer: 0, // 缓存

      nowVoice: 0, // 当前音量
      allVoice: 1, // 总音量
    };
  },
  /**
   * 初始化
   */
  mounted() {
    const video_dom = this.$refs.video; // 获取视频元素

    this.video_dom = video_dom;

    new Promise((resolve) => {
      /**
       * 当视频加载完成，对总时间进行赋值
       */
      video_dom.addEventListener("loadeddata", () => {
        this.allTime = video_dom.duration; // 赋值总时间
        this.buffer = video_dom.buffered.length * this.allTime;
        this.nowVoice = video_dom.volume;

        resolve();
      });
    }).then(() => {
      /**
       * 对视频播放进行监听并改变当前时间
       */
      video_dom.addEventListener("timeupdate", () => {
        this.nowTime = video_dom.currentTime; // 赋值当前时间
        this.buffer = video_dom.buffered.length * this.allTime;
      });

      video_dom.addEventListener("emptied", () => {
        console.log("emptied");
      });

      /**
       * 当视频结束播放对播放按钮进行改变
       */
      video_dom.addEventListener("ended", () => {
        // this.handlPlay();
        this.isPlay = false;
      });
    });
  },

  computed: {
    /**
     * 根据是否播放动态添加 播放/暂停 按钮样式
     * @return {Boolean} trun and false
     */
    isPause() {
      return !this.isPlay;
    },

    /**
     * 格式化的总时间
     *  @return {String} xx:xx
     */
    formatAllTime() {
      const allTime = this.allTime;
      return this.formatNumber(allTime);
    },

    /**
     * 格式化的当前时间
     * @return {String} xx:xx
     */
    formatNowTime() {
      const nowTime = this.nowTime;
      return this.formatNumber(nowTime);
    },
  },

  methods: {
    /**
     * 播放按钮
     */
    handlPlay() {
      const { isPlay, video_dom } = this;
      if (isPlay) video_dom.pause();
      // 暂停
      else video_dom.play(); // 播放

      this.isPlay = !this.isPlay; // 改变播放按钮图标
    },

    /**
     * 点击视频时
     */
    handleVideo() {
      this.handlPlay();
    },

    /**
     * 格式化时间方法
     * @return {String} xx:xx
     */
    formatNumber(time) {
      let minutes = Math.floor(time / 60);
      let seconds = Math.floor(time % 60);

      /**
       * 不大于十 格式化为 0x
       * 大于十 格式化为 xx
       */
      minutes = minutes >= 10 ? minutes : "0" + minutes;
      seconds = seconds >= 10 ? seconds : "0" + seconds;

      return minutes + ":" + seconds; // xx：xx
    },

    chartChange(e) {
      e = Math.floor(e);
      this.nowTime = e;
      this.video_dom.currentTime = e;
    },
  },
};
</script>

<style scoped>
@import url("../css/iconfont.css");

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

/**
    进度条
*/
.video-progress {
  position: absolute;
  left: 0;
  bottom: 42px;
  width: 100%;
  height: 16px;
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

/**
    控件的样式
*/
.video-control {
  position: absolute;
  bottom: 10px;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 29px;
  display: flex;
  justify-content: space-between;
}
.video-control .control-left,
.video-content .control-right {
  display: flex;
}
.control-left > div,
.control-right > div {
  font-size: 15px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
}
.control-left .video-playAndpause {
  font-size: 25px;
}
.control-left .video-time {
  font-size: 12px;
}

.video-header,
.video-control,
.video-progress {
  opacity: 0;
  transition: 0.3s;
}

.video-content:hover .video-control,
.video-content:hover .video-header,
.video-content:hover .video-progress {
  opacity: 1;
}

.video-progress:hover .progress-bg {
  height: 7px;
}

.video-progress:hover .progeress-chart {
  width: 15px;
  height: 15px;
}
.video-voice{
  position: relative;
}

.voice-content{
  height: 100px;
  position: absolute;
  width: 50px;
}
</style>