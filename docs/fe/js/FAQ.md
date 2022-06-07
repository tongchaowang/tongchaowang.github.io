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
