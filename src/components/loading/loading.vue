<template>
  <div class="loading-content">
    <div class="loading" :class="{'center' : type == 'center', 'end' : type == 'end'}">
      <div
        v-for="item in 4"
        :key="item"
        class="loading-item"
        :class="'item' + item"
      ></div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "xkLoading",
  props: {
    type : {
      type : String,
      default : "center"
    }
  },
  data() {
    return {
      name: ["item"],
    };
  },
};
</script>

<style scoped>
.loading-content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(0,0,0,.5);
}
.loading {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

.loading.center{
  align-items: center;
}
.loading.end{
  align-items: flex-end;
}

.loading .loading-item {
  height: 100%;
  width: calc(100% / 10);
  border-radius: 5px;
  background-color: #00a1d6;

  animation-name: loading;
  animation-duration: 2s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}
.loading-item.item1 {
  animation-delay: 0s;
}
.loading-item.item2 {
 animation-delay: 0.25s;
}
.loading-item.item3 {
  animation-delay: 0.5s;
}
.loading-item.item4 {
  animation-delay: 0.75s;
}
@keyframes loading {
  0% {
    height: 100%;
  }
  50% {
    height: 10%;
  }
  100% {
    height: 100%;
  }
}
</style>