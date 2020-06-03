# AnnotationConfigApplicationContext

```java

new AnnotationConfigApplicationContext(ConfigClass.class);
```
## 对应构造函数

其继承链：`GenericApplicationContext`->`AbstractApplicationContext`->`DefaultResourceLoader`

执行构造函数之前：
```java
// DefaultResourceLoader
this.classLoader = ClassUtils.getDefaultClassLoader(); 

// AbstractApplicationContext
this.resourcePatternResolver = getResourcePatternResolver();

// GenericApplicationContext
this.beanFactory = new DefaultListableBeanFactory();
```

- 类加载器
- 资源解析器
- bean工厂创建


执行构造函数：
```java
this.reader = new AnnotatedBeanDefinitionReader(this);
this.scanner = new ClassPathBeanDefinitionScanner(this);
register(componentClasses);
refresh();
```

### AnnotatedBeanDefinitionReader
```java
this(registry, getOrCreateEnvironment(registry)) // 跟踪得知：StandardEnvironment

this.registry = registry;
this.conditionEvaluator = new ConditionEvaluator(registry, environment, null);
AnnotationConfigUtils.registerAnnotationConfigProcessors(this.registry);// 这里在 registry 中注册了 5 个 PostProcessor CONFIGURATION_ANNOTATION_PROCESSOR、AUTOWIRED_ANNOTATION_PROCESSOR、COMMON_ANNOTATION_PROCESSOR、EVENT_LISTENER_PROCESSOR、EVENT_LISTENER_FACTORY
```
