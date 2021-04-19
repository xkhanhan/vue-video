# movie-vue

## 项目描述



## 项目下载

``` shell
npm install xkUI
```



## 项目引入

``` js
import Vue from 'vue';
import xkUI from 'xkUI';

Vue.use(xkUI);
```



## components

### progress

#### 用法

``` vue
<template>
	<xk-progress :now="now" :all="all"></xk-progress>
</template>

<script>
	export default {
		data() {
			return {
             	  now : 0,
                  all : 100,
            }
        }
    }
</script>
```

#### 属性

| 必填 |    参数    |       说明       |  类型   | 默认值 |    可选值    |
| :--: | :--------: | :--------------: | :-----: | :----: | :----------: |
|  是  |    all     |      总进度      | Number  |   -    |      -       |
|  否  |    now     |     当前进度     | Number  |   0    |      -       |
|  否  |   buffer   |     缓冲进度     | Number  |   0    |      -       |
|  否  | showBuffer | 是否展示缓冲进度 | Boolean | false  | false / true |



#### 事件

| 事件名 | 说明           | 参数                                         |
| ------ | -------------- | -------------------------------------------- |
| change | 进度改变时触发 | 当前进度(组件内部已做出处理，你只需赋值即可) |



### collapse

#### 用法

1. 默认用法

``` vue
<template>
	<xk-collapse v-model="activeList">
    <xk-collapse-item name="1" title="面板一">
    	内容一
    </xk-collapse-item>
    <xk-collapse-item name="2" title="面板二">
    	面板二
    </xk-collapse-item>
    <xk-collapse-item name="3" title="面板三">
    	面板三
    </xk-collapse-item>
</xk-collapse>
</template>

<script>
	export default {
		data() {
			return { 
				activeList : ["1", "2"]
            }
        }
    }
</script>
```

2. 手风琴模式

``` vue
<template>
	<xk-collapse v-model="activeList" accordion>
    <xk-collapse-item name="1" title="面板一">
    	内容一
    </xk-collapse-item>
    <xk-collapse-item name="2" title="面板二">
    	面板二
    </xk-collapse-item>
    <xk-collapse-item name="3" title="面板三">
    	面板三
    </xk-collapse-item>
</xk-collapse>
</template>

<script>
	export default {
		data() {
			activeList : ["1"]
        }
    }
</script>
```



#### 属性

1. collapse 属性

| 必填 |             参数             |                      说明                      |  类型   | 默认值 |   可选值    |
| :--: | :--------------------------: | :--------------------------------------------: | :-----: | :----: | :---------: |
|  否  |          accordion           |                   手风琴模式                   | Boolean | false  | true\|false |
|  是  | value / v-model (activeList) | 当前选中的值(手风琴模式下，该数组只能为一个值) |  Array  |   -    |      -      |
|      |                              |                                                |         |        |             |

2. collapseItem 属性

| 必填 | 参数  |       说明       |  类型  |    默认值    | 可选值 |
| :--: | :---: | :--------------: | :----: | :----------: | :----: |
|  否  | title | 折叠面板头部信息 | String | 暂无头部信息 |   -    |
|  是  | name  |    面板唯一值    | String |      -       |   -    |
|      |       |                  |        |              |        |



#### 事件

1. collapseItem事件

| 事件名 |        说明        |        参数        |
| :----: | :----------------: | :----------------: |
| change | 面板状态改变时触发 | activeList : Array |

### video

#### 用法

1. 基本用法

``` vue
<template>
	<xk-video :srcList="srcList">
    </xk-video>
</template>

<script>
	export default {
		data() {
			return {
				srcList : [
                   {
                       src : 'http://xxxx'
                       title : 'xxxx',
                       barrage: [
                      	 {usre : 'xxx', title : 'xxxx', date : 2331321332}
                	  ]
                   }   
                 ]
            }
        }
    }
</script>
```

2. 对不同用户做出视频播放和控件处理

``` vue
<template>
	<xk-video :srcList="srcList">
    </xk-video>
</template>

<script>
	export default {
		data() {
			return {
				srcList : [
                   {
                       src : 'http://xxxx'
                       title : 'xxxx',
                       token : true, // 需要对用户验证
                       barrage: [
                      	 {usre : 'xxx', title : 'xxxx', date : 2331321332}
                	  ]
                   }   
                 ]
            }
        }
    }
</script>
```



#### 属性

1. video 属性

| 必填 |  参数   |     说明     | 类型  | 默认值 | 可选值 |
| :--: | :-----: | :----------: | :---: | :----: | :----: |
|  是  | srcList | 视频路径数组 | Array |   -    |   -    |
|      |         |              |       |        |        |

2. srcList 属性

| 必填 |  参数   |                   说明                   |  类型   | 默认值 |     可选值      |
| :--: | :-----: | :--------------------------------------: | :-----: | :----: | :-------------: |
|  是  |   src   |                 视频路径                 | String  |   -    |        -        |
|  是  |  title  |               视频头部信息               | String  |   -    |        -        |
|  否  |  token  |           是否需要做出验证处理           | Boolean | false  | true \|\| false |
|  否  |  limit  | 当需要做出验证处理时，限制视频播放的时间 | Number  |   0    |        -        |
|  否  | barrage |                 弹幕信息                 |  Array  |   -    |        -        |

3. barrage 属性

| 必填 |   参数   | 说明 |  类型  | 默认值 |     可选值      |
| :--: | :------: | :--: | :----: | :----: | :-------------: |
|  是  |   user   | 用户 | Object |   -    |        -        |
|  是  |   time   | 时间 | Number |   -    |        -        |
|  是  |   body   | 内容 | String |   -    |        -        |
|  否  |  style   | 样式 | Object |   -    |        -        |
|  否  | position | 位置 | String | static | top \|\| bottom |



#### 事件

| 事件名 | 说明                                                    | 参数                 |
| ------ | ------------------------------------------------------- | -------------------- |
| deal   | 有验证时，改变播放按钮的回调, 调用next(true) 执行下一步 | (next){ next(true) } |
|        |                                                         |                      |

