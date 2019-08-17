# DataURL

Data URL，即前缀为`data:`协议的 URL，允许内容创建者向文档中嵌入小文件。

## 语法

四部分：**前缀**、**指示数据类型的 MIME**、**如果非文本则可选的base64标记**、**数据本身** `data:[<mediatype>][;base64],<data>`

`mediatype`是一个 MIME 类型字符串，如`image/jpeg`表示图像文件，如果被省略则默认为`text/plain;charset=US-ASCII`

如果数据是文本类型，可以直接将文本嵌入，如果是二进制数据，可以将数据 base64 编码后再嵌入。