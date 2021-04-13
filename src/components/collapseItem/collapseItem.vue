<template>
  <div class="collapse-item">
    <div class="collapse-item-header" @click="handleClick">
      <span class="title">
        {{ title }}
        <slot name="header" />
      </span>
    </div>
    <div
      class="collapse-item-body"
      :style="{ height: { nowHeight: isFlod, 0: !isFlod } }"
    >
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
      type: String,
    },
  },
  data() {
    return {
      nowHeight: 0, // 当前高度
      bodyHeight: 0, // 父级高度
      bodyDom: null, // 父级元素
      activeList: this.$store.state.collapse.activeList,
    };
  },
  mounted() {
    this.bodyDom = this.$refs.body;
    this.bodyHeight = this.bodyDom.offsetHeight;
    this.nowHeight = this.bodyHeight;
  },
  computed: {
    isFlod() {
      const is = this.inlist(this.name, this.activeList);
      if (is) {
        // 需要展开
        this.nowHeight = this.bodyHeight + "px";
      } 
      return is;
    },
  },
  methods: {
    inlist(name, list) {
      return list.indexOf(name) != -1;
    },

    /**
     * 点击头部折叠面板
     */
    handleClick() {
      const { name, accoraion } = this;

      let list = [...this.activeList];

      /**
       *  根据父级 collapse 传来的 accoraion 判断是否开启手风琴模式
       */
      if (accoraion) {
        this.pushAndShift(list, name);
      } else {
        this.addAndDelete(list, name);
      }
      this.$store.commit("activeList", list); // 提交commit
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
      console.log("x");
      activeList.shift(); // 弹出原先的
      activeList.push(name); // 压入当前
    },

    /**
     * 展示和隐藏面板
     */
    showCollapse() {},
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