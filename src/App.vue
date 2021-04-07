<template>
  <div id="app">
      <xk-video  :src="require('./assets/【守望先锋】CG宣传片全收录_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili - Google Chrome 2020-06-13 22-30-01.mp4')"></xk-video>
  </div>
</template>

<script>
import xkVideo from './components/index';

export default {
  name: 'App',
  components: {
    xkVideo
  },
}
</script>

<style>
    #app {
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
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
font: inherit;
vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
display: block;
}
body {
line-height: 1;
}
ol, ul {
list-style: none;
}
blockquote, q {
quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: '';
content: none;
}
table {
border-collapse: collapse;
border-spacing: 0;
}
</style>
