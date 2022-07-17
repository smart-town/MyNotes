# ServiceWorker

Service Worker 是浏览器和网络之间的虚拟代理。它们终于解决了前端开发人员多年来一直努力解决的一些问题，其中最值得关注的是，解决了如何正确缓存网站资源并使其在离线时可用的问题。

Service Worker 运行在一个与页面 JavaScript 主线程独立的线程上，并且无权访问 DOM 结构。这引入了一种与传统 Web 编程不同的方式：它的 API 是非阻塞的，并且可以在不同的上下文之间发送和接收信息。你可以分配给 Service Worker 一些工作，并通过`Promise`的方法在任务完成后接收结果。

它不仅仅提供离线功能，还可以做包括处理通知、在单独的线程上执行繁重的计算等事务。Service Worker 非常强大，因为它们可以控制网络请求，修改网络请求，返回缓存的自定义响应，或者合成响应。

**安全**：正是因为其非常强大，所以 Service Worker 只能在安全的上下文中执行，即 HTTPS。如果你想将代码推送到生产环境之前测试，可以始终在本机进行测试或设置 GitHub Pages。