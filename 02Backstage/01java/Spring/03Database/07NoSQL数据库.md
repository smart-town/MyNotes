# 使用 NoSQL 数据库

## 数据

有一些数据的最佳表现形式是文档（document）。也就是说，不要将这些数据分散到多个表、节点或者实体中，将这些信息收集到一个非规范化(文档)的结构中会更有意义。尽管两个或者两个以上的文档有可能彼此产生关联。但是通常来讲，文档是独立的实体。能够按照这种方式优化并处理文档的数据库，称之为文档数据库。

### 文档数据库不适合的场景

文档数据库不是通用的数据库，它们所擅长解决的只是一个很小的问题集。有些数据具有明显的关联关系，文档型数据库并没有针对存储这样的数据进行优化。如社交网络不同应用之间的关联性。这种情况就不能放到文档型数据库中。

## MongoDB

