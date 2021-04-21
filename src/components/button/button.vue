<template>
  <button
    class="button"
    :class="{
      medium: size == 'medium',
      small: size == 'small',
      mini: size == 'mini',
      default: type == 'default',
      primary: type == 'primary',
      success: type == 'success',
      danger: type == 'danger',
      circle: circle,
      rounded: rounded,
    }"
      @click="handleClick"
  >
    <span><slot /></span>
    <i v-if="icon != ''" :class="icon"></i>
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
    type: {
      type: String,
      default: "default",
    },
    circle: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  methods : {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
};
</script>

<style scoped>
.button {
  display: inline-block;
  line-height: 1;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  color: #606266;
  box-sizing: border-box;
  font-family: inherit;
  appearance: none;
}

/* 尺寸 */
.button.medium {
  padding: 12px 20px;
  font-size: 14px;
}
.button.small {
  padding: 9px 15px;
  font-size: 13px;
}
.button.mini {
  padding: 6px 10px;
  font-size: 12px;
}

/* 颜色 */

.button.default:focus,
.button.default:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.button.primary {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}
.button.primary:focus,
.button.primary:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}

.button.success {
  background-color: #5daf34;
  border-color: #5daf34;
  color: #fff;
}
.button.success:hover,
.button.success:focus {
  background: #85ce61;
  border-color: #85ce61;
  color: #fff;
}

.button.danger {
  background-color: #dd6161;
  border-color: #dd6161;
  color: #fff;
}
.button.danger:hover,
.button.danger:focus {
  background: #f78989;
  border-color: #f78989;
}
/* 圆 */
.button.circle {
  padding: 12px;
  border-radius: 50%;
}
/* 圆角 */
.button.rounded {
  border-radius: 20px;
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