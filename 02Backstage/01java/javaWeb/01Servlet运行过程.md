# Servlet 

Servlet 是一门用于开发动态 Web 资源的技术

Sun 公司在其 API 中提供了一个 servlet 接口，如果要开发动态 web 资源需要：
- 编写一个实现 Servlet 接口的 Java 类
- 将开发好的 Java 类部署到 web 服务器中

## 运行过程

Servlet 由 WEB 服务器调用，web 服务器收到客户端的 Servlet 访问请求后：
1. Web 服务器首先检查是否已经装载并创建了该 Servlet 的实例对象，如果是则直接执行第 4 步，否则第 2 步
2. 装载并创建该 Servlet 的一个实例对象
3. 调用 Servlet 实例对象的 init() 方法
4. 创建一个用于封装 HTTP 请求消息的 HttpServletRequest 对象和一个代表 HTTP 响应消息的 HttpServletResponse 对象，然后调用 Servlet  的 service() 方法，并将请求和响应对象作为参数传递进去。
5. WEB 应用程序被停止或者重新启动之前，Servlet 引擎将卸载 Servlet ，并在卸载前调用 Servlet 的 destroy() 方法

## Servlet 接口实现类

Sun 公司默认定义了两个 Servlet 的实现类：`GenericServlet`和`HttpServlet`

`HttpServlet`指的是能够处理 HTTP 请求的 servlet，它在原有的 Servlet 接口上添加了一些与 HTTP 协议处理相关的方法，它比 Servlet 接口的功能更为强大，因此开发人员在编写 Servlet 时通常应该继承这个类，而避免直接去实现 Servlet 接口。

HttpServlet 在实现 Servlet 接口时，覆写了 service 方法，该方法体内的代码会自动判断用户的请求方式，如 GET 请求则调用 HttpServlet 的 doGet 方法。POST 请求则调用 doPost 方法。