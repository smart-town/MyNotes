# 基础操作

## 获取仓库

### 现有目录初始化

`git init`

### 克隆

`git clone [url]`

自定义仓库名称：`git clone [url] name`

## 记录更新到仓库

### 查看状态

`git status`

【状态简览】`git status -s`或`--short`。未跟踪`??`标记，新添加到暂存区`A`。修改过`M`。右边`M`表示修改了但是还没有放到暂存区，左边`M`表示被修改了且放入了暂存区

### 跟踪新文件&暂存已修改文件

`git add`

【注意】运行了`git add`之后又作了修订的文件，需要重新运行`git add`将最新的版本重新暂存起来。

### 忽略文件

`.gitignore`文件。格式规范：
- 所有空行或以 # 开头被忽略
- 可以使用标准`glob`模式匹配
- `/`开头防止递归
- `/`结尾指定目录
- 忽略指定模式以外的文件或目录，加`!`取反

glob 模式指的是，shell 所使用的简化了的正则表达式。`*`匹配零个或多个任意字符。`[abc]`匹配任何出现在方括号中的字符。`?`只匹配一个字符。`[0-9]`则表示范围。两个星号`**`表示匹配任意中间目录。如`a/**/z`可以匹配`a/z`或`a/b/z`等。

```shell
#.gitignore

# no .a files
*.a

# but track lib.a,even ignore .a files above
!lib.a

# only ignore TODO file in current directory,no subdir /TODO
/TODO

# ignore all files in the build/ directory
build/

# ignore all pdf files in doc/
doc/**/*.pdf
```

### 已暂存和未暂存

`git diff`查看具体修改的地方，该命令比较工作目录中当前文件和暂存区域之间的差异

`git diff --cached`比较已暂存和仓库中的差异。

## 提交更新

`git commit`（默认启用 shell 环境变量 $EDITOR 指定的软件），也可以`git config --global core.editor`指定。

`git commit -m`将提交信息与命令放在同一行。

`git commit -a`

## 移除文件

`git rm file`,从 git 中移除某个文件，并连带从工作目录中删除指定文件，这样以后就不会出现在未跟踪清单了

如果删除之前修改并且暂存后，则需要使用`-f`强制选项。

另外一种情况，从仓库中删除但是希望保留在工作目录中，常见就是让日志文件等忘记添加到了`.gitignore`中。使用`git rm --cached log/\*.log`

### 移动文件

`git mv file_from file_to`

实际操作：`git rm, git add`

## 查看提交历史

..

## 别名

`git config --global alias.co checkout` 此时`git co`就相当于`git checkout`。