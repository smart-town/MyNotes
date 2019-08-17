# Navigator

`window.navigator`属性指向一个包含浏览器和系统信息的 Navigator 对象。脚本通过这个属性了解用户的环境信息。

## 属性

### Navigator.userAgent

`navigator.userAgent`返回浏览器的 User Agent 字符串，表示浏览器版本和厂商信息。

通过`userAgent`属性识别浏览器并不是一个好方法，因为必须考虑所有的情况，非常麻烦，而且用户可以改变这个字符串。这个字符串并无统一规定，所以一般不用它识别浏览器，而是使用“功能识别”的方法。即逐一测试当前浏览器是否支持要用到的 js 功能。

不过，通过`userAgent`可以大致准确识别手机浏览器，测试方法是是否包含`mobi`字符串。`/mobi/i.test(navigator.userAgent.toLowerCase())`

### Navigator.plugins

`Navigator.plugins`属性返回一个类似数组的对象，成员是 Plugin 实例对象，表示浏览器安装的插件。

### Navigator.platform

返回用户操作系统信息，如`MacIntel`、`Win32`、`Linux`等。

### Navigator.onLine

`navigator.onLine`返回布尔值，表示用户在线还是离线（浏览器断线）。有时，浏览器可以连接局域网，但是局域网不能联通外网，这时候，`onLine`属性依旧返回`true`，所以不能假定只要是`true`，用户就一定能访问互联网。不过只要是`false`则用户一定离线。

用户在线会触发`online`事件，离线触发`offline`事件

### Navigator.language, Navigator.languages

`language`返回首选语言。`languages`返回数组表示用户可以接受的语言。HTTP 请求头的`Accept-Language`就来自这个数组。

### Navigator.geolocation

`navigator.geolocation`返回一个`Geolocation`对象，包含用户地理位置的信息。该 API 只有在 HTTPS 协议下可用。

### Navigator.cookieEnabled

表示浏览器 Cookie 功能是否打开。`navigator.cookieEnabled`。注意这个属性反映的是浏览器总的特性，与是否存储某个具体网站的 cookie 无关。

## Screen 对象

Screen 对象表示当前窗口所在的屏幕，提供显示设备的信息。`window.screen`属性指向这个对象。

该对象有以下属性：
- `Screen.height`: 浏览器窗口所在的屏幕高度。除非调整显示器的分辨率，否则该值可以看做常量。单位像素
- `Screen.width`: 浏览器窗口所在屏幕的宽度
- `Screen.availHeight`: 浏览器窗口可用的屏幕高度，因为部分空间可能不能用，如系统的任务栏或者 Mac 的 Dock，这个属性属于`height`减去那些被系统组件占用的高度。
- `Screen.availWidth`: 可用的屏幕宽度（像素）
- `Screen.pixelDepth`: 整数，表示屏幕的色彩位数，如`24`表示屏幕提供 24 位色彩。
    > 色彩数，就是屏幕上最多显示多少种颜色的种数，对屏幕上的每一个像素来说，256 种颜色要用 8 位二进制数表示，因此也叫 8 位图。如果每个像素的颜色用 16 位二进制数表示，就叫做 16 位图。
- `Screen.colorDepth`: `pixelDepth`的别名。绝大多数是同一种情况
- `Screen.orientation`: 返回一个对象表示屏幕的方向，该对象的`type`属性是一个字符串，表示屏幕的具体方向。`landscape-primary`表示横放，`landscape-secondary`表示颠倒的横放。`portrait-primary`表示竖放，`portrait-secondary`


