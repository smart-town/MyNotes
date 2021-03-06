# Array 对象

`Array`是 js 原生对象，同时也是一个构造函数，可以用它生成新的数组。
```js
var arr = new Array(2);
arr.length;//2
```

## 静态方法

### Array.isArray()

## 实例方法

### valueOf(),toString()

### push 和 pop

### unshift 和 shift

`shift()`删除数组第一个元素并返回该元素

`unshift()`在数组第一个位置添加元素并返回添加新元素后的数组长度

### join

以指定参数作为分隔符，将所有数组成员连接为一个字符串后返回。

### reverse

### slice

`arr.slice(start,end)`提取目标数组的一部分，返回一个新数组。第一个参数为起始位置，第二个参数为终止位置（但是该位置本身不包含在内）如果省略第二个参数则一直返回到数组的最后一个成员

如果参数为负数，则表示倒数。如`slice(-2,-1)`，则是倒数第二个到倒数第一个。

其一个重要应用是将类似数组的对象转换为真正的数组`Array.prototype.slice.call(document.querySelectAll('div'))`

### splice

删除原数组一部分成员，并在删除位置添加新的数组成员。

### sort

排序，默认按照字典顺序，排序后原数组被改变。如果要按照自定义的方法排序，可以传入一个函数作为参数。`sort`参数函数接收两个参数，表示比较的两个数组成员，如果函数返回值大于0，则表示第一个成员在第二个成员后面。其他情况都是第一个成员在第二个前面。


### map

将数组的所有成员依次传入参数函数，然后将每一次的执行结果组成一个新的数组返回。参数函数，接收三个参数：当前成员、当前位置、数组本身。

### forEach

与 map 类似，但是其不返回值，只是操作数据。

### filter

过滤数组成员，满足条件的成员组成一个新数组返回。

### some() every()

返回一个布尔值，判断数组成员是否符合某种条件。`some`方法只要有一个成员返回值是`true`则整个`some`方法返回`true`，而`every`则需要所有成员返回`true`

### reduce() 和 reduceRight()

依次处理每个成员最终累计为一个值。

### indexOf() 和 lastIndexOf()

