# FAQ

## import map（导入映射表）

`import map`可以让我们通过原生`ES`使用模块，该特性在`Chrome 89+`中支持  
等将来该特性兼容性较好，浏览器内置加载器完善后，简单项目就可以避免使用`Vite、Webpack`等工具了

```javascript
  // 1. 引入map，type="importmap"
  <script type="importmap">
    {
      "imports": {
        "@/": "/src/",
        "moment": "/node_modules/moment/dist/moment.js",
        "moment/": "/node_modules/moment/",
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
      }
    }
  </script>

  // 2. 使用，type="module"
  <script type="module">
    import { createApp } from 'vue'
    import App from '@/App.js';
    import moment from 'moment';

    createApp({
      data() {
        return {
          message: 'Hello Vue!'
        }
      }
    }).mount('#app')
  </script>
```

## Object.assign和扩展运算符进行对象合并区别
在Vue源码中看到这么一句代码 `export const extend = Object.assign`，所以想到该问题
```javascript
// 先看下面输出什么？
const a1 = {
  count: 1
}
const b1 = {
  count: 1
}

const a = Object.assign(a1, { count: 2 })
const b = {...b1, count:2}
a.count = 3
b.count = 3

console.log(a1.count) // 3 原数据被改变
console.log(b1.count) // 1

a1.count = 4
b1.count = 4
console.log(a.count) // 4 新数据被改变
console.log(b.count) // 3
```
对于单层对象，`Object.assign` 是对第一个对象的引用，因此无论是修改原始数据还是修改新数据，都会发生变化。使用扩展运算符，相当于是复制了一份数据，不会相互影响。
对于多层引用数据，无论是使用`Object.assign`还是解构，内层的引用类型都是引用了同一个内存地址，会相互影响。

## cloneNode()克隆元素时，不会克隆自定义属性
```js
const el = document.getElementById('root')
el.value = 1
el._value = 2
const el2 = el.cloneNode(true)
console.log(el2.value) // 1
console.log(el2._value) // undefined
```