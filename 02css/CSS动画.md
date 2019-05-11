# CSS动画 animation 和 transition

## 什么是动画

动画是使元素从一种样式逐渐变化为另一种样式的效果。可以改变任意多的样式任意多的次数。

## 几个属性和值

区分几个属性`animation`动画、`transition`过渡、`transform`变形、`translate`移动

`transform`变形属性用于内联元素和块级元素，可以旋转、扭曲、缩放、移动元素，它的属性值有以下五个：旋转rotate、扭曲skew、缩放scale和移动translate以及矩形变换matrix。

**transform是css3中元素的一个属性，而translate只是transform的一个属性值。transform是transition的transition-property的一个属性值**

`animation`和`transition`是css3中的两种动画属性。animation强调流程和控制，对元素的一个或多个属性的变化进行控制，可以有多个关键帧(`animation`和`@keyframes`结合使用)

`transition`强调过渡，是元素的一个或多个属性发生变化时产生的过渡效果，同一个元素通过两种不同的途径获取样式。而第二个途径当某种改变发生时才能获取样式，这样就会产生过渡动画。可以认为它有两个关键帧。

## @keyframes 规则

在 `@keyframes` 中规定某项 CSS 样式，就能够创建出由当前样式逐渐改变为新样式的动画效果。注意不同的浏览器需要加不同的前缀等。

```css
@keyframes myfirst {
    from {background: red;}
    to {background: yellow;}
}
```

将创建好的 keyframes 绑定到某个选择器就可以产生效果了。通过规定至少以下两项 CSS3 动画属性，即可绑定到某个选择器：

- 规定动画名称
- 规定动画时长

```css
div {
    animation: myfirst 5s;
    -moz-animation: myfirst 5s;
}
```

## transition

transition 是一个复合属性，可以设置四个过渡属性。简写方式如下：

```css
transition{ transition-property transition-duration transition-timing-function transition }
```
- transition-property: 是用来指定当元素的过渡属性（默认为all）
- transition-duration: 过渡持续时间（默认为0s）
- transition-timing-function: 过渡函数（默认为ease）
- transition-delay: 过渡延迟时间

【即，一个过渡，什么时候开始过渡，元素的什么属性过渡，过渡的时间为多长，过渡时的速度如何】

过渡属性的四个子属性中，`transition-duration`是必需值。并且`transition-duration`和`transition-delay`都是时间，当两个时间同时出现时，第一个是`transition-duration`,当只出现一个时间时，指的是`transition-duration`。

### 过渡属性

`transition-property`：`none`、`all`、`具体值`

不是所有的 css 样式都可以过渡，只有具有中间值的属性才具备过渡效果。如：颜色、位置、长度等

### 过渡持续时间

该属性的单位是秒s或毫秒ms。该值为单值时，即所有的属性都对应同样时间；该值为多值时，过渡属性按照顺序对应持续时间。

### 过渡延迟时间

该属性定义元素属性延迟多少时间后开始过渡效果。【注意】该属性如果为负值则**无过渡效果**。

### 过渡时间函数

`transition-timing-function`。初始值为ease。

有三种取值： **关键字**、**steps函数**、**bezier函数**

steps函数：`steps(<integer>[,start|end]?)`。第一个参数用来指定间隔数，第二个参数默认为end，表示开始值保持一次如果为start则表示不保持。

贝塞尔曲线： 通过p0-p3四个控制点来控制，其中p0表示(0,0)，p3表示(1,1)，而`transition-timing-function`就是通过确定p1(x1,y1)和p2(x2,y2)的值来确定的。`transition-timing-function: cubic-bezier(x1,y1,x2,y2)`,注意这四个取值都是0到1的值。

关键字：其实是两个函数的特殊值

```html
ease: 开始和结束慢，中间快。
linear: 匀速
ease-in: 开始慢
ease-out: 结束慢
ease-in-out: 类似ease但是幅度更大
step-start: 直接位于结束处
step-end: 位于开始处和经过时间间隔后结束。
```

### 多值

```css
transition: <single-transition>[,<single-transition>]*

//example
#test1 {
    transition: width 2s linear 200ms, background 2s linear 200ms;
}
```

## Animation

transition 过渡是初始和结束两个状态之间的平滑过渡实现动画的，而animation则是通过关键帧@keyframes来实现更为复杂的动画效果。

### 概况

和 transition 类似，animation也是一个复合属性，包括：animation-name、animation-duration、animation-timing-function、animation-delay、animation-iteration-count、animation-direction、animation-play-state、animation-fill-mode。

animation 制作动画需要两步，首先用关键帧声明动画，再用animation调用动画。

- `animation-fill-mode`: 规定当动画不播放时（当动画完成或有一个动画延迟未开始播放时），要应用的元素样式。默认情况下，css 动画在第一个关键帧播放完之前不会影响元素，在最后一个关键帧完成后停止影响元素。可以取值：`none`、`forwards`(动画结束后应用该属性)、`backwards`