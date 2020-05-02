# JavaAgent

`JavaAgent`是运行在`main`方法之前的拦截器，其内定的方法名是`premain`，也就是说先执行`premain`方法，再执行`main`方法。通过增加`premain`方法，即可实现一个`JavaAgent`。

## JavaAssist
`JavaAssist`是一个开源的分析、编辑和创建 Java 字节码的类库，关于 Java 字节码的处理，目前有很多工具，如`bcel`、`asm`等。不过这些都需要和虚拟机指令打交道，如果你不想了解虚拟机指令，可以采用`javaassist`，`javaassist`是`jboss`的一个子项目，其主要的优点在于简单而且快速。直接使用 Java 编码的形式而不需要了解虚拟机指令，就能够动态改变类的结构，或者动态生成类。

