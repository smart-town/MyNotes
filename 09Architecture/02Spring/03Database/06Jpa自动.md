# 自动化的 JPA Repository

对于已经有的如：
```java
public void addSpitter(Spitter spitter){
    entityManager.persist(spitter) ;
}
```
在任何具有一定规模的应用中，你可能会以完全相同的方式多次编写这样的方法。Spring Data JPA 能够终结这种类似的样板式的代码。

SpringData 让我们能够只用编写 Repository 接口就可以了，而不用编写实现类。

## 使用

### 扩展接口

编写 Spring Data JPA 关键在于从一组接口中挑选一个进行扩展：`JpaRepository`：
```java
public interface SpitterRepository extends JpaRepository<Spitter, Long>{}
```
这样声明后，JpaRepository 就知道这是一个用来持久化 Spitter 对象的 Repository，并且 Spitter 的 ID 类型为 Long。另外它还会继承 18 个执行持久化操作的通用方法，如保存、删除。

我们不需要编写任何实现类，就可以直接使用。

### 配置 Spring Data JPA

为了要求 Spring Data 创建 SpitterRepository 的实现，我们需要配置`<jpa:repositories>`元素，指定其要扫描的包，以便其能够查找扩展自`Spring Data JPA Repository`接口的所有接口。如果发现了扩展自 Repository 的接口，它会**自动生成**（在应用启动的时候）这个接口的实现。

如果使用 Java 配置则直接使用`@EnableJpaRepository`就可以了。如：`@EnableJpaRepository(basePackages="test")`

回到`SpitterRepository`接口，它扩展自`JpaRepository`而`JpaRepository`扩展自`Repository`，这样 Spring Data 扫描 Repository 时就会找到`SpitterRepository`并创建其对应的实现类。

SpringDataJPA 很棒的地方在于它能够提供 18 个便利的方法来进行通用的 JPA 操作而无需编写任何持久化代码，但是如果需求超过了它所提供的 18 个方法呢？

### 定义查询方法

假设需要根据 name 查找 Spitter 对象，将 SpitterRepository 接口改为：
```java
public interface SpitterRepository extends JpaRepository<Spitter, Long>{
    Spitter findByUsername(String username) ;
}
```
这个方法签名就会告诉 Spring Data JPA 足够的信息，来自动创建其实现。

**当创建 Repository 实现时，Spring Data 会检查 Repository 接口的所有方法**，解析方法的名称，并基于被持久化的对象来试图推测方法的目的。本质上，Spring Data 定义了一组小型的领域特定语言(domain-specific language, DSL)。这里持久化细节是通过`Repository`方法的签名来实现的。

Spring Data 能够知道这个方法是要查找 Spitter 的，因为我们使用了 Spitter 对 JpaRepository 进行了参数化。方法签名 `findByUsername`确定该方法需要使用`username`属性匹配来查找 Spitter，而 username 是作为参数传递到方法中来的。另外因为在方法签名中定义了该方法要返回一个 Spitter 对象而不是一个集合因此它只会查找一个 username 属性匹配的 Spitter。

**Repository 的方法**是由一个动词、一个可选主题、关键词 By 以及一个断言组成。`findByUsername`：动词`find`,断言`Username`，主题并没有指定，暗含的主题是`Spitter`。

对于`readSpitterByFirstnameOrLastname()`方法而言，动词为`read`。Spring Data Jpa 允许在方法中使用四种动词：`get`、`read`、`find`和`count`。其中前三个是同义的，都用来查询数据并返回对象。而`count`则返回匹配对象的数量。

Repository 的主题是可选的。对于大部分的场景来说，主题会被省略掉。**要查询的对象类型是通过参数化 JpaRepository 接口来确定的**，而不是方法名称中的主题。**例外情况**是，如果主题名称以`Distinct`开头那么生成查询时会确保返回的结果集中不包含重复记录。

**断言**指定了限制结果集的属性。在断言中，会有一个或者多个限制结果集的条件，每个条件必须引用一个属性，并且还可以指定一种比较操作。如果省略比较操作符的话，那么暗含是相等的操作。我们可以选择其他的比较操作如：
```
1. IsAfter、After、IsGreaterThan、GreaterThan
2. IsGreaterThanEqual、GreaterTheanEqual
3. IsBefore Before IsLessThan LessThan
4. LessTheanEqual
5. Between
6. IsNull
7. IsIn In
8. IsNotIn
9. IsLike、Like
10. IsStartingWith、StartsWith
11. Containing
```

要比较的属性就是方法的参数：
`List<Spitter> readByFirstnameOrLastname(String first, String last)`

要处理 String 类型属性时，条件中还可能包含`IgnoringCase`或者`IgnoresCase`这样执行比较时忽略大小写：`readByFirstnameIngoringCaseOrLastnameIgnoresCase()`，作为替代还可以在最后只添加`AllIngoresCase`。

也可以在方法名称结尾添加`OrderBy`实现结果集排序。`readByFirstnameOrderByLastnameAsc()`

**注意**方法参数的顺序必须与方法名称的操作符相匹配。

现在我们只需要通过使用**属性名**和**关键字**就可以构造`Repository`方法签名，让 Spring Data JPA 生成方法实现，完成几乎所有能够想到的查询。

不过，Spring Data 这个小型的 DSL 仍然有其限制性，有时候通过方法名称表达预期查询十分复杂。遇到这种情况，Spring Data 能够让我们通过`@Query`注解来解决问题。

### 声明自定义查询

如果所需数据无法通过方法签名进行恰当描述，那么可以使用`@Query`注解为 Spring Data 提供要执行的查询:
```java
@Query("select s from Spitter s where s.email like '%gmail.com'")
List<Spitter> findAllGmailSpitters();
```

依然不需要编写方法实现，Spring Data 会自动完成。对于一个很长的方法名，通常都可以采用这样的方式。

### 混合自定义功能

有些时候，我们需要的功能是不能通过 Spring Data 命名描述来实现的，甚至不能通过`@Query`来实现。尽管 Sring Data JPA 很棒但是仍然有其局限性，可能需要我们直接使用传统的方式编写`Repository`。

如果所需要做的无法通过 Spring Data JPA 来实现，那么必须要在一个比 Spring Data JPA 更低的层级上使用 JPA。好消息是没有必要完全放弃，我们只需要在必须使用较低层级的地方使用这种传统方式，而对于 Spring Data JPA 可以实现的仍然使用 Spring Data JPA。

当Spring Data Jpa为 Repository 接口生成实现的时候，**它还会查找一个**名字与接口相同并且添加了`Impl`后缀的类，如果这个类存在的话，Spring JPA Data会将它的方法与 Spring Data JPA 所生成的方法合并在一起。对于`SptterRepository`而言，要查找的类名为`SpitterRepositoryImpl`。

```java
public class SpitterRepositoryImpl implements SpitterSweeper{
    @PersistenceContext
    private EntityManager em ;
    public int eliteSweep(){
        String update = "UPDATE Spitter spitter SET spitter.status='Etitle'..." ;
        return em.createQuery(update).executeUpdate() ;
    }
}
```
此外还要确保 eliteSweep() 方法被声明在`SpitterRepository`接口中。

另外，`Impl`后缀只是默认的做法，如果想使用其他后缀的话，只需要配置`@EnableJpaRepositories`时设置`repositoryImplementationPostfix`属性即可。