# 使用 STOMP

假设需要编写一个 Web 应用程序，并且假设 HTTP 协议不存在，只能使用 TCP 套接字来编写 web 应用。当然我们可能可以完成这一壮举，但是这需要自行设计客户端和服务端都认可的协议。从而实现有效的通信。不过幸好我们有 HTTP ，它解决了 Web 浏览器发起请求以及 Web 服务器响应请求的细节，这样的话，大多数的开发人员就不需要编写低层级的 TCP 套接字通信相关的代码。

直接使用 WebSocket 或者 SockJS 就很类似于我们使用 TCP 套接字来编写 Web 应用。因为没有高层级的线路协议(wire protocol)因此就需要我们定义应用之间发送的消息的语义，还需要确保连接的两端能够遵循这些语义。好消息是我们并非必须要使用原生的 WebSocket，就像 HTTP 在 TCP 套接字之上添加了请求-响应模型一样，STOMP 在 WebSocket 之上提供了一个基于帧的线路模式，来定义消息的语义。

STOMP 的消息格式非常类似于 HTTP 请求的结构，STOMP 帧由命令、一个或者多个头信息以及负载所组成。如：
```
SEND
destination: /app/marco
content-length: 20

{\"message\":\"Marco\"}
```

这个简单的示例中，STOMP 命令是 send，表明会发送一些内容，紧接着是两个头信息，一个用来表示消息要发送到哪里的目的地，另一个则包含了负载的大小。然后紧接着就是一个空行，最后是负载内容。上面例子中是一个 JSON 消息。

STOMP 帧中最有意思的地方恐怕就是 destination 头信息了，它表明 STOMP 是一个消息协议，类似于 JMS 或者 AMQP ，消息会发送到某个目的地。这个目的地可能实际上真的有消息代理作为支撑，(message broker)。另外，消息处理器也可以监听这些目的地，接收所发送过来的消息。

在 WebSocket 通信中，基于浏览器的 js 应用可能会发送消息到一个目的地。这个目的地由服务端的组件来进行处理，其实反过来屎一样的，服务器端的组件也可以发布消息，由 js 客户端的目的地来接收。

Spring 为 STOMP 消息提供了基于 Spring MVC 的编程模型。可以看到在 Spring MVC 控制器中处理 STOMP 消息和处理 HTTP 请求没有太大差别。但是首先需要配置 Spring 启用 STOMP 消息。

## 启用 STOMP 功能

在 SpringMVC 的控制器中添加`@MessageMapping`方法，使其能够处理 STOMP 消息，与带有`@RequestMapping`的处理HTTP请求的方法非常类似。不同之处在于，`@MessageMapping`不能通过`@EnableWebMvc`启用，Spring 的 Web 消息功能基于消息代理(message broker)构建，因此除了告诉 Spring 我们想要处理消息外，还有其他的内容配置：
```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketStompConfig extends AbstractWebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StopmEndpointResitry registry){
        registry.addEndpoint("/marcopolo").withSockJS() ;
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){
        registry.enableSimpleBroker("/queue","/topic") ;
        registry.setApplicationDestinationPrefixes("/app") ;
    }
}
```

这里使用`@EnableWebSocketMessageBroker`注解，表明这个配置类不仅配置了 WebSocket，而且还配置了基于代理的 STOMP 消息。它重载了 `registerStompEndpoints()`方法，将`/marcopolo`注册为 STOMP ，这个路径与之前发送和接收消息的目的地路径有所不同，**这是一个端点，客户端在订阅或者发布消息到目的地路径之前，要连接该端点**。

WebSocketStopmConfig 还通过重载 configureMessageBroker() 方法配置了一个简单的消息代理，这个方法是可选的，如果不重载它的话，将会自动配置一个简单的内存消息代理，用它来处理以`/topic`为前缀的消息。不过在上面的例子中，重载了该方法，所以消息代理将能够处理前缀为`/topic`和`/queue`的消息。除此之外，发往程序的消息将会带有`/app`前缀。

**当消息到达时，目的地的前缀将会决定消息该如何处理。应用程序的目的地以`/app`为前缀，而代理的目的地以`/topic`和`/queue`为前缀，以应用程序为目的地的消息将会直接路由到带有`@MessageMapping`注解的控制器方法中。而发送到代理的消息，其中也包括`@MessageMapping`注解方法的返回值所形成的消息，将会路由到代理上，并最终发送到订阅这些目的地的客户端。**

### 启用 STOPM 代理中继

对于初学者来说，简单地代理是很不错的。但是它有一些限制，尽管它模拟了 STOMP 消息代理，但是它只支持 STOPM 命令的子集。因为它是基于内存的，所以它并不适合集群，因为如果集群的话，每个节点也只能管理自己的代理和自己的那部分消息。

对于生产环境下的应用来说，你可能会希望使用真正支持 STOMP 的代理来支撑 WebSocket 消息，如 RabbitMQ 或 ActiveMQ，这样的代理提供了可扩展性和健壮性更好的消息功能，当然它们也会完整支持 STOMP 命令，我们需要根据相关的文档来为 STOMP 搭建代理，搭建就绪之后就可以使用 STOMP 代理替换内存代理了:
```Java
@Override
public void configureMessageBroker(MessageBrokerRegistry registry){
    registry.enableStompBrokerRelay("/topic","/queue") ;
    registry.setApplicationDestinationPrefixes("/app") ;
}
```

默认情况下，STOMP 代理中继会假设代理监听 localhost 的 61613 端口，并且客户端的 username 和 password 均为"guest"，如果你的 STOMP 代理位于其他服务器上，或者配置了不同的客户端凭证，那么可以在启用 STOMP 代理中继的时候，配置需要的细节：
```java
@Override
public void configureMessageBroer(MessageBrokerRegistry registry){
    registry.enableStopBrokerReplay("/topic","/queue")
        .setRelayHost("rabbit.othersite")
        .setRelayPort(62623)
        .setClientLogin("marcopl")
        .setClientPasscode("let") ;
    registry.setApplicationDestinationPrefixes("/app","/foo") ;
}
```

