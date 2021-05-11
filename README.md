# movie-vue

## 项目描述

1. 此项目为视频组件，可用于视频网站
2. 此项目不支持直播模式，后续会跟进（作者本人直播模式科技树未点）
3. 此项目目前在开发阶段，请勿用于商业用途，仅提供学习交流
4. 如果有任何想法（例如：你觉得这代码写的真low，想吐槽作者），欢迎发送至邮箱 142774255@gmail.com



## 组件

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
                       limit : 200, // 允许播放200时常
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

| 必填 |    参数     |   说明   |  类型  | 默认值 | 可选值 |
| :--: | :---------: | :------: | :----: | :----: | :----: |
|  是  | videoObject | 视频对象 | Object |   -    |   -    |
|      |             |          |        |        |        |

2. videoObject属性

| 必填 |  参数   |                         说明                          |  类型   | 默认值 |     可选值      |
| :--: | :-----: | :---------------------------------------------------: | :-----: | :----: | :-------------: |
|  是  |   src   |                       视频路径                        | String  |   -    |        -        |
|  否  |  title  |                     视频头部信息                      | String  |   -    |        -        |
|  否  |  token  | 是否需要做出验证处理, token 为 true 时 limit 默认为 0 | Boolean | false  | true \|\| false |
|  否  |  limit  |       当需要做出验证处理时，限制视频播放的时间        | Number  |   0    |        -        |
|  否  | barrage |                       弹幕信息                        |  Array  |   -    |        -        |

3. barrage 属性

| 必填 |   参数   | 说明 |  类型  | 默认值 |     可选值      |
| :--: | :------: | :--: | :----: | :----: | :-------------: |
|  是  |   user   | 用户 | Object |   -    |        -        |
|  是  |   time   | 时间 | Number |   -    |        -        |
|  是  |   body   | 内容 | String |   -    |        -        |
|  否  |  style   | 样式 | Object |   -    |        -        |
|  否  | position | 位置 | String | static | top \|\| bottom |



#### 事件

| 事件名 | 说明                                                         | 参数                 |
| ------ | ------------------------------------------------------------ | -------------------- |
| deal   | 有验证时，改变播放，进度条按钮的回调, 调用next(true) 执行下一步 | (next){ next(true) } |
| ended  | 当前视频结束事件                                             |                      |
| next   | 点击下一个视频按钮事件                                       |                      |

### button

#### 用法

#### 属性

| 必填 |  参数   |   说明   |  类型  | 默认值  |              可选值              |
| :--: | :-----: | :------: | :----: | :-----: | :------------------------------: |
|  否  |  size   |   大小   | String | medium  |   medium \|\| small \|\| mini    |
|  否  |  type   |   类型   | String | default | primiry \|\| success \|\| danger |
|  否  | circle  |    园    | String |  false  |                -                 |
|  否  | rounded |   圆角   | String |  false  |                -                 |
|  否  |  icon   | ico 图标 | String |    -    |                -                 |
#### 事件

