# REST 客户端

在 REST API 中暴露资源只代表了会话的一端。如果发布的 API 没有人关心和使用的话，那也没有价值。通常来讲，移动或者 javascript 应用会是 RESTAPI 的客户端。但是 Spring 应用也完全可以使用这些资源。

## 编写 REST 客户端

通常的写法：
```java
public Profile fetchFacebookProfile(String id){
    try {
        HttpClient client = HttpClients.createDefault() ;
        HttpGet request = new HttpGet("http://graph.facebook.com/"+id) ;
        request.setHeader("Accept", "application/json") ;

        HttpResponse response = client.execute(request) ;

        HttpEntity entity = response.getEntity() ;
        ObjectMapper mapper = new ObjectMapper() ; //将响应映射为对象
        return mapper.readValue(entity.getContent(), Profile.class) ;
    } catch(Exception e){
        throw new RuntimeException(e) ;
    }
}
```

可以看到，这里涉及到了而很多代码。虽然使用了方便的 Jakarta Commons HTTP Client 发起请求以及使用 Jackson JSON processor 解析响应。

但是实际上，上面的代码中，只有少量代码与实际获取信息有关。其他的即使换一个方法使用其他的 REST 资源，也会有很多代码相同。

另外还有一些地方会抛出 IOException 异常，因为其是检查型异常所以必须捕获。

鉴于在资源使用上有如此多的样板代码，你可能会觉得最好的方式是封装通用的代码并参数化可变的部分。这正是 Spring 的 `RestTemplate`所做的事情。正如`JdbcTemplate`处理了 JDBC 数据访问时的丑陋部分一样。

## 了解 RestTemplate 操作

`RestTemplate`定义了 36 个与 REST 资源交互的方法，其中大多数都对应于 HTTP 的方法。其实这里面只有 11 个独立的方法，其中有十个有三种重载形式，而第十一个有六种重载。

大多数的三种重载形式：
- 使用 java.net.URI 作为 URL 格式，不提供参数化 URL
- 使用 String 作为 URL 格式，并使用 Map 指明 URL 参数
- 使用 String 作为 URL 格式，并使用可变参数列表指明 URL 参数