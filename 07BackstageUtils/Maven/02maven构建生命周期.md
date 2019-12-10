# MAVEN 构建生命周期

Maven 构建生命周期定义了一个项目构建跟发布的过程

一个典型的 Maven 构建生命周期是由这几个**阶段**构成的：

开始-> validate -> compile -> test -> package -> verify -> install -> deploy -> 结束

即，先验证项目是否正确且所有信息必须是可用的，然后编译代码，执行测试，创建 pom 中定义的包，对集成测试的结果进行检查以确保质量达标，安装打包的项目到本地仓库，拷贝最终的工程到远程仓库中。

为了完成 default 生命周期，这些阶段（包括未罗列的生命周期）将会被按顺序执行。

---有三个生命周期->周期由阶段构成->目标是阶段的细化

## 标准生命周期

- clean: 项目的清理
- default 或 build: 项目部署的处理
- site: 项目站点文档创建的处理

## 构建阶段由插件目标构成

一个插件目标代表一个特定的任务，比构建阶段更为精细。这有助于项目的构建和管理。这些目标可能被绑定到多个阶段或者无绑定。不绑定到任何构建阶段的目标可以在构建生命周期之外通过**直接调用**执行，这些目标的执行顺序取决于调用目标和构建阶段的顺序。

如：clean 和 package 是构建阶段，dependency:copy-dependencies 是目标。
`mvn clean dependency:copy-dependencies package`。这里的 clean 阶段将先会被执行，然后`dependency:copy-dependencies`目标执行，最终 package 阶段被执行。

## Clean 生命周期

当我们执行 mvn post-clean 命令时，Maven 调用 clean 声明周期，它包含以下阶段
- pre-clean: 执行 clean 之前完成的工作
- clean: 移除所有上一次构建生成的文件
- post-clean: 执行一些需要在 clean 之后立刻完成的工作

`mvn clean`中的`clean`就是上面的`clean`，在一个生命周期中，运行某个阶段的时候，它之前所有的阶段都会被执行，也就是说，如果执行`mvn clean`将会有`pre-clean, clean`。

可以通过在 clean 的生命周期的任何阶段定义目标来修改这部分的操作行为：
```xml

```

## 重要概念

当一个阶段通过 maven 命令调用时，如`mvn compile`,只有该