# .classpath 文件

该文件用来记录项目编译环境的所有信息；包括源文件路径、编译后 class 文件存放路径、依赖的 jar 路径、运行的容器信息、依赖的外部 project 信息等。

classpath 文件也是一个 xml 文件

- 以`classpath`为根节点，每个`classpathentry`节点代表一个说明信息
- 每个 `classpathentry` 以 `kind` 指明类型，`path`指明路径
- 文件的内容都是依赖于项目中`Java Build Path`内容而改变的。

## 具体

`kind="src"`。即`source`源文件。`path="src"`是一个相对路径。相对于`.classpath`文件的本身。即`path="src"`表示文件夹`src`与`.classpath`文件在同一目录。

对应于 source 选项。

`kind="output"`指定 java 源文件编译后 class 存放路径。`path`代表存放 class 的路径。

`kind="con"`即`container`。程序运行的容器。也就是运行环境。对应`Library`选项卡。


`kind="lib"`指定程序依赖的 jar 包。`Reference Libraries`。

## 顺序

.classpath 文件中各个节点的顺序通过 order 选项卡控制，不同顺序可能引起加载 class 文件的问题。
