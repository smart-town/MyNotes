# Event 对象

## 1. 概述

事件发生以后，会产生一个事件对象，作为参数传递给监听函数。浏览器原生提供了一个`Event`对象，所有的事件都是这个对象的实例，或者说继承了`Event.prototype`对象。

`Event`对象本身就是一个构造函数，可以用来生成实例。`event = new Event(type,options)`

两个参数：`type`表示事件名称，`options`为配置对象，有两个属性：`bubbles`默认为`false`，表示事件对象是否冒泡。`cancelable`默认为`false`表示事件是否可以被取消。

## 2. 实例属性

### `bubbles`、`eventPhase`

`Event.bubbles`属性返回一个布尔值表示当前事件是否会冒泡，该属性只读。

`Event.eventPhase`返回一个常量表示事件所属阶段。`0`表示没有发生，`1`表示捕获，`2`表示目标节点，`3`表示冒泡阶段

### `cancelable`、`cancelBubble`、`defaultPrevented`

`cancelable`返回一个布尔值，表示事件是否可以取消。该属性只读。`Event`构造函数生成的事件默认是不可取消的。当该属性为`true`时，调用`preventDefault()`就可以取消这个事件，阻止浏览器对某事件的默认行为。

`cancelBubble`设置为`true`，相当于执行`stopPropagation()`，可以阻止事件传播

`defaultPrevented`返回一个布尔值表示事件是否调用过`preventDefault`方法。

### `currentTarget`、`target`

事件发生后，会经过捕获和冒泡阶段，依此通过多个节点。因此，任意时间点都有两个与事件相关的节点。一个是事件的原始触发节点(`Event.target`)，另一个事件是当前正在通过的节点`Event.currentTarget`。前者通常是后者的后代节点。

`Event.currentTarget`返回事件当前所在的节点，即事件当前正在通过的节点，也就是正在执行监听函数的那个节点。随着事件的传播，这个属性的值会改变。

`Event.target`返回原始触发事件的那个节点，即事件最初发生的那个节点。该属性不会随着事件的传播而改变。

### `type`

### `timeStamp`

返回一个毫秒事件戳，表示事件发生的时间。相对于网页加载成功时开始计算。

### `isTrusted`

返回一个属性值，表示该事件是否由真实的用户行为产生，如用户点击链接会产生一个`click`事件，该事件是用户产生的。`Event`构造函数生成的则是脚本产生的。

### `detail`

`Event.detail`只有浏览器的 UI 事件才具有。该属性返回一个值，表示事件的某种信息。具体含义和事件类型有关。如对于`click`事件，`Event.deatil`是鼠标按下的次数。

## 3. 实例方法

### `Event.preventDefault()`

`preventDefault()`方法取消浏览器对当前事件的默认行为。如点击链接后浏览器默认跳转到另一个页面，按下空格页面向下滚动，使用该方法后都会取消这些操作。该方法生效的前提是，事件对象的`cancelable`属性为`true`。

注意，该方法只是取消事件对当前元素的默认影响，不会阻止事件的传播。如果要阻止传播，可以使用`stopPropagation()`或`stopImmediatePropagation()`方法

实例，为文本框设置校验条件时，绑定`keypress`,当输入内容不符合条件时则使用`preventDefault`使得用户不能输入内容到文本框中。

### `Event.stopPropagation()`

阻止事件继续在 DOM 中传播，防止再触发在别的节点上的监听函数，但是不包括当前节点上的其他监听函数

### `Event.stopImmediatePropagation()`

阻止同一个事件的其他监听函数被调用。不管函数定义在当前节点还是其他节点。

### `Event.composedPath()`

返回一个数组，成员是事件最底层节点和依次冒泡经过的所有上层节点。