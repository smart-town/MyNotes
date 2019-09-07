# Gradle Wrapper

当将一个本地项目放到远程版本库时，如果这个项目是以 gradle 构建的，那么其他人从远程仓库拉取代码后如果本地没有安装过 gradle 将会无法编译执行，如果对 gradle 不熟悉，会使得无法很好的去快速构建项目代码，所以 gradle 可以自动生成一键运行的脚本，将这些一起上传到远程仓库，可以使得即使没有安装 gradle 也可以自动安装并且编译项目代码。

- Gradle 本身是一个构建系统，能够简化你的编译、打包、测试过程
- Gradle Wrapper 的作用是简化 Gradle 本身的安装、部署。不同版本的项目可能需要不同版本的 Gradle，手工部署可能比较麻烦，而且可能产生冲突，所以需要 Gradle Wrapper 帮助你搞定这些事情。

## 简单 Gradle Wrapper 生成

可以新建一个目录并进入，在该目录下执行`gradle wrapper`，命令执行成功后可以看到一些文件：
- gradlew.bat windows 可以通过它执行 gradle 任务
- gradle-wrapper.jar Gradle Wrapper 主体功能包，项目打包必须有的
- gradle-wrapper.properties 指定了项目需要什么版本的 Gradle，以及从哪里下载该版本的 Gradle，下载下来放到哪里。

## 处理流程

当从版本库下载代码后，如果本机安装过 gradle，当然直接编译运行即可。但是对于没有安装过 gradle 的用户，可以执行项目根目录下的`gradlew.bat`脚本，将会在`gradle-wrapper.properties`中的`~/.gradle/wrapper/dists`目录中首次下载并安装可以编译代码：
1. 解析`gradle-wrapper.properties`获取项目需要的 gradle 版本下载地址
2. 判断本地用户目录下的`~/.gradle`目录是否存在该版本，不存在则走 3， 否则 4
3. 下载指定的版本，并解压到`~/.gradle`下
4. 利用`/.gradle`目录下对应版本的 gradle 进行编译操作