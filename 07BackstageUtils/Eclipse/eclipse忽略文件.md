# eclipse 忽略文件

使用 eclipse 提交 svn 时，可以在 perference->Team->Ignore 中设置忽略项

如果想要忽略`target`文件夹，则`*/target/*`即可，但是这个还是不能忽略`target`文件夹本身，此时还需添加`*/target`。
即：
```shell
*/target
*/target/*
```