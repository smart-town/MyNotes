# pom 结构

这里只是列出一些基础结构。

首先需要知道，关于 pom 的继承。默认的，maven 有一个`Super POM`，即父 pom，所有的 pom 都继承自一个父 pom，无论是否显式指定。父 pom 中包含了一些可以被继承的默认配置。

maven 使用`effetive pom`(`Super pom`+自己的配置)来执行相关目标。【可以重写】

## 头部的一些

```xml
<!--父项目坐标，如果项目中没有规定某个元素值，那么父项目对应的值就是该项目的默认属性-->
<parent>
    <artifactId>
    <groupId>
    <version>
    <relativePath/> <!--父项目的 pom 文件所在的相对路径，默认为 ../pom.xml。maven首先在当前目录查找父 pom，其次在 relativePath，然后再本地仓库，最后在远程仓库中-->
</parent>

<modelVersion/> <!--maven pom 的版本-->
<groupId><artifactId><version>
<packaging/><!--注意这是项目产生的构件类型，除了jar等，还可以自定义构件类型-->
```

## 构建项目的配置

构建项目，即将源码翻译为目标码，其实质主要涉及到位置的问题。相关：源码、资源、使用的工具、目标路径、资源目标路径。最终生成的整体所在目录以及名称

```xml
<!-- 描述构建项目需要的信息 -->
<build>
    <!-- 项目源码目录，构建系统会编译目录中的源码，该路径是相对于pom.xml的相对路径 -->
    <sourceDirectory/>
    <!-- 该元素设置项目脚本源码目录，该目录和源码目录不同，绝大多数情况下，该目录下的文件直接被拷贝到输出目录，因为脚本是被解释的 -->
    <scriptSourceDirectory/>
    <!-- 测试源码目录 -->
    <testSourceDirectory>

    <!-- 被编译过的应用程序 class 文件存放的目录 -->
    <outputDirectory/>
    <!-- 被编译过的测试 class 文件存放的目录 -->
    <testOutputDirectory/>

    <!-- 使用来自该项目的的一系列构建扩展 -->
    <extensions>
        <extension><groupId/><artifactId/><version/></extension>
    </extensions>

    <!-- 当项目没有规定目标时的默认值 -->
    <defaultGoal/>

    <!-- 该元素描述项目相关的所有资源路径列表，如和项目相关的属性文件，这些资源被包含在最终的打包文件中 -->
    <resources>
        <resource>
            <!-- 描述了资源的目标路径，该路径相对于target/classes 目录。 -->
            <targetPath/>
            <!-- 是否使用参数值代替参数名，参数值取自properties元素或者文件配置中的属性，文件在filters元素中列出 -->
            <filtering/>
            <!-- 描述存放资源的目录，相对于 POM 的路径 -->
            <directory/>
            <!-- 包含的模式列表如 **/*.xml -->
            <includes/>
            <!-- 排除的模式列表如 **/*.xml -->
            <excludes/>
        </resource>
    </resources>
    <!-- 单元测试相关的所有资源路径 -->
    <testResources>
        <testResource>
    </testResources>

    <!-- 构建产生的所有文件存放的目录 -->
    <directory/>
    <!-- 产生的构建的文件名，默认为artiractId-version -->
    <finalName/>

    <!-- 当 filtering 开关打开时使用到的过滤器属性文件列表 -->
    <filters/>

    <!-- 子项目可以引用的默认插件信息，该插件配置项直到被引用时才会被解析或者绑定到生命周期。给定插件的任何本地配置都会覆盖这里的配置 -->
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId/><artifactId/><version/>
                <!-- 是否从该插件下载 maven 扩展 -->
                <extensions/>
                <!-- 在构建生命周期中执行一组目标的配置，每个目标可能有不同配置 -->
                <executions>
                    <execution>
                        <id/>
                        <!-- 绑定了目标的构建生命周期阶段，如果省略则被绑定到元数据中设置的默认配置 -->
                        <phase/>
                        <!-- 配置执行的目标 -->
                        <goals/>
                        <!-- 配置是否被传播到子POM -->
                        <inherited/>
                        <configuration/>
                    </execution>
                </executions>
                <!-- 项目引入插件需要的额外依赖 -->
                <dependencies>
                    <dependency/>
                </dependencies>
            </plugin>
        </plugins>
    </pluginManagement>

</build>
```
