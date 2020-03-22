# Activity 概述
`Activity`类是 Android 应用的关键组件，而`Activity`的启动和组合方式则是该平台应用模型的基本组成部分，在编程范式中，应用是通过`main`方法启动的，而 Android 系统不同，它会调用与其生命周期特定阶段对应的特定回调方法来启动`Activity`实例中的代码。

## Activity 概念
移动应用体验与桌面体验的不同之处在于，用户与应用的互动并不是总是从同一个位置开始，而是经常以不确定的方式开始。

`Activity`类的目的就是促进这种范式的实现。当一个应用调用另一个应用时，调用方应用会调用另一个应用中的`Activity`，而不是整个应用。通过这种方式，`Activity`充当了应用与用户互动的入口点。

`Activity`提供窗口供应用在其中绘制界面，此窗口通常会填满屏幕，但是可能也比屏幕小，并浮动在其他窗口上面。通常，一个`Activity`实现应用中的一个屏幕。大多数应用中包含多个屏幕，这意味着它们包含多个 Activity，通常应用中的一个`Activity`被指定为主`Activity`，这是用户启动应用时出现的第一个屏幕。然后每个`Activity`可以启动另一个`Activity`，以执行不同的操作。

虽然应用中各个`Activity`协同工作形成统一的用户体验，但是每个`Activity`与其他`Activity`之间只存在松散的关联，应用内不同`Activity`之间的依赖关系通常很小。事实上，`Activity`经常会启动属于其他应用的`Activity`。

## 配置清单
要使应用能够使用`Activity`，必须在清单中声明`Activity`及其特定属性。
### 声明 Activity
`<activity>`元素，必要属性为`android:name`，指定`Activity`类名称。
### 声明 intent 过滤器
`Intent`过滤器是 Android 平台一项非常强大的功能。借助这项功能，你不但可以根据显式请求启动`Activity`，还可以根据隐式请求启动`Activity`。当系统界面询问使用哪个应用执行任务时，就是`intent`过滤器在起作用。

要使用此功能，需要在`<activity>`中声明`<intent-filter>`属性。此元素定义包括`<action>`，以及可选的`<category>`或`<data>`元素。这些元素组合在一起，可以指定`Activity`能够响应的`intent`类型，如以下是一个配置发送文本数据并接收其他`Activity`文本数据发送请求的`Activity`：
```xml
<activity android:name=".ExampleActivity">
    <intent-filter>
        <action android:name="android.intent.action.SEND"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <data android:mimeType="text/plain"/>
    </intent-filter>
</activity>
```
上面的例子中，`<action>`指定`Activity`会发送数据，将`<category>`元素声明为`DEFAULT`可使得`Activity`能够接收启动请求。`<data>`元素指定此`Activity`可以发送的数据类型，调用上述`Activity`:
```java
Intent intent = new Intent();
intent.setAction(Intent.ACTION_SEND);
intent.setType("text/plain");
intent.putExtra(Intent.EXTRA_TEXT, textMessage);
startActivity(intent);
```
你不想让其他应用访问的 Activity 不应该包含`intent`过滤器。
### 声明权限
可以使用清单的`<activity>`标记来控制哪些应用可以启动某个`Activity`。父`Activity`和子`Activity`必须在清单中具有相同的权限，前者才能启动后者。如果你为父`Activity`声明了`uses-permisson`，则每个子 Activity 都必须具有匹配的元素。

如假设你的应用需要使用一个名为`SocialApp`的应用在社交媒体上分享文章，则`SocialApp`本身必须定义调用它的应用所需具备的条件：
```xml
<manifest>
    <activity android:name="..." 
        android:permission="com.google.socialapp.permission.SHARE_POST"/>
```
然后为了能够调用 SocialApp，你的应用必须匹配 SocialApp 清单中设置的权限：
```xml
<manifest>
    <uses-permission android:name="com.google.socialapp.permission.SHARE_POST"/>
</manifest>
```

## 管理 Activity 生命周期
一个 Activity 在其生命周期中经历多种状态，你可以使用一系列回调来处理状态之间的转换：
- `onCreate()` 必须实现，系统创建时触发。你的实现应该初始化 Activity 的基本组件。最重要的是，必须在此处调用`setContentView()`定义 Activity 界面的布局
- `onStart()` `onCreate()`退出后，Activity 进入已启动状态，并对用户可见。此回调包含 Activity 进入前台与用户进行互动之前的最后准备工作
- `onResume()` 系统会在 Activity 与用户互动之前调用此回调。此时该 Activity 位于 Activity 的顶部，并会捕获所有用户的输入。应用的大部分核心功能都是在`onResume`中实现的。其后面总是跟着`onPause`回调
- `onPause()` Activity 失去焦点进入已暂停状态时，系统调用该回调。如用户点击返回或最近使用按钮时就会出现此状态。当系统调用该回调时，通常意味着你的 Activity 仍然部分可用，但是大多数情况下这表明用户正在离开该 Activity，该 Activity 很快进入“已停止”或“已恢复”状态。
- `onStop()` 当 Activity 不再可见时，调用`onStop`。出现这种情况的原因是`Activity`被销毁，新的`Activity`启动，或者现有的`Activity`正在进入“已恢复”状态并覆盖了已停止的`Activity`。所有这些情况下，停止的 Activity 都将完全不再可见。系统调用的下一个回调将是`onRestart`h或者`onDestroy()`
- `onRestart()` 处于已停止状态 Activity 即将重启时调用。其后面总是跟着`onStart()`
- `onDestroy()` 销毁 Activity 之前调用。实现该回调是为了释放资源。