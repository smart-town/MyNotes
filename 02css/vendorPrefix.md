# Vendor Prefix

Vendor Prefix —— 浏览器引擎前缀，是一些放在 CSS 属性前面的小字符串。用来确保这种属性只在特定的浏览器渲染引擎下才能识别和生效，谷歌和 safari 使用的是 webkit 渲染引擎，火狐使用的是 Gecko 引擎。一种浏览器引擎里面一般不实现其他引擎前缀标识的 CSS 属性，但是由于以 webkit 为引擎的移动浏览器相当流行，火狐等浏览器在其移动版中也实现了部分 webkit 引擎前缀的 css 属性。

- `-moz-` 火狐等
- `-webkit-` Safari，Chrome等
- `-o-` Opera 早期
- `-ms-` Internet Explorer

## 为什么需要

主要是各种浏览器用来试验或测试新出现的 CSS3 属性特征。