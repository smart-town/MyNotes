1. org.hibernate.lazyinitializationexception could not initialize proxy - no session

这是由于 Hibernate 默认启用延迟化。如果不考虑性能问题：

xml:`default-lazy="false"`

注解:`@Proxy(lazy=false)` 添加到所有实体类