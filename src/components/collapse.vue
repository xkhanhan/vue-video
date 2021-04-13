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
  provide(){
    return {
      activeList : this.$attrs.value,
      accoraion : this.accordion,
    }
  },
  watch : {
    /**
     * 当 activeList 改变时， 改变父级绑定的值
     */
    activeList () {
      this.$listeners.input();
    }
  }
};
</script>

<style scoped>
.collapse {
  border: 1px solid #ccc;
}
</style>