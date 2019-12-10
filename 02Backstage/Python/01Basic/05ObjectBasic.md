# 面向对象基础

“把一组数据结构和处理它们的方法组成对象，把相同行为的对象归纳为类，通过类的封装隐藏内部细节，通过继承实现类的特化和泛化，通过多态实现基于对象类型的动态分派”

## 来源

”程序是指令的集合“，我们在程序中书写的语句在执行时会变成一条或者多条指令然后由 CPU 执行，当然为了简化程序的设计，引入了函数的概念，将相对独立且经常重复使用的代码放置到函数中，在需要这些功能的时候只要调用函数即可。如果一个函数的功能过于复杂和臃肿，我们又可以进一步将函数继续切分为子函数来降低系统的复杂性。

说的这些，其实说明所谓编程就是程序员按照计算机的工作方式控制计算机完成各种任务。但是计算机的工作方式与正常人类的思维模式是不同的，如果编程就必须抛弃人类正常的思维方式去迎合计算机，编程的乐趣就少了很多。当然这还不是最重要的，最重要的是当我们开始需要开发一个复杂的软件系统的时候，代码的复杂性会让开发和维护工作都变得举步维艰，所以在上世纪 60 年代末，”软件危机“，”软件工程“等一系列概念开始在行业出现。

但是现实中并没有解决上述问题的”银弹”，真正让软件开发者看到希望的是上世纪 70 年代诞生的 Smalltalk 语言中引入的面向对象的编程思想（更早可以追溯到 Simula 语言）。按照这种编程理念，程序中的数据和操作数据的函数是一个逻辑上的整体。我们称之为对象。而我们解决问题的方式就是创建出需要的对象并且向对象发出各种各样的消息。多个对象的协同工作最终可以让我们构造出复杂的系统来解决现实中的问题。

**说明**: 当然面向对象也不是解决软件开发中所有问题的银弹，所以今天的高级语言中几乎都提供了对多种编程范式的支持。Python 也不例外。

## 类和对象

简单来说，类是对象的蓝图和模板，而对象是类的实例。类是抽象的概念，而对象是具体的东西。在面向对象编程的世界中，一切皆为对象，对象都有行为和属性，每个对象都是独一无二的。而且对象一定属于某一个类型。当我们把一大堆拥有共同特征的对象的静态特征（属性）和动态特征（行为）都抽取出来以后，就可以定义出一个叫做“类”的东西。

### 定义类

在 Python 中可以通过`class`关键字定义类。然后在类中可以通过函数定义方法。如：
```python
class Student(object):
    # __init__ 是一个特殊的方法用来创建对象时进行初始化操作
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def study(self, course_name):
        print('%s 正在学习 %s' % (self.name, course_name))
```

### 创建和使用对象
```python
def main():
    # 创建学生对象
    stu1 = Student("HHG", 20)

    # 调用方法
    stu1.study("Python")
if __name__ == "__main__":
    main()
```

### 访问可见性问题

在很多面向对象编程语言中，我们通常会将对象的属性设置为私有的`private`，或者受保护的`protected`。而对象的方法通常都是公开的`public`，因为公开的方法就是对象能够接受的消息，在 Python 中，属性和方法的权限只有两种，也就是公开和私有的，如果希望属性是私有的，在给属性命名时可以以两个下划线作为开头。

但是 Python 并没有从语法上严格保证私有属性或方法的私密性，它只是给私有属性和方法换了一个名字来妨碍对它们的访问。事实上你如果知道更换名字的规则仍然可以访问到它们。之所以这样设定，因为大部分程序员都认为开放要比封闭好，而且程序员要为自己的行为负责。

## 面向对象的支柱

面向对象有三大支柱：封装、继承、多态。

**封装**“隐藏一切可以隐藏的实现细节，只向外界暴露简单的编程接口。