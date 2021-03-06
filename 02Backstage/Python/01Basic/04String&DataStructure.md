# 字符串和常用数据结构

## 使用字符串

所谓**字符串**，就是由零个或者多个字符组成的有限序列。Python 中把单个字符或多个字符用双引号或单引号括起来，就可以表示一个字符串。

可以在字符串中使用`\`表示转义，如`\n`表示换行。`\`后面还可以跟一个八进制或十六进制数来表示字符。如`\141`和`\x61`都表示`a`，也可以跟 Unicode 字符编码表示字符，如`\u9a86`。

如果不希望字符串中的`\`转义，则可以在字符串最前面加上字母`r`来说明。如`s1 = r'\n\\hello'`


Python 为字符串定提供了丰富的运算符，可以使用`+`来实现字符串拼接。可以使用`*`来重复一个字符串内容。可以使用`in`和`not in`来判断一个字符串是否包含另一个字符串。也可以使用`[]`或`[:]`从字符串取出某个或某些字符。

Python 中可以通过一系列方法完成对字符串的处理：

- `len(str2)` 计算长度
- `str1.capitalize()` 字符串首字母大写的拷贝
- `str1.title()` 每个单词首字母大写
- `str1.upper()` 字符串大写后的拷贝
- `str1.find('or')` 查找子串所在位置，找不到则是`-1`
- `str1.index('or')` 与 find 类似但是找不到会引发异常
- `str1.startswith('or')` 检查字符串是否以指定字符串开头
- `str1.endwidth('or')` 检查字符串是否以指定字符串结尾
- `str1.center(50,'*')` 将字符串以指定宽度居中并且在两侧填充指定的字符
- `str1.rjust(50,'')` 靠右放置并在左侧填充指定字符
- `str1.isdigit()` 检测字符串是否以数字组成
- `str1.isalnum()` 检测字符串是否以字母组成
- `str1.strip()` 修剪左右两侧空格

### 格式化输出字符串

`print("%d * %d = %d" % (a,b,a*b))`

也可以用字符串提供的方法来完成：`print('{0}*{1}={2}'.format(a,b,a*b))`

Python3.6 后格式化字符串更为简洁的方式，即在字符串前面加上`f`：`print(f'{a}*{b}={a*b}')`

## 使用列表

数值类型是标量类型，也就是说这种类型的对象没有可以访问的内部结构。而字符串是一种结构化的、非标量型，所以才会有一系列属性和方法。以下的`list`类型，也是一种结构化的非标量型，它是值的有序序列，每个值都可以通过索引标识，定义列表可以将列表的元素放在`[]`中，多个元素用`,`隔开，可以使用`for`循环对列表元素进行遍历，也可以使用`[]`或者`[:]`取出列表中的一个或多个元素。

### 基本操作

### 排序操作
```Python
list1 = ['a','len','dong']
list2 = sorted(list1)

# sorted 函数返回的列表排序后不会修改传入的列表
# 函数的设计就应该像这样一样尽量不产生副作用
list3 = sorted(list1,reverse=True)

# 通过 key 关键字指定根据字符串长度排序而不是默认的字母顺序
list4 = sorted(list1,key=len)

# 直接在 list1 上排序
list1.sort(reverse=True)
print(list1)
```
### 生成器和生成式

可以使用列表的生成式语法创建列表：
```python
# 用列表生成表达式语法创建列表容器
# 这种语法创建列表之后元素已经准备就绪，所以需要耗费较多的内存空间
f = [x for x in range(1,10)]

f = [x + y for x in 'ABCDE' for y in '12345676']
print(sys.getsizeof(f)) # 查看对象占用内存的字节数

# 以下创建的不是一个列表而是一个生成器对象
# 通过生成器可以获取到数据但是它不占用额外的空间存储数据
# 每次需要数据的时候就通过内部的运算符得到数据（需要额外花费时间）

f = (x ** 2 for x in range(1,100))
print(sys.getsizeof(f))
```

除了上面提到的生成器语法，Python 中还有另外一种定义生成器的方式，就是通过`yield`关键字将一个普通函数改造成生成器函数：
```python
def fib(b):
    a,b = 0,1
    for _ in range(n):
        a,b = b, a+b
        yield a

def main():
    for val in fib(20):
        print(val)

main()
```
## 使用元组

Python 中的元组和列表类似也是一种容器数据类型，可以用一个变量（对象）来存储多个数据，不同之处在于元组的元素不能修改。我们将多个元素组合在一起就形成了元组，所以它和列表一样可以保存多条数据：

```python
# 定义元组
t = ("test",34, True, "上班")

# 获取元素
print(t[0])

# 遍历
for mem in t:
    print(men)

# 重新赋值
# t[0] = 'test2' # TypeError

# 变量 t 引用了新的元组原来的元组将会被回收
t = ("Name2",False)

# 元组转换为列表
person = list(t)

# 列表改变为元组
tuple2 = tuple(person)

```

### 为什么需要元组呢

已经有了列表这种数据结构，为什么还需要元组？
1. 元组中的元素是无法修改的，事实上我们在项目中尤其是多线程环境中可能更喜欢使用的是那些不变的对象（一方面是因为对象状态不能修改，所以可以避免由此引起的不必要的程序错误，简单来说就是一个不变的对象要比可变的对象更容易维护；另一方面是因为没有任何一个线程能够修改不变对象的内部状态，一个不变对象自动就是线程安全的，这样就可以节省处理同步化的开销。一个不可变的对象可以方便地被共享访问）。所以结论就是：如果不需要对元素进行添加、删除、修改的时候，可以考虑使用元组，当然一个方法要返回多个值的时候，使用元组也是不错的选择。
2. 元组在创建时间和占用的空间上都优于列表，我们可以使用`sys`模块的`getsizeof`方法来检查存储同样元素的列表和元组各占用了多少内存空间。

## 使用集合

Python 中的集合和数学中的集合是一致的，不允许有重复元素，而且可以进行交集、并集、差集等运算。

```python
set1 = {1,2,3,3,2}
print(set1)
print(f"length = {len(set1)}")

set1.add(4)
set1.update([11,12])

# 元组转换为集合
set3 = set((1,2,3,1,2))


# 集合的交集、并集、差集
set1 & set2
set1 | set2
set1  - set2
```
Python 中允许通过一些特殊的方法为某种类型或者数据结构自定义运算符。
## 使用字典
字典是另外一种可变容器类型。可以存储任意的类型对象。与列表、集合不同的是，字典的每个元素都是由一个键和一个值组成的键值对。键和值通过冒号分隔。

```python
score = ['name':"cherry", "sex": "male"]
print(score['name'])
for ele in scores:
    print("%s\t--->\t%s"%(elem,scores[elem]))
```