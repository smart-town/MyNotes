# 使用 XML 声明缓存

在某些情况下我们可能需要以 XML 形式的方式声明缓存：
- 觉得在源码中添加 Spring 的注解不舒服
- 需要在没有源码的 bean 上应用缓存功能
在上面的任意一种情况下，最好将缓存配置与缓存数据的代码分隔开来。Spring 的 Cache 命名空间提供了使用 XML 声明缓存规则的方法，可以作为面向注解缓存的替代方案。因为缓存是一种面向切面的行为，所以 cache 命名空间会与 Spring 的 aop 命名空间结合起来使用，用来声明缓存所应用的切点在哪里：注意需要包含 cache 和 aop 命名空间

cache 命名空间所提供的声明缓存的配置元素：
元素 | 描述
----- | -----
`<cache:annotation-driven>` | 启用注解驱动的缓存，等同于`@EnableCaching`
`<cache:advice>` | 定义缓存通知，结合`<aop:advisor>`将通知应用到切点上
`<cache:caching>` | 在缓存通知中定义一组特定的缓存规则
`<cache:cacheable>` | 指明某个方法需要缓存
`<cache:cacheput>` | 指明某个方法需要填充缓存
`<cache:cache-evict>` | 指明某个方法要从缓存中移除一个或多个条目

 实例如：
```xml
<aop:config>
    <aop:advisor advice-ref="cacheAdvice" pointcut="execution(* test.SpttleRepository.*(..))"/>
</aop:config>

<cache:advice id="cacheAdvice">
    <cache:caching>
        <cache:cacheable cache="spittleCache" method="findRecent"/>
        <cache:cache-put cache="spittleCache" method="save" key="#result.id"/>
        <cache:cache-evict cache="spittleCache" method="remove"/>
    </cache:caching>
</cache:advice>

<bean id="cacheManager" class="org.springframework.cache.concurrent.ConcurrentMapCacheManager"/>
```

