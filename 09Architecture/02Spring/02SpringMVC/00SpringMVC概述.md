# SpringMVC

请求从客户端发起到获取到响应，这中间会经历很多步骤：

1. `DispatcherServlet`。 【大多数基于 Java 的 web 框架都是这样，所有的请求都会通过一个前端控制器】
2. `handler mapping`。前端控制器需要知道将请求转发给哪个具体处理的控制器
3. `Controller` 确定控制器后前端选择器将请求转发给选中的控制器。（实际上控制器本身只处理很少工作，而是将业务逻辑委托给一个或多个服务对象）。控制器处理完成之后通常产生需要显示的信息，通常称为模型(`model`)，但是除此之外还需要具体显示的样式模板——于是控制器将模型数据大包并且并且标识出用于渲染输出的视图名。
4. `view resolver`: 前端控制器使用视图解析器将逻辑视图名匹配为一个特定的视图实现，可能是 `jsp` 也可能不是
5. 视图实现，视图使用模型数据渲染输出，这个输出最终通过响应对象传递给客户端

## 1、基本搭建

### 1.1 配置 DispatcherServlet

web.xml 配置或扩展`AbstractAnnotationConfigDispatcherServletInitializer`(只支持到Servlet3.0)

```java
public class TestMVCConfig extends AbstarctAnnotationConfigDispatcherServletInitializer {
    @Override
    protected String[] getServletMapping(){
        return new String[] {"/"} ;
    }

    @Override
    protected Class<?>[] getRootConfigClasses(){
        return new Class<?>[] { RootConfig.class } ;
    }

    @Override
    protected Class<?>[] getServletConfigClasses(){
        return new Class<?>[] { WebConfig.class } ;
    }
}
```

**两个应用上下文**

当`DispatcherServlet`启动的时候他会创建 Spring 应用上下文。并加载配置文件或配置类中所声明的 bean。如上例，要求`DsipacherServlet`加载上下文时，使用定义在 `WebConfig` 配置类中的`bean`。但是`SpringWeb`中通常还会有另外一个应用上下文，由`ContextLoaderListener`创建。一般希望`DispatcherServlet`加载包含 web 组件的 bean，如控制器、视图解析器、处理器映射等。而`ContextLoaderListener`要加载应用中的其他`bean`。

## 1.2 启用 Spring MVC

多种启用 Spring MVC 组件的方式：

- `<mvc:annotation-driven>`
- `@EnableWebMVC`

```java
import ...;
@Configuration
@EnableWebMVC
public class WebConfig{}
```

这样就可以启用 Spring MVC 了，但是还有一些问题：

- 没有配置视图解析器，这种情况下，Spring 默认使用 `BeanNameView-Resolver`，该视图解析器会查找 ID 与视图名称匹配的 bean，并且查找的 bean 要实现 view 接口。
- 没有启用组件扫描，这样 Spring 只能找到显式声明在配置类中的组件
- 这样配置的情况下，`DispatcherServlet`会映射为应用的默认 servlet，所以他会处理所有的请求，包括对静态资源的请求。

因此需要添加如下：

```java
@Configuration
@EnableWebMVC
@ComponentScan("spitter.web")
public class WebConfig extends WebMvcConfigureAdapter {
    @Bean
    public ViewResolver viewResolver(){ //配置视图解析器
        InternalResourceViewResolver resolver = new InternalResourceViewResolver() ;
        resolver.setPrefix("/WEB-INF/views/") ;
        resolver.setSuffix(".jsp") ;
        resolver.setExposeContextBeanAsAttributes(true);
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigure configure){
        configure.enable() ; //静态资源处理
    }
}
```

`@ComponentScan`扫描`spitter.web`包中的组件，` View Resolver` bean `Internal-ResourceViewResolver`，查找 JSP 文件，在查找时会在视图名称上增加一个特定的后缀和前缀。

扩展了`WebMvcConfigureAdapter`并重写了对应方法，这里会要求`DispatcherServlet`将对静态资源的请求转发到 Servlet 容器中的默认 Servlet 上而非使用 `DispatcherServlet` 本身来处理此类请求。


