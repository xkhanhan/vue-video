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
      type: String,
      required : true
    },
  },
  data() {
    return {
      nowHeight: 0, // 当前高度
      bodyHeight: 0, // 父级高度
      bodyDom: null, // 父级元素
    };
  },
  mounted() {
    this.bodyDom = this.$refs.body;
    this.bodyHeight = this.bodyDom.offsetHeight;
    this.nowHeight = this.bodyHeight;

    this.flod(this.name, this.$store.state.collapse.activeList);
  },
  methods: {
    /**
     * 点击头部折叠面板
     */
    handleClick() {
      this.$store.commit("activeValue", this.name); // 提交commit
    },
    
    flod(value, list) {
       const is = this.isIn(value, list); // 是否需要折叠
      if(is) { // 在数组中需要展示
        this.show(list);
      } else { // 不在数组中折叠起来
        this.hide(list);
      }
        this.$emit('change', list)
    },

    show(list){
      this.nowHeight = this.bodyHeight;
      this.$emit('show', list);// 回调
    },
    hide(list){
      this.nowHeight = 0;
      this.$emit('hide', list);// 回调
    },
    isIn(value, list){
      return list.indexOf(value) != -1;
    }
  },
  watch: {
    "$store.state.collapse.activeList"() {
        this.flod(this.name, this.$store.state.collapse.activeList);
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