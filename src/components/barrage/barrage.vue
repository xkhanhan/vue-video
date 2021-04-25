<template>
  <div class="barrage-content" ref="barragePar">
    <canvas ref="barrageCav" width="100%" height="100%"></canvas>
  </div>
</template>

<script>
class Barrage {
  constructor(canvas, parent, option = {}) {
    this.canvas = canvas;
    this.parent = parent;

    this.value = option.value;
    this.style = option.style || { fontSize: "12px", color: "#fff" };
    this.speed = option.speed || 1;
    this.time = option.time;
    this.poisiton = option.poisiton || "default";

    this.x = 0;
    this.y = 0;

    this.init();
  }
  
  init() {
    const { x, y, spanWidth } = this.create(
      this.canvas,
      this.parent,
      this.style.fontSize
    );
    this.x = x;
    this.y = y;

    if (this.x < -spanWidth) return;
    this.render(x, y, this.value, this.style);
  }

  /**
   * 创建需要渲染的文字基本数据
   * @param { Canvas } canvas canvas 对象
   * @param { String } fontSize 字体大小
   * @param { Element } parent 父级
   */
  create(canvas, parent, fontSize, value) {
    const span = document.createElement("span");
    span.innerText = value;
    parent.appendChild(span);

    const spanWidth = span.offsetWidth;

    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;

    let x = canvasWidth + fontSize;
    let y = canvasHeight * Math.random();

    if (y <= 0) {
      y = fontSize;
    } else if (y >= canvasHeight) {
      y = canvasHeight - fontSize;
    }

    return {
      x,
      y,
      spanWidth,
    };
  }

  /**
   * 绘制 canvas 文字
   * @param { Number } x x轴
   * @param { Number } y y轴
   * @param { Number } value 文字内容
   * @param { Number } style 样式
   */
  render(x = 0, y = 0, value, style) {
    const ctx = this.canvas.getContext();
    ctx.font = style.fontSize;
    ctx.fillStyle = style.color;
    ctx.fillText(value, x, y);
  }
}

export default {
  name: "xkBarrage",
  inject: ["video"],
  props: {
    barrageList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      canvas: null,
      Barrage: null,
      canvasBar: [],
      parent: null,
    };
  },
  mounted() {
    this.canvas = this.$refs.barrageCav;
    this.parent = this.$refs.barragePar;
    this.Barrage = Barrage;

    this.canvasBar = this.barrageList.map((item) => {
      return new Barrage(this.canvas, this.parent, item);
    });

    this.video.addEventListener("playing", () => {
      this.canvasBar.forEach((item) => {
        item.init();
      });
    });
  },
};
</script>

<style>
.barrage-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.barrage-content canvas {
  width: 100%;
  height: 100%;
}
</style>