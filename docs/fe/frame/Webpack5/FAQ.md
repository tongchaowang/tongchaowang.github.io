# FAQ

## 模块联邦

Module Federation

## 分割代码的几种方式

1. 基于入口依赖的，配置`dependOn`参数

```javascript
// webpack.config.js
const path = require("path");
module.exports = {
  mode: "development",
  entry: {
    a: {
      import: "./src/.js",
      dependOn: "lodash",
    },
    b: {
      import: "./src/b.js",
      dependOn: "lodash",
    },
    lodash: "lodash", // 将a,b模块中的lodash进行抽离
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    runtimeChunk: "single",
  },
};
```

2. 基于插件，将公共依赖提取到入口 chunk 或者新 chunk 中，配置`SplitChunksPlugin`

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    a: "./src/a.js",
    b: "./src/b.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
```

3. 动态导入，使用`import()/require.ensure`

```javascript
// index.js
import("lodash").then(({ default: _ }) => {
  //...
});
```
