# wget 工具

wget 是在 Linux 下开发的开放源代码的软件。后被移植到包括 windows 在内的各个平台上。

- 支持断点下传功能
- 同时支持FTP和HTTP下载方式，尽管现在大部分软件可以使用HTTP下载，但是有些时候仍然需要使用FTP方式下载
- 支持代理服务器；对安全强度很高的系统而言，一般不会将自己的系统直接暴露在互联网上，所以支持代理是下载软件必须有的功能
- 设置方便简单。
- 程序小，完全免费

## 基本使用

**语法**:`wget [param] URL`

例子

1. 下载整个 http: `wget http://place.com/` 该命令可以将对应url的首页下载下来，使用`-x`会强制建立服务器上一模一样的目录。如果使用`-nd`参数，那么服务器上所有内容都会加到本地当前目录
2. `wget -r http://place.com` 这个命令会按照递归的方式下载服务器上所有的目录和文件。使用时一定要小心，因为下载的时候被下载网站指向的所有地址同样会被下载。可以用`-l number`指定下载的层次。

3. 端点续传，文件特别大的时候（或者网络非常慢），往往一个文件还没有下载完成，连接就已经切断，这时候就需要断点续传。wget 的断点续传是自动的，只需要使用`-c`参数：`wget -c http://url`

4. 批量下载，如果有多个文件需要下载，那么可以生成一个文件，把每个文件的 URL 写成一行，然后使用`wget -i download.txt`(input-file)。

5. 选择性下载。`wget -m -reject=gif http://url`，指定不下载什么文件。也可以使用`-accept`指定下载什么文件。
