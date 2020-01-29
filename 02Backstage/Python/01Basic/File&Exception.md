# File & Exception 文件和异常

实际开发中常常会遇到对数据进行持久化的场景，而实现数据持久化最直接简单的方式就是将数据保存到文件中。

在 Python 中实现文件的读写操作其实十分简单，通过 Python 的内置函数`open()`，可以指定文件名、操作模式、编码信息来获得操作文件的对象，接下来就是对文件进行读写操作了。

## 读写文本文件

读取文本文件时，需要使用`open`函数指定好带路径的文件名（可以使用相对路径或绝对路径）并将文件模式设置为`r`（不指定的话，默认也是`r`），然后通过`encoding`参数指定编码，如果不指定则读取文件时使用的是操作系统默认的编码，如果不能保证保存文件时使用的编码方式和`encoding`参数所指定的编码方式是一致的，那么就可能因为无法解码字符而导致读取失败。

需要注意的是，如果使用`open`函数指定的文件不存在或者无法打开，那么将引发异常状况导致程序崩溃。为了让代码有一定的健壮性和容错性，我们可以使用 Python 的异常机制对可能在运行时发生状况的代码进行适当的处理：
```py
def main():
    f = None
    try:
        f = open('test.txt', 'r', encoding='utf-8')
        print(f.read())
    except FileNotFoundError:
        print("无法打开指定的文件")
    except LookupError:
        print("未知编码")
    except UnicodeDecodeError:
        print("读取文件时解码错误")
    finally:
        if f:
            f.close()
```
在 Python 中我们可以将那些运行时可能会出现状况的代码放到 `try`代码块中，在`try`代码块后面可以跟上一个或者多个`except`来捕获可能出现的异常状况。最后可以使用`finally`代码块（无论程序正常还是异常都会调用，甚至调用了`sys.exit()`函数都会被执行到），它最适合用来释放外部资源。

如果不愿意使用`finally`代码块释放资源，也可以使用**上下文语法**，通过`with`关键字来指定文件对象的上下文并在离开上下文环境时自动释放文件资源：
```py
try:
    with open('test.txt', 'r', encoding="utf-8") as f:
        print(f.read())
    except FileNotFoundError:
        print("无法打开文件")
```

除了使用文件对象`read`方法读取文件之外，还可以使用`for-in`逐行读取或使用`readlines`将文件读取到一个列表容器中。


## 读写二进制文件

`with open('du.jpg', 'rb') as fs1`

## 读写 JSON 文件

`json`模块主要有四个比较重要的函数：
- `dump` 将 Python 对象按照 JSON 格式序列化到文件中
- `dumps` 将 Python 对象处理成 JSON 格式的字符串
- `load` 将文件中的 JSON 数据反序列化为对象
- `loads` 将字符串的内容反序列化为 Python 对象

关于序列化和反序列化：**序列化** serialization 在计算机科学的数据处理中，是指将数据结构或对象状态转换为可以存储或传输的形式，这样在需要的时候能够恢复到原先的状态，而且通过序列化的数据重新获取字节时，可以利用这些字节产生原始对象的副本，与这个过程相反的动作，即从一系列字节中提取对象结构的操作，就是**反序列化** deserialization

在 Python 中要实现序列化和反序列化除了使用 json 模块之外，还可以使用`pickle`和`shelve`模块，但是这两个模块是使用特有的序列化协议来序列化数据，因此序列化后的数据只能被 Python 识别。