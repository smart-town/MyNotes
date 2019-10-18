# 面向对象进阶

## @property 装饰器

之前我们讨论过 Python 中属性和方法的权限问题。虽然不建议将属性设置为私有的，但是如果直接将属性暴露给外界也是有问题的。比如我们无法检查赋值给属性的值是否有效。我们之前的建议是将属性名以单下划线开头，通过这种方式来暗示属性是受保护的，不建议外界直接访问，那么如果想访问属性也可以通过属性的`getter`和`setter`方法进行相应的操作。如果要做到这点，考虑使用`@property`包装器来包装 getter 和 setter 方法，使得对属性的访问又方便又快捷。如：
```py
class Person(obj):
    def __init__(self,name,age):
        self._name = name
        self._age = age
    
    @property
    def name(self):
        return self._name
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self,age):
        self._age =age
    def play(self):
        if self._age <= 16:
            print(f"Play fly {self._name}")
        else:
            print(f"Play Cards {self_name}")
def main():
    person = Person('HHG',15)
    person.play()
    person.age = 22
    person.play()

main()
```

## __slots__

Python 是一门动态语言，通常动态语言允许我们在程序运行时给对象绑定新的属性或方法，当然也可以对已经绑定的属性和方法进行解除绑定。但是如果我们需要限定自定义类型的对象只能绑定某些属性，可以在类中定义`__slots__`变量进行限定。需要注意的是`__slots__`的限定只对当前类对象生效，对子类不起任何作用

```py
class Person(object):
    # 限定对象只能绑定_name,_age,_gender
    __slots__ = ('_name', '_age', '_gender')

def main():
    person = Person()
    person._is_gay = False # AttributeError.
```

## 静态方法和类方法

之前在类中定义的都是对象方法，也就是说这些方法都是发送给对象的消息。实际上，我们写在类中的方法并不需要都是对象方法。

### 静态方法
```py
class Triangle(object):
    @staticmethod
    def is_valid(a,b,c):
        return a+b>c and b+c>a and a+c>b
```