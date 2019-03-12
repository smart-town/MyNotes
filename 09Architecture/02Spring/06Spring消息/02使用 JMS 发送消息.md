# 使用 JMS 发送消息

Java 消息服务(Java Message Service)是一个 Java 标准，定义了使用消息代理的通用 API，在 JMS 出现之前，每个消息代理都有私有的 API，这就使得不同代理之间的消息代码很难通用。但是借助 JMS，所有遵从规范的实现都使用通用的接口，这就类似 JDBC 为数据库操作提供了通用的接口一样。

Spring 通过基于模板的抽象为 JMS 提供了支持，即`JmsTemplate`，使用 `JmsTemplate`能够非常容易地在消息生产方发送队列和主题消息。在消费消息的一方，也能够非常容易地接收这些消息。Spring 还提供了消息驱动 POJO 的概念：这是一个简单的 Java 对象，却能够以异步的方式响应队列或者主题上到达的消息。

在发送和接收消息之前，我们首先需要一个消息代理，它能够在消息的生产者和消费者之间传递消息。

## 1. 在 Spring 中搭建消息代理

ActiveMQ 是一个伟大的开源消息代理产品也是使用 JMS 进行异步消息传递的最佳选择。

### 创建连接工厂

我们可以采用不同的方式在 Spring 中使用 JMS 发送和接收消息，不过这些操作都需要借助 JMS 连接工厂通过消息代理发送消息。因为选择了 ActiveMQ 作为我们的消息代理，所以我们必须位置 JMS 连接工厂，让他知道如何连接到 ActiveMQ，`ActiveMQConnectionFactory`是 ActiveMQ 自带的连接工厂：
```xml
<bean id="connectionFactory" class="org.apache.activemq.spring.ActiveMQConnectionFactory"/>
```
默认情况下，`ActiveMQConnectionFactory`会假设`ActiveMQ`监听 localhost 的 61616 端口，对于开发环境没有问题。但是在生产环境中，ActiveMQ 可能会在不同的主机/端口，对于这种情况通过`brokerURL`属性来指定代理的 URL:
```xml
<bean id="connectionFactory" class="..." p:brokerURL="tcp://localhost:61616"/>
```
还可以通过 Spring 配置命名空间来声明连接工厂

### 声明 ActiveMQ 消息目的地

除了连接工厂外，还需要消息传递的目的地。目的地可以是一个队列，也可以是一个主题，这取决于应用的需求。

不论使用的是消息还是主题，我们都必须使用特定的消息代理实现类在 Spring 中配置目的地 bean，例如下面声明一个 ActiveMQ 队列：
```xml
<bean id="queue" class="org.apache.activemq.command.ActiveMQQueue" c:_="spitter.queue"/>
```
同样可以声明主题：`<bean id="topic" class="org.apache.activemq.command.ActiveMQTopic" c:_="spitter.queue"/>`
在第一个示例中，构造器指定了队列的名称，这样消息消息代理就能获知该信息。

同样也可以使用 ActiveMQ 命名空间。

## 2. 使用 Spring 的 JMS 模板

JMS 为 Java 开发者提供了与消息代理进行交互来发送和接收消息的标准 API，而且几乎每个消息代理实现都支持 JMS，因此我们不必因为使用不同的消息代理而学习私有的消息 API。

虽然 JMS 为 所有的消息代理都提供了统一的接口，但是这种接口使用起来并不是很方便，使用 JMS 发送和接收消息并不像拿一张邮票并贴到信封上那么简单，JMS 还要求我们为邮递车加油（比喻）

### 失控的 JMS 代码

正如传统的 JDBC 代码在处理连接、语句、结果集和异常时的冗长、繁琐，传统的 JMS 也是类似的编程模型。由于处理发送或者接受消息样板式代码，我们不得不做很多重复性的工作。不过也正如`JdbcTemplate`处理 JDBC 样板式代码一样，同样的有`JmsTemplate`实现 JMS 样板式代码。

### 使用 JMS 模板

针对消除冗长和重复的 JMS 代码，Spring 给出的解决方案是`JmsTemplate`，其可以创建连接、获得会话、发送和接收消息。这使得我们可以专注于构建要发送的消息或者处理接收到的消息。

此外，`JmsTemplate`可以处理所有抛出的笨拙的`JMSException`异常。如果在使用`JmsTemplate`时抛出`JMSException`，`JsmTemplate`将会捕获该异常，然后抛出一个非检查类型异常。该异常是 Spring 自带的 `JmsException`异常的子类。为了使用`JmsTemplate`，需要声明对应的 bean:
`<bean id="jmsTemplate" class="org.springframework.jms.core.JmsTemplate" c:_-ref="connectionFactory"/>`

## 3.发送消息

假设有一个场景：当创建 Spittle 时提醒其他用户（获取是通过 E-mail），我们可以在增加 Spittle 的地方直接实现该特性，但是搞清楚发送给谁以及实际发送这些提醒时可能需要一些时间，这会影响到应用的性能。当增加一个 Spittle 时，我们希望应用是敏捷的。

与其在增加 Spittle 的时候浪费时间发送这些消息不如对该项工作进行排队，在响应返回给用户之后再处理他。与直接发送消息给其他用户所花费的时间相比，发送给队列或者主题所花费的时间微不足道。

为了在 Spittle 创建的时候异步发送一个 spittle 提醒，引入一个接口：
```java
public interface AlertService {
    void sendSpittleAlert(Spittle spittle) ;
}
```

具体实现：
```java
public class AlertServiceImpl implements AlertService {
    private JmsOperations jmsOperations;
    @Autowired
    public AlertServiceImpl(JmsOperations jmsOperations){
        this.jmsOperations = jmsOperations; 
    }
    public void sendSpittleAlert(final Spittle spittle){
        jmsOperations.send(
            "spittle.alert.queue", //指定目的地
            new MessageCreator(){
            public Message createMessage(Session session) throws JMSException{
                return session.createObjectMessage(spittle) ; //创建消息
            }
        );
    }
}
```
`JmsOperations`的 send() 方法的第一个参数是 JMS 目的地名称，标识将消息发送到何处。当调用 send() 时，`JmsTemplate`将负责获得 Jms 连接，会话并代表发送者发送消息。

这里使用`MessageCreator`（这里的实现是作为一个匿名内部类）来构造消息。

### 设置默认目的地

上面的代码中明确指定了一个目的地，不过在通常的场景下，我们可能总是将各消息发送到同一个目的地，与其每次发送消息时都指定一个目的地，不如配置一个默认的目的地：
```xml
<bean id="jmsTemplate" class="org.springframework.jms.core.JmsTemplate" c:-ref="connectoryFactory" p:defaultDestinationName="spittle.alert.queue"/>
```

此时发送消息时就可以去除第一个参数了：
```java
jmsOperations.send(new MessageCreator(){...})
```
这种形式的 send() 方法只需要传入一个`MessageCreator`。

发送消息时不再显式指定目的地能够让任务得以简化，但是如果使用消息转换器的话，发送消息会更为简单：

### 发送消息时对消息进行转换

除了 send() 方法外，`JmsTemplate`还提供了`convertAndSend`方法，与 send() 方法不同，`convertAndSend()`不需要`MessageCreator`作为参数，这是因为`convertAndSend()`会使用内置的消息转换器(message converter)为我们创建消息。
`jsmOperations.convertAndSend(spittle)`

spittle 在发送之前会被转换为 Message，JmsTemplate 会在内部进行一些处理，它使用一个`MessageConverter`的实现类将对象转换为`Message`

`MessageConverter`是 Spring 定义的接口。有两个需要实现的方法，通常我们没有必要创建自定义的实现，Spring 已经提供了多个实现。默认情况下，JmsTemplate 在 convertAndSend() 方法中会使用`SimpleMessageConverter`，但是通过将消息转换器声明为 bean 并将其注入到 JmsTemplate 的 messageConverter 属性中可以重写这种行为：
```xml
<bean id="messageConverter" class="org.springframework.jms.support.converter.MappingJacksonMessageConverter"/>

<bean id="jmsTemplate"
    class="org..."
    c:_-ref="connectionFactory"
    p:defaultDesitnationName="spittle.alert.queue"
    p:messageConverter-ref="messageConverter"/>
```

## 4.接收消息

只需调用`JmsTemplate`的`receive()`方法即可。当调用`JmsTemplate`的`receive()`方法时，`JmsTemplate`会尝试从消息代理中获取一个消息，如果没有可用的消息，`receive()`方法会一直等待，直到获得消息为止：
```java
public Spittle receiveSpittleAlert(){
    try {
        ObjectMessage receive = (ObjectMessage)jmsOperations.receive() ;
        return (Spittle)receive.getObject() ;
    } catch(JMSException jms){
        throw JmsUtils.convertJmsAccessException(jmsException) ;
    }
}
```

在 receiveSpittleAlert() 方法中可以改善的一点就是使用消息转换器，在`convertAndSend()`方法中，已经看到如何将对象转换为 Message，也可以用在接收端：
```java
return (Spittle)jmsOperations.receiveAndConvert();
```
