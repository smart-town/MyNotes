# 装配 Bean

对于一个应用而言，其由很多 Bean 来组成，各个 Bean 之间必然有其依赖交流等进行协作。传统的对象之间关联关系的创建通常会导致结构复杂的代码（直接使用构造器或通过查找）。而在 Spring 中无需自己查找或者创建与其关联的其他对象，相反，容器负责将需要相互写作的对象引用赋予各个对象。组件只需要表明自己需要什么，容器会主动赋予其符合要求的另一组件。

创建应用对象之间协作关系的行为通常称为**装配(wiring)**。这也是`DI`的本质。

## 配置可选方案

描述 bean 如何进行装配时，可以选择的装配机制有：

- 在 XML 中进行显式配置
- 在 Java 中进行显式配置
- 隐式的 bean 发现机制和自动装配

建议是尽可能使用自动装配机制，显式配置越少越好。当必须要显式配置 bean 的时候，推荐使用类型安全并且比 XML 更强大的 JavaConfig。最后才是 XML。

## 自动化装配 Bean

两方面：

- **组件扫描**: component scanning.Spring 自动发现应用上下文中所创建的 bean
- **自动装配**: Spring 自动满足 bean 之间的依赖

### 1. 创建可以被发现的 bean

`@Component` 以及 `@ComponentScan` 【组件扫描默认不开启，只能显式声明】

### 2. 为组件扫描的 bean 命名

`@Component("name")` 和 `@Named("name")`

Spring 上下文所有的 bean 都会给定一个 ID。如果使用`@Component`没有明确设置，则默认为类名第一个字母小写。

大多数场景下两种注入方式可以互换

### 3. 设置组件扫描基础包

`@ComponentScan` 在配置类中，如果不进行其他配置的话，则默认扫描和配置类相同的包。

如果想要明确设置基础包时（比如想要将配置类单独放在某个包时），只需指定`value`属性：`@ComponentScan("packageName")`。更清晰地可以这样写：`@ComponentScan(basePackages="packageName")`。可以指定多个包：`@ComponentScan(basePackages={"name1","name2"})`。

但是需要注意的是，这里基础包以 String 类型表示，如果重构代码的话，可能就会造成错误，是类型不安全的。于是基于此，还有另外一种方式来指定包：将`value`指定为包中所包含的类或者接口。`@ComponentScan(basePackageClasses={Name.class,Name2.class})`。【可以在包中使用一个用来进行扫描的空标记接口】

### 4. 添加注解实现自动装配

如果组件都是独立的，那么所需要的仅仅就只是组件扫描了，但是很多对象会依赖其他对象才能完成任务，这就是自动装配的来源了。

Spring 的 `@AutoWired` 注解。其不仅能用在构造器上，还可以用在属性的 Setter 方法上。实际上可以用在类的任何方法上。

Java 依赖注入规范中的 `@Inject` 。两者存在细微差别但是大多数场景下是可以相互替换的。

## 通过 Java 代码装配 Bean

尽管很多场景下通过组件扫描和自动装配实现 Spring 的自动化配置是更为推荐的，但是有时候自动化装配的方案行不通，需要明确地配置 Bean。比如，想要将第三方库中的组件装配到你的应用中，这种情况下是没有办法在它的类上添加`@Component`注解的。因此就不能使用自动化装配了。

这种情况下，就需要采用显式装配的方式。进行显式装配时有两种可选方案：Java 和 XML。JavaConfig 是更好的 方案，因为它更为强大、类型安全并且对重构友好。

### 1. 创建配置类

`@Configuration` 注解。创建 JavaConfig 类的关键在于为其添加该注解

### 2. 声明简单 Bean

在 JavaConfig 中声明 bean，需要编写一个方法，该方法会创建所需类型的实例，然后给这个方法添加 `@Bean` 注解。如：

```java
@Bean
public Object1 getBean(){
    return new Object1Impl() ;
}
```

1. bean 的 id，默认情况下与带有 `@Bean` 注解的方法名相同。上面例子中即：`getBean`
2. bean 的 id 可以设置：`@Bean(name="myname")`。

### 3. 实现注入

在 JavaConfig 中装配 bean 的最简单的方式就是引用创建 bean 的方法：

```java
@Bean
public Object2 getBean2(){
    return new Object2(getBean());
}
```

【注意】这里的 getBean2() 方法使用了 `@Bean` 注解，其与`getBean()`区别在于并没有使用默认的构造器创建实例，而是调用了需要传入对象`Object1`的构造器。看起来好像是通过调用`getBean()`方法来得到的实例`Object2`。但是情况并非完全如此，因为`getBean()`上面加了`@Bean`注解，Spring 会拦截所有对它的调用，并确保直接返回该方法所创建的 bean，而不是每次都对其进行实际调用。默认情况下，Spring 中的 bean 都是单例的。

另外一种方式：

```java
@Bean
public Object2 getBean2(){
    return new Object2(getBean) ;
}
```

## 通过 XML 装配 Bean

Spring 刚刚出现的时候，XML 是描述配置的主要方式。在 Spring 的名义下，我们创建了无数行 XML 代码，一定程度上，Spring 成为了 XML 配置的同义词。尽管 Spring 长期以来确实与 XML 有着关联，但是需要明确的是，XML 不再是配置 Spring 的唯一可选方案。Spring 现在有了强大的自动化配置和基于 Java 的配置。

但是鉴于已经存在那么多基于 XML 的 Spring 配置，所以理解如何在 Spring 中使用 XML 还是很重要的。

### 1.创建 XML 配置规范

即声明 XML 模式文件。(XSD)。这些文件定义了配置 Spring 的 XML 元素。

用来装配 bean 的最基本的 XML 元素包含在 spring-beans 模式之中。`<beans>`是该模式中的一个元素，它是所有 Spring 配置文件的根元素

### 2.声明简单的`<bean>`

类似 JavaConfig 中的 `@Bean`，XML 中配置声明一个 bean: `<bean class="pers.test.Cherry"/>`

如果不给定明确 ID，那么 bean 将会根据全限定类名进行命名，该例子中：`pers.test.Cherry#0`就自动成为 ID。#0 是计数形式用来区分相同类型的其他 bean

指定明确 ID: `<bean id="componentName" class="pers.test.Cherry"/>`

【注意】

1. 不需要直接负责创建类的实例，在JavaConfig 中是需要这样做的。当 Spring 发现这个`<bean>`元素的时候会自动调用其默认构造器来创建 bean。在 XML 中 bean 的创建显得更加被动，但是他并没有 JavaConfig 的强大，在 JavaConfig 中可以用任何想到的方法来创建 bean 实例
2. 在简单的 bean 声明中，是将类名以字符串形式设置在了 `class`属性中，这无法保证设置的值是真正的类。即便是如果进行了重命名则依然会有问题。

### 3.借助构造器注入初始化 bean

&emsp;&emsp;Spring XML 配置中，只有一种声明 bean 的方式：使用`<bean>`元素并指定`class`属性，但是在 XML 中声明 DI 时，会有多种的配置方案和风格，具体到构造器注入，有两种基本配置方案可供选择：

- `<constructor-arg>`元素
- Spring3.0 引入的 c- 命名空间

两者区别很大程度上就是是否冗长。除此之外，`<constructor-arg>`有一些 c- 命名空间无法做到的事情。

#### 构造器注入 bean

```xml
<bean id="beanName" class="pers.Test">
    <constructor-arg ref="test2">
</bean>
```

当 Spring 遇到这个 `<bean>`元素的时候，他会创建一个 beanName 实例，`<constructor-arg>`告诉 Spring 要将一个 ID 为 `test2` 的 bean 引用传递到 beanName 构造器中

替代方案的 c- 命名空间，**首先**引入其声明模式后，再使用：

```xml
<bean id="beanName" class="pers.Test" c:cd-ref="test2"/>
```

这里使用了 c- 命名空间声明构造器参数。属性名以 c: 开头，在此之后就是要装配的构造器**参数名**，然后是`-ref`表示正在装配的是 bean 引用。

使人困扰的地方是，c- 命名空间引用参数名称看起来十分怪异，因为这需要在编译代码的时候将调试标志保存在类代码中，如果你优化构建过程，将调试标志移除掉，那么这种方式可能就无法正常执行了。替代的方案是使用参数在整个参数列表中的位置信息：`c:_0-ref="test2"`。以下划线开头是因为 XML 中不允许数字作为属性的第一个字符。使用索引来识别构造器参数感觉会比使用名字好一些，即便是在构建的时候移除掉了调试标志，参数却会依然保持相同的顺序。如果有多个构造器参数的话显然很有用处，但是如果只有一个参数的话：`c:_-ref="test2"`。

#### 将字面量注入到构造器中

到这里为止，所做的 DI 通常都指的是类型的装配——即将对象的引用装配到依赖于它们的其他对象之中。而有的时候我们需要做的只是用一个字面量值来配置一个对象。

```xml
<bean id="myBean3" class="pers.Bean3">
    <constructor-arg value="value1"/>
    <constructor-arg value="value2"/>
</bean>
```

注意到这里不是使用`ref`而是`value`进行值的注入。
如果使用 c- 命名空间。则：`<bean id="myBean3" class="pers.Bean3" c:_param1="value1" c:_param2="value2"/>`同样也可以使用参数索引来装配。

#### 装配集合

```xml
<bean id="myBean4" class="pers.Bean4">
    <constructor-arg>
        <list>
            <value>Test1</value>
            <value>Test2</value>
            <value>Test3</value>
        </list>
    </constructor-arg>
</bean>
```

同样的方式，还可以使用`<set>`元素。

#### 设置属性

之前所述都是通过构造器进行注入的，没有使用属性的 setter 方法。选择构造器和属性注入的一个通用规则是，构造器注入强依赖的元素，而对可选性的属性进行树型注入。

```xml
<bean id="myBean3" class="pers.Bean3">
    <property name="attribute1" ref="myBean4"/>
</bean>
```

也可以使用 p- 命名空间来装配属性：`<bean id="myBean3" class="pers.Bean3" p:attribute1-ref="myBean4"/>` 属性的名称以`-ref`结尾提示 Spring 要进行装配引用而不是字面量。

注入字面量与构造器注入字面量相同：

```xml
<bean id="myBean4" class="pers.Bean4">
    <property name="title" value="hhgg"/>
    <property name="favorite">
        <list>
            <value>111</value>
            <value>222</value>
        </list>
    </property>
</bean>
```

注意使用 p- 命名空间是，如果没有后缀 -ref 则装配的就是字面量。但是 p- 命名空间不能用来装配集合。

## 导入和混合配置

典型的 Spring 应用中可能会同时使用自动化和显式配置，即便 JavaConfig 更好用，但是有时候 XML 却是更好的方案。幸好在 Spring 中这些配置都不是互斥的，可以将 JavaConfig 的组件和自动装配或 XML 配置再一起。

关于混合配置，需要了解的是，就是自动装配时，它并不在意装配的 bean 来自哪里。自动装配的时候会考虑到 Spring 容器中所有的 bean。不管它是如何获取到的。

### JavaConfig 中使用 XML 配置

多个 JavaConfig:

```java
//test.java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class TestConfig {
    @Bean
    public Test1 test1(){
        return new Test1Impl() ;
    }
}

//All.java
@Configuration
@Import(TestConfig.class[,otehr.class])
public class AllConfig {
    
}
```

JavaConfig 中引入 XML 配置：

```java
@Configuration
@Import(TestConfig.class)
@ImportResource("classpath:test.xml")
public class MyConfig(){}
```

使用`@ImportResource`注解，将根类路径下的 xml 文件引入。

### 在 XML 中引入 JavaConfig


```xml
<beans>
    <import resource="test.xml"/> <!--导入配置文件-->
    <bean class="MyConfig.class"/><!--导入配置类-->
</beans>
```

## 小结

Spring 框架的核心是 Spring 容器，容器负责管理应用中组件的生命周期，它会创建这些组件并保证它们的依赖能够得到满足，这样的话，组件才能完成预定的任务。

这里主要介绍了三种装配 bean 的方式。

建议尽可能使用自动化配置，以避免显式配置带来的维护成本。但是如果确实需要显式的配置，应该优先选择基于 Java 的配置。它比基于 XML 的配置更加强大、类型安全并且易于重构。