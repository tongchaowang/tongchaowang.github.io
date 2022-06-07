# FAQ

## Vue Composition API 和 React Hooks 的异同

[Vue.js](https://staging-cn.vuejs.org/guide/extras/composition-api-faq.html#comparison-with-react-hooks)  
`Vue Composition API`是 Vue3 推荐的一种语法风格，即组合式 API，在 Vue3 中可以同时使用选项式 API 和组合式 API 风格。`React Hooks`是 React16.8 推出的一种语法风格，是 Vue3 组合式 API 的灵感来源。

相同点：

- 关注点分离（这个是重点，Vue3 和 React Hooks 可以更好的将相同逻辑写在一起）
- 更好的逻辑复用（Vue2 中使用 mixins 进行逻辑复用会导致不清晰的 property 来源、命名空间冲突等问题，React 的 Class 语法需要通过高阶组件进行封装）
- 两种语法互相兼容

不同点：

- VUe3 中的 setup(）只会调用一次，React 中函数组件每次更新都会被调用
- Vue3 组合式语法可以在条件分支或者函数中，Hooks 只能写在顶层作用域，有严格的调用顺序
- Vue3 组合式语法会自动收集计算属性和侦听器的依赖，Hooks 需要显示传入依赖数组

## ref 和 reactive

ref 接收一个**基本类型**的值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的 property`·.value`,一般用绑定基本类型的响应式的值  
reactive 接收一个**对象、数组、Set、Map 类型**的值，返回一个响应式的对象，该对象是通过`Proxy`代理过的对象

**ref 传入对象，reactive 传入基本类型值，是否还会具有响应性？**

```javascript
let count1 = ref(0);
const info1 = reactive({
  name: "wtc",
  age: 18,
});

let count2 = ref({
  name: "wtc",
  age: 18,
});
let info2 = reactive(0);

console.log(count1, info1); // RefImpl Proxy
console.log(count2, info2); // RefImpl{Proxy} 原始数据0

const modifyData = () => {
  count1.value++; // 正常响应
  info1.age++; // 正常响应
  count2.value.age++; // 正常响应
  info2 = 1; // 失去响应
};
```

**对象/响应性对象解构之后，是否还会具有响应性？**

```javascript
const ageRef1 = ref(18);
const demo1 = {
  name: ref("wtc"),
  age: ageRef1,
  interests: reactive(["game", "code", "read"]),
};
const { name, age, interests } = demo1;

// 普通对象解构出来ref、reactive都具有响应性
name.value = "wtc2"; // 有响应性
age.value++; // 有响应性
interests.push("run"); // 有响应性
console.log(ageRef1.value); // 有响应性

// html中通过结构的值引入变量{{name}}-{{age}}-{{intersets}}
```

```javascript
let demo2 = {
  name2: ref("wtc"),
  age2: ageRef2,
  interests2: interestsRea2,
  nums: [0, 1],
};
const reactiveDemo2 = reactive(demo2);
let { name2, age2, interests2, nums } = reactiveDemo2;

// reactive包装后返回Proxy对象解构出来ref失去响应性，reactive和引用类型具有响应性
const changeData = () => {
  name2 = "wtc2"; // 失去响应
  age2++; // 失去响应
  interests2.push("run"); // 有响应
  nums.push(2); // 有响应
  console.log(ageRef2.value); // 失去响应
};
// html中通过结构的值引入变量{{name2}}-{{age2}}-{{intersets2}}-{{nums}}
```

1. ref 绑定对象，内部会自动调用 reactive，返回的是 RefImpl 对象，对象内是 Proxy 对象，仍然**具有响应性**；reactive 绑定基本类型，返回值就是原始数据，不做任何处理，并且**失去响应性**
2. ref 和 reactive 都是异步的
3. 将 ref **赋值**，reactive 响应式对象的 property **赋值或解构**至本地变量时，或是将该 property 传入一个函数时，我们会失去响应性
4. ref 在 reactive/template{{}}中会自动发生**解包**操作，但在作为响应式数组或像 Map 这种原生集合类型的元素被访问时，不会进行解包。
5. 当对象/响应式对象解构出来的是**ref、reactive、引用类型（数组、对象、Set、Map）时**是具有响应性的
6. ref 作为浅层响应式对象（shallowReactive）时，被访问时不会被解包

## 组件、组合式函数、自定义指令作用

组件是主要的构建模块，组合式函数侧重于有状态的逻辑，自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑

```javascript
// 自定义指令钩子
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount() {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted() {},
  // 绑定元素的父组件更新前调用
  beforeUpdate() {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated() {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount() {},
  // 绑定元素的父组件卸载后调用
  unmounted() {},
};
```
