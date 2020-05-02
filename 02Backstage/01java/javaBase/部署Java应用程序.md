# 部署 Java 应用程序

将应用程序打包时，使用者一定希望仅仅提供其一个单独的文件，而不是一个含有大量类文件的目录。Java 归档文件就是为此目的而设计的。此外 JAR 文件是压缩的，其使用了熟悉的 ZIP 压缩格式。

## 创建 jar 文件

可以使用`jar`工具制作`jar`文件，常用命令格式：`jar cvf JARFileName File1 File2 ...`

### 清单文件

除了类文件、图像和其他资源外，每个 JAR 文件还包含一个用于描述归档特征的**清单文件**(mainfest)。清单文件被命名为`MANIFEST.MF`，其位于 JAR 文件一个特殊的`MAIN-INF`子目录中。

复杂的清单文件可能包含很多条目，这些清单条目被分为多节，第一节被称为**主节**，其作用于整个清单文件。随后的条目用来指定已经命名条目的属性，这些已经命名的条目可以是某个文件、包或 URL。它们都必须始于名为`Name`的条目，节与节之间用空行分开：
```
Manifest-Version:1.0

Name:Woozle.class

Name: com/mycompany/mypkg
```

要向编辑清单文件，需要将希望添加到清单文件中的行放到文本文件中，然后执行：`jar cfm JARFileName ManifestFileName ...`

要更新一个已有的 JAR 文件清单：`jar ufm MyArchive.jar manifest-adition.mf`

**注意** 清单文件最后一行必须以换行符结束。否则清单文件将无法被正确地读取

### 可执行的 JAR 文件
可以使用`jar`命令的`e`选项指定程序的入口点，即通常需要在调用`java`程序加载器时指定的类：`jar cvfe MyProgram.jar com.mycompany.MainClass ...` 或者可以在清单文件中指定应用程序的主类：`Main-Class: com.mycompany.MainClass`

**不要将 .class 添加到主类名中**

无论以上哪种方法，都可以通过这样的命令启动程序：`java -jar MyProgram.jar`

根据操作系统的配置，用户设置可以双击 JAR 文件启动应用程序。