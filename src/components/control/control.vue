<template>
  <div>
    <!-- 进度条 -->
    <div class="video-progress" ref="progress">
      <xk-progress
        :now="video.nowTime"
        :all="video.allTime"
        @change="changeProgress"
      />
    </div>
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
  </div>
</template>

<script>
import xkProgress from "./progress";

export default {
  name: "xkControl",
  components: { xkProgress },
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
  props: {
    token: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    window.onkeydown = (e) => {
      console.log(e);
      switch (e.keyCode) {
        case 27: //esc
          this.video.isScreen = false
          break;
        case 32: // space
          this.handlePlay();
          break;
        case 37: // ←
          this.changeProgress(
            this.addAndDele(this.video.nowTime, this.video.allTime, -10)
          );
          break;
        case 38: // ↑
          this.changeVoice(
            this.addAndDele(this.video.nowVoice, this.video.allVoice, 0.05)
          );
          break;
        case 39: // →
          this.changeProgress(
            this.addAndDele(this.video.nowTime, this.video.allTime, 10)
          );
          break;
        case 40: // ↓
          this.changeVoice(
            this.addAndDele(this.video.nowVoice, this.video.allVoice, -0.05)
          );
          break;
      }
    };
  },
  methods: {
    /**
     * 键盘事件处理函数
     */
    addAndDele(now, all, value) {
      let nowTime = now + value;
      nowTime = nowTime < 0 ? 0 : nowTime > all ? all : nowTime;
      return nowTime;
    },

    /**
     * 播放按钮
     */
    handlePlay() {
      if (this.video.isPlay) {
        this.video.validation("handlePause", "pause");
      } else {
        this.video.validation("handlePlay", "play", this.video.nowTime);
      }
    },

    /**
     * 点击音量图标时
     */
    handleVoice() {
      this.video.validation("handleVoice");
    },

    /**
     * 全屏按钮
     */
    handleScreen() {
      this.video.validation("handleScreen");
    },

    handleNext() {
      this.video.validation("handleNext");
    },

    changeVoice(e) {
      this.video.validation("changeVoice", "", e);
    },

    changeProgress(e) {
      this.video.validation("changeProgress", "progress", e);
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
.control-content {
  width: 100%;
  height: auto;
}
/**
    进度条
*/
.video-progress {
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

.video-progress:hover .progress-bg {
  height: 7px;
}
</style>