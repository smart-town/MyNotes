# EJS

Effective JS。是一套简单的模板语言，利用普通的 JavaScript 代码生成 HTML 页面，EJS 没有如何组织内容的教条，也没有再造一套迭代和控制语法，有的只是普通的 JavaScript 代码而已。

## 安装

`npm install ejs`

### 使用

```js
var rej = require('ejs');
people = ['geddy','neil','alex'];
html = ejs.render('<%= people.join(", "); %>',{people: people});
```

## 实例

```js
<% if(user) {%>
    <h2><%= user.name %></h2>
<% } %>
```

### 使用

```js
var template = ejs.compile(str,options);
template(data); //=>输出绘制后的 HTML 字符串

ejs.render(str,data,options);//输出绘制后的HTML字符串

ejs.renderFile(filename,data,options,function(err,str){/* 输出绘制后的 HTML 字符串 */})
```

### 参数

- `cache`
- `filename`
- `context`
- `client`
- `delimiter`
- `...`

### 标签含义

- `<%` 脚本标签，用于流程控制，无输出
- `<%_` 删除前面的空格符
- `<%=` 输出数据到模板（输出是转义 HTML 标签）
- `<%-` 输出非转义数据到模板
- `<%#` 注释标签
- `<%%` 输出`<%`
- `%>` 一般结束标签
- `-%>` 删除紧随其后的换行符
- `_%>` 将结束标签后面的空格符删除

### 包含

通过`include`指令将相对于模板路径中的模板片段包含进来，需要提供`filename`参数。如`<%- include('user/show')%>`

你可能需要`<%-`来输出原始内容，避免对输出的 HTML 代码作转义处理。

### 自定义分隔符

可以针对单个模板或全局使用自定义分隔符

```js
var ejs = require('ejs');
user = ['geddy','neil']

ejs.render('<?= users.join('|'); ?>', {users:user}, {delimiter:'?'})
```