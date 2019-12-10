# 函数 & 模块

## 函数

**代码有很多种坏味道，重复是最坏的一种**。要写出高质量的代码首先要解决的就是重复的问题。

### 函数定义

Python 中可以使用`def`来定义函数，和变量一样函数也有其名字，且命名规则一致。函数名后可以放置传递给函数的参数。

```python
def functionName(num):
    result=1
    return result
```

### 函数参数

函数是绝大多数语言中都支持的一个代码的"构件块"，但是 Python 中的函数与其他语言中的函数还是有很多不太相同的地方，其中一个显著的区别就是 Python 对函数参数的处理，在 Python 中函数可以有默认值，也支持使用可变参数，所以 Python 不需要像其他语言一样支持**函数的重载**，因为我们在定义一个函数的时候可以让它有多种不同的使用方式。

在不确定参数个数的时候，可以使用可变参数：`def add(*args)`

## 用模块管理函数

对于任何一种编程语言来说，给变量、函数这样的标识符起名字都是一件麻烦事，因为我们会遇到命名冲突这种尴尬的事情。最简单的场景就是在同一个`.py`文件中定义了两个同名的函数，由于 Python 没有重载的概念，所以后面的定义会覆盖之前的定义。

如果项目是由多人协作进行团队开发的时候，团队中可能有多个程序员都定义了名为`foo`的函数，那么如何解决这个冲突呢。**Python 中每个文件就代表了一个模块(module)，我们在不同的模块中可以有同名的函数，在使用函数的时候通过`import`关键字导入指定的模块就可以区分到底使用哪个模块中的函数了**

```Python
# module1.py
def foo():
    print("hello")

# module2.py
def foo():
    print("bye")

# test.py
from module1 import foo
foo() # hello

from module2 import foo
foo() # bye
```
也可以按照如下方式区分：
```python
import module1 as m1
import module2 as m2
m1.foo()
m2.foo()
```
**需要说明的是**，如果我们导入的模块除了定义函数之外还可以执行代码。那么 Python 解释器在导入这个模块的时候就会执行这些代码，事实上我们可能并不希望如此。因此如果我们在模块中编写了执行代码，最好是将这些代码放入这样的条件中，这样的话除非直接运行该模块，`if`条件下的这些代码是不会执行的，因为只有直接执行的模块名字才是`__main__`:
```Python
# module3.py
def foo():
    #pass

# __name__ 是 Python 解释器中一个隐含的变量，代表了模块的名字。只有被 Python 解释器直接执行的模块的名字才是 __main__
if __name__ == '__main__':
    print('call foo()')
    foo()
```

### 作用域

Python 查找一个变量时会按照“局部作用域”、“嵌套作用域”、“全局作用域”、“内置作用域”顺序进行搜索。“内置作用域”指的是 Python 内置的那些标识符，如`input`、`print`。

```python
def foo():
    a = 200
    print(a)

a = 100
foo()
print(a) #100
```
 如上，调用 foo() 之后 `a`的值仍然是 100，因为实际在 `foo()`函数中，是重新定义了一个名字为`a`的局部变量，它和全局作用域的`a`不是同一个变量。此时`foo`函数不需要再搜索全局作用域的`a`。如果希望在`foo()`中修改全局作用域中的`a`:

```python
def foo():
    global a
    a = 200
    print(a)
a = 100
foo()
print(a) #200
```

我们可以使用`global`关键字指示`foo`函数中的变量`a`来自于全局作用域。如果全局作用域中没有`a`，那么下面的代码中就会定义变量`a`并且将其置于全局作用域。同时，如果希望函数内部的函数能够修改嵌套作用域中的变量，可以使用`nolocal`关键字来指示变量来自于嵌套作用域。

实际开发中，应该尽量减少对全局变量的使用。因为全局变量的作用域和影响过于广泛，可能发生意料之外的修改和使用。除此之外全局作用域比局部作用域拥有更长的生命周期，可能导致对象占用内存时间过长无法被**垃圾回收**，事实上，减少对全局变量的使用，也是降低代码之间耦合度的一个重要举措。减少全局变量的使用就意味着我们应该尽量让变量的作用域在函数的内部，但是如果我们希望一个局部变量的生命周期延长，使其在定义它的函数调用结束后仍然可以使用它的值，这时候就要使用**闭包**。

以上的说法具体就表现为:
```Python
def main():
    pass

if __name__ == "__main__":
    main()
```