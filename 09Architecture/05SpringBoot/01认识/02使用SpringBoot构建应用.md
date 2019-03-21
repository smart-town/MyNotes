# 使用 SpringBoot 构建应用

以下部分，是一个使用 SpringBoot 构建完整的应用程序。

我们的应用程序是一个简单的联系人列表，它允许用户输入联系人信息（名字、电话号码以及 Email地址），并且能够列出用户之前输入的所有联系人信息。

可以自由使用 Gradle 或者 Maven 来构建应用程序。

## Contacts 应用所需的构建文件：
```gradle
buildscript {
    repositories{
        mavenLocal()
    }

    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:1.1.4.RELEASE")
    }
}

apply plugin: "java"
apply plugin: "spring-boot" //使用 springboot 插件

jar { //构建 jar 文件
    baseName = "contacts"
    version = "0.1.0"
}

repositories {
    mavenCentral()
}

dependencies {} //这里放入依赖
task wrapper(type: Wrapper){
    gradleVersion = "1.8"
}
```

根据 gradle 项目的标准结构，完成后的项目将会是这样：
```shell
$ tree
.
|--build.gradle
|--pom.xml
|--src
    |--main
    |    |--java
    |        |--contacts
    |            |--Application.java
    |            |--Contact.java
    |            |--ContactController.java
    |            |--ContactRepository.java
    |----|--resources
                |--schema.sql
                |--static
                |    |--style.css
                |--templates
                    |--home.html   
```

## 处理请求

由于要使用 Spring MVC 来开发应用的 Web 层，因此需要将 Spring MVC 作为依赖添加到构建中。Spring Boot 的 Web Starter 能够将 Spring MVC 需要的所有内容一站式添加到构建中，如下是我们需要的 gradle 依赖：
`compile("org.springframework.boot:spring-boot-starter-web")`

Web Starter 依赖就绪后， Spring MVC 的所需要的依赖都会添加到项目中。现在就可以编写所需要的控制器类：
```java
@Controller
@RequestMapping("/")
public class ContactController {
    private ContactRepository contactRepo ;
    @Autowired
    public ContactController(ContactRepository contactRepo){
        this.contactRepo = contactRepo ;
    }
    @RequestMapping(method=RequestMethod.GET)
    public String home(Map<String,Object> model){
        List<Contact> contacts = contactRepo.findAll() ;
        model.put("contacts",contacts) ;
        return "home";
    }
    @RequestMapping(method=RequestMethod.POST)
    public String submit(Contact contact){
        contactRepo.save(contact) ;
        return "redirect:/" ;
    }
}
```

你首先可能会发现 ContactController 就是一个典型的 Spring MVC 控制器。尽管 Spring Boot 会管理构建依赖并最小化 Spring 配置，但是在编写应用逻辑的时候，编程模型是一致的。

在本例中，ContactController 遵循了 SpringMVC 控制器的典型模式。

这里的 Contact 模型类是一个 POJO，具有一些属性和存取方法。

## 创建视图

按照传统的方式，Java Web 应用会使用 JSP 作为视图层的技术。但是正如之前所述，这一领域有一个新的参与者，Thymeleaf 的原生末班比 JSP 更加便于使用。而且它能够让我们以 HTML 形式编写模板。鉴于此，这里使用 Thymeleaf 定义视图。

首先需要将 Thymeleaf 添加到项目构建中：`compile("org.thymeleaf:thymeleaf-spring4")`

需要记住的是，只要我们将 Thymeleaf 添加到项目的类路径下，就启用了 SpringBoot 的自动配置。当应用运行时，Spring Boot 会探测到类路径中的 Thymeleaf 并自动配置视图解析器、模板解析器以及模板引擎。这些都是在 Spring MVC 中使用 Thymeleaf 所需要用到的。因此在应用中并不需要使用显式 Spring 配置的方式来定义 Thymeleaf。

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
    <head>
        <title>SpringBootContacts</title>
        <link rel="stylesheet" th:href="@{/style.css}"/>
    </head>
    <body>
        <h2>Spring Boot Contacts</h2>
        <form method="POST">
            <label for="firstName">FirstName</label><input name="firstName"/><br/>
        </form>
        <ul th:each="contact:${contacts}">
            <li>
                <span th:text="${contact.firstName}">First</span>
            </li>
        </ul>
    </body>
</html>
```

## 添加静态内容

正常来讲，在编写 Spring 应用时，会尽量避免讨论样式和图片。当然这些内容能够在很大程度上让各种应用变得更加没管。但是对于编写服务器端的 Spring 代码来说，这些静态内容就没有那么重要了。

但是在 Spring Boot 中有必要讨论一下它是如何处理静态内容的。当采用 Spring Boot 的 web 自动配置来定义 Spring MVC 的 bean 时，这些 bean 中会不好喊一个资源处理器(resource handler)。它会将`/**`映射到几个资源路径中，这些资源路径包括(相对于类路径的根)：
- /META-INF/resources/
- /resources/
- /static/
- /public/

在传统的基于 Maven/Gradle 构建的项目中，我们通常会将静态内容放在`src/main/webapp`目录下，这样在构建所生成的 WAR 文件中，这些内容就会位于 WAR 文件的根目录下。如果使用 SpringBoot 构建 WAR 文件的话，这依然是可选的方案。但是我们也可以将静态内容放在资源处理器所映射的上述四个路径下。

所以为了满足 Thymeleaf 模板对于`/style.css`的引用，我们需要创建一个名为style.css文件并放到上述四个的任一位置。

## 持久化数据

在 Spring 应用中有多种使用数据库的方式，我们可以使用 JPA 或 Hibernate 将对象映射为关系型数据库中的表和列。或者我们干脆放弃关系型数据库，使用其他类型的数据库，如 Mongo

对于 Contacts 应用来说，关系型数据库是不错的选择，我们将使用 H2 数据库和 JDBC 来让这个过程尽可能简单

选择该方案就需要在构建中添加一些依赖，JDBC 的 starter 依赖会将 Spring JdbcTemplate 所需要的所有内容都引入进来。不过要结合 H2 数据库的话还要引入 H2 依赖:
```gradle
compile("org.springframework.boot:spring-boot-starter-jdbc")
compile("com.h2database:h2")
```

```java
@Repository
public class ContactRepository {
    private JdbcTemplate jdbc ;
    @Autowried
    public ContactRepository(JdbcTemplate jdbc){
        this.jdbc = jdbc;
    }
    public List<Contact> findAll(){
        return jdbc.query("select firstName from contacts order by firstName", new RowMapper<Contact>(){...})
    }
    public void save(Contact contact){
        jdbc.update(...)
    }
}
```
与 ContactController 类相似，这个 Repository 类非常简单。它与传统的 Spring 应用中的 Repository 类并没有什么差别，从实现中，根本无法看到他要用于 Spring Boot 应用程序中。

当 SpringBoot 探测到 Spring 的 JDBC 模块和 H2 在类路径下时，自动配置就会发生作用，将会自动配置 JdbcTemplate bean 和 H2 DataSource bean。

此外，数据库模式需要我们自己定义：
```sql
create table contacts {
    id identity,
    firstName varchar(30) not null
};
```
现在只需要一种方式加载这个`create table`的 SQL 并在 H2 数据库中执行就可以了。幸好，Spring Boot 也涵盖了这项功能，如果我们将这个文件，命名为 schema.sql 并将其放在类路径根下，也就是 src/main/resources 目录下，当应用启动是，就会找到这个文件并进行数据加载。

## 运行

Contacts 应用非常简单，但是也算是现实中的 Spring 应用，它具有 SpringMVC 控制器和 Thymeleaf 模板所定义的 Web 层，并且具有 Repository 和 Spring JdbcTemplate 所定义的持久层。

通常来讲，Spring Boot 的自动配置特性消除了绝大部分或者全部的配置。因此，完全可能编写出没有任何配置的 Spring 应用程序。当然自动配置并不能涵盖所有的场景，因此典型的SpringBoot应用程序依然会需要一点配置。

不过这里的 Contacts 应用并没有任何配置。

我们需要一个特殊的类来启动 SpringBoot 应用，Spring 本身并不知道自动配置的任何信息。
```java
@ComponentScan
@EnableAutoConfiguration
public class Application{
    public static void main(String[] args){
        SpringApplication.run(Application.class,args) ; //运行应用。
    }
}
```