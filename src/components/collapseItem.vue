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
  inject: ["activeList", "accoraion"], // 接收父级传来的值
  data() {
    return {
      nowHeight: 0, // 当前高度
      bodyHeight: 0, // 父级高度
      bodyDom: null, // 父级元素
      isFlod: false, // 是否折叠
    };
  },
  mounted() {
    this.bodyDom = this.$refs.body;
    this.bodyHeight = this.bodyDom.offsetHeight;
    this.nowHeight = this.bodyHeight;

    /**
     * 当前面板并未选中，改变 isFlod 值，触发监听事件，进行折叠 
     */
    if (this.activeList.indexOf(this.name) == -1) {
      this.isFlod = true;
    }
  },
  methods: {
    /**
     * 点击头部折叠面板
     */
    handleClick() {
      this.isFlod = !this.isFlod;
      const { activeList, name, accoraion} = this;

      /**
       *  根据父级 collapse 传来的 accoraion 判断是否开启手风琴模式
       */
      if(accoraion) {
        this.pushAndShift(activeList, name);
      } else {
        this.addAndDelete(activeList, name);
      }
      
    },

    /**
     * 非手风琴模式下,父级 activeList 添加元素方式
     */
    addAndDelete(activeList, name) {
      const index = activeList.indexOf(name); // 获取当前name 的值在数组中的下标

      if (index == -1) {
        // 当此时并未展开而点击时，向数组中添加此项
        activeList.push(name);
      } else {
        // 当此时展开点击时，向数组中删除此项
        activeList.splice(index, 1);
      }
    },

    /**
     * 手风琴模式下,父级 activeList 添加元素方式
     */
    pushAndShift(activeList, name) {
      activeList.shift(); // 弹出原先的
      activeList.push(name);// 压入当前
    },

    /**
     * 展示和隐藏面板
     */
    showCollapse() {
      if (this.isFlod) { // 需要折叠
        this.nowHeight = 0;
      } else { // 需要展开
        this.nowHeight = this.bodyHeight;
      }
    },
  },
  watch: {
    /**
     * 监听 activeList 的变化
     * 当前面板在数组中时进行展开
     */
    activeList() {
      if (this.activeList.indexOf(this.name) == -1) {
        this.isFlod = true;
      }
    },

    /**
     * 折叠面板
     */
    isFlod () {
      this.showCollapse();
    }
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