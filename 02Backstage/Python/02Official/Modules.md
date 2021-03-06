# 模块

模块是一个包含 Python 定义和语句的文件。文件名就是模块名后跟文件后缀`.py`。在一个模块内部，模块名（作为一个字符串）可以通过全局变量`__name__`的值获得。

## 1. 有关模块的更多信息

模块可以包含可执行的语句以及函数定义。这些语句可以用于初始化模块。它们仅在模块**第一次**在`import`语句中被导入时才执行。（当文件被作为脚本运行时，它们也会执行）

每个模块都有它自己的私有符号表，该表用作模块中定义的所有函数的全局符号表。因此，模块的作者可以在模块内使用全局变量，而不必担心与用户的全局变量发生意外冲突。另一方面，如果你知道自己在做什么，则可以用跟访问模块内的函数的同样标记方法，去访问一个模块的全局变量，`modulename.itemname`。

模块可以导入其他模块，习惯上但不要求把所有`import`语句放在模块（或脚本）的开头。被导入的模块名存放在调入模块的全局符号表中。

`import`语句有一个变体，它可以把名字从一个被调模块内直接导入到现模块的符号表里。例如：`from fibo import fib, fib2`，这并不会把被调模块名引入到局部变量表中（因此上面这个例子中，`fibo`是未定义的）。

还有一个变体甚至可以导入模块内定义的所有名称：`from fibo import *`。这会调入所有非以下划线`_`开头的名称。在多数情况下，Python 程序员都不会使用这个功能，因为它在解释器中引入了一组未知的名称，而它们很可能会覆盖一些你定义过的东西。

注意通常情况下，从一个模块或者包内调入`*`的做法是不太被接受的，因为这通常会导致代码的可读性非常差。不过在交互式编译器中为了节省打字可以这么用。

如果模块名称之后带有`as`，则在`as`之后的名称将直接绑定到所导入的模块：`import fibo as fib`。这会和`import fibo`方式一样有效地调用模块，唯一的区别它是以`fib`的名称存在的。这种方式也可以在用到`from`时使用，并会有类似的效果。

**注意**：出于效率的考虑，每个模块只在每个解释器会话中被导入一次。因此如果你更改了你的模块，则必须重新启动解释器，或者，如果它只是一个需要交互式地测试的模块，使用：`importlib.reload(modulename)`

## 2. 以脚本的方式执行模块

当你用下面的方式运行一个 Python 模块：`python fibo.py <arguments>`

模块中的代码会被执行，就好像你导入了模块一样，但是`__name__`会被设置为`__main__`。这意味着通过在你的模块末尾添加这些代码：
```py
if __name__ == "__main__":
    import sys
    fib(int(sys.argv[]))
```
你既可以把这个文件当作脚本又可以当作一个可以调用的模块来使用。因为那段解析命令只有当模块是以"main"文件的方式执行时才会运行。如果文件是被导入的，则那些代码不会被执行。

这经常用于为模块提供一个方便的用户接口，或用于测试。

## 3. 模块搜索路径

当一个名为`spam`的模块被导入的时候，解释器首先寻找具有该名称的内置模块，如果没有找到，然后解释器从`sys.path`变量给出的目录列表中寻找名为`spam.py`的文件，`sys.path`初始有这些目录地址：
- 输入脚本的目录
- `PYTHONPATH` （一个包含目录名称的列表，和 shell 变量 `PATH` 有一样的语法）
- 取决于安装的默认设置

在初始化后，Python 程序可以更改`sys.path`，包含正在运行脚本的文件目录被放在搜索路径的开头处，在标准库路径之前。这意味着将加载此目录中的脚本，而不是标准库的同名脚本。除非有意更换，否则这是错误。

## 4. “编译过的”Python 文件

为了加速模块载入，Python 在`__pycache__`目录中缓存了每个模块编译后的版本，名称为`module.version.pyc`，其中名称中的版本字段对编译文件的格式进行编码。

Python 根据编译版本检查源的修改日期，以查看它是否过期并需要重新编译，这是一个完全自动化的过程。此外，编译的模块与平台无关。因此可以在具有不同体系结构的系统之间共享相同的库。

Python 会在两种情况下不会检查缓存，首先对于从命令行直接载入的模块，它从来都是重新编译并且不存储编译结果。其次如果没有源模块，它不会检查缓存。

## 5. 标准模块

Python 附带了一个标准模块库。一些模块内置于解释器中，它们提供对不属于语言核心但仍然内置的操作的访问，以提高效率或者提供对系统调用等操作系统原语的访问。这些模块的集合是一个配置选项，它也取决于底层平台。如`winreg`模块只存在于 Windows 操作系统上。

## 6. dir() 函数

内置函数`dir()`用于查找模块定义的名称，它返回一个排序过的字符串列表。如果没有参数则列出你当前定义的名称。`dir()`不会列出内置函数和变量的名称，如果想要这些，它的定义是在标准模块`builtins`中

## 7. 包

包是一种通过用“带点号的模块名”来构造 Python 模块命名空间的方法。如，模块名`A.B`表示 A 包中名为 B 的子模块。正如模块的使用使得不同模块的作者不必担心彼此的全局变量名称一样，使用加点的模块名可以使得`NumPy`或`Pillow`等多模块软件包的作者不必担心彼此的模块名一样。

假设你要为声音文件和声音数据的统一处理，设计一个模块集合（一个“包”）。由于存在很多不同的声音文件格式（通常由它们的扩展名识别如`.wav`、`.aiff`），因此为了不同文件格式间的转换，你可能需要创建和维护一个不断增长的模块集合。你可能还想对声音数据还做很多的处理（如混声、添加回声），因此为了实现这些处理，你将写另外一个无穷尽的模块流。这是你包可能的结构：
```shell
sound/
    __init__.py #Initialize the sound package
    formats/
        __init__.py # 
        wavread.py
        wavwrite.py
    effects/
        __init__.py
        echo.py
        surround.py
```
当导入这个包时，Python 搜索`sys.path`中的目录，查找包的子目录

必须要有`__init__.py`文件才能让 Python 将包含该文件的目录当作包。这样可以防止具有通常名称如`string`的目录在无意中隐藏稍后在模块搜索路径上出现的有效模块。最简单的情况下，`__init__.py`可以只是一个空文件，但是它也可以执行包的初始化代码或者设置`__all__`变量。

包的用户可以从包中导入单个模块：`import sound.effects.echo`这将会加载子模块`sound.effects.echo`但是引用时必须使用它的全名。导入子模块的另一种做法是:`from sound.effect import echo`这样可以在没有包前缀的情况下使用。

### 从包中导入`*`

当用户写入`from sound.effects import *`时会发生什么？理想情况下，人们希望这会以某种方式传递给文件系统，找到包中存在哪些子模块，并将它们全部导入，这可能需要很长时间，导入子模块可能产生不必要的副作用，这种副作用只有在显式导入子模块时才会发生。

唯一的解决方案是让包作者提供一个包的显式索引，`import`语句使用下面的规范：如果一个包的`__init__.py`定义了一个名为`__all__`的列表，它会被视为在遇到`from package import *`时应该导入的模块列表，在发布该包的新版本时，包作者可以决定是否让此列表保持更新。

如果没有定义`__all__`，`from package import *`语句不会从`package`中导入所有子模块到当前命名空间；它只确保导入了`package`（可能运行在`__init__.py`中的初始化代码），然后导入包中定义的任何名称，包括`__init__.py`定义的任何名称。

### 子模块参考

当包被构造成子包时，你可以使用绝对导入来引用兄弟包的子模块。如,`sound.filters.vocoder`需要`sound.effetcs.echo`，可以使用`from sound.effects import echo`

还可以使用`from module import name`形式编写相对导入，如：`from . import echo` 或 `from ..filters import equalizer`

### 多个目录中的包

包支持另外一个特殊属性，`__path__`它被初始化为一个列表，其中包含在执行该文件的代码之前保存包的文件`__init__.py`的目录的名称，这个变量可以修改，这样做会影响将来对包中包含的模块和子包的搜索。