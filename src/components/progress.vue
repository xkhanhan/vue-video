<template>
  <div class="progress-bg" ref="bgProgress" @click="bgClick">
    <div
      class="progress-now"
      ref="nowProgress"
      :style="{
        width: nowProgress + 'px',
      }"
    ></div>
    <div
      class="progeress-chart"
      ref="chartProgress"
      :style="{ left: chart_left + 'px' }"
    ></div>
    <div
      v-if="show_buffer"
      class="progress-buffer"
      ref="bufferProgress"
      :style="{
        width: bufferProgress + 'px',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * 是否展示缓存
     */
    show_buffer: {
      type: Boolean,
      default: false,
    },

    /**
     * 当前进度,必填
     */
    now: {
      type: Number,
      default: 0,
    },

    /**
     * 总进度,必填
     */
    all: {
      type: Number,
      required: true,
    },

    buffer: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      nowProgress_dom: null, // 进度条元素
      bufferProgress_dom: null, // 缓存条元素
      bgProgress_dom: null, // 背景进度

      bgProgress_width: 0, // 父级宽度
      chart_width: 0, // 按钮的宽度

      mouse_start: 0,
    };
  },
  mounted() {
    this.nowProgress_dom = this.$refs.nowProgress; // 当前进度条
    this.bufferProgress_dom = this.$refs.bufferProgress; // 缓冲进度条
    this.chartProgress_dom = this.$refs.chartProgress; // 拖拽按钮
    this.bgProgress_dom = this.$refs.bgProgress; // 进度条父级

    this.bgProgress_width = this.bgProgress_dom.offsetWidth; // 父级宽度

    this.chart_width = this.chartProgress_dom.offsetWidth; // 按钮宽度

    this.drag(this.chartProgress_dom); // 拖拽事件
  },

  computed: {
    /**
     * 按钮左边距
     * @return 当前进度 / 总进度 - 按钮宽度 / 2
     */
    chart_left() {
      const { now, all, bgProgress_width } = this;

      // 计算出按钮按钮距离父级右边的位置，并减去比般的宽度
      return this.calculate(now, all) * bgProgress_width - this.chart_width / 2;
    },

    /**
     * 当前进度
     * @return 视频当前时间 / 总时间 * 进度条父级宽度
     */
    nowProgress() {
      return this.chart_left + this.chart_width / 2;
    },

    /**
     * 缓冲进度条
     * @return 缓冲时间 / 总时间 * 进度条父级宽度
     */
    bufferProgress() {
      return this.calculate(this.buffer, this.all) * this.bgProgress_width;
    },
  },
  methods: {
    /**
     * 计算百分比
     * @param { Number } children 子
     * @param { Nmber } father 父
     * @return { Number } childer / father * 100
     */
    calculate(children, father) {
      if (father == 0) return 0;
      return children / father;
    },

    /**
     * @param {Element} dom
     */
    drag(dom) {
      dom.addEventListener("mousedown", (e) => {
        const { chart_left, changChartLeft } = this; // 按钮当前位置

        const mouse_start = e.clientX; // 鼠标按下时的位置

        document.onmousemove = (e) => {
          const mouse_over = e.clientX; // 鼠标移动的位置

          const location = mouse_over - mouse_start + chart_left;
          changChartLeft(location);
        };
      });

      /**
       * 鼠标抬起，清除监听鼠标移动的事件
       */
      document.addEventListener("mouseup", () => {
        document.onmousemove = null;
      });

    },

    /**
     * 改变按钮位置
     */
    changChartLeft(number) {
      const { bgProgress_width, all } = this;

      number = number / bgProgress_width;
      if (number < 0) {
        number = 0;
      } else if (number > 1) {
        number = 1;
      }
      number = number * all;
      this.$emit("chartChange", number);

    },

    /**
     * 背景点击事件
     */
    bgClick (e) {   
      if(e.target == this.chartProgress_dom) return;

      const target_left = e.target.getBoundingClientRect().left;  
      const mouse_left = e.clientX;
      this.changChartLeft(mouse_left - target_left);
    }



  },
};
</script>

<style scoped>
.progress-bg{
  display: flex;
  align-items: center;
  border-radius: 20px;
  position: relative;
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}


.progress-bg .progeress-chart {
  left: 30%;
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  z-index: 9;
}
.progress-bg .progress-now {
  border-radius: 20px;
  position: absolute;
  background: #00a1d6;
  width: 10px;
  height: 100%;
  z-index: 8;
}

.progress-bg .progress-buffer {
  border-radius: 20px;
  position: absolute;
  background: #fff;
  opacity: 0.2;
  width: 50%;
  height: 100%;
  z-index: 7;
}
</style>