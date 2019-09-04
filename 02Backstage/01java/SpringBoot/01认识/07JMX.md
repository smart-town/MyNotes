# JMX

除了 REST 端点和远程 shell，Actuator 还将它的端点以 MBean 的方式发布了出来。可以通过 JMX 来查看和管理。使用 JMX 是管理 SpringBoot 应用程序的一个好方法，如果你已经在用 JMX 管理应用程序的其他 MBean，则尤其如此。

Actuator 的端点都发布在 org.springframework.org 下。