# Orders

`date cal bc`

`nano`

## 正确关机

- 查看系统使用状态：`who`查看目前在线用户，`netstat -a`查看网络连线状态,`ps -aux`查看背后执行的程序
- `shutdown`、`poweroff`、`reboot`
## 权限修改
- `chgrp` & `chown`
- `chmod`
    - `chmod [-R] 777 filename`
    - `chmod u=rwx,g=w,o=r filename` & `chmod a+w filename`(给所有人增加写权限，其他不变，对应有`-`号)

## 服务管理

## 系统信息
命令 | 描述
----- | -----
`cat /proc/version` | 查看系统版本信息
`uname -a` | 查看内核信息
`cat /etc/issue`或`cat /etc/centos-release` | 查看当前系统发行信息
`cat /proc/cpuinfo` | 查看 cpu 信息

## 空间查看

命令 | 描述
----- | -----
`free` | 查看内存
`df` | 列出文件系统的整体磁盘使用量
`du` | 对文件和目录磁盘使用的空间进行查看
`fdisk` | 磁盘分区表操作工具

## 小技巧

命令 | 描述
----- | -----
`data -d @123123131` | 将时间戳转换为时间

## SHELL 常用快捷键

### 编辑相关
- `Ctrl + W`：从光标位置向左删除一个单词，对应的有`Alt + D`
- `Ctrl + U`: 从光标位置向左删除所有单词，对应有`Ctrl + K`
- `Ctrl + _`: 撤销上一次操作（删除）
### 跳转相关
- `Ctrl + A`: 跳转到当前输入命令的开头，对应有`Ctrl + E`
- `Ctrl + P`: 最近的一次历史命令
- `Alt + .`: 使用前一次命令的最后一个词，常用如：`mkdir test; vim [ALT+.]`

## 查看进程信息

- 查看某个进程的启动目录：获得进程号后执行：`ls -l /proc/pid/cwd`