# JPA

Java Persistence API，通过注解或XML描述 对象和关系表之间的映射关系，并将实体对象持久化到数据库中。

- ORM 映射元数据：JPA 支持 XML 和注解两种元数据形式，元数据描述对象和表之间的关系，框架据此将实体对象持久化到数据库表中，如`@Entity`、`@Table`
- JPA 的 API: 用来操作实体对象，执行 CRUD 操作。
- JPQL 查询语言：通过面向对象而非面向数据库的查询语言查询数据，避免程序 SQL 紧密耦合。

但是需要注意，JPA 仅仅是一种规范，也就是说 JPA 仅仅定义了一些接口，而接口是需要实现才能工作的。所以底层需要某种实现，而 Hibernate 就是实现了 JPA 接口的  ORM 框架。

## SpringDataJPA

spring data jpa 是 spring 提供的一套简化 jpa 开发的框架，按照约定好的方法命名规则写 dao 层接口，就可以在不写接口实现的情况下，实现对数据库的访问和操作。同时提供了很多除了 CRUD 之外的功能。如分页、排序等。

Spring Data JPA 可以理解为 JPA 规范的再次封装抽象，底层还是使用了 Hibernate 的 JPA 技术实现。

## JPA ORM 映射

基本映射
对象 | 数据库 | annotion | 可选 annotion
---- | ---- | ----- | -----
Class | Table | @Entity | @Table(name="tablename")
property | column | - | @Column(name="columnname")
property | primary key | @Id | @GeneratedValue
property | NONE | @Transient

## JPA 和 MyBatis

mybatis 是一个半自动的持久层框架，相对于全自动的 hibernate 更加灵活可控。

mybatis 学习成本低于 hibernate

使用 hibernate 需要对它有深入了解，尤其是缓存方面。