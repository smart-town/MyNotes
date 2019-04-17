# 配置系统

Nginx 中的配置系统由一个主配置文件和其他一些辅助配置文件组成。都位于安装目录下的`conf`文件夹下。

除主配置文件`nginx.conf`外的文件都是在某些情况下才使用的。

`nginx.conf`下包含若干配置项，每个配置项由**配置指令**和**指令参数**两部分组成。指令参数也就是配置指令的对应配置值。

## 指令概述

配置指令是一个字符串，可以用引号括起来也可以不括，但是如果配置指令包含空格则一定要括起来

## 指令参数

指令参数使用一个或多个空格或 TAB 与指令分隔开。指令的参数由一个或多个 TOKEN 串组成。

TOKEN 串之间由空格或 TAB 分隔开，TOKEN 串分为简单字符串或复合配置块，复合配置块即由大括号括起来的一堆内容。一个复合配置块中可能包含若干其他的配置指令。如果一个配置指令的参数全部由简单字符串构成，也就是不包含复合配置块，那么就称为**简单配置项**，相反有**复杂配置项**

对于简单配置项，结尾使用 `;`结束。对于复杂配置项，包含多个 TOKEN 串，一般都是简单 TOKEN 串放在前面复杂的放在后面。

## 指令上下文

`nginx.conf` 中的配置信息，根据逻辑上的意义，对其进行了分类，也就分成了多个作用域，或者称之为配置指令上下文。不同的作用域含有一个或多个配置项。

当前`nginx`支持的几个指令上下文：
- `main`:Nginx 运行时与业务功能无关的部分，如工作进程数、运行身份等
- `http`:与提供 http 服务相关的一些配置参数，如是否使用`keepalive`等
- `server`:http服务上支持若干虚拟主机，每个虚拟主机对应一个 `server`配置选项。配置项中包含该虚拟主机相关的配置。在提供`mail`服务代理时也可以建立若干`server`
- `location`: http 服务中某些特定的 URL 对应的一系列配置项
- `mail`:实现 email 相关的 SMTP、IMAP、POP3 代理时共享的一些配置。

指令上下文，可能有包含的情况出现。如通常 http 上下文和 mail 上下文一定出现在 main 上下文中，在一个上下文中可能包含另一个类型的上下文多次如 http 服务如果包含了多个虚拟主机就会包含多个`server`上下文

示例配置：
```shell
user nobody;
worker_processes 1;
error_log logs/error.log info;

events {
	worker_connections 1024
}

http {
	server {
		listen 80;
		server_name www.linuxidc.com;
		access_log logs/linuxidc.access.log main;
		location / {
			index index.html;
			root /var/www/android.com/htdocs;
		}
	}
	server {
#...
	}
}
mail {
...
}
```