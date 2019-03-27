# Grid System

Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统。

借助十二列系统、五个默认响应层、sass 变量等，构建移动优先的，各种形状的布局

## 实现原理

通过定义容器大小，平分 12 份，再调整内外边距，最后结合媒体查询，制作出强大的响应式网格系统。

栅格系统通过一系列的**行**和**列**组合来创建页面布局。内容可以放到这些创建好的布局中。

- 行 row 必须包含在`.container`或`.container-fluid`中，以便为其赋予合适的排列和内边距
- 通过 row 在水平方向上创建一组列
- 内容应当放置于 列 内，并且，只有 列 可以作为 行 的直接子元素
- 对于行中的每一 列，都用其水平的 `padding`控制它们之间的间隔
- 栅格系统中的列是通过指定 1 到 12 的值来表示其跨越的范围，如以下表示三个等宽列。
    ```html
    <div class="col-4">.col-4</div>
    <div class="col-4">.col-4</div>
    <div class="col-4">.col-4</div>
    ```

## 列基本使用

网格系统用来布局，其实就是列的组合。列组合简单理解就是更改数字来合并列。（列数总和不能超过12）。

- **等宽**：每个列名为无单位类时，即如`col`而非`col-1`。每列宽度相同
- **设置列宽**： 可以设置某一列的宽度，并让兄弟列自动调整其大小。如
    ```html
    <div class="col">col</div>
    <div class="col-5">col</div>
    <div class="col">col</div>
    ```
- **可变宽度内容**: 使用`col-{breakpoint}-auto`类根据内容自然宽度调整列的大小
- **等宽多排**: 通过插入`.w-100`将列拆分到新行的位置。

如果一行中放置超过 12 列，则将会放到新行中。
```html
<div class="row">
  <div class="col-9">.col-9</div>
  <div class="col-4">.col-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.</div>
  <div class="col-6">.col-6<br>Subsequent columns continue along the new line.</div>
</div>
```

## 响应类

bootstrap 网格布局包含四个级别的预定义类，用来构建复杂的响应式布局。可以个性化你认为应该在小型、超大型等设备上的宽度。

1. 对于从最小设备到最大设备相同的网格，使用`.col`和`.col-*`类。
2. 对于`.col-sm-*`可以创建一个网格系统，让其在到达`sm`断点前（对应尺寸），进行堆叠。*即到达sm对应视口宽度之前，是堆叠的，即不是一行排列*
3. **混合使用**，如果需要你的布局不是简单地在某一单个**断点**之前堆叠，则可以混合使用
    ```html
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
    ```
## 垂直对齐

直接使用对应类即可：

`row`可以使用：
- `align-items-start`
- `align-items-center`
- `align-items-end`
`col`使用：
- `align-self-start`
- `align-self-center`
- `align-self-end`

【注意】需要给`row`设置高度。。。。


## 水平对齐

用于 row:
- `justify-content-start`
- `justify-content-center`
- `justify-content-end`
- `justify-content-around`
- `justify-content-between`

## 去掉 gutter

`no-gutters`

`<div class="row no-gutters">`

## 排序

使用`.order-`类可以控制内容**顺序**:
```html
<div class="container">
  <div class="row">
    <div class="col">
      First, but unordered
    </div>
    <div class="col order-12">
      Second, but last
    </div>
    <div class="col order-1">
      Third, but first
    </div>
  </div>
</div>
```
支持断点设置如：`.order-1.order-md-2`，注意到此时没有定义 order 的列会首先显示。

还有`order-first`和`order-last`，此时就算是未定义 order 的列也会排列到`order-first`之后。

## 偏移列

两种方式
- `.offset-`、`.offset-md-*` 按照`*`增加列的左边距。如`.offset-md-4`移动`.col-md-4`列
- `.mr-auto`强制彼此远离，对应有`.ml-auto`

## 嵌套

可以在列中嵌套`row`和`col`


