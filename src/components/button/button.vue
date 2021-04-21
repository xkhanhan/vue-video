<template>
  <button
    class="button"
    :class="{
      medium: size == 'medium',
      small: size == 'small',
      mini: size == 'mini',
    }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "xkButton",
  props: {
    size: {
      type: String,
      default: "medium",
    },
    circle: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.button {
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
}


.button.medium {
  min-width: 50px;
  min-height: 35px;
  font-size: 14px;
}
.button.small {
  min-width: 40px;
  min-height: 25px;
  font-size: 12px;
}
.button.mini {
  min-width: 30px;
  min-height: 15px;
  font-size: 10px;
}
</style>