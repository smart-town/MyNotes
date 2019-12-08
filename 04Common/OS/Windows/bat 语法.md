# 关于一些简单的使用

## 基本语句

### IF 语句
简介：如果 if 后的条件判断为真，只处理单句命令的话，直接跟在后面就可以了。如果有多条命令的话，则需要用括号将多条命令括起来。**注意格式！**
```shell
IF [NOT] ERRORLEVEL number command
IF [NOT] string1==string2 command
IF [NOT] EXIST filename command

IF judge (
    command
)

IF "%1"=="KE" (
    echo ...
    echo ...
) ELSE (
    echo ...
)
```
- `IF "参数"=="字符串" 命令`
- `IF exist 文件名 命令`
- `IF errorlevel / if not errorlevel 数字 命令`

### GOTO

`:LABEL` 和 `GOTO` 的协同使用

```shell
IF not EXIST tset.bat goto 1
echo test
:1
echo nothing
```

## 函数（参数等）
`%0~%9`为参数，`%0`为文件本身，`%1~%9`为形参 