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
