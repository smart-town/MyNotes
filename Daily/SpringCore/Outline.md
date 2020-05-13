# SpringCore 阅读笔记

无论是`AnnotationConfigApplicationContext`（注解配置上下文）还是`ClassPathXmlApplicationContext`（xml配置上下文）初始化，其上游接口都是`ApplicationContext`，其继承的接口有：`EnvironmentCapable`、`ListableBeanFactory`、`HierarchicalBeanFactory`、`MessageSource`、`ApplicationEventPublisher`、`ResourcePatternResolver`。

以下依次对这些继承的接口进行了解：
## 基础接口认识

### EnvironmentCapable

其意味着一个组件包含并且暴露出一个`Environment`引用。

`ApplicationContext`继承该接口，其子接口`ConfigurableApplicationContext`重写了`getEnviroment`方法并缩小了返回范围为`ConfigurableEnvironment`

### ListableBeanFactory

继承于`BeanFactory`接口，其由可以枚举自身所有`bean`实例的`bean`工厂来实现，而非根据请求按照名称逐一进行`bean`查找。预加载其所有`bean`定义的`BeanFactory`可以实现该接口。如基于`XML`的工厂。

该接口中的方法将只关系该工厂中的`bean`定义，它们将忽略任何由其他方式注册的单例`bean`，如`ConfigurableBeanFactory`中`registerSingleton`注册的`bean`。除了`getBeanNamesOfType`和`getBeansOfType`这两个方法，他们也会检查这类手动注册的单例。当然，`Bean`工厂的`getBean`方法也允许透明地访问这类特殊地`Bean`。

不过再典型场景下，所有的`bean`都会由外部的`bean`定义来定义。因此大多数程序不需要考虑这个差异。

### HierarchicalBeanFactory

由可以作为层次结构一部分的`Bean`工厂实现。

其对应的`setParantBeanFactory`方法允许以可配置的方式设置父对象。可以在`ConfigurableBeanFactory`中找到。

### MessageSource

用于解析消息的策略接口，支持此类消息的参数化和国际化。Spring 提供了两种现成的实现：
- `ResourceBundleMessageSource` 建立在标准的`ResourceBundle`之上，共享了其局限性。
- `ReloableResourceBundleMessageSource` 高度可配置，特别是在重新加载消息定义方面。

### ApplicationEventPublisher

封装事件功能的接口，用作`ApplicationContext`的父接口。

### ResourcePatternResolver

解析路径模式到`Resource`对象的策略接口。

这是一个`ResourceLoader`的子接口，可以检查传入的`ResourceLoader`是否也实现了次扩展接口。如在上下文运行时通过`ResourceLoaderAware`传入的`ApplicationContext`。

`PathMatchingResourcePatternResolver`是一个独立的实现。可以在`ApplicationContext`外部使用。`ResourceArrayPropertyEditor`也使用它来填充`Resource`数组的`bean`属性。

*当前情况，对外部的响应，内部的层次、列表化，对于消息的解析、资源路径的解析。*

## 基础接口更进一步

### Environment
`EnvironmentCapable`接口提供了`Environment`的引用，关于`Environment`本身如何认识：[Environment](./Environment.md)

## 核心方法
