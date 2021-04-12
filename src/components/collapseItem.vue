<template>
  <div class="collapse-item">
    <div class="collapse-item-header" @click="handleClick">
      <span class="title">
        {{ title }}
      </span>
    </div>
    <div class="collapse-item-body" :style="{ height: nowHeight + 'px' }">
      <div ref="body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      // 折叠面板头部标题
      type: String,
      default: "暂无头部信息",
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      nowHeight: 10,
      bodyHeight: 10,
      bodyDom: null,
      isFlod: false,
    };
  },
  mounted() {
    this.bodyDom = this.$refs.body;
    this.bodyHeight = this.bodyDom.offsetHeight;
    this.nowHeight = this.bodyHeight;
  },
  methods: {
    /**
     * 点击头部折叠面板
     */
    handleClick() {
      this.showCollapse();
    },

    /**
     * 展示和隐藏面板
     */
    showCollapse() {
      if (!this.isFlod) {
        this.nowHeight = 0;
      } else {
        this.nowHeight = this.bodyHeight;
      }
      this.isFlod = !this.isFlod;
    },
  },
};
</script>

<style scoped>
.collapse-item .collapse-item-header {
  cursor: pointer;
  background-color: rgb(240, 240, 240);
  border-bottom: 1px solid #ccc;
}
.collapse-item .collapse-item-header {
  padding: 5px 5px;
}
.collapse-item-body {
  overflow: hidden;
  transition: all 0.3s;
}
</style>