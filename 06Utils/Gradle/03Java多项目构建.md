# 多项目 Java 构建

布局：
```shell
multiproject/
    api/
    services/webservice/
    shared/
```

## 定义一个多项目构建

为了定义一个多项目构建，需要一个**设置文件**，设置文件放在源代码根目录，它指定要包含哪个项目，名字必须为`settings.gradle`。如：
```gradle
//settings.gradle
include "shared","api","services:webservice","service:shared"
```

## 通用配置

对于绝大多数多项目构建，有一些配置对所有的项目都是常见或通用的。在根项目中定义一个这样的通用配置，使用一种叫做**配置注入**的技术。这里，根项目就像是一个容器，`subprojects`方法遍历这个容器的所有元素并且注入指定的配置。通过这种方法我们很容易地定义所有档案和通用依赖的内容清单。

build.gradle
```gradle
subprojects {
    apply plugin: 'java'
    repositories {
        mavenCentral()
    }
    ...
}
```

## 项目之间的依赖

可以在同一个构建中加入项目的依赖：
api/build.gradle
```gradle
dependencies {
    compile project(':shared')
}
```