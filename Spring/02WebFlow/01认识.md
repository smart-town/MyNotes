# Spring Web Flow

有些情况下，web 应用程序需要控制用户方向，引导他们一步步访问应用。

Spring Web Flow 是 Spring MVC 的扩展，它支持开发基于流程的应用程序，**它将流程的定义和实现流程的行为的类和视图分离开来**。

## 配置 Web Flow

当前只支持在 xml 中进行配置。所以首先要声明命名空间。

### 装配流程执行器

`<flow:flow-executor id="flowExecutor"/>` 流程执行器负责驱动流程的执行。当用户进入一个流程时，流程执行器会为用户创建并启动一个流程执行实例。尽管它负责创建和执行，但是其并不负责加载流程的定义。

### 配置流程注册表

```xml
<flow:flow-registry id="flowRegistry" base-path="/WEB-INF/flows">
    <flow:flow-location-pattern value="*-flow.xml"/>
</flow:flow-registry>
```
该声明中流程注册表会在`base-path`下查找流程定义，任何文件名以`-flow.xml`结尾的 XML 文件都将视为流程定义。所有的流程都是通过其 ID 引用的。这里使用了`flow-location-pattern`元素，流程的 ID 就是相对于 base-path 的路径，如`/WEB-INF/flows/order/order-flow.xml`该流程的 ID 就是`order`

【另一种方式】可以去除`base-path`属性而显式声明流程文件位置

```xml
<flow:flow-registry id="flowRegistry">
    <flow:flow-location path="/WEB-INF/flows/order/springpizza.xml"/>
</flow:flow-registry>
```
此时流程 ID 为流程定义的文件名，即`springpizza`。

也可以显式声明：`<flow:flow-location id="pizza" path="..."/>`

### 处理流程请求

`DispatcherServlet`一般将请求分发给控制器，但是对于流程而言，我们需要一个`FlowHandlerMapping`来帮助`DispatcherServlet`将请求发送给 Spring Web Flow。
```xml
<bean class="org.springframework.webflow.mvc.servlet.FlowHandlerMapping">
    <property name="flowRegistry" ref="flowRegistry"/>
</bean>
```
可以看到`FlowHandlerMapping`装配了流程注册表的引用，这样它就能知道如何将请求的 URL 匹配到流程上。

然而，`FlowHandlerMapping`仅仅是将流程请求重定向到 Spring Web Flow 中，响应请求的是`FlowHandlerAdapter`。等同于 Spring 的控制器，它会响应发送的流程请求并对其进行处理。

```xml
<bean class="org.springframework.webflow.mvc.servlet.FlowHandlerAdapter">
    <property name="flowExecutor" ref="flowExecutor"/>
</bean>
```
它会处理流程请求并管理基于这些请求的流程。

## 流程组件

Spring Web Flow 中，流程由三个主要元素定义：**状态、转移、流程数据**。状态就是流程事件发生的地点，转移就是连接这些地点的公路，流程当前的状况是流程数据。

**五种状态**:

| 状态类型 | 描述 |
| ------ | ------- |
|行为 Action | 行为是流程逻辑发生的地方 |
|决策 Decision | 决策状态将流程分为两个方向，它会基于流程数据的评估结果确定流程方向 |
|结束 End | 结束状态是流程的最后一站，一旦进入 End 流程就会终止 |
子流程 Subflow | 子流程会在当前正在运行的流程上下文中启动一个新的流程
视图 View | 视图状态会暂停流程并邀请用户参与流程

### 视图状态

视图状态用于为用户展现信息并使用户在流程中发挥作用，实际的视图实现可以是 Spring 支持的任意视图类型。但是通常是用 JSP 来实现的。

`<view-state id="welcome"/>`用于定义视图状态。该实例中，id 属性有两个含义，它在流程内标识这个状态，除此之外，它也制定了流程到达这个状态时要展现的逻辑视图名。也可以显式指定。`<view-state id="welcome" view="greeting"/>`。如果流程为用户展现了一个表单，你可能希望指明表单所绑定的对象：`<view-state id="takePayment" model="flowScope.paymentDetails"/>`

### 行为状态

视图状态涉及到流程应用程序中的用户，而行为状态则是应用程序自身在执行任务。行为状态一般会触发 Spring 所管理的 bean 的一些方法并根据方法调用的执行结果转移到另一个状态。使用`<action-state>`元素声明

```xml
<action-state id="saveOrder">
    <evaluate expression="pizzaFlowAction.saveOrder(order)"/>
    <transition to="thankYou" />
</action-state>
```
尽管不是严格需要的，但是`<action-state>`元素一般都会有一个`<evaluate>`作为子元素，`<evaluate>`给出了行为状态要做的事情。

### 决策状态

有可能流程完全线性执行，从一个状态进入另一个状态，没有其他的替代路线，但是更常见的情况是流程在某一个点根据流程的当前情况进入不同的分支。

决策状态能够在流程执行时产生两个分支，决策状态将评估一个 Boolean 类型表达式，然后在两个状态转移中选择一个。

```xml
<decision-state id="checkDeliveryArea">
    <if test="pizzaFlowActions.checkDeliveryArea(customer.zipCode)"
        then="addCustomer"

    />
</decision-state>
```

## 转移

转移连接了流程中的状态，流程中除了结束状态之外的每个状态，至少都需要一个转移，这样就能知道一旦这个状态完成时流程要去向哪里。状态可以有多个转移，分别对应于当前状态结束时可以执行的不同路径。

转移使用`<transition>`元素定义，它会作为各种状态元素的子元素。

【全局转移】`<global-transition>`

## 流程数据

当流程从一个状态到另一个状态时，它会带走一些数据，有时候，这些数据只需要很短的时间（只要展现页面给用户），但有时候又可能会在整个流程传递过程中使用。

【声明变量】

`<var>`是最简单的创建方式`<var name="customer" class="com.springinaction.pizza.domain.Customer"/>`

`<set>`元素可以设置变量的值

`<evaluate>`元素创建一个视图作用域的变量。

