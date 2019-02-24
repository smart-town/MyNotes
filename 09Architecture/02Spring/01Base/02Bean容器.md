# Bean 容器

## 认识

在基于 Spring 的应用中，应用对象生存于 Spring 容器中。Spring 容器负责创建对象，装配它们，并管理它们的整个生命周期。

容器是 Spring 框架的核心，Spring 容器使用 DI 管理构成应用的组件，它会创建相互协作的组件之间的关联。毫无疑问，这些对象更简单干净，更加易于理解，更易于重用并且更易于进行单元测试。

单独出来看，其个数并非只有一个，Spring 自带了多个容器实现。可以归为两种不同的类型：bean 工厂是最简单的容器，提供基本的 DI 支持；应用上下文基于 BeanFactory 构建，并提供应用框架级别的服务。虽然可以在两者之间任选一个，但是`bean`工厂对于大多数应用来说太低级了，因此应用上下文更加受欢迎，这里并不进行`bean`工厂的讨论。

## 使用应用上下文

Spring 自带多个类型应用上下文，以下是常见的几个：

- `AnnotationConfigApplicationContext`: 从一个或多个基于 Java 的配置类中加载 Spring 上下文
- `AnnotationConfigWebApplicationContext`: 从一个或多个基于 Java 的配置类中加载 Spring Web 应用上下文
- `ClassPathXmlApplicationContext`: 从类路径下的一个或者多个 XML 配置文件中加载上下文定义，将应用上下文的定义文件作为类资源
- `FileSystemXmlApplicationContext`: 从文件系统下的一个或者多个 XML 配置文件中加载上下文定义
- `XmlWebApplicationContext`: 从 web 应用下的一个或多个 XML 配置文件中加载上下文。

应用上下文准备就绪之后，就可以调用上下文的`getBean()`方法来从 Spring 容器中获取 Bean。

## Bean 生命周期

传统 Java 应用中，bean 的生命周期很简单，使用关键字`new`进行实例化，之后一旦该 bean 不被使用，则由 Java 自动进行垃圾回收。

相比而言，Spring 容器中的 bean 的生命周期就显得复杂多了。正确理解 Spring bean 的生命周期非常重要，因为你也许用到 Spring 提供的扩展点来自定义 bean 的创建过程。

在 bean 准备就绪之前，bean 工厂进行了若干步骤，典型的如下：

1. Spring 对 bean 进行实例化
2. Spring 将值和 bean 的引用注入到 bean 对应的属性中
3. 如果 bean 实现了 BeanNameAware 接口，Spring 将 bean 的 ID 传递给 setBeanName() 方法
4. 如果 bean 实现了 BeanFactoryAware 接口，Spring 将调用 setBeanFactory() 方法将 BeanFactory 容器实例传入
5. 如果 bean 实现了 ApplicationContextAware 接口，Spring 将调用 setApplicationContext() 方法，将 bean 所在的应用上下文的引用传入进来。
6. 如果 bean 实现了 BeanPostProcessor 接口，Spring 将调用它们的 postProcessBeforeInitialization() 方法
7. 如果 bean 实现了 InitializingBean 接口，Spring 将调用它们的 afterPropertiesSet() 方法，类似的，如果 bean 使用了 init-method 声明了初始哈方法，该方法也会被调用
8. 如果 bean 实现了 BeanPostProcessor 接口，Spring 将调用它们的 post-ProcessAfterInitialization() 方法。
9. 此时 bean 已经准备就绪，可以被应用程序使用了。
10. 如果 bean 实现了 DisposableBean 接口，Spring 将调用它的 destory() 接口方法。同样，如果 bean 使用 destory-method 声明了销毁方法，该方法也会被调用

