# 配置 Spring 支持 AMQP

使用 JMS 时，首先配置了连接工厂，与之类似，使用Spring AMQP 也要配置一个连接工厂。具体来讲是配置一个 RabbitMQ 连接工厂。

## RabbitMQ

一个流行的开源消息代理，实现了 AMQP。Spring AMQP 为 RabbitMQ 提供了支持。包含连接工厂、模板、配置命名空间

使用 xml 配置，建议使用 rabbit 作为首选的命名空间（默认，xmlns），原因在于该配置中更多的是 rabbit 而不是 bean，这样只有少量 bean 元素使用`beans:`前缀，而 rabbit 元素就能避免使用前缀了。

连接工厂：`<connection-factory id="connectionFactory"/>`。默认情况下，连接工厂假设监听`localhost`的 5672 端口，对于开发来讲是合理的默认值，但是对于生产环境我们希望修改这些默认值。
```xml
<connection-factory id="connectionFactory" host="${rabbitmq.host}" port="${rabbitmq.port}" username="" password=""/>
```

### 声明队列、Exchange 以及 binding

在 JMS 中，队列和主题的路由行为都是通过规范建立的，AMQP 与之不同，它的路由更加灵活丰富，依赖于如何定义队列和Exchange将它们绑定在一起，声明队列、Exchange、binding的一种方式是使用 RabbitMQ Channel 的各种方法，但是直接使用该接口非常麻烦，Spring 提供了一种更方便的方式声明消息路由组件。

Spring AMQP 的 rabbit 命名空间中包含了多个元素，用来创建队列、Exchange、以及将它们结合在一起的 binding。
元素 | 作用
:----: | :----:
`<queue>` | 创建队列
`<fanout-exchange>` | fanout 类型的 Exchange
`<header-exchange>` | header 类型
`<topic-exchange>` | topic 类型的 Exchange
`<direct-exchange>` | direct 类型的 Exchange
`<bindings><binging/></bingings>` | 定义一个或多个元素集合，元素创建 Exchange 和队列之间的 binding

这些配置元素要与`<admin>`元素一起使用，`<admin>`元素创建一个 RabbitMQ 管理组件。它会自动创建上面元素所声明的队列、exchange、binding。

如，希望声明名为 spittle.alert.queue 的队列：
```xml
<admin connection-factory="connectionFactory"/>
<queue id="spittleAlertQueue" name="spittle.alerts"/>
```
对于简单的消息来讲，只需要做这些已经足够，因为默认会有一个 direct Exchange，所有队列都会绑定到这个 Exchange 上，并且 routing key 和队列名称相同。这个简单的配置中，我们可以将消息发送到这个没有名称的 Exchange 中，并将 routing key 设置为 spittle.alert.queue ，这样消息就会路由到这个队列中。实际上创建的是点对点模型。

更加有意思的路由需要我们声明一个或者多个 Exchange，并将其绑定到队列上。如想要将消息发送到多个队列上而不管 routing key 是什么：
```xml
<admin connection-factory="connectionFactory"/>
<queue name="spittle.alert.queue.1"/>
<queue name="spittle.alert.queue.2"/>
<fanout-exchange name="spittle.fanout">
    <bindings>
        <binding queue="spittle.alert.queue.1"/>
        <binging queue="spittle.alert.queue.2"/>
    </bindings>
</fanout-exchange>
```