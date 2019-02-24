# bean 的作用域

在默认情况下，Spring 应用上下文中的所有 bean 都是作为以单例的形式创建的，也就是说，不管给定的 bean 被注入到其他的 bean 多少次，每次所注入的都是同一个实例。大多数情况下，单例 bean 是很理想的方案。初始化和垃圾回收对象实例所带来的成本只留给一些小规模任务。在这些任务中，让对象保持无状态并且在应用中反复使用这些对象可能并不合理。

但是有时候，你所使用的类是易变的(mutable)，它们会保持一些状态，因此重用是不安全的。这种情况下，将 class 声明为单例的 bean 就不是什么好主意了。因为对象会被污染，稍后重用的时候会出现意想不到的问题。

Spring 定义了多种作用域，可以基于这些作用域创建 bean:

- 单例(Singleton): 在整个应用中只创建一个 bean 实例
- 原型(Prototype): 每次注入或者通过 Spring 应用上下文获取的时候，都会创建一个新的 bean 实例
- 会话(Session): 在 Web 应用中，为每个会话创建一个 bean 实例
- 请求(Request): 在 Web 应用中，为每个请求创建一个 bean 实例

## 基本使用

单例是默认的作用域，但是对于易变的类型这并不合适，如果选择其他的作用域，要使用`@Scope`注解，它可以和`@Component`和`@Bean`一起使用：

```java
@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class Notepad {...}
```

这里使用 `ConfigurableBeanFactory` 类的`SCOPE_PROTOTYPE`常量设置了原型作用域，也可以使用`@Scope("prototype")`，但是使用常量更加安全并且不易出错。

如果想在 Java 配置中声明 bean，也可以使用`@Scope`:

```java
@Bean
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class Notepad {...}
```

如果使用 XML 的话：`<bean id="notepad" class="pers.Notepad" scope="prototype"/>`

## 使用会话和请求作用域

在 Web 应用中，如果能够实例化在会话和请求范围内共享的 bean，那将是非常有价值的事情。例如在典型的电子商务应用中可能会有一个 bean 代表用户的购物车，如果购物车是单例的话，那么将导致所有的用户都会向同一个购物车添加商品。另外一方面，如果购物车是原型作用域的，那么在应用中某一个地方向购物车中添加商品，在应用的另外一个地方可能就不能用了，因为注入的是另外一个原型作用于的购物车

就购物车 bean 来说，会话作用域是最合适的。因为它与给定的用户关联性最大。要指定会话作用域：

```java
@Component
@Scope(value=WebApplicationContext.SCOPE_SESSION, proxyMode=ScopedProxyMode.INTERFACES)
public ShppingCart cart(){...}
```

这里将 value 设置成了 WebApplicationContext 的 SCOPE_SESSION 常量，它的值是 session，这会告诉 Spring 为 Web 应用中的每个会话创建一个 ShoppingCart，这会创建多个 ShoppingCart bean 实例，但是对于给定的会话只会创建一个实例，在当前会话的相关操作中，这个 bean 实际上相当于单例。

要注意的是，`@Scope`还有一个`proxyMode`属性，它解决了将会话或请求作用于的 bean 注入到单例 bean 中所遇到的问题。场景如下：

假设要将 ShoppingCart bean 注入到单例 StoreService bean 的 Setter 方法中：

```java
@Component
public class StoreService {
    @Autowired
    public void setShoppingCart(ShoppingCart shoppingCart){...}
}
```

因为 StoreService 是一个单例的 bean，会在应用上下文加载的时候创建，当它创建的时候，Spring 会试图将 ShoppingCart bean注入到 setShoppingCart 中，但是 ShoppingCart 是会话的，此时并不存在，直到某个用户进入了系统，创建了会话之后，才会出现 ShoppingCart 实例

另外系统中将会有多个 ShoppingCart 实例，每个用户一个，我们并不想让 Spring 注入某个固定的 ShoppingCart 实例到 StoreService 中，我们希望的是当 StroeService 处理购物车功能时，他所使用的 ShoppingCart 实例恰好是当前会话所对应的哪一个。

Spring 并不会将实际的 ShoppingCart bean 注入到 StoreService 中，Spring 会注入一个到 ShoppingCart bean 的代理。这个代理会暴露与 ShoppingCart 相同的方法，所以 StoreService 会认为它就是一个购物车，但是当 StoreService 调用  ShoppingCart 的方法时，代理会对其进行懒解析并将调用委托给会话作用域内真正的 ShoppingCart bean。

`proxyMode`属性被设置为`ScopedProxyMode.INTERFACES`这表明这个代理要实现 ShoppingCart 接口，并将调用委托给实现 bean。如果 ShoppingCart 是接口而不是类的话，这是可以的，这也是最为理想的代理模式。但是如果 `ShoppingCart` 是一个具体的类的话，Spring 就没有办法创建基于接口的代理了，此时，它必须使用 CGLib 来生成基于类的代理。所以如果 bean 类型是具体的类的话必须要将 proxyMode 设置为`ScopedProxyMode.TARGET_CLASS`。

尽管这里只是说明了会话作用域，但是请求作用域与会话作用域是相似的。

**【在 xml 中使用域代理】**

```xml
<bean id="cart" class="com.myapp.ShoppingCart" scope="session">
    <aop:scoped-proxy>
</bean>
```

`<aop:scoped-proxy>`是与`@Scope`注解的`proxyMode`属性功能相同的配置元素，它会告诉 Spring 为 bean 创建一个作用域代理，默认情况下使用的是`CGLib`创建目标类的代理。但是也可以设置为`<aop:scoped-proxy proxy-target-class="false">`要求其生成基于接口的代理。