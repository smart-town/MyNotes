# MDN 之 JSON

JavaScript 对象表示方法(JSON)是用于将结构化数据表示为JavaScript对象的标准格式。通常用于在网站上表示和传输数据。

虽然 JSON 是基于 JavaScript 语法，但是它独立于 JavaScript，这也是为什么许多程序环境能够读取和生成JSON。

JSON 可以作为一个对象或字符串存在，前者用于解读 JSON 中的数据，后者用于通过网络传输 JSON 数据。JavaScript 提供一个全局的可访问的 **JSON** 对象来对这两种数据进行转换。

## JSON 结构

我们已经可以推测出 JSON 对象就是基于 JavaScript 对象，可以将 JavaScript 对象原原本本写入 JSON 数据——字符串、数字、数组、布尔。构造一个对象树，如下：

```js
{
    "squadName" : "Super hero",
    "homeTown" : "Metro City",
    "active" : true,
    "members" : [
        {
            "name" : "Molecule Man",
            "age" : 19
        },
        {
            "name" : "hhg",
            "age" : 22
        }
    ]
}

//访问对象：

superHeros.homeTown
superHeros["active"]

//访问对象中的对象，链式访问

superHeros["members"][1]["name"]
```

## JSON 数组

## 注意：

- JSON 是一种纯数据格式，它只包含属性，没有方法
- JSON 要求两头使用 {} 使其合法
- 不像 JavaScript 标识符可以用作属性，在 JSON 中只有字符串才能用作属性

## 对象和文本间的转换

我们可能会接收到一些字符串作为 JSON 数据，然后我们想要将它转换为对象。当我们想要再次发送 JSON 数据作为信息，需要将它转换为字符串，我们经常需要正确转换数据。幸运的是这两个问题这么普遍以至于浏览器都会有内建的JSON，包含以下方法：

- `parse()`: 以文本字符串形式接收一个 JSON 对象作为参数，并返回相应的对象
- `stringify()` : 接收一个对象作为参数，返回一个对应的 JSON 字符串