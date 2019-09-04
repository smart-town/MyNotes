# 使用 Spring 的 HttpInvoker

Spring 团队意识到 RMI 服务和基于 HTTP 的服务（如 Hessian）之间的空白。一方面，RMI 使用标准的 Java 对象序列化机制，但是很难穿透网络防火墙。另一方面，Hessian 和 Burlap 能够很好地穿透防火墙，但是使用的是私有的对象序列化机制。

就这样，Spring 的 HttpInvoker 应运而生，HTTP invoker 是一个新的远程调用模型，作为 Spring 框架的一部分，能够执行基于 HTTP 的远程调用（让防火墙不为难），并使用 Java 序列化机制。

## 将 bean 导出为 HTTP 服务

## 配置映射`DispatcherServlet`

## 配置 URL 处理器

## 通过 HTTP 访问服务