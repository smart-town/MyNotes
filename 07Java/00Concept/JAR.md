# JAR

## 概述

JAR 是 Java 所特有的一种压缩文档，其实是一个 zip 压缩格式文件。但是还有其特别的地方。

Java ARchive，Java 归档。JAR 与 zip 的唯一区别在于 JAR 会自动生成一个 META-INF/MANIFEST.MF 文件

## MANIFEST.MF

该文件描述 jar 文件信息。
- Manifest-Version 版本
- Created-By 生成者
- Signature-Version 定义 jar 文件签名版本
- Class-Path 应用程序或者类加载器使用该值构建内部类搜索路径

### Main-Class

定义 jar 文件的入口类，该类必须是一个可执行类，一旦定义了该属性即可通过 java -jar x.jar 运行。

### 注意

一般编写 MANIFEST.MF 文件涉及三个部分：Manifest-Version、Main-Class、Class-Path(执行 jar 包时的 ClassPath，即第三方依赖）

如：
```shell
Manifest-Version: 1.0
Main-Class: test.Main
Class-Path: ./ ./lib/commons.jar

```

**注意最后一行一定要空一行**