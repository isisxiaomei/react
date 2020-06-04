# 1 定义变量
```js
@ccA:'blue';
div {
    color: @ccA;
}
```
# 2 可以嵌套
```js
// 示例1：css
div {
    color:red
}

div a {
    color:blue
}

// 示例2：less嵌套样式
div {
    color:red;
    a {
        color: blue;
    }
}
```
# 3 &符号使用

