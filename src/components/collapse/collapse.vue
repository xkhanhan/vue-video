<template>
  <div class="collapse">
    <slot />
  </div>
</template>

<script>
export default {
  name: "xkCollapse",
  props: {
    accordion: {
      // 是否手风琴模式
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeList: this.$attrs.value,
    };
  },

  /**
   * 向子组件注入父组件，方便子组件调用父组件方法
   */
  provide() {
    return {
      collapse: this,
    };
  },

  created() {
    /**
     * 初始化处理对传入的参数进行规则校验
     * 1。传入参数只能为 ['1', '2', ...] 形式
     * 2. 手风琴模式下，数组的值只能为一个
     * 3. 必须绑定一个值
     */
    const { accordion, $attrs } = this;

    if (!$attrs.value) throw new Error("请绑定选中的面板");

    if (accordion && $attrs.value.length != 1) {
      throw new Error("错误此模式为手风琴模式，选中的元素必须为一个");
    }

    this.$on("click-item", this.setActiveList);
  },
  methods: {
    /**
     * 设置 选中的面板方法
     * 1. 普通模式
     *    当数组中存在改值时删除这个值
     *    不存在添加改值
     * 2. 手风琴
     *    直接弹出数组中的值
     *    再加入改值
     * @param {String / Nmber} name 被点击的面板 name
     */
    setActiveList(name) {
      let {activeList} = this;
      const INDEX = activeList.indexOf(name);

      if (this.accordion) {
        activeList.shift();
        activeList.push(name);
      } else {
        if (INDEX != -1) {
          activeList.splice(INDEX, 1);
        } else {
          activeList.push(name);
        }
      }
      this.activeList = activeList;
      this.$emit("input", this.activeList);
      this.$emit("change", this.activeList);
    },
  },
};
</script>

<style scoped>
.collapse {
  border: 1px solid #ccc;
}
</style>