<template>
  <div class="loading-content">
    <div class="loading">
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
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.loading .loading-item {
  height: 100%;
  width: calc(100% / 7);
  border-radius: 5px;
  background-color: #00a1d6;

  animation-name: loading;
  animation-duration: 1s;
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
    height: 10%;
  }

  100% {
    height: 100%;
  }
}
</style>