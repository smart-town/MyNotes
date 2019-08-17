# 关于一些简单的使用

## 基本语句

### IF 语句
```shell
IF [NOT] ERRORLEVEL number command
IF [NOT] string1==string2 command
IF [NOT] EXIST filename command

IF judge (
    command
)
```

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