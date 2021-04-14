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
  data () {
    return {
      activeList : [].concat(this.value)
    }
  },
  created() {
    const { accordion, $attrs } = this;
    if(!$attrs.value) throw new Error('请绑定选中的面板')
    if (accordion) {
      if ($attrs.value.length != 1) {
        throw new Error("错误此模式为手风琴模式，选中的元素必须为一个");
      } else {
        // // 初始提交
        // this.$store.commit("accordion", this.accordion);
        // this.$store.commit("activeList", this.$attrs.value);
      }
    }
  },
};
</script>

<style scoped>
.collapse {
  border: 1px solid #ccc;
}
</style>