# 模块

## 概述

历史上 JavaScript 一直没有模块的体系，无法将一个大的程序拆分成相互依赖的小文件，再用简单的方法拼接起来。其他的语言都有这项功能，如 Ruby 的 require、Python 的 import，甚至就连 css 也有 @import。但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大的障碍。

在 ES6 之前，社区制定了一些模块加载方案，最主要的有`CommonJS`和`AMD`两种。前者用于服务器后者用于浏览器。ES6在语言标准的层面上，实现了模块功能，并且实现地相当简单。完全可以替代这两者。成为浏览器和服务端通用的模块解决方案。

ES6 的设计思想是尽量静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS和AMD模块，都只能在运行时确定这些东西。比如 CommonJS 模块就是对象，输入时必须查找对象属性。

```js
//CommonJS
let {stat, exist, readFile} = require("fs") ;

//等同于
let _fs = require("fs") ;
let stat = _fs.stat;
let exist = _fs.exist;
let readFile = _fs.readFile;
```

上面代码实质上是整体加载fs模块，即加载fs的所有方法，生成一个对象_fs，然后再从这个对象上读取 3 个方法。这种加载称为**运行时加载**，因为只有运行时才能得到这个对象，导致完全没有办法在编译时做“静态优化”

ES6模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`输入。

```js
//ES6模块
import {stat, exists, readFile} from 'fs';
```

上面的代码实质上是从fs模块中加载 3 个方法，其他方法不加载。这种加载称为**编译时加载**或者**静态加载**，即ES6可以在编译时就完成模块加载，效率要比CommonJS的加载方式要高。当然这也导致了没法引用`ES6`模块本身。因为它不是对象。

由于ES6是编译时加载，使得静态分析成为可能。有了它，就能进一步扩展`JavaScript`的语法，比如引入宏和类型校验这些只能靠静态分析实现的功能。

## 严格模式

ES6 模块自动采用严格模式，不管有没有在模块头部加上`"use strict"`。

## export 命令

模块功能主要有两部分组成：`export`和`import`。`export`用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件该文件内部的所有变量外部无法获取，如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出这个变量。

```js
export var firstName = "Michal" ;
export var lastName =   "Jackson" ;
```

上面是一个js文件，ES6将其视为一个模块，里面用 export 输出了两个变量。`export`的写法除了上面那样，还可以这样：
`export {firstName,lastName}`。使用大括号指定要输出的一组变量，它与前一种写法是等价的，但是优先考虑这种写法，因为这样可以在脚本尾部一眼看出输出了哪些变量。

`export`除了输出函数或者类。

通常情况下，`export`输出的就是原来的名字，但是还可以使用`as`重命名：`export { v1 as sss1, v2 as sss1};`

**【注意】**`export` **命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系**。！！

```js
//报错
export 1;

var m = 1;
export m;
```

以上的写法都会报错，因为没有对外提供接口。第一种直接输出 1，第二种通过变量还是直接输出 1..1只是一个值，不是接口，正确写法：

```js
export var m = 1;

var m = 1;
export {m} ;

var n = 1;
export {n as m};
```

同样，`function`和`class`也是要遵循这样的写法。

```js
//wrong
function f(){}
export f;

//correct
export function f{};

//correct
function f(){}
export {f} ;
```

这一点与 CommonJS 规范完全不同，CommonJS 模块输出的是值的缓存，不存在动态更新。最后，`export`命令可以出现在任何位置，只要处于模块顶层就可以了。如果处于块级作用域内，就会报错。这是**因为**处于条件代码块之中就没法做静态优化了。违背了ES6模块设计的初衷。

## import 命令

使用`export`定义了模块的对外接口后，其他的JS文件就可以通过`import`命令加载这个模块。

```js
import {firstName, lastName} from "./profiles.js";

function setName(element){
    element.textContent = firstName + " " + lastName;
}
```

上面的 `import`命令用于加载`profiles.js`文件并从中输入变量。`import`命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名必须和被导入模块对外接口名相同。

如果想为输入的变量重新取一个名字，`import`命令要使用`as`关键字。将输入的变量重新命名。

```js
import {lastName as surname} from "./profiles.js";
```

`import`命令输入的内容都是**只读的**，因为它本质上是输入接口。也就是说不允许在加载模块的脚本里面改写接口。

```js
import {a} from "./xxx.js";

a = {} //Syntax Error : "a" is read-only
```

上面的代码中，脚本加载了变量 a，对其重新赋值就会报错，因为 a 是一个只读的接口。但是如果 a 是一个对象，那么对它的属性修改是可以的。

```js
import {a} from "./xxx.js" ;
a.foo = "OKK" ;
```

上面的代码中，`a`的属性可以成功改写，并且其他模块都可以读取到改写后的值。不过这种写法很难查错，建议凡是输入的变量都完全当做只读。**轻易不要改变它的属性。**

`import`后面的`from`指定的模块文件的位置，可以是相对路径也可以是绝对路径。`.js`后缀可以省略。如果只是模块名，不带有路径，那么**必须有配置文件**，告诉JavaScript引擎该模块的位置。

注意`import`具有提升效果，会提升到整个模块的头部。

由于`import`是静态执行，所以不能有表达式和变量，这些是只有在运行时才能得到结果的语法结构。

```js
//以下都为错误写法
import {"f"+"oo"}from "mymodule";

let module = "mymodule";
import {foo} from module;

if(x==1){
    import {foo} from "module1";
}
```

以上三种写法都为错误写法，因为它们用到了表达式、变量和`if`结构，在静态分析阶段，这些语法都是没法得到值的。

最后，`import`语句会执行所加载的模块，因此可以有下面的写法：`import "module";`

上面的代码仅仅执行`module`模块但是不输入任何值。如果多次重复加载同一`import`语句，那么只会执行一次。

目前阶段，通过Babel转码，CommonJS模块的require命令和ES6模块的import命令可以写在同一个模块里面，但是最好不要这样做，因为import在静态分析阶段执行，所以它是一个模块中最早执行的。

## 模块的整体加载

除了指定加载某个输出值，还可以使用整体加载，即用`*`号指定一个对象，所有输出值都加载在这个对象上。

```js
//circle.js
export function area(radius){
    return Math.PI * radius * radius ;
}
export function circumference(radius){
    return 2 * Math.PI * radius ;
}
```

加载这个模块：

```js
import * as circle from "./circle";

console.log("圆面积"+circle.area(4)) ;
console.log("圆周长"+circle.circumference(4));
```

注意，模块整体加载时所在的那个对象，应该是可以静态分析的，所以不允许运行时改变，下面的写法都是不允许的：

```js
import * as circle from "./circle";

circle.foo = "hello" ;
circle.area = function(){}
```

## export default 命令

从上面的例子中可以看到，使用`import`命令时，用户必须知道所要加载的变量名或者函数名，否则无法加载。但是用户肯定希望快速上手，未必愿意阅读技术文档，去了解模块有哪些属性和方法。为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到`export default`命令为模块指定默认输出。

```js
export default function(){
    console.log("foo") ;
}

//import.js
import customName from "./export.js";
customName() ;
```

上面的`import`命令可以用任意名称指向`export.js`文件所输出的方法这个时候就不需要知道原模块输出的函数名，需要**注意**的是，此时`import`后面**没有**大括号。

`export default`用在非匿名函数前也是可以的。

```js
export default function foo(){
    console.log("foo") ;
}
```

`export default`用于指定模块的默认输出，显然，一个模块只能有一个默认输出因此`export default`命令只能使用一次。所以`import`命令后面才不用加大括号。因为只可能唯一对应`export default`命令。

本质上，`export default`就是输出一个叫做`default`的变量或者方法，然后系统允许你为他取任意的名字。

## export 和 import 的复合写法

## 模块的继承