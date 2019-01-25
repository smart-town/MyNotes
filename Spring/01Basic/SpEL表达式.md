# SpEL 表达式

Spring3 引入了 Spring 表达式语言，它能够以一种强大和简洁的方式将值装配到 bean 属性和构造器参数中。在这个过程中所使用的表达式会在运行时计算得到值。

SpEL 拥有很多特性：
- 使用 bean ID 来引用 bean
- 调用方法和访问对象属性
- 对值进行算数、关系、逻辑运算
- 正则表达式匹配
- 集合操作

【基础使用】

SpEL 表达式要放在`#{...}`中，和属性占位符有些相似，属性占位符要放在`${...}`中。

除去 `#{}`标记外，就是 SpEL 的表达体了，如：`#{T(System).currentTimeMillis()}`，其计算表达式那一时刻的毫秒数。`T()`表达式会将`java.lang.System`视为 Java 中的类型，因此可以调用其 static 的对应方法。

SpEL 也可以应用其他 bean 或 bean 属性：`#{sgtPeppers.artist}`。我们还可以通过 systemProperties 对象引用系统属性`#{systemProperties['disc.title']}`

`?.`运算符，确保访问右边内容之前，它对应的元素不是null，如`#{artistSelector.selectArtist()?.toUpperCase()}`。如果`selectArtist()`返回的是 null，那么 SpEL 将不会调用 `toUpperCase()`方法而是返回 null.


计算正则表达式`#{admin.email matches '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.com'}`