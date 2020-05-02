# Mongo

## 1.概述

跨平台、面向文档的数据库。两个基本概念：**集合(Collection)**和**文档(document)**

**集合**就是一组 MongoDB 文档，相当于 RDBMS 中**表**的概念。集合位于一个单独的数据库中，一个集合内的多个文档可以有多个不同 的字段。一般来说，集合中的文档有着相同或者相关的目的。**文档**就是一组键值对。

关系型数据库 | MongoDB
----- | -----
数据库 | 数据库
表 | 集合
行 | 文档
列 | 字段
表 Join | 内嵌文档
主键 | 主键（Mongo 提供的默认 key_id）

## 2，安装运行

MongoDB 需要一个 data 文件夹保存文件。默认位于：`c:\data\db`。

如果是其他目录，则需要运行 mongodb 时指定目录。`mongodb --dbpath "d:\mongodb\data\db"

## 3. 数据库操作

操作 | 意义
----- | -----
`use + 数据库` | 创建数据库，如果存在则返回该数据库
`db` | 检查当前所选择的数据库
`show dbs` | 检查数据库列表
`db.dropDatabase()` | 删除选定数据库。即意味着先`use dbname`，再`db.dropDatabase()`

## 4. 集合操作

操作 | 意义
----- | -----
`db.createCollection(name,options)` | 创建集合。name 为所要创建集合名称，options 可选，指定有关内存大小和索引选项
`show collections` | 查看创建了的集合
`db.COLLECTION_NAME.drop()` | 删除集合

### options
`capped` 如果为 true，则创建固定集合，即到达最大值时自动覆盖最早集合。该值为 true 时**必须**指定 size 参数
`autoIndexID` 如果为 true，自动在`_id`字段创建索引，默认为`true`
`size`为固定集合指定最大值，以字节计算
`max`指定固定集合中包含文档的最大数量

示例：
```shell
use test
db.createCollection("myCollection",{capped:true,autoIndexID:true,size:614200,max:1000})
```

## 5.数据类型

数据类型 | 描述
----- | ------
String | 字符串
Integer | 整数，根据服务器分为 32 位或 64 位
Boolean | 布尔
Double | 双精度浮点
Min/Max keys | 将一个值与 BSON(二进制的JSON)元素的最低值和最高值作比较
Arrays | 用于将数组或列表或多个值存储为一个键
TimeStamp | 时间戳
Object | 内嵌文档
Null | 空值
Symbol | 符号，基本等同于字符串类型，但不同的是它一般用于采用特殊符号类型的语言
Date | 日期时间。
ObjectID | 对象 ID，用于创建文档的 ID
Code | 代码类型，存储 js 代码
Regular Expression | 正则表达式类型用于存储正则表达式
BinaryData | 二进制数据

## 6.文档相关

### 插入文档
`insert()`或`save()`方法。
`db.COLLECTION_NAME.insert(document)`。在插入的文档中，如果没有指定`_id`参数，那么 MongoDB 将自动为文档指定唯一 ID。

**注意**可以传入一个文档数组

`db.COLLECTION_NAME.save(document)`，如果没有指定`_id`则与`insert()`几乎一样，但是如果指定了`_id`则会覆盖指定`_id`的全部数据

### 查询文档
`find()`方法。`db.COLLECTION_NAME.find()`。
格式化显示结果`pretty()`。`db.mycol.find().pretty()`

`findOne()`方法只返回一个结果

指定条件：
操作 | 格式 | 例子
----- | ----- | -----
等于 | `{key:value}` | db.mycol.find({"by":"point"}).pretty()
小于 | `{key:{$lt:value}}` | db.mycol.find({"likes":{$lt:50}}).pretty()
小于或等于 | `{key:{$lte:value}}` | .
大于 | `{key:{$gt:value}}` | .
不等于 | `{key:{$ne:value}}` |.

#### 排序

`sort({"key": 1/-1})`，默认 1 表示升序，`-1`表示降序。

#### And

在 find() 方法中传入多个键，并且以逗号分隔。如`db.mycol.find({key:value,key2:value2})`此时 mongo 将其看作`AND`条件

#### OR

```shell
db.mycol.find({$or:[{key1:value1},{key2:value2}]})
```

### 更新文档

`db.COLLECTION_NAME.update(SELECTION_CRITERIA,UPDATE_DATA)`

如：`db.mycol.update({"title":"MongoView"},{$set:{"title":"new View"}})`

Mongo 默认更新单个文档，如果要更新多个文档需要设置`multi`参数位`true`

`save`方法用传入文档替换已有文档

### 删除文档

`remove()`方法

`db.COLLECTION_NAME.remove(DELETION_CRITERIA)`

如果只想删除第一条记录：`db.COLLECTION_NAME.remove(CRITERIA,1)`

