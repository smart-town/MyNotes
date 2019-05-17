# console 对象

## 1. 认识

`console`对象是 js 的原生对象，有点像 Unix 系统的标准输出`stdout`和`stderr`，可以输出各种信息到控制台。常见用途：
- 调试程序，显示网页代码运行时的错误信息
- 提供了一个命令行接口，用来与网页代码互动

## 2. console 静态方法

### console.log

`console.log`用于在控制台输出信息，会自动在每次输出末尾添加换行符。

如果第一个参数是格式字符串（使用了格式占位符），`console.log`将会依次用后面的参数替换占位符，然后输出。`console.log("%s + %s",1,1)`

占位符：
- `%s`字符串
- `%d`整数
- `%i`整数
- `%f`浮点数
- `%o`对象的链接
- `%c`css格式字符串

使用`%c`占位符时对应参数必须是 css 代码，用来对输出内容进行 css 渲染。

## 其他

`console.warn` `console.error` `console.info`

## console.table

对于某些复合类型的数据，`console.table`可以将其转换为表格显示
```js
var languages=[
    {name:"js",file:'.js'},
    {name:"ts",file:".ts"},
]
console.table(languages);
```

## console.dir

`dir`用来对一个对象进行检查(inspect)，并以易于阅读和打印的格式显示。

...