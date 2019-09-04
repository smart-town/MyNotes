# X Window

X Window 其实是一种规范，有很多不同的实现。在 Linux 系统下最流行的实现是 Xorg 和 XFree86，微软 Windows 下也有 X Window 的实现。可以使用`ps -ef | grep X`查看

X Window 是一个分层的架构，分为 Server 和 Client，X Server 负责图形界面的显示，也负责用户输入。而 Client 程序需要连接到 X Server，然后请求 X Server 绘制图形界面。同时 X Server 接收用户的输入。桌面系统上，X Server 和 Client 往往安装在同一台机器上，日常使用是感觉不到分层的。但是显然 X Server 和 Client 可以分别运行在不同的机器上，在一台机器上运行程序，但是在另一台机器上显示图形界面。

X Window 中的 Server 和 Client 和平时接触的"Server/Client"恰好相反。很多熟悉 Internet 原理的人第一次接触 X Window 往往会搞反，比如，在一台本地机器上运行 Ubuntu14 桌面版，而在另一台机器上运行 CentOS（纯字符界面），当用 ssh 从 Ubuntu 连接到 CentOS 时，Ubuntu 是 Client，CentOS 是 Server。在 X Window 中，Server 是面前的 Ubuntu, X Server 运行在 Ubuntu 上，我可以在 CentOS 上运行 GVim，但是窗口显示在 Ubuntu 上，这时候，GVim 是一个 Client 程序，它在远程机器上运行，但是它的窗口显示在本地。

## display 和 虚拟控制台

同一台机器上完全可以运行多个 X Server，只需要让每个 X Server 的 display 不同即可。

X Window 中，可以通过`hostname:display_number:screen_number`来指定一个屏幕。可以这样理解：一台计算机可以有多个 display，一个 display 可以有多个屏幕，所以 display 相当于计算机配备的一套输入输出设备，一般情况下，一台电脑只配一套键盘鼠标和一个显示器，特殊情况下，可以配多个显示器。

而在 Linux 中，即使你只有一个 display，但是有虚拟控制台这样的特性，可以直接运行 X Server 来启动，启动时可以指定 display 参数，可以省略掉`hostname`和`screen_number`，使用`:0`、`:1`这样的格式来指定 display。

假设现在已经在图形界面中，则相当于`display:0`被占用了，所以`sudo X :1 -retro`就可以在`display:1`上再运行一个 X Server。`-retro`参数是为了让 X Server 显示为斜纹。否则背景为纯黑色。此时可以通过按`ctrl+alt+F[n]`返回之前对应的虚拟控制台中。

可以在之前的虚拟控制台中使用： `gvim -display :1 -geometry 700*500+20+20`类似的命令在新启动的 X Server 上运行一个程序。切换回新打开的 X Server 中可以查看界面。