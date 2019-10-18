# eslint 认识

ESLint 是 JavaScript 代码中识别好和报告匹配模式的工具，其目标是保证代码的一致性和避免错误。许多方面和 JSLint、JSHint 类似，除了个别例外：
1. ESLint 使用 Espree 解析 JavaScript
2. ESLint 使用 AST 去分析代码中的模式
3. ESLint 是完全插件化的，每一个规则都是一个插件并且你可以在运行时添加更多规则。

## Install & Use

`npm install eslint --save-dev/--global`

`eslint --init`

可以在 `.eslintrc` 中看到许多规则：
```js
{
    "rules": {
        "semi": ["error", "always"]
    }
}
```

"semi" 是规则中的名称，第一个值是错误级别。可以使用：`off`或`0`关闭，`warn`或`1`警告，`error`或`2`设置错误（退出码为1）

