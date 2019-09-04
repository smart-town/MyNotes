# Object 对象

## 1. 基本

js 所有其他对象都继承于`Object`对象，即那些对象都是`Object`的实例。`Object`对象的原生方法分为两类：`Object`本身的方法和`Object`实例的方法

### 本身的方法

所谓本身的方法即定义在`Object`对象上的方法

### 实例的方法

所谓实例方法即定义在`Object`原型对象`Object.prototype`上的方法。它可以被`Object`实例直接使用。

## 2. Object()

`Object`本身是一个函数，将任意值转换为对象。

## 3. Object 静态方法

所谓静态方法是指部署在`Object`对象自身的方法。

### Object.keys()、Object.getOwnPropertyNames()

两者都用来遍历对象的属性。`Object.keys`方法的参数是一个对象，返回一个数组，该数组成员都是该对象自身（不是继承的）所有属性名。

`Object.getOwnPropertyNames`与`Object.keys`类似，也是接收对象为参数，返回一个数组，包含该对象自身所有属性名。

对于一般对象来说，两者返回结果是一样的。只有涉及到不可枚举属性时，才有不一样的结果。`Object.keys`方法只返回可枚举的属性，而后者则还可以返回不可枚举的属性名。

### 其他方法

#### 对象属性模型的相关方法
- `Object.getOwnPropertyDescriptor()`: 获取某个属性的描述对象
- `Object.defineProperty()`: 通过描述对象定义某个属性
- `Object.defineProperties()`: 通过描述对象定义多个属性

#### 控制对象状态的方法
- `Object.preventExtensions()`
- `Object.isExtensible()`
- `Object.seal()`: 禁止对象配置
- `Object.isSealed()`： 判断一个对象是否可配置
- `Object.freeze()`: 冻结一个对象
- `Object.isFrozen()`: 判断一个对象是否冻结

#### 原型链相关方法
- `Object.create()`: 可以指定原型对象和属性，返回一个新对象
- `Object.getPrototype()`: 获取对象的`Prototype`对象

## 4. Object 实例方法

除了静态方法，还有不少方法定义在`Object.prototype`上，称为实例方法

主要有以下 6 个：
- `valueOf`: 返回当前对象对应的值
- `toString`: 返回当前对象对应的字符串形式
- `toLocaleString`: 当前对象对应的本地字符串形式
- `hasOwnProperty`: 判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性
- `isPrototypeOf`: 判断当前对象是否是另一个对象的原型
- `propertyIsEnumerable`： 判断某个属性是否可以枚举

### valueOf()

`valueOf`方法的作用是返回一个对象的“值”，默认情况下返回对象本身。其主要用途在于，js 自动类型转换时会默认调用这个方法。

### toString()

`toString`方法的作用是返回一个对象的字符串形式，默认返回类型字符串。即`[object Object]`

字符串`[object Object]`本身没有太大用处，但是通过自定义`toString`方法，可以让对象在自动类型转换时，得到想要的字符串形式。

数组、字符串、函数、Date 对象都部署了自定义`toString`方法。

#### 应用: 判断数据类型

`Object.prototype.toString`方法返回对象的类型字符串，因此可以用来判断一个值的类型。由于实例对象可能自定义`toString()`方法，覆盖掉`prototype`上的方法，通过函数的`call`方法，可以在任意值上调用这个方法，判断值类型：`Object.prototype.toString.call(value)`

### toLocaleString

该方法与`toString`返回结果相同。这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的`toLocaleString`，用来返回针对某些地域的特定的值。

### hasOwnProperty()

该方法接收一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性。