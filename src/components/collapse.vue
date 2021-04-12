<template>
  <div class="collapse">
    <slot />
  </div>
</template>

<script>

export default {
  props: {
    accordion: {
      // 是否手风琴模式
      type: Boolean,
      default: false,
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.collapse {
  border: 1px solid #ccc;
}
</style>