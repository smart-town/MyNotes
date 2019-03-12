# 使用 RabbitTemplate 发送消息

RabbitMQ 连接工厂是创建到 RabbitMQ 的连接，如果希望通过 RabbitMQ 发送消息，那么可以使用 connectionFactory 来创建连接、再创建 Channel，再使用 Channel 发布消息到 Exchange 上。

但是显然比较繁琐，Spring 同样进行了消除样板式代码的处理。即`RabbitMQTemplate`。配置 RabbitTemplate 最简单的方式是 rabbit 命名空间的 template 元素：`<template id="rabbitTemplate" connection-factory="connectionFactory"/>`

## 发送消息

```java
@Autowired
private RabbitTemplate rabbit ;

public void sendSpittleAlert(Spittle spittle){
    rabbit.convertAndSend("spittle.alert.exchange", "spittle.alerts", spittle)
}
```

可以看到调用 convertAndSend 方法，三个参数：Exchange 名称、routing key、要发送的对象。**注意**这里并没有指定消息应该路由到何处、要发送给哪个队列以及期望哪个消费者来获取消息。

`RabbitTemplate`有多个重载的 `convertAndSend()`方法，这些方法可以简化它的使用。如，使用某个重载版本的`convertAndSend()`方法，可以调用时不传入 Exchange 的名称，也可以同时省略 Exchange 和 routing key:
```java
rabbit.convertAndSend("spittle.alerts", spittle) ;

rabbit.convertAndSend(spittle) ;
```
如果在参数列表中省略 Exchange 或者同时省略两者，RabbitTemplate 将会使用默认的 Exchange 名称和 routing key。按照之间的配置，默认的 Exchange 名称为空（默认没有名称的那个 Exchange），默认的 routing key 也是空。但是可以借助`<template>`元素进行配置：
```xml
<template id="rabbitTemplate"
    connection-factory="connectionFactory"
    exchange="spittle.alert.exchange"
    routing-key="spittle.alerts"/>
```

RabbitTemplate 还有其他的方法发送消息，例如我们可以使用较低级别的 send 方法：
```java
Message message  = new Message("Hello".getBytes(), new MessageProperties()) ;
rabbit.send("hello.exchange","hello.routing", message) ;
```
这里的关键在于构造要发送的 Message 对象，在这个例子中，我们通过给定字符串的字节数组来构造 Message 实例，对于 String 值来说这足够了，但是如果消息的负载是复杂对象的话，这就会复杂的多。

鉴于这种情况，有了`convertAndSend()`方法，它会自动将对象转换为 Message，它需要一个消息转换器的帮助来完成任务。默认的消息转换器是`SimpleMessageConverter`，它适用于 String、Serializable 实例以及字节数组。

## 获取消息

```java
Message message = rabbit.receive("spittle.alert.queue") ;
```

可以配置获取消息的默认队列：
```xml
<template id="rabbitTemplate" connection-factory="connectionFactory" exchange="spittle.alert.exchange" routing-key="spittle.alerts" queue="spittle.alert.queue"/>
```
这样就可以直接调用：`Message m = rabbit.receive()`、

在获取到 Message 对象后，可能需要将它的 body 属性中的字节数组转换为想要的对象，就像在发送的时候将领域对象转换为 Message 一样，将接收到的 Message 转换为领域对象同样十分繁琐，因此可以考虑：
`Spittle spittle = (Spittle)rabbit.receiveAndConvert("spittle.alert.queue")`

## 定义消息驱动的 AMQP POJO

1. 创建 POJO 并声明为 bean，如`spittleListener`
2. 配置为消息驱动的 POJO
```xml
<listener-container connection-factory="connectionFactory">
    <listener ref="spittleListener"
        method="handleSpittleAlert"
        queue-name="spittle.alert.queue"/>
</listener-container>
```

这里和 JMS 的配置，区别在于不通过 `destination` 属性来监听队列或主题，而是通过`queue-names`来指定要监听的队列（可以设置多个队列名称以逗号分隔）

另外一种设置监听队列的方法是引用`<queue>`元素所声明的队列`<bean>`，可以通过`queues`属性来进行设置：
```xml
<listener-container>
    <listener ref="spittleListener"
        method=""
        queues="spittleAlertQueue"/>
<listener-container>
```
这需要我们在声明队列时为其指定 ID:`<queue id="spittleAlertQueue" name="spittle.alert.queue">`