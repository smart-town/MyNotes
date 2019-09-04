# STOMP 发送消息到客户端

WebSocket 通常视为服务器发送数据给浏览器的一种方式，采用这种方式所发送的数据不必位于HTTP请求的响应中。

Spring 提供了两种发送数据给客户端的方法：
- 作为处理消息或处理订阅的附带结果
- 使用消息模板

## 作为处理消息或订阅的附带结果

### 处理消息之后发送消息

```java
@MessageMapping("/marco")
public Shout handleShout(Shout incoming){
	Shout outgoing = new Shout() ;
	outgoing.setMessage("polo") ;
	return outgoing;
}
```

当`@MessageMapping`所标注的方法有返回值时，返回的对象会进行转换（通过消息转换器）并放入到 STOMP 帧的负载中，然后发送给消息代理。

默认情况下，帧所发往的目的地会与触发处理器方法的目的地相同，不过会添加上`/topic`前缀，就该例而言，意味着返回的 Shout 对象会写入到 STOMP 帧的负载中，并发布到`/topic/marco`目的地。

### 重载目的地

可以通过为方法添加`@SendTo`注解重载目的地
```java
@MessageMapping("/marco")
@SendTo("topic/shout") 
public Shout shoutHandle(Shout shout){...}
```

按照这个`@SendTo`注解，消息将会发布到`/topic/shout`所有订阅该主题的应用都会收到这条消息。

按照类似的方式，`@SubscribeMapping`注解也可以发送消息，作为订阅的回应。不过`@SubscribeMapping`的区别在于消息会直接返回给客户端，而不必经过消息代理，但是如果增加`@SendTo`的时候，那么消息会发送到指定目的地，会经过代理。

## 在应用的任意地方发送消息

`@MessageMapping`和`@SubscribeMapping`提供了一种简单的方式来发送消息，这是接收消息或者处理订阅的附带结果，不过，Spring 的`SimpMessagingTemplate`能够在应用的任意地方发送消息甚至不必以首先接收一条消息作为前提。

使用`SimpMessagingTemplate`最简单的方式就是将它（或者其接口`SimMessageSendingOperations`）自动装配到所需对象中。

假设对于某个网站首页来说，如果要实现用户不必重新刷新页面，就能看到实时更新的最新动态。

首先在网页中添加如下的代码：
```js
<script>
	var sock = new SockJS("spitter") ;
	var stomp = Stomp.over(sock) ;

	stomp.connect("guest","guest",function(frame){
		console.log("Connected!") ;
		stomp.subscribe("/topic/spittlefeed", handleSpittle) ;
	})

	function handleSpittle(incoming){
		var spittle = JSON.parse(incoming.body) ;
		console.log("Received:",spittle) ;
		//更新操作
	}
</script>
```

连接到 STOMP 代理后，订阅了`/topic/spittlefeed`，并指定当消息到达时，由`handleSpittle`函数进行更新。

在服务端，可以使用`SimpMessagingTemplate`将所有新创建的 Spittle 以消息的形式发布到`/topic/spittlefeed`主题上。
```java
@Service
public class SpittleFeedServiceImpl implements SpittleFeedService {
	@Autowired
	private SimpMessageSendingOperations messaging;

	public void broadcastSpittle(Spittle spittle){
		messaging.convertAndSend("/topic/spittlefeed", spittle) ;
	}
}
```
配置 Spring 支持 STOMP 的一个作用就是在 Spring 应用上下文中已经包含了 SimpMessagingTemplate，因此没有必要再创建新的实例。

发送 Spittle 消息的地方在 boradcastSpittle() 方法中，它在注入的 `SimpMessageSendingOperations`上调用了 convertAndSend 方法，将 Spittle 转换为消息，并将其发送到`/topic/spittlefeed`主题上。该方法模拟了 JsmTemplate 和 RabbitTemplate 所提供的同名方法

不管我们通过 convertAndSend() 方法还是通过处理器方法的结果，在发布消息给 STOMP 主题的时候，所有订阅该主题的客户端都会收到消息，在这个场景下，我们希望所有的客户端都能及时看到实时的信息。但是有时候，我们希望发送消息给指定的用户，而不是所有的客户端。