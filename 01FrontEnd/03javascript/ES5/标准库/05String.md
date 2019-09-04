# String 对象

## 概述

`String`对象是 js 原生提供的三个包装对象之一，用来生成字符串对象。是一个**类似数组**的对象，可以像数组那样取值。即以下标`0`等取值。

## 实例方法

`String.prototype.charAt`

方法名 | 描述 | 使用
------ | ------ | -------
`charAt()` | 返回指定位置字符 | `s.charAt(1)`
`concat()` | 连接两个字符串返回新的字符串 | `'a'.concat('b','c')`
`slice()` | 从原字符串取出子串并返回，不改变原字符串，第一个参数为开始位置，第二个是结束位置(不包含) | `Javascript.slice(0,4)//Java`
`substring()` | 和`slice`十分相像，但是一些规则违反直觉，不建议使用，建议使用slice
`substr()` | 第一个参数是起始位置，第二个参数是子字符串长度 | `Javascript.substr(4,6)//script`
`indexOf`和`lastIndexOf` | 确定一个字符串在另一个字符串中第一次出现的位置，如果返回`-1`表示不匹配 | `JavaScript.indexOf('script')//-1`
`trim` | 去除字符串两端的空格，返回一个新字符串(包括制表符、换行回车)
`match()` | 确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串，如果没有找到匹配则返回 `null`
`search()`和`replace()` | 
`split()`
`localeCompare()` | 比较两个字符串(自然语言)，如`'B'.localeCompare('a')>0`