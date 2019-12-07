## curl

curl 命令是一个利用 URL 规则在命令行下工作的文件传输工具。 支持文件的上传和下载，是综合传输工具。支持HTTP、HTTPS、FTP等众多协议，还支持POST、cookie、认证、限速、进度条等特征。

`curl (options) (param)`

### 实例

#### 文件下载

`curl`命令可以用来执行下载，发送各种 http 请求，指定 HTTP 头部等操作。curl 是将下载文件输出到 stdout，将进度条信息输出到 stderr，不显示进度信息使用`--silent`选项。

`curl URL --silent`

#### 设置参照页字符串

参照页是位于 HTTP 头部中的一个字符串，表示用户是从哪个页面到达当前页面的:`curl --referer http://B http://A`

#### 设置 cookie

`curl http://terst --cookie "user=root;pass=123"`

如果将 cookie 存储到另一个文件：`curl URL --cookie-jar cookie_file`

#### 设置用户代理

`curl URL -A(--user-agent) "mozilla/5.0"`

其他 HTTP 头部信息也可以使用 curl 发送，如`-H`传递多个头信息：`curl -H "Host:man.linux" -H "accept-language:zh-cn" URL`, `-H "content-type: application/json`

#### post 方式

`curl URL -i curl http://localhost:8080/entry1 -d "{\"name\":\"test\"}" -H "Content-type: application/json"`

#### 带宽控制

`curl URL --limit-rate 50k`

#### 认证

完成网页认证

`curl -u user:pwd http://test`

#### 只打印响应头信息

`curl -I(--head) URL`
