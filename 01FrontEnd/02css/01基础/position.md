# position

## sticky 

`position: sticky`，“粘性的”。基本上，可以看出`postion:relative`和`position:fixed`的结合体——**当元素在屏幕内，表现为`relative`，就要滚出显示屏幕时，表现为`fixed`**

*注意*：sticky 要生效，`top`或`left`属性（等）要有明确的计算值。否则`fixed`的表现不会出现。

**`sticky`元素效果完全受限于父元素**，这和`fixed`元素定位有着根本性不同。`fixed`元素直抵根元素，其他父元素对其`left`或`top`定位无法限制。

