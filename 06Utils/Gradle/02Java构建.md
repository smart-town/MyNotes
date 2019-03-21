# Java构建

## 1. Java 插件

Gradle 是一种多用途的构建工具，他可以在你的构建脚本中构建任何你想要实现的东西，但是前提是你必须首先在构建脚本中加入代码，否则它什么都不会执行。

大多数 Java 项目都是相似的：需要编译 Java 源文件，运行一些单元测试，同时创建一个包含你的类文件的 JAR。如果可以不需要为每一个项目重写编写这些，是非常有必要的。

Gradle 通过使用插件解决这个问题，插件是 Gradle 的扩展。它会通过某种方式配置你的项目，典型的有加入一些预配置任务。Gradle 自带了很多插件，你也可以简单地编写自己的插件并和其他开发者共享。Java 插件就是一个这样的插件。这个插件在你的项目中加入了很多任务。这些任务会编译和单元测试你的代码。

Java 插件是基于合约的，这意味着插件已经给项目的许多方面都设置了默认的参数。如 Java 源文件的位置，如果你在项目中遵循这些合约，那么通常不需要再构建脚本中加入太多东西。如何想不遵循合约，Gradle 也允许自己定制项目。事实上，因为对 Java 项目的支持是通过插件实现的，如果你不想要的话，你也可以不用这个插件来构建你的项目。

## 2. 基础 java 项目

在 build.gradle 中加入：`apply plugin: 'java'`。这会将 Java 插件加入到你的项目中。这意味着许多预定制的任务被自动加入到了你的项目中。Gradle 希望能够在`src/main/java`中找到源代码，`src/test/java`中找到测试代码。即 Gradle 默认从这些目录中找到代码。此外`src/main/resources`的文件都会被包含在 JAR 中。所有的输出文件会被创建在构建目录中，JAR 文件存放在 `build/libs` 文件中

可以使用`gradle tasks`列出项目所有的任务。

### 建立项目

Java 插件在你的项目中加入了很多任务，然而你只会用到其中的一小部分任务。最常用的是 build 任务，它会建立你的项目。运行`gradle build`命令时，Gradle 将会 编译和测试你的项目并创建一个 JAR 文件

其他的一些有用的任务如：`clean`删除 build 生成的文件，`assemble`编译并打包项目但是不运行单元测试。

### 外部依赖

通常一个 Java 项目会有许多外部依赖，既是指外部的 JAR 文件。为了在项目中引用这些 JAR 文件，需要告诉 Gradle 去哪里找到他们。在 Gradle 中，JAR 位于一个仓库中，这里的仓库类似于 Maven 的仓库。仓库可以用来提取依赖，或者放入。如以下，将使用开放的 Maven 仓库：
```gradle
repositories {
    mavenCentral() 
}
```
加入一些依赖：
```gradle
dependencies {
    compile group: 'commons-collections', name: 'commons-collections', version: '3.2',
    testCompile group: 'junit', name: 'junit', version:'4.+'
}
```

可以看到 `commons-collections`被加入到了编译阶段，`junit`也被加入到了测试编译阶段

### 定制项目

Java 插件给项目加入了一些属性，这些属性已经被赋予了默认的值，足够来构建项目了。如果认为不合适，可以进行修改，如指定 Java 项目版本号以及 java 版本:
```gradle
sourceCompatibility = 1.5
version = '1.0'
jar {
    manifest {...}
}
```

测试阶段加入一个系统属性：
```gradle
test {
    systemProperties 'property':'value'
}
```

可以使用`gradle properties`列出项目所有的属性。

### 发布 JAR 文件

通常 JAR 文件需要指定在某个地方发布，为了完成这一步骤需要告诉 Gradle 在何处发布，可以发布到一个本地目录，也可以发布到一个或多个远程地点

```gradle
uploadArchives {
    repositories {
        flatDir {
            dirs 'repos'
        }
    }
}
```

