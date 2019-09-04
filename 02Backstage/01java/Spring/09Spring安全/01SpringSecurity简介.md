# 简介

`Spring Security`是为基于 Spring 的应用程序提供声明式安全保护的安全性框架。Spring Security 提供乐完整的安全性解决方案，它能够在 Web 请求级别和方法调用级别处理身份认证和授权。因为基于 Spring 框架，所以 Spring Security 充分利用了依赖注入和面向切面的技术。

Spring Security 从两个角度来解决安全问题，使用 Servlet 规范中的 Filter 保护 Web 请求并限制 URL 级别的访问，Spring Security 还能使用 Spring 的 AOP 保护方法调用——借助于对象代理和使用通知，能够确保只有具备适当权限的用户才能访问安全保护的方法。

## 理解 Spring Security 模块

无论使用 Spring Security 保护哪种类型的应用程序，第一件需要做的事情就是将 Spring Security 模块添加到应用程序的类路径下。Spring Security3.2 分为 11 个模块：
模块 | 描述
----- | -----
ACL | 支持通过访问控制列表为域对象提供安全性
Aspects | 一个很小的模块，当使用 Spring Security 注解时，会使用基于 AspectJ 的切面，而不是使用标准的 Spring AOP
CAS 客户端 | 提供与 Jasig 的中心认证服务进行集成的功能
配置　 | 包含通过　XML 和　Java 配置的功能支持
核心　｜　提供　Spring Security 基本库
加密　｜　提供了加密和密码编码的功能
LDAP ｜　支持基于　LDAP 进行认证
OpenID | 支持使用　OpenId 进行集中式认证
Remoting | 提供了对　Spring Remoting 的支持
标签库　｜　Spring　Security 的 JSP 标签库
Web | 提供了基于 Filter 的 Web 安全性支持

## 过滤 web 请求

Spring Security 借助一系列 Servlet Filter 来提供各种安全性功能。这并不意味着我们要在 web.xml 或者 WebApplicationIntializer 中配置多个 Filter，实际上借助于 Spring 的技巧，只需要配置一个 Filter 就可以了。

`DelegatingFilterProxy`是一个特殊的 Servlet Filter，它本身做的工作并不多，只是将工作委托给一个 javax.servlet.Filter 实现类，这个实现类作为一个 `<bean>` 注册在 Spring 应用的上下文中。如果使用传统的 xml 配置方式：
```xml
<filter>
    <filter-name>springSecurityFilterChain</filter-name>
    <filter-class>
        org.springframework.web.filter.DelegatingFilterProxy
    </filter-class>
</filter>
```

在这里最重要的是`<filter-name>`设置成了 springSecurityFilterChain，这是因为我们要将 Spring Security 配置在 web 的安全性中，这里会有一个名为 springSecurityFilterChain 的 Filter bean，DelegatingFilterProxy 会将过滤逻辑委托给它。

如果希望借助 WebApplicationInitializer 以 Java 方式配置，则需要做的就是扩展一个新类：
```java
public class SecurityWebInitializer extends AbstractSecurityWebApplicationInitializer {}
```
该抽象类实现了 WebApplicationInitializer 因此 Spring 会发现它，并用它在 Web 容器中注册 DelegatingFilterProxy，尽管我们可以重载它的 addFilters 或者 insertFilters 方法来注册自己选择的 Filter，但是要注册 DelegatingFilterProxy 的话我们并不需要重载任何方法

不管我们通过何种方式注册了`DelegatingFilterProxy`，他都会拦截发往应用中的请求，并将请求委托给 ID 为 springSecurityFilterChain bean。

springSecurityFilterChain 本身一个特殊的 Filter，它也被称为 FilterChainProxy，它可以链接任意一个或者多个其他的 Filter，Spring Security 依赖一系列 Servlet Filter 来提供不同的 安全特性，但是你几乎不需要知道这些细节，因为不需要显式声明 SpringSecurityFilterChain 以及它所链接在一起的其他 Filter。当我们启用 Web 安全特性的时候，会自动的创建这些 Filter。

