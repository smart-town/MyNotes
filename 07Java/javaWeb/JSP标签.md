# JSP 标签

也称为 Jsp Action 元素，它用于在 Jsp 页面中提供业务逻辑功能，避免在 jsp 页面中直接编写 java 代码，造成 jsp 页面难以维护。

## 常用标签

- `<jsp:include>`
- `<jsp:forward>`
- `<jsp:param>`

### 常用标签介绍

1. `<jsp:include>`用于将另外一个资源的输出内容插入到当前 JSP 页面的输出内容中，这种在 JSP 页面执行时的引入方式称为动态引入。其与`include`指令不同，`include`指令是静态引入。
2. `<jsp:forward>`用于将请求转发给另外一个资源
3. `<jsp:param>` 当使用`<jsp:include>`和`<jsp:forward>`引入或将请求转发个另外一个资源时可以使用`<jsp:param>`向另外一个资源传递参数。


