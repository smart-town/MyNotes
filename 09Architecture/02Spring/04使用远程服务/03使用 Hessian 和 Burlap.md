# 使用 Hessian 和 Burlap 发布远程服务

Hessian 和 Burlap 是 Caucho Technology 提供的两种基于 HTTP 的轻量级远程服务解决方案。借助于尽可能简单的 API 和通信协议，它们都会致力于简化 web 服务。

你可能会好奇，为什么会对同一个问题有两个解决方案。Hessian 和 Burlap 就如同一个事物的两面。但是每一个解决方案都服务于略微不同的目的。

Hessian 像 RMI 一样，使用二进制消息进行客户端和服务端的交互。但是与其他二进制远程调用技术不同的是，它的二进制消息可以移植到其他非 Java 语言中。包括 PHP、Python、C++ 和 C#。

Burlap 是一种基于 XML 的远程调用技术。这使得它可以自然而然地移植到任何能够解析 XML 的语言上。正是因为它基于 XML 所以相比 Hessian 的二进制格式而言，Burlap 的可读性更强。但是和其他基于 XML 的远程技术（如 SOAP 或 XML-RPC）不同，Burlap 的消息结构尽可能简单，不需要额外的外部定义语言。如 WSDL。

你可能很想知道如何在 Hessian 和 Burlap 服务之间做出选择，在很大程度上，它们是一样的。唯一的区别在于 Hessian 的消息是二进制的，而 Burlap 是XML。由于 Hessian 是二进制的，所以它在带宽上更具有优势。但是如果我们更注重可读性，如出于调试目的，或者我们的应用需要与没有 Hessian 实现的语言交互，那么 Burlap 的 XML 消息会是更好的选择。

## 使用 Hessian 和 Burlap 导出 bean 的功能

像之前一样，我们希望将`SpitterServiceImpl`类的功能发布为远程服务——这次是一个 Hessian 服务。即使没有 Spring，编写一个 Hessian 服务也是相当容易的。我们只需要编写一个继承`com.caucho.hessian.server.HessianServlet`的类，并确保所有的服务方法都是公共的。在 Hessian 中，所有`public`方法被视为服务方法。

因为`Hessian`的服务很容易实现，Spring 并没有做更多的工作。但是和 Spring 一起使用时，`Hessian`服务可以在各个方面利用 Spring 框架的优势。这是纯 Hessian 服务所不具备的。包括利用 Spring 的 AOP 来为 Hessian 服务提供系统级服务。

### 导出 Hessian 服务

在 Spring 中导出一个 Hessian 服务和在 Spring 中实现一个 RMI 服务惊人相似。为了将 Spitter 服务的 bean 发布为 RMI 服务，我们需要在 Spring 配置文件中配置一个 `RmiServiceExporter` bean，同样的方式，为了把 Spitter 服务发布为一个 Hessian 服务，我们需要配置另一个导出 bean，只不过是`HessianServiceExporter`。`

虽然配置方式类似，但是实现过程与`RmiServiceExporter`将 POJO 发布为 RMI 服务是不同的。`HessianServiceExporter`是一个 Spring MVC 控制器，它接收`Hessian`请求，并将这些请求转换成对被导出 POJO 的方法调用。在如下的 Spring 声明中，`HessianServiceExporter`会将`spitterService` bean 导出为 Hessian 服务：
```java
@Bean
public HessianServiceExporter hessianExportedSpitterService(SpitterService service){
    HessianServiceExporter exporter = new HessianServiceExporter() ;
    exporter.setService(service) ;
    exporter.setServiceInterface(SpitterService.class) ;
    return exporter;
}
```

正如`RmiServiceExporter`一样，`service`属性的值被设置为实现了这个服务的 bean 引用。与`RmiServiceExporter`不同的是，我们不需要设置`serviceName`属性，在 RMI 中，`serviceName`属性用来在 RMI 注册表中注册一个服务。而 Hessian 没有注册表，因此也就没有必要为 Hessian 服务进行命名。

### 配置 Hessian 控制器

`RmiServiceExporter`和`HessianServiceExporter`另外一个主要的区别就是，由于 Hessian 是基于 HTTP 的，所以`HessianServiceExporter`实现为一个 Spring MVC 控制器。这意味着为了使用导出的 Hessian 服务，我们需要执行两个额外的配置步骤：
- 在 web.xml 中配置 Spring 的 `DispatcherServlet`并将我们的应用部署为 web 应用
- 在 Spring 的配置文件中配置一个 url 处理器，将 Hessian 服务的 URL 分发给对应的 Hessian 服务 bean

在 web.xml 中配置`DispatcherServlet`略去，为了处理 Hessian 服务，还需要配置一个 Servlet 映射来拦截后缀为`*.service`的 URL:
```xml
<servlet-mapping>
    <servlet-name>spitter</servlet-name>
    <url-pattern>*.service</url-pattern>
</servlet-mapping>
```
如果在 Java 中通过实现 `WebApplicationInitializer`来配置`DispatcherServlet`的话，那么需要将 URL 模式作为映射添加到`ServletRegistration.Dynamic`中。在将 `DispatcherServlet`添加到容器中时，我们能够得到`ServletRegistration.Dynamic`对象：
```java
ServletRegistration.Dynamic dispatcher = container.addServlet("appServlet",new DispatcherServlet(dispatcherServletContext)) ;
dispatcher.setLoadOnStartup(1) ;
dispatcher.addMapping("/") ;
dispatcher.addMapping("*.service") ;
```
或者通过扩展`AbstractDispatcherServletInitializer`的方式来配置`DispatcherServlet`，那么在重载`geteServletMapping()`的时候，要包含映射：
```java
@Override
protected String[] getServletMappings(){
    return new String[] {"/","*.service"} ;
}
```
这样配置后，任何以`*.service`为结尾的 URL 请求都将由 `DispatcherServlet`来处理，它会将请求传递给匹配这个`URL`的控制器。因此`/spitter.service`最终将被`hessianSpitterService bean`所处理。（它实际上仅仅是一个 `SpitterServiceImpl`的代理）

那么如何知道这个请求会转给`hessianSpitterService`处理呢？我们还需要额外配置一个`URL`映射来确保`DispatcherServlet`会将请求转给`hessianSpitterService`。
```Java
@Bean
public HandlerMapping hessianMapping(){
    SimpleUrlHandlerMapping mapping = new SimpleUrlHandlerMapping() ;
    Properties mappings = new Properties() ;
    mappings.setProperty("/spitter.service", "hessianExportedSpitterService") ;
    mapping.setMappings(mappings) ;
    return mapping ;
}
```
### 导出 Burlap 服务

如果不喜欢 Hessian 的二进制协议。还可以选择使用 Burlap 基于 XML 的协议。
```java
@Bean
public BurlapServiceExporter burlapExportedSpitterService(SpitterService service){
    BurlapServiceExporter exporter = new BurlapServiceExporter() ;
    exporter.setService(service) ;
    exporter.setServiceInterface(SptterService.class) ;
    return exporter;
}
```

## 访问 Hessian/Burlap 服务

在使用`RmiProxyFactoryBean`访问 Spitter 服务的客户端代码中，完全不知道这个服务是一个 RMI 服务。事实上也没有任何迹象表明这个服务是一个远程服务。它只是与 `SpitterService`接口打交道。RMI 的所有细节完全包含在 Spring 配置中的这个 bean 配置中。好处是客户端不需要了解服务的实现。因此从 RMI 转到 Hessian 客户端极其简单，不需要改变任何客户端的 java 代码。

```java
@Bean
public HessionProxyFactoryBean spitterService(){
    HessianProxyFactoryBean proxy = new HessianProxyFactoryBean() ;
    proxy.setServiceUrl("http://localhost:8080/Spitter/spitter.service") ;
    proxy.setServiceInterface(SpitterService.class) ;
    return proxy ;
}
```

因为 Hessian 和 Burlap 都是基于 HTTP 的，它们都解决了 RMI 所头疼的防火墙渗透问题，但是当传递过来的 RPC 消息中包含序列化对象时，RMI 就完胜 Hessian 和 Burlap 了。因为 Hessian 和 Burlap 都是采用的私有的序列化机制。而 RMI 使用的是 Java 的序列化机制。如果我们的数据模型非常复杂，那么 Hessian/Burlap 的序列化模型可能就无法胜任了。

一个两全其美的解决方案，就是 Spring 的 HTTP invoker ，它基于 HTTP 提供了 RPC，同时又使用了 Java 的对象序列化机制。