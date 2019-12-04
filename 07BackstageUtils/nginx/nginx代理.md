# nginx proxy pass 代理

proxy_pass

在 nginx 中配置 proxy_pass 代理转发时，如果在 proxy_pass 后面的 url 加上 `/`，表示绝对根路径。如果没有则表示相对路径。

假设使用`http://192.168.1.1/proxy/test.html`访问，

1.
```
location /proxy/ {
    proxy_pass http://127.0.0.1/;
}
```
代理到 http://127.0.0.1/test.html;

2.
```
location /proxy/ {
    proxy_pass http://127.0.0.1;
}
```
代理到 http://127.0.0.1/proxy/test.html;

3.

```
location /proxy/ {
    proxy_pass http://127.0.0.1/aaa/;
}
```
代理到 http://127.0.0.1/aaa/test.html

4.
location /proxy/ {
    proxy_pass http://127.0.0.1/aaa;
}
```
代理到 http://127.0.0.1/aaatest.html
