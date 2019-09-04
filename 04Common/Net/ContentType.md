# Content-Type

`Content-Type`实体头部用于指示资源的 MIME 类型 media type.

在响应中，Content-Type 标头告诉客户端实际返回的内容的类型。浏览器会在某些情况下进行 MIME 查找，并不一定遵循此标题的值，为了防止这种行为可以将标题`X-Content-Type-Options`设置为`nosniff`

在请求中，如 `POST` 或 `PUT`，客户端告诉服务器实际发送的数据类型。

## 指令

- `media-type`: 资源或数据的 MIME
- `charset`: 字符编码标准
- `boundary`: 对于多部分实体，是必须的。用于封装消息多个部分的边界。

