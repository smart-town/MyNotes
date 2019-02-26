# SVN 设置忽略

## 全局设置忽略

`~/.subversion/config`中已经有了设置，只是默认关闭。找到`[miscellany]`字段，去掉`global-ignore`前的注释。另外还可以增加一些想要忽略的文件类型

## 工程目录设置

大多数情况下，工程目录下本身有一些不需要进行版本管理的文件和目录。如临时编译文件夹等。

`svn propedit svn:ignore <dir>`