# PowerShell

## 命令小纪

- 查看某个环境变量值：`> $env:VAR_NAME`，如`> $env:JAVA_HOME`
- 查看命令位置：`> Get-Command order`
- 设置环境变量( CMD 同样适用): `> SETX COMMAND_NAME COMMAND_VALUE`

## 自动执行脚本

powershell 支持四种可以用来初始化任务的`profile`脚本：  

Profile | 描述 | 位置 
----- | ----- | -----
所有用户 | 所有用户共享的 profile | `$pshome\profile.ps1`
所有用户（私有） | powershell.exe 验证 | `$pshome\Microsoft.PowerShell_profile.ps1`
当前用户 | 当前用户 profile | `((Split-Path $profile -Parent) + "\profile.ps1")`
当前用户（私有） | 当前用户的 profile，只在 Powershell.exe 中验证 | $profile


私有指的是，只有 Powershell 自身才会调用，不会对其他引用 powershell 的组件有效。

## 关于连续执行命令

`cmd`中可以使用`cmd1 && cmd2`来衔接多条命令，表示如果`cmd1`如果执行成功则继续执行`cmd2`

powershell 有其自己的表达方式：`-and`和`-or`    

- `-and`: 左侧执行成功才会执行右侧命令
- `-or`: 无论左侧命令是否成功都会继续执行右侧命令

```shell
# bash
cd / && ls
# powershell
(cd C:\) -and (dir)
```
