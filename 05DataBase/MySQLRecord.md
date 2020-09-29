# MySQL 小纪

## MySQL 常用命令记录

命令 | 描述
------ | -------
`show processlist;` | 查看当前连接是否过多。


## 常用语句小纪

### 关于变量声明
```sql
# 使用 set 或 select 直接赋值，变量名以 @ 开头，可以在一个会话的任何地方声明，作用域为整个会话，称为用户变量
set @var=1;

# 以 declare 声明的变量，只能在存储过程中使用，即存储过程变量
declare var1 int default 0;
```