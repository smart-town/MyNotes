# Junit 阅读

## 简单示例

`JunitCore.runClasses(Test1.class)` 开始。

## 整体流程

1. `runClasses(Test1.class)`
2. `runClasses(new Computer(), classes)`
3. `new JunitCore.run(computer, classes)`
4. `run(Request.classes(computer, classes))`
5. `run(Request.getRunner())`
6. `run(runner)`
7. `runner.run()`

- Request.classes(computer, classes)
    通过 computer 生成一个 runner，再包装起来返回 Request



