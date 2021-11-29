# Canvas

## canvas 元素

`<canvas id="tutorial" width="150" height="150"></canvas>`

`<canvas>`看起来和`<img>`很像，唯一不同的就是它没有`src`和`alt`属性。实际上，`<canvas>`标签只有两个属性——`width`和`height`。这些都是可选的，并且同样利用`DOM properties`设置，当没有设置宽高的时候，`canvas`会初始化为宽 300 和高 150 的元素。该元素可以用 css 来定义大小，但是绘制图像时会伸缩以适应它的框架尺寸：**如果 css 尺寸和初始画布的比例不一致，会出现扭曲**。

### 替换内容

`<canvas>`与`<img>`的不同之处在于，就像`<video>, <audio>, <picture>`元素一样，很容易定义一些替代内容，由于某些古老的浏览器并不支持`canvas`，在这些浏览器上总是能够显示替代内容。

这非常简单：我们只是在`<canvas>`标签中提供了替换内容，不支持`<canvas>`的浏览器会忽略容器并在其中渲染后备内容。而支持`<canvas>`的浏览器将会忽略在容器中包含的内容，并且只是正常渲染`canvas`。

**注意`</canvas>`不可省略**，否则其余部分会被认为是替换内容，将不会显示出来。

## 渲染上下文

`<canvas>`创造了一个固定大小的画布，它公开了一个或多个**渲染上下文**，其可以用来绘制和处理要展示的内容。暂时将注意力放在 2D 的渲染上下文中，其他种类的上下文也许提供了不同的渲染处理方式，比如`WebGL`使用了基于`OpenGL ES`的 3D 上下文。

`canvas`起初是空白的，为了渲染，首先脚本需要找到渲染上下文，然后在其上面绘制。`canvas`有一个叫做`getContext()`的方法，这个方法用来获得渲染上下文和它的绘画功能，`getContext()`接受一个参数，即上下文的类型，对于 2D 图像而言，你可以使用`CanvasRenderingContext2D`。如：`var ctx = contextElement.getContext('2d')`。

另外，可以通过检查`getContext`方法的存在，脚本可以检查可编程性。

## 简单例子

```html
<head>
    <script>
        function draw() {
            var canvas = document.getElementById("canvas")
            if (canvas.getContext) {
                var ctx = canvas.getContext('2d')
                ctx.fillStyle = "rgb(200, 0, 0)"
                ctx.fillRect(10, 10, 55, 50)

                ctx.fillStyle = "rgba(0, 0, 200, 0.5)"
                ctx.fillRect(30, 30, 55, 50)
            }
        }
    </script>
</head>
<body onload="draw();">
    <canvas id="canvas" width="150" height="150"></canvas>
</body>
```

## 易错点
**注意**，动态绘制 canvas 时，每次都要重新获取上下文`getContext()`，连元素对象本身也要重新获取一次，为啥呢。。。。。。