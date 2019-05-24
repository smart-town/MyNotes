# DOS 和 Linux 的断行符号

DOS 使用的断行字符为`^MS`，我们称为`CR`和`LF`两个符号，而 Linux 下则仅有`LF($)`这个断行符号。其对 Linux 影响很大，原因在于 Linux 下面的指令开始执行时，判断依据为`Enter`，而`Linux`的`Enter`为`LF`，但是由于 DOS 的断行符号为`CRLF`，也就是多了一个`^M`符号。这样的情况下，如果是一个`shell script`文件，就可能造成“程序无法执行的状态”因为它会误判程序下达的指令内容。

`dos2unix [-kn] file [newfile]`

`unix2dos [-kn] file [newfile]`

`-k`保留文件原本的`mtime`时间，`-n`保留原本旧文件，将转换后的内容输出到新文件。