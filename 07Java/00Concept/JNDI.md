# JNDI

## 认识

Java 命名与目录接口。Java Naming and Directory Interface。

## 没有 JNDI 时

程序员开发时，知道要开发访问 MySQL 数据库的应用，于是将一个对 MySQL JDBC 驱动程序类的引用进行编码：

```java
Connection conn = null;
try {
    Class.forName("com.mysql.jdbc.Driver", true, Thread.currentThread().getContextClassLoader());
    conn = DriverManager.getConnection("jdbc:mysql://database?user=xxx&password=xxx");

    //使用 conn 并进行 SQL 操作

    conn.close();
} catch(Exception e){
    e.printStackTrace() ;
} finally{
    if(conn != null){
        try{conn.close();}
        catch(SQLException e){}

    }
}
```

这样做存在的问题在于，数据库服务器的名称、用户名、口令都会改变，由此引发 JDBC URL 需要修改。数据库可能需要修改为别的产品。原配置的连接池参数可能需要调整等

程序员不应该关心，具体的数据库后台，URL 是多少等。编写的程序应该没有对 JDBC 程序的引用。

## 有了 JNDI 的做法

在配置文件中配置数据源：如 JBoss 中 mysql-ds.xml:

```xml
<dataSources>
    <local-tx-datasource>
        <jndi-name>MySqlDS</jndi-name>
        <connection-url>jdbc:mysql://localhost:3306/lw</connection-url>
        <driver-class>com.mysql.jdbc.Driver</driver-class>
        <user-name>root</user-name>
        <password>password</password>
    </local-tx-datasource>
</dataSources>
```

在程序中引用数据源

```java
Connection conn = null;
try {
    Context ctx = new InitialContext() ;
    Object dataSourceRef = ctx.lookUp("java:MySqlDS");
    conn = (DataSource)dataSourceRef.getConnection() ;
    ...
} catch(Exception e){
    ...
} finally {...}
```

虽然代码相似但是现在的程序可以不必关心具体的 JDBC 参数了。

## JNDI 的扩展

JNDI 在满足了数据源配置的要求的基础上，还进一步扩充了作用：所有与系统外部的资源的引用，都可以通过 JNDI 定义和引用。

所以在 J2EE 规范中，J2EE 的资源并不限于 JDBC 数据源，引用的类型有很多，其中包括资源引用、环境实体、EJB 引用等。

J2EE 的规范要求所有 J2EE 容器都要提供 JNDI 规范的实现，JNDI 在 J2EE 中的角色就是交换机。J2EE 组件在运行期间间接地查找其他组件、资源或者服务的通用机制，在多数情况下，提供 JNDI 供应者的容器可以充当有限的数据存储。这样管理员就可以设置应用程序的执行属性，并让其他应用程序引用这些属性。JNDI 在 J2EE 应用程序中的主要角色就是提供间接层，这样组件就可以发现所需要的资源，而不用了解这些间接性。