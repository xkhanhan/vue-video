<template>
  <div class="video-control">
    <div class="control-left">
      <div
        class="video-playAndpause iconfont"
        :class="{ play: !$store.state.video.isPlay, pause: $store.state.video.isPlay }"
        @click="handlPlay"
      ></div>
      <div v-if="$store.state.video.isList" class="video-next iconfont next"></div>
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
          :now="$store.state.video.nowVoice"
          :all="$store.state.video.allVoice"
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
  name : 'xkControl',
  data() {
    return {
      store : this.$store,
    };
  },
 
  computed: {
    /**
     * 格式化的总时间
     *  @return {String} xx:xx
     */
    formatAllTime() {
      const allTime = this.store.state.video.allTime;
      return this.formatNumber(allTime);
    },

    /**
     * 格式化的当前时间
     * @return {String} xx:xx
     */
    formatNowTime() {
      const nowTime = this.store.state.video.nowTime;
      return this.formatNumber(nowTime);
    },
  },
  methods: {
    /**
     * 播放按钮
     */
    handlPlay() {
      const is = this.$store.state.video.isPlay;
      this.store.commit("isPlay", !is); // 改变播放按钮图标
    },

    /**
     * 点击音量图标时
     */
    handleVoice() {
      const { isMute } = this;

      if (!isMute) {
        this.oldVoice = this.nowVoice; // 暂存当前音量
        this.nowVoice = 0; // 静音
      } else {
        this.nowVoice = this.oldVoice; // 返回上次音量
      }

      this.isMute = !isMute; // 状态改变
    },

    /**
     * 全屏按钮
     */
    handleScreen() {
      // this.handlScreenParent();
      const is = this.store.state.video.isScreen;
      this.store.commit('isScreen', !is);
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

    /**
     * 改变当前音量
     * 该函数由子组件 progress 触发
     */
    changeVoice(e) {
      this.store.commit("nowVoice", e);
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