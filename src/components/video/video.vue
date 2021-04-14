<template>
  <div>
    <div class="video-content" ref="content">
      <!-- 头部视频信息 -->
      <div class="video-header">
        <div class="title">{{title}}-07-31_22-37-39</div>
      </div>

      <!-- 视频 -->
      <video
        @click="handleVideo"
        width="95%"
        ref="video"
        autobuffer
        :src="$store.state.video.videoSrc"
      ></video>

      <!-- 进度条 -->
      <div class="video-progress">
        <slot :now="$store.state.video.nowTime"
          :all="$store.state.video.allTime" name="progress" />
      </div>

      <!-- 控件 -->
      <slot name="control" />
    </div>

    <div class="list-content" v-if="$store.state.video.isList">
      <!-- 列表 -->
    </div>
  </div>
</template>

<script>

export default {
  name: "xkVideo",
  props: {
    /**
     * 视频播放路径
     */
    src: {
      //优先级高
      type: String,
    },
    srcList: {
      type: Array,
    },
    title: {
      type: String,
    },
  },
  created() {
    const { src, srcList } = this;
    if (src == null && srcList == null) throw Error("请传入视频路径"); // 两个都没有传入报错

    if (src) {
      this.store.commit("videoSrc", src); // 传入 src
    } else {
      this.store.commit("videoSrc", srcList[this.state.index]);
      if (srcList.length > 1) {
        this.store.commit("isList", true); // 当视频路径数组长度大于1时,渲染下一个按钮和视频列表
      }
    }
  },
  data() {
    const store = this.$store;
    return {
      store,
      state: store.state.video,
    };
  },
  /**
   * 初始化
   */
  mounted() {
    const videoDom = this.$refs.video; // 获取视频元素
    const contentDom = this.$refs.content; // 获取容器

    this.store.commit("videoDom", videoDom);
    this.store.commit("contentDom", contentDom);

    new Promise((resolve) => {
      /**
       * 当视频加载完成，对总时间进行赋值
       */
      videoDom.addEventListener("loadeddata", () => {
        this.store.commit("allTime", videoDom.duration); // 赋值总时间

        // this.buffer = video_dom.buffered.length * this.allTime;

        this.store.commit("nowVoice", videoDom.volume);

        resolve();
      });
    }).then(() => {
      /**
       * 对视频播放进行监听并改变当前时间
       */
      videoDom.addEventListener("timeupdate", () => {
        this.store.commit("nowTime", videoDom.currentTime); // 赋值当前时间

        // this.buffer = video_dom.buffered.length * this.allTime;
      });

      // video_dom.addEventListener("emptied", () => {
      //   console.log("emptied");
      // });

      /**
       * 当视频结束播放对播放按钮进行改变
       */
      videoDom.addEventListener("ended", () => {
        this.store.commit("isPlay", false);
      });
    });
  },

  methods: {
    /**
     * 点击视频时
     */
    handleVideo() {
      const is = this.store.state.video.isPlay;
      this.store.commit("isPlay", !is);
      this.$emit("clickPlay", this.store.state.video.videoDom);
    },

    changeProgress(e) {
      this.store.commit("nowTime", e);
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

.video-header,
.video-control,
.video-progress {
  opacity: 1;
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
</style>