# 处理来自客户端的 STOMP 消息

Spring MVC 为处理 HTTP Web 请求提供了面向注解的编程模型。`@RequestMapping`是 Spring MVC 中最著名的注解，它会将 HTTP 请求映射为对请求进行处理的方法上。

STOMP 和 WebSocket 更多的是关于异步消息，与 HTTP 的请求-响应不同，但是 Spring 提供了非常类似于 Spring MVC 的编程模型来处理 STOMP 消息，它非常地相似，以至于对 STOMP 消息的处理器方法也会包含在带有`@Controller`注解的类中。

Spring4.0 引入了`@MessageMapping`注解，它用于 STOMP 消息的处理。当消息抵达某个特定的目的地时，带有`@MessageMapping`注解的方法能够处理这些消息：
```java
@Controller
public class MarcoController {
    private static final Logger logger = LoggerFactory.getLogger(MarcoController.class) ;
    @MessageMapping("/marco")
    public void handleShout(Shout incoming){
        logger.info("Recevied message:{}", incoming.getMessage()) ;
    }
}
```
乍看上去它非常类似于其他的 Spring MVC 控制器，使用了`@Controller`注解，所以组件扫描能够找到它并且将其注册为 bean，就像其他的`@Controller`类一样，它也包含了处理器方法。

但是这个处理器方法和我们之前所见的有所区别，并非使用的是`@RequestMapping`注解而是`@MessageMapping`注解，这表示`handleShout()`方法能够处理指定目的地上到达的消息。在本例中也就是`/app/marco`，`/app`前缀是隐含的，因为将其配置为了应用的目的地前缀。

因为 handleShout() 方法接收一个 Shout 参数，所以 Spring 的某一个消息转换器会将 STOMP 消息的负载转换为 Shout 对象：
```java
public class Shout {
    private String message ;
    setter
    getter
}
```
因为我们现在处理的并非 HTTP，所以无法使用 Spring 的 HttpMessageConverter 实现将其转换为 Shout 对象，Spring4.0 提供了几个消息转换器，作为其消息 API 的一部分：
消息转换器 | 描述
----- | -----
ByteArrayMessageConverter | 实现 MIME 类型为 application/octet-stream 的消息与 byte[] 之间的转换
MappingJackson2MessageConverter|实现 MIME 类型为 application/json 的消息与 Java 对象之间的转换
StringMessageConverter | 实现 MIME 类型为 text/plain 的消息与 String 之间的转换

假设 handleShout 方法所处理的消息内容类型为`application/json`，`MappingJackson2MessageConverter`会负责将 JSON 消息转换为 Shout 对象。

## 处理订阅

除了`@MessagingMapping`注解以外，Spring 还提供了 `@SubscribeMapping`注解，当收到 STOMP 消息的时候，带有`@SubscribeMapping`注解的方法也会被触发。

重要的是，`@SubscribeMapping`方法也只能处理目的地以`/app`为前缀的消息。

这看上去可能会有些问题，因为应用发出的消息都会经过代理，目的地要以`/topic`或者`/queue`大头，客户端会订阅这些目的地，而不会订阅前缀为`/app`的目的地，如果客户端订阅`/topic`或者`/queue`这样的目的地，那么`@SubscribeMapping`方法也就无法处理这样的订阅了，如果是这样的话，`@SubscribeMapping`注解的用处在哪里呢？

**`@SubscribeMapping`的主要应用场景是实现请求-回应模式。在请求-回应模式中，客户端订阅某一个目的地，然后预期地在这个目的地上获得一个一次性的响应**，如：
```java
@SubscribeMapping({"/marco"})
publicShout handleSubscription(){
    Shout outgoing = new Shout() ;
    outgoing.setMessage("Polo!") ;
    return outgoing;
}
```
在该例中，当处理这个订阅是，handleSubscription() 方法会产生一个输出的 Shout 对象并将其返回。然后，Shout 对象会转换成一条消息，并且会按照客户端订阅时相同的目的地发送回客户端。

如果你觉着这种请求-回应模式与 HTTP 的 GET 请求-响应模式并没有太大的差别的话，那么你基本上是正确的。**不过这里的关键区别在于 HTTP GET 请求是同步的，而订阅的请求-回应模式则是异步的。这样客户端能够在回应可用时再去处理而不必等待。**


## JavaScript 客户端

```js
var url = "http://" + window.location.host + "/stomp/marcopolo" ;
var sock = new SockJS(url) ;

var stomp = Stomp.over(sock) ; //创建 STOMP 客户端
var payload = JSON.stringify({"message":"Marco!"}) ;
stomp.connect("guest","guest",function(frame){
    stomp.send("/marco", {}, payload) ;
})
```