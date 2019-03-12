# Entity

Java Persistence API 定义了两个注解：`@Entity`和`@Table`

@Entity 表明这个类是一个实体类，要与数据库做 orm 映射时，默认的表名就是类名。表中的字段就是类中的属性。

@Table 则会改变某些默认的映射规则。如表名、schema 等。可以添加索引和约束。如：
```java
@Entity(name="Acc")
@Table(name="account" //表名称
    catalog="mytest"//数据库名
    )
```