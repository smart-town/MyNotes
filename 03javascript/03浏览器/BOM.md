# BOM

BOM（Browser Object Model）浏览器对象模型，用于管理窗口以及窗口间的通讯，其核心对象是window，称为其窗口，可能并不准确。因为有的浏览器窗口可能包含多个标签页，每个标签页都有自己的window对象。

## 窗口操作

### 窗口位置

浏览器（firefox不支持）提供了`screenLeft`和`screenTop`属性，分别用于表示窗口相对于屏幕左边和上面的距离。注意`screenLeft`和`screenTop`是只读属性，修改并不会使得窗口发生移动。

注意在窗口最大化的情况下，各个浏览器的返回值并不会相同。如chrome返回left:0,top:0。而IE则是0,56(有菜单栏的情况下)。`screenX`和`screenY`也提供同样的位置信息(IE8)。

**移动**，使用`moveTo()`和`moveBy()`方法可以将窗口精确地移动到一个新位置，这两个方法只用于IE

### 窗口大小

`outerWidth`和`outerHeight`表示浏览器窗口本身的尺寸。`innerWidth`和`innerHeight`用于表示页面的大小，实际上等于浏览器窗口尺寸大小减去浏览器自身边框以及菜单栏、地址栏、状态栏等的宽度。IE8不支持。

由于`<iframe>`本身也有`window`属性，如果页面中存在框架，那么框架中的`innerWidth`和`innerHeight`则指的是框架本身的宽和高。

DOM中的`document.documentElement.clientWidth`和`document.documentElement.clientHeight`也可以表示页面大小（不包含滚动条），与`innerWidth`和`innerHeight`返回相同的值。

如果没有滚动条，这两类属性在电脑端表示同样的值，但是在手机端却有不同用途。`innerWidth`和`innerHeight`表示的是视觉视口，即用户正在看到的网站的区域。而`document.documentElement.clientWidth`则表示的是布局视口，指的是css布局的尺寸。

使用`resizeTo()`和`resizeBy()`可以调整窗口大小。【注意】只有ie和safari支持。

### 打开窗口

`window.open`可以导航到一个特定的url。也可以打开一个新的浏览器窗口。这个方法接收四个参数：要加载的URL、窗口目标、一个特性字符串、一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。

```js
window.open("http://baidu.com");

window.open("http://baidu.com", "_self") ;
```

第三个参数是一个逗号分割的设置字符串，表示新窗口都有那些特性。

fullscreen 表示浏览器窗口是否最大化（IE），height，width，left，location(表示新窗口中是否显示地址栏，不同浏览器默认值不同，如果设置为no地址栏可能会隐藏，也可能会被禁用，这取决于浏览器)等。

### 关闭窗口

方法`close()`将关闭一个窗口。


## location 对象

location提供了当前窗口中加载的文档的信息，还提供了一些导航功能，location是一个很特别的对象，因为它既是window对象的属性，也是document对象的属性，还可以单独使用。

### 属性

loaction 将 URL 解析成独立的片段，让开发人员可以通过不同的属性来访问这些片段:hash、host、hostname、href、pathname、port、protocol、search。

### 方法

使用 location 对象可以通过很多方式来改变浏览器的位置。

- assign()，使用assign()，为其传入一个URL，可以立即打开新URL。如果是location.href或window.location设置一个url值，相当于调用assign()方法
- replace()。通过上述方法修改URL后，浏览器的历史记录都会生成一个新的记录，因此用户通过单击后退按钮就可以导航到前一个页面。而要禁用这种行为，可以使用replace()方法，虽然浏览器位置改变但是不会生成记录。【只有chrome有效】
- reload() 重新加载

### 事件

HTML5 新增了`haschange`事件以便URL的参数列表（以及URL中#后面的额所有字符）发生变化时通知开发人员，之所以新增这个事件，主要是因为在 Ajax 应用中，开发人员经常要利用URL参数来保存状态或导航信息。

IE7不支持。

必须要把`haschange`事件处理程序添加给window对象，然后URL参数列表只要变化就会调用它，此时的event对象应该额外包含两个属性：`oldURL`和`newURL`。这两个属性分别保存变化前后完整的URL。【注意】所有的ie浏览器都不支持这两属性。

对于不支持这两个属性的ie浏览器，可以通过定期检查location.hash来模拟。

## history对象

history 对象保存着用户上网的记录，从窗口被打开的那一刻算起，由于安全方面的考虑，开发人员无法得到用户浏览器的URL，但是借助用户访问过的页面列表，可以在不知道实际URL的情况下实现后退和前进。

### length 

`history.length`属性保存着历史记录的URL数量，初始时，该值为1，如果当前窗口前后访问了三个网址，那么history.length属性等于3.由于IE10+浏览器初始时返回的是2，存在兼容问题，所以并不常用。

### 跳转方法

`history`对象提供了一系列方法，允许在浏览历史之间移动，包括`go()`、`back()`、`forward()`

`go()`使用该方法可以在用户的历史记录中任意跳转，这个方法接收一个参数，表示向前或向后跳转的页面数的一个整数值。负数表示向后跳转，正数表示向前跳转.`history.go(-1) ; //后退一页`。`go()`方法无参数的时候，相当于`history.go(0)`，可以**刷新**当前页面。

`back()`后退

`forward()`前进，相当于`history.go(1)`。

### 增改记录

HTML5 为 history 对象增加了两个新方法，`history.pushState()`和`history.replaceState()`。用来在浏览历史中修改和添加记录。`state`属性用来保存记录对象。，而`popstate`监听history对象的变化。

## screen对象

screen 对象在 js 中相对冷门，它表示的是客户端的能力，其中包括浏览器窗口外部的显示器的信息。

常用的：`height`和`width`表示屏幕的像素高度和宽度。`availHeight`和`availWdith`表示屏幕的像素高度减去系统部件高度的可用高度，以及可用宽度。

## navigator对象和用户代理检测

navigator 对象已经成为识别客户端浏览器的事实标准，navigator对象是所有支持js的浏览器共有的。

### 属性

- appCodeName，浏览器名称，所有浏览器都返回Mozilla
- userAgent 浏览器的用户代理字符串
- appVersion 浏览器版本