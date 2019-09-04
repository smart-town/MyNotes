# 注入 AspectJ 切面

虽然 Spring AOP 能够满足许多应用的切面需求，但是与 AspectJ 相比，它只是一个功能比较弱的 AOP 解决方案。AspectJ 提供了 Spring AOP 所不能支持的许多类型的切点。

例如，当我们需要在创建对象时应用通知，构造器切点就非常方便。不像某些其他面向对象语言中的构造器，Java 构造器不同于其他的正常方法，这使得 Spring 基于代理的 AOP 无法将通知应用于对象的创建过程。

对于大部分功能来讲，AspectJ 切面和 Spring 是相互独立的。虽然它们可以织入到任意的 Java 应用中。这也包括了 Spring 应用，但是在应用 AspectJ 切面时几乎不会涉及到 Spring。

但是精心设计的切面很可能依赖其他类来完成它们的工作，如果在执行通知时，切面依赖于一个或者多个类，我们可以在切面内部实例化这些写作的对象，但是更好的方式是借助 Spring 的依赖注入将 bean 装配到 AspectJ 切面中。

## 实例

以切面的方式创建一个评论员的角色，他会观看演出并且在演出之后提供一些批评意见。

```java
public aspect CriticAspect {
    public CriticAspect(){}

    pointcut performance() : execution(* perform(..)) ;

    afterReturning() : performance() {
        System.out.println(criticismEngine.getCriticism()) ;
    }

    private CriticismEngine criticismEngine;
    public void setCriticismEngine(CriticismEngine criticismEngine){
        this.criticismEngine = criticismEngine;
    }
}
```

CriticAspect 的主要职责是在表演结束后发表评论，这里 performance() 切点匹配 perform() 方法，当它与 afterReturning() 通知一起配合使用时，可以让该切面在表演结束时起作用。

实际上，CriticAspect 与一个 CriticismEngine 对象相互写作，在表演结束时调用该对象的 getCriticism() 方法来发表评论。为了避免 CriticAspect 和 CriticismEngine 产生耦合，通过 Setter 依赖注入为其设置。

```java
public class CriticismEngineImpl implements CriticismEngine {
    public CriticismEngineImpl(){}

    public String getCriticism(){
        int i = (int)(Math.random() * criticismPool.length) ;
        return criticismPool(i) ;
    }

    private String[] criticismPool ;
    public void setCriticismPool(String[] cirticismPool){...}
}
```

```xml
<bean id="criticismEngine" class="CriticismEngineImpl">
    <property name="criticisms">
        <list>
            <value>Worst performance ever!</value>
            <value>A must see show</value>
        </list>
    </property>
</bean>
```

现在有了一个要赋予 CriticAspect 的 CriticismEngine。在如何注入实现之前，必须清楚 AspectJ 切面根本不需要 Spring 就可以织入到我们的应用中。如果想使用 Spring 的依赖注入为 AspectJ 切面注入协作者。那么我们就需要在 Spring 配置中将切面声明为一个 Spring 配置中的 `<bean>`。

```xml
<bean class="CriticAspect" factory-method="aspectOf">
 <property name="criticismEngine" ref="criticismEngine"/>
</bean>
```

很大程度上，`<bean>`的声明与我们在 Spring 中所看到的其他 `<bean>`配置并没有什么不同，但是最大的不同在于使用了`factory-method`属性。通常情况下，Spring bean 由 Spring 容器初始化，但是 AspectJ 是由 AspectJ 在运行期间创建的，等到 Spring 有机会为 CriticAspect 注入 CriticismEngine 时，CriticAspect 已经被实例化了。

因为 Spring 不能负责创建 CriticAspect，那就不能在 Spring 中简单地把 CriticAspect 声明为一个 bean，相反，我们需要一种方式为 Spring 获得已经由 AspectJ 创建的 CriticAspect 实例的句柄，从而可以注入 CriticismEngine。幸好所有的 AspectJ 切面都提供了一个静态的 aspectOf() 方法，该方法返回切面的一个单例。所以为了获得切面的实例我们必须使用 factory-method 来调用 aspectOf() 方法而不是调用 CriticAspect 的构造器方法。

简而言之，Spring 不能像之前那样使用 `<bean>` 声明来创建一个 CriticAspect 实例——它已经在运行时由 AspectJ 创建完成了。Spring 需要通过 aspectOf() 工厂方法获得切面的引用，然后像`<bean>`元素规定的那样在该对象上执行依赖注入。