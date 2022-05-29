import { defineUserConfig, defaultTheme } from "vuepress";

export default defineUserConfig({
  lang: "zh-CN",
  title: "超凶的个人博客",
  description: "用于记录自己的日常学习和总结",
  head: [["link", { rel: "icon", href: "/images/favicon.png" }]],
  theme: defaultTheme({
    logo: "/images/logo.png",
    repo: "",
    navbar: [
      {
        text: "前端",
        children: [
          {
            text: "HTML",
            link: "/fe/html",
          },
          {
            text: "CSS",
            link: "/fe/css",
          },
          {
            text: "JavaScript",
            link: "/fe/js/",
          },
          {
            text: "TypeScript",
            link: "/fe/ts",
          },
          {
            text: "框架",
            link: "/fe/frame",
          },
        ],
      },
      {
        text: "设计模式",
        link: "/design",
      },
      {
        text: "数据结构和算法",
        link: "/algorithm",
      },
    ],
    sidebar: {
      "/fe/js/": [
        "/fe/js/数据类型",
        "/fe/js/this",
        "/fe/js/作用域",
        "/fe/js/原型链",
        "/fe/js/继承",
        "/fe/js/迭代器",
        "/fe/js/生成器",
        "/fe/js/事件",
        "/fe/js/Canvas",
        "/fe/js/WebGL",
      ],
    },
  }),
});
