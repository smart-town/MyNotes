# ANSIConsole

[原文](https://blog.csdn.net/ShewMi/article/details/78992458)

ANSI escape sequence, ANSI 转义序列。是带有随路信令控制视频文本终端上光标位置、颜色和其他选项的标准。这些序列由 ANSI 编码字符定义，某些字节序列，大多数是从 ESC 和 "O" 开始的，嵌入到文本中，终端将查找并解释为命令，而不是字符串代码。如`\n`、`\t`

转义序列有多种，控制文本颜色的转义序列为`ESC [`，通用的控制文本序列格式为：`\033[ n1[;...] m` 其中`m`表示序列结束。