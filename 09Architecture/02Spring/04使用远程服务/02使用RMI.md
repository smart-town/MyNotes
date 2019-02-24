# 使用 RMI

RMI 最初在 JDK1.1 被引入到 Java 平台，它为 Java 开发者提供了一种强大的方法来实现 Java 程序间的交互。在 RMI 之前，对于 Java 开发者来说，远程调用的唯一选择就是 CORBA（在当时，需要购买一种第三方产品，叫做 Object Request Broker(ORB))。或者手工编写 Socket 程序。

但是开发和访问 RMI 服务是非常乏味无聊的，它涉及到好几个步骤，包括程序的和手工的。Spring 简化了 RMI 模型，它提供了一个代理工厂 bean，能让我们将 RMI 服务像本地 JavaBean 一样装配到我们的 Spring 应用中。Spring 还提供了一个远程导出器，用来简化把 Spring 管理的 bean 转换为 RMI 服务的工作。

## 导出 RMI 服务

一般创建 RMI 服务会涉及到如下步骤：
1. 编写一个服务实现类，类中方法必须抛出 `java.rmi.RemoteException` 异常
2. 创建一个继承于 `java.rmi.Remote` 的服务接口
3. 运行 RMI 编译器(rmic)，创建客户端 stub 和服务端 skelton 类
4. 启动一个 RMI 注册表，以便持有这些服务
5. 在 RMI 中注册服务

发布一个简单的 RMI 服务就需要做这么多工作。除了这些步骤外，还要抛出相当多的异常，即使这些异常通常意味着无法从`catch`代码块中恢复。

## 在 Spring 中配置 RMI 服务

幸运的是，Spring 提供乐更为简单的方式来发布 RMI 服务。不用再编写那些需要抛出`RemoteException`的特定 RMI 类，只需要编写实现服务功能的 POJO 就可以了，Spring 会处理剩余的其他事项。

要发布的服务的接口定义：
```java
public interface SpitterService {
    void saveSpitter(Spitter spitter) ;
    Spitter getSpitter(Spitter spitter) ;
}
```

如果我们使用传统的 RMI 来发布此服务，`SpitterService`和`SpitterServiceImpl`中的所有方法都需要抛出`java.rmi.RemoteException`。但是如果我们使用 Spring 提供的`RmiServiceExporter`把该类转变为 RMI 服务，则现有的实现不需要做任何改变。

`RnuServuceExporter`可以将任意 Spring 管理的 bean 发布为 RMI 服务。`RmiServiceExporter`将 bean 包裹到一个适配器类中，然后适配器类被绑定到 RMI 注册表中，并且代理到服务类的请求。

使用`RmiServiceExporter`将`SpitterServiceImpl`发布为 RMI 服务的最简单的方式就是在 Spring 中使用如下的方法进行配置：
```java
@Bean
public RmiServiceExporter rmiExporter(SpitterService spitterService){
    RmiServiceExporter rmiExporter = new RmiServiceExporter() ;
    rmiExporter.setService(spitterService) ;
    rmiExporter.setServiceName("SpitterService") ;
    rmiExporter.setServiceInterface(SpitterService.class) ;
    return rmiExporter;
}
```

这里会把 `spitterService bean`设置到 service 属性中，表明 `RmiServiceExporter`要把该 bean 发布为一个 RMI 服务。`serviceName`属性命名了 RMI 服务。`serviceInterface`指明了此服务所实现的接口。

默认情况下，`RmiServiceExporter`会尝试绑定到本地机器 1099 端口上的 RMI 注册表，如果这个端口没有发现 RMI 注册表，`RmiServiceExporter`会启动一个注册表。如果希望绑定到不同端口或者主机上的 RMI 注册表，那么我们可以通过`registeryPort`和`registryHost`来指定。如：
```java
@Bean
public RmiServiceExporter rmiExporter(SpitterService spitterService){
    RmiServiceExporter rmiExporter  = new;
    rmiExporter.setService()
    setServiceName();
    setServiceInterface();
    setRegistryHost("rmi.spitter.com") ;
    setRegistryPort(1199);
    return rmiExporter;
}
```
这就是我们使用 Spring 将某个 bean 转变为 RMI 所要做的全部工作。此时就可以通过第三方使用此 RMI 服务。

## 装配 RMI 服务

传统上，RMI 客户端必须使用 RMI API 的 Naming 类从 RMI 注册表中查找服务。如：
```java
try {
    String serviceUrl = "rmi:/spitter/SpitterService" ;
    SpitterService spitterService = (SpitterService)Naming.lookup(serviceUrl) ;
    ...
} catch(RemoteException e){...}
catch(NotBoundException e) {}
catch(MalformedURLException e){}
```

虽然这段代码可以获取 Spitter 的 RMI 服务引用，但是它存在两个问题：
- 传统的 RMI 查找可能导致 3 中检查类型异常中的任意一种。这些异常必须被捕获或者重新抛出
- 需要 Spitter 服务的任何代码都必须自己负责获取该服务。这属于样板代码，与客户端的直接功能没有关系。
RMI 查找过程中所抛出的异常通常意味着应用发生了致命的不可恢复的问题。
更糟糕的事情是，这段代码直接违反了依赖注入原则，因为客户端代码负责查找 Spitter 服务，并且这个服务是 RMI 服务。我们甚至没有任何机会提供`SpitterService`对象的不同实现，理想情况下，应该可以为任何一个 bean 注入 SpitterService 对象，而不是让 bean 自己去查找服务。利用 DI，SpitterService 的任何客户端都不需要关心此服务来自何处。

Spring 的 `RmiProxyFactoryBean`是一个工厂 bean。该 bean 可以为 RMI 服务创建代理，使用`RmiProxyFactoryBean`引用`SpitterService`的 RMI 服务是非常简单的：
```java
@Bean
public RmiProxyFactoryBean spitterService(){
    RmiProxyFactoryBean rmiProxy = new RmiProxyFactoryBean() ;
    rmiProxy.setServiceUrl("rmi://localhost/SpitterService") ;
    rmiProxy.setServiceInterface(SpitterService.class) ;
    return rmiProxy ;
}
```

现在已经将 RMI 服务声明为 Spring 管理的 bean，我们就可以把它作为依赖装配进另一个 bean 中，就像任意非远程的 bean 那样。如：
```java
@Autowired
SpitterService spitterService;
public List<Spittle> getSpittles(String userName){
    Spitter spitter = spitterService.getSpitter(userName) ;
    return sptterService.getSpittlesForSpitter(spitter) ;
}
```

以这种方式访问 RMI 服务简直太棒了。客户端代码甚至不需要知道所处理的是一个 RMI 服务。它只是通过注入机制接受了一个 SpitterService 对象。根本不必关心它来自何处。实际上，谁知道客户端得到的就是一个基于 RMI 的实现呢？

此外，代理捕获了这个服务所有可能抛出的`RemoteException`异常，并将它包装为运行期间异常重新抛出，这样就可以放心地忽略这些异常。

虽然客户端代码根本不需要关系所赋予的`SpitterService`是一个远程服务，但是我们需要非常谨慎地设计远程服务的接口，提醒以下，客户端不得不调用两次服务：一次是根据用户名查找 Spitter，另一次是获取 Spitter 对象的列表，这两次远程调用都会受到网络延迟的影响，进而可能会影响到客户端的性能。清楚了客户端是如何使用服务的，我们或许会重写接口，将这两个调用放进一个方法中。但是我们现在要接受这样的服务接口

RMI 是实现远程服务交互的好办法，但是它存在某些限制。首先，RMI 很难穿越防火墙，这是因为 RMI 使用任意端口来交互——这是防火墙所不允许的。在企业内部网络环境中我们不需要担心这个问题，但是如果在互联网上运行，我们用 RMI 可能会有些麻烦。即使 RMI 提供了对 HTTP 通道的支持（通常防火墙都允许），但是建立这个通道并不是容易的事情。

另外一件需要考虑的事情是 RMI 是基于 java 的，这意味着客户端和服务端都必须是用 Java 开发的。因为 RMI 使用了 Java 的序列化机制，所以通过网络传输的对象类型必须要保证在调用两端的 Java 运行时中是完全相同的版本。对于我们的应用而言，这可能是个问题，也可能不是个问题。但是选择 RMI 做远程服务的时候，必须要牢记这一点。

Caucho Technology 开发了一套应对 RMI 限制的远程调用解决方案。实际上，Caucho 提供了两种解决方案：Hessian 和 Burlap