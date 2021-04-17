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
    <xk-video class="video"  :srcList="srcList" @play="play" @progress='progress'/>
  
  </div>
</template>

<script>
export default {
  components:{
  },
  name: "App",
  data() {
    return {
      active: ["1"],
      active2: ["2"],
      srcList: [
        {
          src: "xxxx",
          title: "2021-04-17",
          barrage: [{}],
          
        },
      ],
    };
  },
  methods : {
    play(next){
      console.log(next);
    },

    progress(next){
      console.log(next);
    }
  }
};
</script>

<style>
#app, .video {
  width: 638px;
  height: 500px;
  margin: 0 auto;
}

/**
 清除默认样式
 */
/* v2.0 | 20110126
http://meyerweb.com/eric/tools/css/reset/ 
License: none (public domain)
*/
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
