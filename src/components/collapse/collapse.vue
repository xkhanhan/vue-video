<template>
  <div class="collapse">
    <slot />
  </div>
</template>

<script>

export default {
  name : 'xkCollapse',
  props: {
    accordion: {
      // 是否手风琴模式
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.$store.commit('accordion', this.accordion); // 初始提交
    console.log(this.$attrs.value);
    this.$store.commit('activeList', this.$attrs.value);
  },
};
</script>

<style scoped>
.collapse {
  border: 1px solid #ccc;
}
</style>