# 使用基于消息的 RPC

为了支持基于消息的 RPC，Spring 提供了`JmsInvokerServiceExporter`和`JmsInvokerProxyFactoryBean`。分别用来导出基于消息的服务和使用服务。

## 导出为服务

1. 要导出的接口以及对应的实现(Component)
2. 导出
```xml
<bean id="alertServiceExporter" class="org.springframework.jms.remoting.JmsInvokerServiceExporter"
    p:service-ref="alertService" p:serviceInterface="com.habuma.spitter.alerts.AlertService"/>
```
3. 描述细节
```xml
<jms:listener-container connection-factory="connectionFactory">
    <jms:listener destination="spitter.alert.queue" ref="alertServiceExporter"/>
</jms:listener>
```

## 使用基于 JMS 的服务

```xml
<bean id="alertService"
    class="org.springframework.jms.remoting.JmsInvokerProxyFactoryBean"
    p:connectionFactory-ref="connectionFactory"
    p:queueName="spittle.alert.queue"
    propp:serviceInterface="com.habuma.spitter.alerts.AlertService"/>
```

