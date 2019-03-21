# LDAP

[原文](http://www.cnblogs.com/obpm/archive/2010/08/28/1811065.html)

## 1.简介

LDAP(Lightweight Directory Access Protocol，轻量级目录访问协议)，是实现提供被称为目录服务的信息服务。目录服务是一种特殊的数据库系统，其专门针对读取，浏览，搜索进行了特定的优化。目录一般用来包含描述性的，基于属性的信息并支持精细复杂的过滤能力。目录一般不支持通用数据库针对大量更新操作需要的复杂事务管理或者回滚策略。而目录服务的更新一般都很简单，这种目录可以存储包括个人信息、web链结、jpeg图像等信息。为了访问存储在目录中的信息就要使用运行在 TCP/IP 之上的访问协议——LDAP

LDAP 目录中的信息按照树形结构组织，具体信息存储在条目（entry）的数据结构中。条目相当于关系数据库中表的记录；条目是具有区别名 DN（Distinguished Name）的属性。DN 用来引用条目，相当于表中的关键字。属性由类型和一个或多个值构成，相当于数据库中的字段由字段名和字段类型构成，只是为了方便检索的需要。LDAP 中的 Type 可以有多个 Value，而不是关系数据库中为了降低数据的冗余性要求实现各个域必须是不相关的。LDAP 中条目的组织一般按照地理位置和组织关系进行组织，非常直观。LDAP 将数据存放到文件中，为了提高效率可以使用基于索引的文件数据库而不是关系数据库。类型的一个例子就是 mail，其值是一个邮件地址。

LDAP 的信息按照属性结构存储，在树根一般定义国家或域名(dc=com)，在其下往往定义一个或者多个组织或组织单元。一个组织单元可能包含诸如柜员、大楼内所有打印机信息等。此外，LDAP 支持对条目能够和必须支持哪些属性进行控制，这是由一个特殊的称为对象类别的属性来实现的(objectClass)。该属性也决定了该条目必须遵循的一些规则。

### 简称对应

- o-organization(组织-公司)
- ou-organization unit(组织单元-部门)
- c-countryName(国家)
- dc-domainComponent(域名)
- sn-suer name(真实名称)
- cn-common name(常用名称)

## 2.目录设计

设计目录结构是 LDAP 最重要的方面之一。通过一个例子。假设有一个位于美国 US（c=US）而且跨越多个州的名为 Acme(o=Acme)的公司。Acme 公司希望为所有雇员实现一个小型的地址簿服务器。

从一个简单的组织 DN 开始: `dn: o=Acme,c=US`

Acme 所有的组织分类和属性将存储在该 DN 之下，该 DN 在该服务器的目录中是唯一的。Acme 希望将雇员的信息分为两类: 管理者 和 普通雇员。这种分类产生的相对区别名(RDN,表示相对于顶点 DN)就是：
dn: ou=Manager, o=Acme, c=US
dn: ou=Employee o=Acme c=US
下面就是分层结构的形成，顶点是 US 的 Acme，下面是管理者组织单元和雇员组织单元，因此包括 Manager 和 Employee 的 DN 组成为：
dn: cn=Jasn H Smith ou=Manager o=Acme c=US
dn: cn=Ray D.Jons ou=Employee o=Acme c=US
dn: cn=Eric S.Woods ou=Employee o=Acme c=US

为了引用 Jasn H.Smith，LDAP 将采用 cn=Jason H.Smith的 RDN，然后和前面的父条目结合在一起就形成如下的结构：
cn=Jason H.Smith
    +ou=Manager
        +o=Acme
            +c=US
-> dn: cn=Jason H.Smith,ou=Manager,o=Acme,c=US