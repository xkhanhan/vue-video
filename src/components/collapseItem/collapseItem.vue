<template>
  <div class="collapse-item">
    <div class="collapse-item-header" @click="handleClick">
      <span class="title">
        {{ title }}
        <slot name="header" />
      </span>
    </div>
    <div class="collapse-item-body" :style="{ height: nowHeight + 'px' }">
      <div ref="body">
        <slot />
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "xkCollapseItem",
  props: {
    title: {
      // 折叠面板头部标题
      type: String,
      default: "暂无头部信息",
    },
    name: {
      // 面板唯一值
      type: String,
      required: true,
    },
  },
  data() {
    return {
      nowHeight: 0, // 当前高度
      bodyHeight: 0, // 父级高度
      bodyDom: null, // 父级元素
    };
  },
  inject: ["collapse"],
  mounted() {
    this.bodyDom = this.$refs.body;
    this.bodyHeight = this.bodyDom.offsetHeight;
    this.nowHeight = this.bodyHeight;
    this.flod(this.name, this.collapse.activeList);
  },
  methods: {
    /**
     * 点击头部折叠面板方法
     * 触发父级事件 click-item, 并传入当前面板的 name 
     */
    handleClick() {
      this.collapse.$emit("click-item", this.name); // 触发父级事件
    },

    /**
     * 展示与隐藏方法
     * @param { String/Nmber } name 当前面板的 name
     * @param { Array } list 存放选中的面板数组，改值在父级
     */
    flod(name, list) {
      const is = this.isIn(name, list);
      if (is) {
        this.show();
      } else {
        this.hide();
      }
    },

    /**
     * @param { Array } list 存放选中的面板数组，改值在父级
     */
    show() {
      this.nowHeight = this.bodyHeight;
    },

    hide() {
      this.nowHeight = 0;
    },

    isIn(value, list) {
      return list.indexOf(value) != -1;
    },
  },
  watch: {
    "collapse.activeList"() {
      this.flod(this.name, this.collapse.activeList);
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