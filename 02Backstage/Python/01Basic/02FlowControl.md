# 流程控制语句

## 分支结构

Python 中构造分支结构可以使用`if`、`elif`、`else`关键字。

**注意**Python 中没有使用花括号来构造代码块而是使用了缩进的方式来设置代码的层次结构，如果 if 条件下需要执行多条语句，只需要保持多条语句具有相同的结构就可以了。换句话说连续的代码如果保持了相同的缩进，那么它们属于同一个代码块，相当于一个执行的整体。

```python
x = float(input('x='))
if x>1:
    y=3*x-5
elif x>= -1:
    y = x+2
else:
    y = 5*x + 3
print('f(%.2f)=%.2f' % (x,y))
```

**Flat is better than nested**

## 循环结构

Python 中构造循环结构有两种做法：`for-in`循环和`while`循环

### for-in 循环

明确知道循环的执行次数或者要对一个容器进行迭代，那么推荐使用`for-in`循环。

关于`range()`:
- `range(101)` 可以产生从 0 到 100 的整数序列
- `range(1,100)` 从 1 到 99 整数序列
- `range(1,100,2)` 从 1 到 99 的奇数序列，2 是步长

```Python
sum = 0
for x in range(2, 101, 2):
    sum += x
print(sum)
```

### while 循环

如果要构造不知道具体循环次数的循环结构，推荐`while`循环。`while`循环通过一个能够产生或者转换出`bool`值的表达式控制循环。

可以使用`break`关键字提前终止循环，需要注意的是`break`只能终止它所在的那个循环，使用嵌套循环的时候要额外注意。另外一个关键字是`continue`，可以放弃本次循环后续代码直接进入下一循环。

