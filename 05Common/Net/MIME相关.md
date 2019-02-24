# MIME 相关

多用途右键扩展(MIME)  类型。是一种标准化的方式来表示文档的性质和格式。

浏览器通常使用 MIME 而不是文件扩展名来确定如何处理文档。因此服务器设置正确以将正确的 MIME 类型附加到响应对象头部是非常重要的。

## 语法

通用结构：`type/subtype`

MIME 的组成非常简单，有类型和子类型中间用`/`分隔组成。不允许空格存在。type 可以被分为多个独立的子类别，subtype 表示细分后的每个类型。

类型 | 描述 | 实例
----- | ----- | -----
`text` | 表明文件为普通文本 | text/plain
`image` | 表明是某种图像，不包括视频但是包括动态图 | `image/gif`
`audio` | 音频文件 | `audio/midi`
`video` | 视频文件 | `video/webm`
`application` | 某种二进制数据 | `application/octet-streat`

## Multipart 类型

`multipart/form-data` 和 `multipart/byteranges`

Multipart 表示细分领域中的文件类型的种类，经常对应不同的 MIME 类型。这是复合文件的一种表现方式。`multipart/form-data`可以用于联系 HTML Forms 的 `POST` 方法。

它用于 HTML 表单从浏览器发送信息给服务器，作为多部分文档格式。它由边界线（由"--"开始的字符串）划分出不同的部分组成，每一部分有自己的实体以及 HTTP 请求头。`Content-Disposition`和`content-type`用于文件上传领域

```
Content-Type: mulitpart/form-data;boundary=aBoundaryString

--aBoundaryString
Content-Disposition: form-data; name="myFile"; filename="ime.jpg"
Content-Type: image/jpeg

(data)

--aBoundaryString
Content-Disposition: form-data; name="myField"

(data)
```

## MIME 嗅探

在确实 MIME 类型或者客户端认为文件设置了错误的 MIME 类型时，浏览器可能通过查看资源来进行 MIME 嗅探。每个浏览器在不同的情况下会执行不同的操作。安全考虑可以通过设置`Content-Type`的`X-Content-Type-Options`来阻止嗅探。