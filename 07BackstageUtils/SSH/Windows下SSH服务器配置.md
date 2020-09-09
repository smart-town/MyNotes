# Windows 下 SSH 服务器配置

## 公钥登录

编辑`C:/ProgramData/ssh/sshd_config`文件：
```
StrictModes no
PubkeyAuthentication yes

#Match Group administrators
#       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys

AllowUsers username
```