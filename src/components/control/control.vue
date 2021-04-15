<template>
  <div class="video-control">
    <div class="control-left">
      <div
        class="video-playAndpause iconfont"
        :class="{
          play: video.isPlay,
          pause: !video.isPlay,
        }"
        @click="handlePlay"
      ></div>
      <div
        v-if="video.isNext"
        class="video-next iconfont next"
        @click="handleNext"
      ></div>
      <div class="video-time">
        <span> {{ formatNowTime }} </span>
        /
        <span> {{ formatAllTime }} </span>
      </div>
    </div>
    <div class="control-right">
      <div class="video-clarity">720p高清</div>
      <div class="video-speed">倍速</div>
      <div class="video-voice">
        <div class="iconfont voice" @click="handleVoice"></div>
        <xk-progress
          :now="video.nowVoice"
          :all="video.allVoice"
          @change="changeVoice"
        />
      </div>
      <div class="video-sitting iconfont sitting"></div>
      <div class="video-screen iconfont screen" @click="handleScreen"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "xkControl",
  data() {
    return {};
  },
  inject: ["video"],
  computed: {
    /**
     * 格式化的总时间
     *  @return {String} xx:xx
     */
    formatAllTime() {
      const allTime = this.video.allTime;
      return this.formatNumber(allTime);
    },

    /**
     * 格式化的当前时间
     * @return {String} xx:xx
     */
    formatNowTime() {
      const nowTime = this.video.nowTime;
      return this.formatNumber(nowTime);
    },
  },
  methods: {
    /**
     * 播放按钮
     */
    handlePlay() {
      this.video.handlePlay();
    },

    /**
     * 点击音量图标时
     */
    handleVoice() {
      this.video.handleVoice();
    },

    /**
     * 全屏按钮
     */
    handleScreen() {
      this.video.handleScreen();
    },

    handleNext() {
      this.video.handleNext();
    },

    /**
     * 改变当前音量
     * 该函数由子组件 progress 触发
     */
    changeVoice(e) {
      this.video.changeVoice(e);
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
  },
};
</script>

<style scoped>
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

.video-voice {
  width: 100px;
}

.video-voice .iconfont::before {
  margin: 0 10px 0 0;
}
.video-sitting {
  transition: all 0.6s;
}

.video-sitting:hover {
  transform: rotateZ(180deg);
}
</style>