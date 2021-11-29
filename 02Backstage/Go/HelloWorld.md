官方 HelloWorld。主要可以学习到以下几点内容：

1. 依赖管理概念及命令
2. 三方模块引入及使用
3. 函数定义
4. go 命令运行代码

代码：    
```go
package main

import "fmt"
import "rsc.io/quote"

func main() {
    fmt.Println("Hello")
    fmt.Println(quote.Go())
}
```

## 依赖管理

当你的代码使用了其他模块中的包时，你要通过你代码自己的模块来管理这些依赖。模块通过`go.mod`文件来定义。运行`go mod init`命令生成。`go.mod`文件追踪你所依赖包对应的模块。    

`go mod init example.com/modulename`。初始化命令的名称参数通常是模块的路径。如果你计划发布模块供他人使用，那么模块路径必须能够被 go 工具下载。

## 包

`package main`声明了一个`main`包。**包**是一种用来分组函数的方式，它由同一个文件夹下的所有文件构成。    

当你运行`main`包时，默认执行`main`函数。

## 三方模块

1. 三方模块查找：可以在 [pkg.go.dev](https://pkg.go.dev) 查找需要的模块
2. 将需要的模块，如 `rsc.io/quote`引入到代码中并使用需要的函数
3. 添加新模块：`go mod tidy`。运行该命令时，其自动定位并下载你代码中所引入包的相关模块。默认情况下其下载最新代码。



注意：国内下载依赖失败或缓慢，可以通过设置代理镜像来解决。如 Windows 下设置环境变量：`SETX GOPROXY https://goproxy.cn`，或者在命令行下设置临时变量：`SET GOPROXY=...`(CMD) 或`$env:GOPROXY=...`(POWERSHELL)

## Go命令运行代码

`go run .`运行代码。