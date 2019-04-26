# location 配置

匹配语法：`location [= | ~ | ~* | ^~] uri {...}`

## 说明

包含了路径的匹配规则和针对该规则的配置

前导符 | 说明
---- | -----
= uri {...} | 全字匹配
~ regular {...} | 区分大小写的正则匹配
~* regular {...} | 不区分大小写的正则匹配
^~ uri {...} | 否定正则的路径匹配
url {...} | 没有任何前导符的路径匹配

## 流程

1. 检查请求 uri 是否与某个 = 规则匹配，如果有则直接匹配并终止
2. nginx 首先检查所有路径匹配规则配置项，包括`^~`和没有签到符号的规则，选择并记住和当前 url 匹配度最长的配置项，但此时并不会启用相关配置而仅仅是记住
3. 判断上一步选择的路径是否包含`^~`如果有则直接终止
4. 按配置顺序进行正则检查，匹配到第一条合适的规则时启用并终止
5. 使用步骤三得到的匹配规则

## 实例

```shell
location = / {
	...
}

location / {
	...
}
location /documents/ {
	...
}
location ^~ /images/ {

}
```

## root 和 alias

`nginx`指定文件路径有两种方式`root`和`alias`，两者的区别主要在于 nginx 如何解释 location 后面的 uri，这会使得两者分别以不同的方式将请求映射到服务器文件上。

```
[root]
语法：root path
默认值：root html
配置段：http、server、location、if

[alias]
语法： alias path
配置段： location
```
例子：

location ~ /t/ {
	root /www/root/html;
}
如果一个请求 uri 为`/t/a.html`时,web 服务器将会返回服务器上的`/www/root/html/t/a.html`文件

alias ~ /t/ {
	alias /www/root/html/new_t/;
}
如果请求 uri 为`/t/a.html`时，web 服务器返回`/www/root/html/new_t/a.html`，【注意】这里是`new_t`，alias 会将 location 后面的配置路径丢弃掉，将当前匹配的目录指向到指定的目录。
`alias`只能位于`location`块中。
