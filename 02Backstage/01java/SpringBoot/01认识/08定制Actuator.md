# 定制 Actuator

Actuator 有多种定制方式，包括以下五项：
- 重命名端点
- 启用和禁用端点
- 自定义度量信息
- 创建自定义仓库来跟踪数据
- 插入自定义的健康指示器

## 修改端点 id

每个 Actuator 端点都有一个 id 可以决定端点的路径，如修改`/shutdown`端点：
```yml
endpoints:
    shutdown:
        id: kill
```

## 启用和禁用端点

禁用`/metrics`端点：
```yml
endpoints:
    metrics:
        enabled: false
```

如果你只想打开一两个端点，那就先禁用所有的端点，然后启用几个想要的：
```yml
endpoints:
    enabled: false
    metrics:
        enabled: true;
```

【注意】似乎 boot2.0 已经做了更改：
```yml
management:
    endpoint:
        metrics:
            enabled: true
```

另外，Actuator 的端点访问需要鉴权，可以将其安全校验关闭`management.security.enabled=false`

2.0.0版本的SpringBoot的actuator启动端点监控web端默认加载默认只有两个info, health可见的页面节点

如果需要显示更多需要在application.properties配置文件中添加

```properties
management.endpoints.web.exposure.include=*
management.endpoints.web.exposure.exclude=env,beans
```
前者是包含，后者是排除。

## 添加自定义度量信息

## 插入自定义健康指示器

实现`HealthIndicator`接口。

## 保存数据到数据库中

## 保护 Actuator 端点

