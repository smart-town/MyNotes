# Effect 概念

概括来说，从 Saga 内触发异步操作总是由 yield 一些声明式的 Effect 来完成。也可以直接 yield Promise，但是这会让测试更为困难。

一个 Saga 所做的实际上是组合那些所有的 Effect，共同实现所需的控制流。

使用 Effect 诸如 call 或 put，与高阶 API 如 takeEvery 结合，让我们实现与 `redux-thunk`同样的东西，但是有额外易于测试的好处。