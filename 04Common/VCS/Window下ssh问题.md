# Windows下 ssh 登录

遇到`Permission Deny`，但是已经添加了 ssh 公钥。

需要添加 sshkey 到 ssh-agent 中：
- 执行`eval "$(ssh-agent -s)"`确认 ssh-agent 处于开启状态
- 执行`ssh-add ~/.ssh/id_rsa`添加 ssh_key 到 ssh agent，该步骤可能要求输入密码