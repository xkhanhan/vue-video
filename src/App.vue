<template>
  <div id="app">
    <!-- <xk-collapse v-model="active" >
      <xk-collapse-item title="一致性 Consistency" name="1">
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
        <div>
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
      </xk-collapse-item>
      <xk-collapse-item title="反馈 Feedback" name="2">
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
        <div>
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
      </xk-collapse-item>
      <xk-collapse-item title="效率 Efficiency" name="3">
      
        <div>
          清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
        </div>
        <div>
          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
      </xk-collapse-item>
    </xk-collapse> -->
    <xk-video class="video" isNext :videoObject="srcList[0]" @deal="deal" />
    <!-- <xk-button size="medium" >默认按钮</xk-button> -->
  </div>
</template>

<script>
export default {
  components: {},
  name: "App",
  data() {
    return {
      srcList: [
        {
          src: require("./assets/选奶救不了队友的亮眼表现_20-07-31_22-37-39.mp4"),
          title: "选奶救不了队友的亮眼表现_20-07-31_22-37-39",
          barrage: [
            {
              user: {},
              time: "2021-04-01",
              body: "xxxxxxxxxxx",
              position: "top||bottom||static",
              style: {
                color: "red",
                fontSize: "18px",
              },
            },
          ],
        },
      ],
    };
  },
  methods: {
    deal(next) {
      console.log(next);
    },
  },
};
</script>

<style>
@import url("./css/index.css");

#app {
  width: 1000px;
  height: 500px;
}
</style>
