# 渲染 web 视图

## 1、关于视图解析

控制器中的方法将一些数据填充到模型中，然后将模型传递给一个用来渲染的的视图。并返回一个 String 类型的值，其是视图的逻辑名称。

将控制器中请求处理的逻辑和视图中的渲染实现解耦是 Spring MVC 的一个重要特性。如果控制器中的方法直接负责产生 HTML 的话，就很难直接在不影响请求处理逻辑的前提下维护和更新视图。控制器方法和视图的实现会在模型内容上达成一致，这是两者最大的关联，除此之外两者应该保持足够的距离。

视图解析器选择具体的视图来渲染数据模型。

SpringMVC 定义了一个`ViewResolver`接口，大致如下：
```java
public interface ViewResolver {
    View resolveViewName(String viewName, Locale locale) throws Exception ;
}
```
当给`resolveViewName`方法传入一个视图名和`Locale`对象时，它会返回一个`View`实例，`View`是另外一个接口：
```java
public interface View{
    String getContentType() ;
    void render(Map<String, ?> model, HttpServletRequest request, HttpServletResponse response) throws Exception;
}
```

`View`接口的任务就是接受模型以及`Servlet`的`request`和`response`对象，并将结果渲染到`response`中。看起来我们只需要编写 ViewResolver 和 View 实现就可以了，不过并不需要。只是在有些特定的情况下是有必要的。一般来讲并不关心这些接口，Spring 提供了多个内置实现，13 个：

视图解析器 | 描述
------ | ------
`BeanNameViewResolver` | 将视图解析为 Spring 上下文中的 bean，其中 bean 的 ID 和视图的名字相同
`InternalResourceViewResolver` | 将视图解析为 web 应用的内部资源。一般为 jsp
`ResourceBundleViewResolver` | 将视图解析为资源 bundle
...... | ......

## 2、创建 JSP 视图

Spring 提供了两种支持 JSP 视图的方式：
- `InternalResourceViewResolver` 会将视图名解析为 JSP 文件。另外，如果在 jsp 页面中使用了 JSP 标准标签库，`InternalResourceViewResolver`能够将视图名解析为`JstlView`形式的 JSP 文件，从而将 JSTL 本地化和资源 bundle 变量暴露给 JSTL 的格式化和信息标签
- Spring 提供了两个 JSP 标签库，一个用于表单到模型的绑定，另一个提供了通用的工具类特性。

无论使用 JSTL 还是 Spring 的 JSP 标签库，配置解析 JSP 的视图解析器都是非常重要的。

### 2.1 配置适用于 JSP 的视图解析器

`InternalResourceViewResolver` 遵循一种约定，会在视图名上添加前缀和后缀，进而确定一个 web 应用中视图资源的物理路径。

考虑简单的一个例子，假设逻辑视图名为`home`，通用的实践是将 JSP 文件放到 WEB-INF 目录下，防止对他的直接访问。如果我们将所有 JSP 文件都放在 "/WEB-INF/views/" 目录下，并且 home 的 JSP 名为 home.jsp，那么就可以确定物理视图的路径：`/WEB-INF/views/home.jsp`。

【使用 bean 注解配置】

```java
@Bean
public ViewResolver viewResolver(){
    InternalResourceViewResolver resolver = new InternalResourceViewResolver() ;
    resolver.setPrefix("/WEB-INF/views") ;
    resolver.setSuffix(".jsp") ;
    return resolver;
}
```

【使用 xml 配置】

```xml
<bean id="viewResolver" class="com.springframework.web.servlet.view.InternalResourceViewResolver" 
    p:prefix:"/WEB-INF/views"
    p:suffix:".jsp"/>
```

#### 解析 JSTL 视图

到目前为止，对`InternalResourceViewResolver`的配置都很基础，它最终会将视图逻辑名称解析为`InternalResourceView`实例，这个实例会引用 JSP 文件，但是如果这些 JSP 使用 JSTL 标签来处理格式化和信息的话，那么会希望`InternalResourceViewResolver`将视图解析为`JstlView`。JSTL 的格式化需要一个`Locale`对象，以便于当地格式化域相关值。如果要让`InternalResourceViewResolver`将视图解析为 JstlView 而非 InternalResourceView，只需要设置`viewClass`属性即可：

```java
@Bean
public ViewResolver viewResolver(){
    InternalResourceViewResolver resolver = new InternalResourceViewResolver() ;
    resolver.setPrefix("/WEB-INF/views") ;
    resolver.setSuffix(".jsp") ;
    resolver.setViewClass(org.springframework.web.servlet.view.JstlView.class) ;
    return resolver;
}
```

#### 使用 Spring 的 JSP 库

当为 JSP 添加功能时，标签库是一种十分强大的方式，能够避免在脚本块中直接编写 java 代码，Spring 提供了两个 JSP 标签库，用来帮助定义 SpringMVC web 视图。其中的一个标签库会用来渲染 HTML 表单标签，这些标签可以绑定 model 中的某个属性，另外一个标签库包含了一些工具类标签。

【将表单绑定到模型上】

Spring 的表单绑定 JSP 标签库包含 14 个标签，它们中的大多数都用来渲染 HTML 中的表单标签，但是它们与原生的 HTML 标签区别在于它们会绑定模型中的一个对象，能够根据模型中的对象的属性填充值，标签库最终还包含了一个为用户展现错误的标签，它会将错误信息渲染到最终的 HTML 页面中。

声明：`<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>`

这里将前缀指定为`sf`。`<sf:checkbox>, <sf:errors>, <sf:form>, <sf:hidden>, <sf:input>......`

### 使用 Apache Tiles 视图定义布局

假设要为应用中的所有页面定义一个通用的头部和底部，最原始的方式就是查找每个 JSP 模板，并为其添加头部和底部的 HTML，但是这种方法的扩展性不好，也难以维护，为每个页面添加这些元素会有一些初始成本，而后续的每次变更都会耗费类似的成本。

更好的方式是使用布局引擎，如 Apache Tiles ，定义适用于所有页面的通用页面布局。

#### 配置 Tiles 视图解析器

```java
@Bean
public TileConfigurer tilesConfigurer(){
    TilesConfigurer tiles = new TilesConfigurer() ;
    tiles.setDefinitions(new String[]{"/WEB-INF/layout/tiles.xml"}) ;
}
```

配置 TileConfigurer 最重要的设置就是 definitions，这个属性接受一个 String 类型数组，其中每个条目都指定一个 Tile 定义的 XML 文件。

**【定义 Tile】**

给定 DTD 路径。在 xml 中指定 Tile 的定义，每个定义中需要包含一个`<definition>`元素，该元素会有一个或多个`<put-attribute>`元素，如：

```xml
<?xml version="1.0" encoding="utf-8">
<!DOCTYPE tiles-definitions PUBLIC ...>
<tiles-definitions>
    <definition name="base" template="/WEB-INF/layout/page.jsp">
        <put-attribute name="header" value="/WEB-INF/layout/header.jsp"/>
        <put-attribute name="footer" value="/WEB-INF/layout/foot.jsp"/>
    </definition>

    <definition name="home" extends="base">
        <put-attribute name="body" value="/WEB-INF/views/home.jsp"/>
    </definition>
</tiles-definitions>
```

每个 `definition` 元素都定义了一个`Tile`，它最终引用的是一个 JSP 模板。在名为 `base`的`Tile`中，模板引用的是`page.jsp`。某个 Tile 可能还会引用其他的 JSP 模板是这些 JSP 模板嵌入到主模板中。对于 base Tile 来说，它引用了一个头部和底部 JSP 模板。

### 使用 Thymeleaf

尽管 JSP 已经存在相当长的时间，并且在 web 服务器中无处不在，但是其最明显的缺陷在于它并不是实际的 HTML，大多数的 JSP 模板都是采用 HTML 形式，但是由掺杂了各种标签库标签，使其变得很混乱。这些标签库能够以便利的方式为 JSP 带来动态渲染的强大功能，但是也摧毁了我们想维持一个格式良好的文档的可能性。

标签库和 JSP 缺乏一个良好的格式的一个副作用就是它很少能够与其产生的 HTML 相似，所以在 web 浏览器中查看未经渲染的 jsp 模板是令人困惑的，而且得到的结果也十分丑陋。因为 JSP 不是真正的 HTML。同时，JSP 规范是和 Servlet 规范紧密耦合的，这意味着它只能用在 Servlet 的 web 应用之中，jsp 模板不能作为通用的模板，也不能用于非 Servlet 的 web 应用。

Thymeleaf 给定了一些切实的承诺，它是原生的，不依赖于标签库，它能在接受原始 HTML 的地方进行渲染和编辑，因为它没有与 Servlet 规范耦合，因此它可以进入 JSP 无法涉足的领域。

#### 配置 Thymeleaf 解析器

- ThymeleafViewResolver:  将逻辑视图名解析为 Thymeleaf 模板视图
- SpringTemplateEngine: 处理模板并渲染视图
- TemplateResolver： 加载 Thymeleaf 模板

[参考](https://blog.csdn.net/u014572215/article/details/78833095)

涉及到`${}`表达式和`*{}`表达式，前者是变量表达式，一般来讲，它们是对象图导航语言表达式，但是在 Spring 中，它们是 SpEL 表达式如`${spiter}`会解析为`key`为`spitter`的 model 属性。而后者是选择表达式，选择表达式基于某个选中的对象进行计算。如选中对象`th:object`选择后，`*{firstName}`就会计算为所选中的对象的属性。



