# Windows Order Record

根据进程名查看进程号：`tasklist | findstr chrome`

根据进程名查看有多少个进程：`tasklist | find /c 'chrome'`

根据进程名称删除进程：`taskkill /IM "chrome.exe" /F` 或 `get-process -Name "chrome" | stop-process`

**强制刷新环境变量**: `refreshenv` (注意仅仅在 cmd 下生效)

查看所有环境变量：`set`，查看指定的环境变量：`set varname`