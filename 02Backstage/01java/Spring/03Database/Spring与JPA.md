# Spring 与 Java 持久化 API

Java Persistence API(JPA)，诞生在 EJB2 实体 Bean 的基础之上，并成为下一代 Java 持久化标准。

## 配置实体管理器工厂

基于 JPA 的程序，需要通过 EntityManagerFactory 的实现类获取 EntityManager 实例。

两种类型的实体管理器：应用程序管理类型 和 容器管理类型。
- Application-managed: 当应用程序向实体管理器工厂直接请求实体管理器时，工厂会创建一个实体管理器。这种模式下，应用程序要负责打开或者关闭实体管理器并在事务中对其进行控制，这种方式的实体管理器适合不运行在 Java EE 中的独立应用程序。
- Container-managed: 实体管理器由 Java EE 创建和管理，应用程序根本不与实体管理器工厂打交道。相反，实体管理器直接通过注入或者 JNDI 来获取。容器负责配置实体管理器工厂。这种类型的实体管理器最适用于 Java EE 容器。这种情况下通常会希望在 persistence.xml 指定的 JPA 配置之外保持一些自己对 JPA 的控制。

以上的两种实体管理器实现了同一个 EntityManager 接口，关键的区别不在于 EntityManager 本身，而是 EntityManager 的创建和管理方式。

- LocalEntityManagerFactoryBean 负责生成应用程序管理类型的 EntityManagerFactory
- LocalContainerEntityManagerFactoryBean 生成容器管理类型的 EntityManagerFactory。

应用程序管理类型和容器管理类型工厂之间的唯一区别就是在 Spring 上下文中如何配置

###  配置应用程序管理类型的 JPA

对于应用程序管理类型的实体管理器工厂来说，它绝大部分的配置信息来源于一个名为 persistence.xml 的配置文件，这个文件必须位于类路径下的 META-INF 目录下。

persistence.xml 的作用在于定义一个或者多个持久化单元，持久化单元是同一个数据源下的一个或者多个持久化类，简单来说，persistence.xml 列出了一个或者多个的持久化类以及一些其他的配置如数据源和基于 XML 的配置文件。如下是一个典型的 persistence.xml 文件：

```xml
<persistence xlns="http://java.sun.com/xml/ns/persistence" version="1.0">
    <persistence-unit name="siptterPU">
        <class>com.test.Spitter</class>
        <class>com.test.Spittle</class>
        <properties>
            <property name="test.dirver" value="org.jdbcDriver"/>

            <property name="test.url" value="jdbc://localhost/spitter"/>
            <property name="user" value="sa"/>
            <property name="password" value=""/>
        </properties>
    </persistence-unit>
</persistence>
```
由于在 persistence.xml 文件中包含了大量的配置信息，所以在 Spring 中需要配置的信息就很少了，可以通过以下的 Bean 注解方法在 Spring 中声明 LocalEntityManagerFactoryBean:

```java
@Bean
public LocalEntityManagerFactoryBean entityManagerFactoryBean(){
    LocalEntityManagerFactoryBean emfb = new LocalEntityManagerFactoryBean() ;
    emfb.setPersistenceUnitName("sptterPU") ;
    return emfb;
}
```

赋值给 persistenceUnitName 属性的值就是 persistence.xml 中持久化单元的名称。

创建应用程序管理类型的 EntityManagerFactory 都是在 persistence.xml 中进行的，而这正是应用程序管理的本意。在应用程序管理的场景下（不考虑 Spring 时），完全由应用程序本身来获取 EntityManagerFactory，这是通过 JPA 实现的 PersistenceProvider 做到的。如果每次请求 EntityManagerFactory 时都需要定义持久化单元，那么代码将会迅速膨胀。如果将其配置在 persistence.xml 中，JPA 就能够在这个特定的位置查找持久化单元定义了

但是借助于 Spring 对 JPA 的支持，我们不需要直接处理 PersistenceProvider 了，因此再将配置信息放在 persistence.xml 中就显得不那么明智了，实际上，这样做妨碍了我们在 Spring 中配置 EntityManagerFactory。

### 使用容器管理类型的 JPA

容器管理的 JPA 采取了一个不同的方式，当运行在容器中时，可以使用容器（我们的场景下是 Spring）提供的信息来生成 EntityManagerFactory。可以将数据源信息配置在 Spring 上下文中，而不是在 persistence.xml 中了。例如：
```java
@Bean
public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource, JpaVendorAdapter jpaVendorAdapter){
    LocalContainerEntityManagerFactoryBean emfb = new LocalContainerEntityManagerFactoryBean() ;
    emfb.setDataSource(dataSource) ;
    emfb.setJpaVendorAdapter(jpaVendorAdapter) ;
    return emfb;
}
```

这里通过 Spring 配置的数据源来设置 dataSource 属性，尽管数据源还可以在 persistence.xml 中进行配置，但是这个属性指定的数据源具有更高的优先级。`jpaVendorAdapter`指明所使用的是哪个厂商的 JPA 实现：
- EclipseLinkJpaVendorAdapter
- HibernateJpaVendorAdapter
- OpenJpaVendorAdapter
- TopLinkJpaVendorAdapter(Sprign3.1 中已经废弃)

如使用 HibernateJpaVendorAdapter:
```java
@Bean
public JpaVendorAdapter jpaVendorAdapter {
    HibernateJpaVendorAdapter adapter = new ..();
    adapter.setDatabase("HSQL") ;
    adapter.setShowSql(true) ;
    adapter.setGeneralDdl(false) ;
    adapter.setDatabasePlatform("org.hibernate.dialect.HSQLDialect") ;
    return adapter ;
}
```

有多个属性需要设置到厂商适配器上，但是最重要的是 database 属性。

一些特定的动态持久化功能需要对持久化类按照指令(instrumentation)进行修改才能支持。在属性延迟加载的对象中，必须要包含知道如何查询未加载数据的代码。一些框架使用动态代理实现延迟加载，而有一些框架如 JDO，则是在编译时执行类指令。

选择哪一种实体管理器工厂主要取决于如何使用它。但是下面的技巧可能更让你倾向于使用 LocalContainerEntityManagerFactoryBean。

persistence.xml 文件的主要作用就在于能够识别持久化单元中的实现类，但是从 Spring3.1 开始，能够在 LocalContainer.. 中直接设置 packagesToScan 属性。

```java
@Bean
public LocalContainerEntityManagerFacotyBean ...(){
    ...
    emfb.setPackagesToScan("com.test") ;
    return emfb ;
}
```
这个配置中，FactoryBean 会扫描 com.test 包，查找带有 `@Entity`注解的类。

**另外**，如果将 Spring 应用程序部署在应用服务器中，`EntityManagerFactory`可能已经创建好了，并且位于 JNDI 中等待查询使用。这种情况下，可以使用 `<jee:jndi-lookup>`元素来获取对 `EntityManagerFactory`的引用或者使用 Java 配置来获取。

## 编写基于 JPA 的 Repository

正如 Spring 对于其他持久化方案的集成一样，Spring 对于 JPA 的集成也提供乐 JpaTemplate 模板。但是为了实现更纯粹的 JPA 方式，基于模板的 JPA 已经被弃用了。

基于纯粹的额 JPA 方式远胜于基于模板的 JPA:

```java
@Repository
@Transactional
public class JpaTest implements SpitterRepository {
    @PersistenceUnit //注入 EntityManagerFactory
    private EntityManagerFactory emf ;

    public void addSpitter(Spitter spitter){
        emf.createEntityManager().persist(spitter) ;//创建并使用 EntityManager
    }

    public Spitter getSpitterById(long id){
        return emf.createEntityManager().find(Spitter.class, id) ;
    }
}
```

这里使用了 `@PersistenceUnit`注解，Spring 会将 EntityManagerFactory 注入到 Repository 之中，有了 `EntityManagerFactory`之后，就可以使用它来创建`EntityManager`了，然后可以针对数据库执行操作。

在这个实现中，唯一的问题在于每个方法都会调用 createEntityManger()，除了引入易出错的重复代码之外，这还意味着每次调用 Repository 的方法时，都会创建一个新的 EntityManager，这种复杂性源于事务。如果能够实现准备好 EntityManager 会不会更加方便？

但是问题在于 EntityManager 并不是线程安全的，一般来讲并不适合注入到 Repository 这样的共享单例 bean 中。但是这并不意味这没有办法要求注入 EntityManager:

```java
@PersistenceContext
private EntityManger em;
```

这里直接设置了 EntityManager，就不用在通过 EntityManagerFactory 创建了。`@PersistenceContext`并不会真正注入 EntityManager，至少精确来讲不是这样的。他没有将真正的 EntityManager 设置给 Repository ，而是给了它一个 EntityManager 的代理。真正的 EntityManager 是与当前事务相关联的那一个，如果不存在这样的 EntityManager 的话，就会创建一个新的。这样就能始终以线程安全的方式使用实体管理器。