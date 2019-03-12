# 创建消息驱动的 POJO

调用 receive() 方法时，`JmsTemplate`会查看队列或主题中是否有消息，直到收到消息或者等待超时才会返回。这期间，应用无法处理任何事情，只能等待是否有消息，如果应用能够继续进行其他业务处理，当消息到达时再去通知不是更好吗

EJB2 规范的一个重要内容就是引入了**消息驱动 bean**(message-driven bean,MDB)。MDB 是可以异步处理消息的 EJB，换句话说，MDB 将 JMS 目的地中的消息作为事件，并对这些事件进行响应。而与之相反的是，同步消息接受者在消息可用前一直处于阻塞状态。

MDB 是 EJB 中的一个亮点，EJB2 MDB 唯一缺点是必须实现 java.ejb.MessageDriven-Bean，此外，它们还必须实现一些 EJB 生命周期的回调方法，简而言之，EJB2 MDB 不是纯的 POJO。在 EJB3 中，MDB 进一步简化，使其更像 POJO，只要实现 java.jms.MessageListener 接口，并使用`@MessageDriven`注解标注 EJB 即可。

Spring2.0 提供了自己的消息驱动 bean 来满足异步接收消息的需求，与 EJB3 很是相似。

## 创建消息监听器

Spring 提供了以 POJO 的方式处理消息的能力，这些消息来自 JMS 的队列或者主题中。为 POJO 赋予消息接收能力的做法就是在 Spring 中将他们配置为消息监听器，Spring 的 jms 命名空间为我们提供了所需要的：
```xml
<bean id="spittleHandler" class="com.test.SpittleAlertHandler"/>
<jms:listener-container connection-factory="connectionFactory">
    <jms:listener destination="spitter.alert.queue" ref="spittleHandler" method="handleSpittleAlert"/>
</jms:listener-container>
```
在这里，我们在消息监听容器中包含了一个消息监听器，**消息监听容器**是一个特殊的 bean，它可以监控 JMS 目的地并等待消息到达，一旦有消息到达。它会取出消息，然后将消息传递给任意一个对此消息感兴趣的消息监听器。

为了配置消息监听容器和消息监听器，使用 jms 命名空间的两个元素：`<jms:listener-container>`和`<jms:listener>`。这里的`<connection-factory>`属性配置了对`connectionFactory`的引用，容器的每个`<jms:listener>`都使用这个连接工厂进行消息监听，在以上示例中，`connection-factory`属性可以移除，因为该属性的默认值就是`connectionFactory`。

对于`<jms:listener>`元素，它用于标识一个 bean 和一个可以处理消息的方法。为了处理 Spittle 提醒消息，ref 属性引用了 spittleHandler bean。当消息到达`spitter.alert.queue`时，spittleHandler bean 的 handleSpittleAlert() 方法会被触发。

**另外**，如果 ref 所标识的 bean 实现了`MessageListener`，就没有必要指定`method`属性了，默认调用`onMessage()`方法。
