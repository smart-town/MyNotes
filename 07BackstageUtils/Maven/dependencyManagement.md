# DependencyManagement

`<dependencyManagement>`标签用于统一管理项目依赖版本。

由于`MAVEN`只有单继承，即通过`<parent>`，对于特别复杂的项目，则必然有一个维护了大量的`<dependencyManagement>`的父工程，则维护起来十分不便。因此，通过模块化，将不同模块的统一依赖配置分别放到不同的模块中，再通过`<dependencyManagement>`**导入**多个父模块。注意必须加上`<type>pom</type>`和`<scope>import</scope>`指明。