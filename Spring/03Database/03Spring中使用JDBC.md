# Spring 中使用 JDBC

## 使用原生 JDBC 代码

如果使用 JDBC 所提供的直接操作数据库的 API，需要负责处理与数据库访问相关的所有事情，其中包括管理数据库资源和处理异常。如：

```java

```

## 使用 JDBC 模板

Spring 的 JDBC 框架承担了资源管理和异常处理的工作。从而简化了 JDBC 代码，让我们只需要编写从数据库读写数据的必需代码

Spring 将数据访问的样板代码抽象到模板类中，Spring 为 JDBC 提供了三个模板类以供选择：
- JdbcTemplate: 最基本的 JDBC 模板，这个模板支持简单的 JDBC 数据库访问功能以及基于索引参数的查询
- NamedParameterJdbcTemplate: 使用该模板类执行查询时可以将值以命名参数的形式绑定到 SQL 中而不是使用简单的索引参数
- SimpleJdbcTemplate: 利用 Java 5 的一些特性如自动装箱等简化 JDBC 模板使用

从 Spring3.1 开始 SimpleJdbcTemplate 已经被废弃，对于大多数 JDBC 任务来说，JdbcTemplate 就是最好的方案。

**配置 JDBC 模板**
```java
@Bean
public JdbcTemplate jdbcTemplate(DataSource dataSource){
    return new JdbcTemplate(dataSource) ;
}
```

此时就可以使用 jdbcTemplate 来访问数据库：

```java
@Repository
public class Test implements TestRepository {
    private JdbcOperations jdbcOperations ;

    @Inject
    public Test(JdbcOperations jdbcOperations){
        this.jdbcOperations = jdbcOperations;
    }

    ...
}
```

JdbcOperations 是一个接口，定义了 JdbcTemplate 所实现的操作，通过注入 JdbcOperations 而不是具体的 JdbcTemplate 能够保证 Test 类通过 JdbcOperations 接口和 JdbcTemplate 保持松耦合。

当然也可以显式使用 JDBC 声明 bean。

在具备了可用的 JdbcTemplate 之后：

```java
public void addTest(Model model){
    jdbcOperations.update(INSERT_TEST, model.getUsername(), ..);
}
```

现在这个方法中没有了创建连接和语句的代码，也没有异常处理的代码，只有单纯的数据插入代码。当 update 方法被调用时，JdbcTemplate 将会获取连接、创建语句并执行对应的 SQL。

JdbcTemplate 也简化了数据的读取操作。

```java
public Spitter findOne(long id){
    return jdbcOperations.queryForObject(SLECT_SQL, new SpitterRowMapper(), id) ;
}
...
private static final class SpitterRowMapper implements RowMapper<Spitter>{
    public Spitter mapRow(ResultSet rs, int rowNum) throws SQLException{
        return new  Spitter(rs.getLong("id"), rs.getString("username"));
    }
}
```

在这个 findOne() 方法中使用了 JdbcTemplate 的 queryForObject() 方法来从数据库中查询 Spitter，queryForObject 三个参数：
- String 对象，包含了要从数据库中查找数据的 SQL
- RowMapper 对象，用来从 ResultSet 中提取数据并构建域对象
- 可变参数列表，列出了要绑定到查询上的索引参数值。

真正奇妙的事情发生在 SpitterRowMapper 对象中，它实现了 RowMapper 接口，对于查询返回的每一行数据，JdbcTemplate 将会调用 RowMapper 的 mapRow 方法，并传入一个 ResultSet 和包含行号的整数。

由于 RowMapper 只声明了一个 mapRow 方法，因此它符合函数式接口的标准，这意味着如果使用 Java 8 开发应用的话，可以使用 Lambda :
```java
public Spitter findOne(long id){
    return jdbcOperations.queryForObject(SELECT_SQL, 
            (rs, rowNum)->{return new Spitter(rs.getLong(id),rs.getString("username"));}, 
            id);}
}
```

还可以使用 Java 8 的**方法引用**。

