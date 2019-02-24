# 高级装配。

- Spring profile
- 条件化的 bean 声明
- 自动装配与歧义性
- bean 的作用域
- Spring 表达式语言

## Spring profile

开发软件时一个很大的挑战就是将应用程序从一个环境迁移到另一个环境。开发阶段中，某些环境相关做法可能并不适合迁移到生产环境中去。甚至即便迁移过去也无法正常工作。数据库配置、加密算法以及与外部系统的集成是跨环境部署时会发生变化的几个典型例子。

即在不同环境下，某个 `bean` 可能有所不同。要使用一种方法来配置某个`bean`使得其在每种环境下都会选择最为合适的配置。

一种方式就是在单独的配置类或 XML 文件中配置每个 bean。然后在构建阶段确定要将哪一个配置编译到可部署的应用中。这种方式的问题紫玉要为每种环境重新构建应用。可能会出现不能预料的问题。而 Spring 提供的方案并不需要重新构建

### 配置 profile bean

Spring 为环境相关的 bean 提供的解决方案其实与构建时的方案没有太大的差别。当然，这个过程中需要根据环境决定该创建哪个 bean 和不创建哪个 ben。但是 Spring 并不是在构建的时候做出这个决策而是等到运行时再来确定。这样的结果就是同一个部署单元能够适用于所有的环境，没有必要进行重新构建。

【使用`@Profile`】

Spring3.1 之后引入 profile 功能，要使用 profile，首先要将所有不同的 bean 定义到同一个或多个 profile 中，在将应用部署到每个环境时，要确保对应的 profile 处于激活状态。

```java
import org.springframework.context.annotation.*;

@Configuration
@Profile("dev")
public class DevelopmentProfileConfig {
    @Bean(destroyMethod = "shutdown")
    public DataSource dataSource(){
        return new ...;
    }
}
```

注意到，`@Profile`注解应用到了累计别上，他会告诉 Spirng 这个配置类中的 bean 只有在`dev profile`被激活时才会创建，如果`dev profile`没有激活的话，那么带有`@Bean`注解的方法都会被忽略掉。

```java
@Configuration
@Profile("prod")
public class ProductionProfileConfig{
    @Bean
    public DataSource dataSource(){
        return ...
    }
}
```

在 Spring3.1 中只能在类界别上使用`@Profile`注解，但是之后，可以在**方法级别**上使用`@Profile`注解。**和`@Bean`注解一同使用**:

```java
@Configuration
public class DataSourceConfig {
    @Bean
    @Profile("dev")
    public DataSrouce em(){}

    @Bean
    @Profile("prod")
    public DataSource datasource(){}
}
```

【使用 XML 配置】

通过`<beans>`元素的`<profile>`属性来在 XML 中配置`profile bean`

```xml
<beans>
    <beans profile="dev">
        <bean id="dataSouce" class="..." destroy-method="close">
    </beans>
    <beans profile-"prod">
        <jee:jndi-lookup id="dataSouce" jndi-name="..." resource-ref="true"../>
    </beans>
</beans>
```

**【激活 profile】**

Spring 在激活某个`profile`时，需要依赖两个独立的额属性：`spring.profiles.active`和`spring.profiles.default`。如果设置了前者，那么它的值就会用来确定哪个`profile`是激活的，但是如果没有设置前者的话，那么 spring 将会查找后者的值并使用。如果两者都没有值，则 Spring 只会创建那些没有定义在 profile 中的 bean。

多种方式设置这两个值：

- 作为 `DispatcherServlet` 的初始化参数
- 作为 Web 应用的上下文参数
- 作为 JDNI 条目
- 作为环境变量
- 作为 JVM 的系统属性
- 在集成测试类上可以使用`@ActiveProfiles`注解设置


