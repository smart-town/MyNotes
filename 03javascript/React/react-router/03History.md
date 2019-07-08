# History

React Router 是建立在 [history](https://github.com/ReactTraining/history) 之上的。简单来说，一个 history 知道如何去监听浏览器地址栏的变化，并解析这个 URL  转换为 `location`对象。然后 router 使用它匹配到路由，最后正确渲染对应的组件。