# Storage

## 概述

`Storage`接口用于脚本在浏览器保存数据。两个对象部署了该接口：`window.sessionStorage`、`window.localStorage`

`sessionStorage`保存的数据用于浏览器的一次会话`session`，当会话结束（通常是窗口关闭），数据被清空。`localStorage`保存的数据长期存在。除了保存期限长度不同，这两个对象的其他方面都一致。

保存的数据都以键值对形式存在。即每一项数据都有一个键名和对应的值。所有的数据都以文本格式存在。

该接口很像 Cookie 的强化版，能够使用大得多的空间。目前，每个域名的存储上限视浏览器而定。Chrome 是 2.5MB，Firefox 是 5MB。此外，与 Cookie 一样，它们也受同域的限制。某个网页存入的数据，只有同域下的网页才能读取。如果跨域操作会报错。

## 属性和方法

Storage 只有一个属性`length`，返回保存的数据项个数

### `Storage.setItem()`

该方法用于存入数据，接收两个参数：键名和数据。如果键名已经存在则更新对应值。【注意】两个参数均是字符串，如果不是字符串，会自动转为字符串再存入浏览器。写入时不一定要用这个方法，直接赋值也可以：
```js
window.localStorage.foo = "123";
window.localStorage.setItem('foo',"123");
```

### `Storage.getItem()`

该方法用于读取数据，只有一个参数即键名。

### `Storage.removeItem()`

清除某个键名对应的键值，如果键名不存在，该方法不会做任何事情。

### `clear()`

清除所有保存的数据。

### `Storage.key()`

接收一个整数作为参数，返回该位置的键值。

## storage 事件

`Storage`接口存储的数据发生变化时，会触发`storage`事件，可以指定这个事件的监听函数。`window.addEventListener('storage',func)`

监听函数接收一个`event`实例对象作为参数，这个实例对象继承了`StorageEvent`接口，有几个特殊的属性：
- StorageEvent.key: 变动的键名
- StorageEvent.newValue
- StorageEvent.oldValue
- StorageEvent.storageArea 返回键值对所在的整个对象
- StorageEvent.url 触发 storage 事件的网页网址

**注意**，该事件有一个很特别的地方。他不在导致数据变化的当前页面触发，而是在同一个域名的其他窗口触发。即，如果浏览器只打开了一个窗口，可能观察不到这个事件。如果同时打开了多个窗口，当其中一个窗口导致数据改变时，只有其他窗口能够监听到变化。可以通过这种机制，实现多个窗口之间的通信。