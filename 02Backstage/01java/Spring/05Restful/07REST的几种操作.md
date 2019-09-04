# REST 客户端的几种操作

## GET 资源

两种执行 GET 请求的方法：`getForObject()` 和 `getForEntity()`。每种又有 3 种重载形式

```java
<T> T getForObject(URI url, Class<T> responseType) throws RestClientException ;
<T> T getForObject(String url, Class<T> responseType, Object... urlVariable) throws ...;
<T> T getForObject(String url,Class<T> responseType,Map<String,?> uriVariables) throws ... ;

<T> ResponseEntity<T> getForEntity(URI url,Class<T> responseType) throws ...;                                          
```