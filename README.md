# 十分钟搭建 Vite+Vue3 项目模板

本项目是一个基于 Vite3 搭建的 Vue3 项目模板，集成了 TypeScript、Vue Router、Pinia、Axios、Less、ESLint、Prettier、Husky、lint-staged 等等
本项目的 Github 仓库地址[https://github.com/purcellhuang/vite-vue3](https://github.com/purcellhuang/vite-vue3) 可直接下载使用。

运行环境： VSCode、**Node16+**、
VSCode 插件：TypeScript Vue Plugin (Volar)、Vue Language Features (Volar)、Prettier - Code formatter
**注：需要关闭 Vetur 插件**

## 创建 Vite 项目

[Vite 官方中文文档](https://cn.vitejs.dev/guide/)

兼容性注意
Vite 需要 Node.js 版本 14.18+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

```bash
npm create vite@latest
yarn create vite
pnpm create vite


# 附加的命令行选项直接指定项目名称和你想要使用的模板

# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```

Vite 提供了很多项目模板，这里我们直接使用`vue-ts`来创建我们的项目。该模板默认集成了 Vue3 以及 TypeScript。

```bash
# 本项目使用pnpm来管理依赖，如果没安装pnpm,先执行全局安装  npm i pnpm -g
pnpm create vite vite-vue3 --template vue-ts


cd vite-vue3
pnpm install
pnpm run dev
```

此时一个简单的 vite 项目已经创建好了，启动后看到如下效果：
![](./assets/demo-init.png)

### 项目目录结构

```bash
│  ├─public # 静态资源目录
│  │      favicon.ico
│  │
│  ├─src
│  │  │  App.vue # 入口vue文件
│  │  │  main.ts # 入口文件
│  │  │  vite-env.d.ts # vite环境变量声明文件
│  │  │
│  │  ├─assets # 资源文件目录
│  │  │      logo.png
│  │  │
│  │  └─components # 组件文件目录
│  │         HelloWorld.vue
│  │
│  │ .gitignore
│  │ index.html # Vite项目的入口文件
│  │ package.json
│  │ README.md
│  │ tsconfig.json # tsconfig配置文件
│  │ vite.config.ts # vite配置文件
```

**配置别名**
在开发中，我们经常会通过 @/view/xxx.vue 的方式去书写我们的文件路径，我们可以通过配置 vite.config.ts 和 tsconfig.json 来实现别名。

**vite.config.ts**

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue()],
})
```

此时，我们会发现这行代码会报错。
import \* as path from "path";
找不到模块“path”或其相应的类型声明。ts(2307)
这是因为我们的配置文件是 ts 类型。我们只需要安装 Node.js 类型检查包就好。

```bash
install -D @types/node
```

**tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "esnext",
    "useDefineForClassFields": true,
    "module": "esnext",
    "lib": ["esnext", "DOM", "DOM.Iterable"],
    /** 路径别名 */
    "baseUrl": "./",
    "paths": {
      "@": ["src"],
      "@/*": ["src/*"]
    },
    /* Bundler mode */
    "moduleResolution": "node",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": false
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue", "src/api/xhr/config.js"],
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
```

## 集成 Vue Router

[https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)

### 安装 vue-router

```bash
pnpm i vue-router@4
```

### 使用 vue-router

先在 src 目录下创建 router 文件夹，来存放相关的路由文件。

```bash
│  ├─src
│  │  ├─router # 路由资源文件目录
│  │  │    │  index.ts
│  │  ├─views # 视图文件目录
```

**src/router/index.ts**

```ts
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },

  { path: '/home', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/demo', name: 'Demo', component: () => import('@/views/Demo.vue') },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
```

```html
// views/Home.vue
<template>
  <div>HOME</div>
</template>

<script setup lang="ts"></script>

// views/Demo.vue
<template>
  <div>DEMO</div>
</template>

<script setup lang="ts"></script>

// App.vue
<script setup lang="ts"></script>

<template>
  <RouterView />
</template>

<style scoped>
  #app {
    width: 100vw;
    height: 100vh;
  }
</style>
```

在 vue 中使用路由。
**main.ts**

```ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
```

## 集成 Pinia

[https://pinia.web3doc.top/introduction.html](https://pinia.web3doc.top/introduction.html)

### 安装 Pinia

```bash
pnpm i pinia
```

### 使用 Pinia

与 router 一样，先在 src 目录下创建 store 文件夹，来存放相关的数据状态文件。
目录结构

```bash
│  ├─src
│  │  ├─store # 数据状态文件目录
│  │  │    │  index.ts
│  │  │    ├─ modules
│  │  │    │     │   user.ts
```

```ts
// 创建pinia实例
// store/index.ts
import { createPinia } from "pinia";

const store = createPinia();

export default store;

// 定义user数据
// store/modules/user.ts
import { defineStore } from 'pinia'

// 第一个参数是应用程序中 store 的唯一 id
const useUserStore = defineStore('user', {
    state: () => {
        return {
            name: 'hps',
        }
    },
    // other options...
})

export default useUserStore

// 在vue中使用pinia
// main.ts

import store from "./store";

app.use(store);

// 使用user数据
// App.vue
<script setup lang="ts">
import useUserStore from "@/store/modules/user";

const userStore = useUserStore();
</script>

<template>
  <div>{{ userStore.name }}</div>
  <RouterView />
</template>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
```

## 集成 ESLint

ESLint 是一个集代码审查和修复的工具，它的核心功能是通过配置一个个规则来限制代码的合法性和风格。

为了提高代码质量和可读性，我们还需要引入 ESLint 来对代码进行规范。

```bash

pnpm i eslint --save-dev

pnpm eslint --init

You can also run this command directly using 'npm init @eslint/config'.
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm  // javascript
√ Which framework does your project use? · vue     // vue
√ Does your project use TypeScript? · No / Yes   // yes
√ Where does your code run? · browser, node     // brower/node
√ What format do you want your config file to be in? · JSON   // json
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest eslint-plugin-vue@latest @typescript-eslint/parser@latest
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · pnpm
Installing @typescript-eslint/eslint-plugin@latest, eslint-plugin-vue@latest, @typescript-eslint/parser@latest
Packages: +34
++++++++++++++++++++++++++++++++++
Progress: resolved 204, reused 182, downloaded 0, added 0, done

devDependencies:
+ @typescript-eslint/eslint-plugin 6.5.0
+ @typescript-eslint/parser 6.5.0
+ eslint-plugin-vue 9.17.0

Done in 3.1s
Successfully created .eslintrc.json file

```

运行 pnpm eslint --init 后，我们会发现，它给我们安装了一些依赖以及自动创建了文件.eslintrc.json

```bash

    "@typescript-eslint/eslint-plugin": "^6.5.0",
    "@typescript-eslint/parser": "^6.5.0",
    "eslint": "^8.48.0",
    "eslint-plugin-vue": "^9.17.0",
```

**eslintrc.json**

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:vue/vue3-essential"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "vue"],
  "rules": {}
}
```

我们还需要在 package.json 中，给我们的 ESLint 配置脚本指令

```json

  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "eslint": "eslint src --ext .js,.vue,.ts,.jsx,.tsx --ignore-path .gitignore --fix"
  },
```

我们现在可以使用脚本指令`pnpm eslint`对我们的代码进行校验修复了。但此时，我们会发现 ESLint 无法对 vue 文件中的 template 进行校验修复。我们查看 vue 文档得知：我们还需要配置 parser 来解析 vue 文件
[https://cn.vuejs.org/guide/scaling-up/tooling.html#linting](https://cn.vuejs.org/guide/scaling-up/tooling.html#linting)
[https://eslint.vuejs.org/user-guide/](https://eslint.vuejs.org/user-guide/)

```bash
pnpm i eslint-plugin-vue --save-dev

```

修改.eslintrc.json 文件

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    // vue 规则
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  // 添加 vue文件解析器  解析template文件
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "vue"],
  "rules": {
    // 自定义规则
  }
}
```

现在我们可以通过 pnpm eslint 来检查修复我们的代码。
我们不希望每次都通过手动运行脚本指令方式来检查 ESLint 规则。
我们希望在项目启动或者打包的时候能够实时地给我们校验检查代码该如何实现呢？
我们可以通过 vite-plugin-eslint 这个插件来实现

```bash
pnpm i vite-plugin-eslint --save-dev
```

**vite.config.ts**

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import eslintPlugin from 'vite-plugin-eslint' //导入包

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 配置ESLint插件
  plugins: [vue(), eslintPlugin()],
})
```

### 集成 Prettier

Prettier 是一个代码格式化工具，它可以自动调整代码的缩进、换行、空格等格式，使代码具有统一的风格。

虽然 ESLint 可以检查代码风格，但它并不会自动格式化代码。而 Prettier 专注于代码格式化，但不会检查代码错误。所以我们这里还需要引进 Prettier 来做代码美化。

```bash
pnpm i --save-dev prettier
```

创建配置文件 `.prettierrc.cjs`

```js
/** .prettierrc.js
 * 在VSCode中安装prettier插件 打开插件配置填写`.prettierrc.js` 将本文件作为其代码格式化规范
 * 在本文件中修改格式化规则，不会同时触发改变ESLint代码检查，所以每次修改本文件需要重启VSCode，ESLint检查才能同步代码格式化
 * 需要相应的代码格式化规范请自行查阅配置，下面为默认项目配置
 */
module.exports = {
  // 一行最多多少个字符
  printWidth: 150,
  // 指定每个缩进级别的空格数
  tabWidth: 2,
  // 使用制表符而不是空格缩进行
  useTabs: false,
  // 在语句末尾是否需要分号
  semi: false,
  // 是否使用单引号
  singleQuote: true,
  // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
  quoteProps: 'as-needed',
  // 在JSX中使用单引号而不是双引号
  jsxSingleQuote: false,
  // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
  trailingComma: 'es5',
  // 在对象文字中的括号之间打印空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
  arrowParens: 'always',
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
  rangeStart: 0,
  rangeEnd: Infinity,
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准 always\never\preserve
  proseWrap: 'preserve',
  // 指定HTML文件的全局空格敏感度 css\strict\ignore
  htmlWhitespaceSensitivity: 'css',
  // Vue文件脚本和样式标签缩进
  vueIndentScriptAndStyle: false,
  //在 windows 操作系统中换行符通常是回车 (CR) 加换行分隔符 (LF)，也就是回车换行(CRLF)，
  //然而在 Linux 和 Unix 中只使用简单的换行分隔符 (LF)。
  //对应的控制字符为 "\n" (LF) 和 "\r\n"(CRLF)。auto意为保持现有的行尾
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: 'auto',
}
```

```json
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "eslint": "eslint src --ext .js,.vue,.ts,.jsx,.tsx --ignore-path .gitignore ",
    "prettier": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\""
  },
```

此时，我们运行 pnpm prettier 会发现 prettier 会按照规则对我们的代码进行格式化。

### 处理 ESLint 与 Prettier 冲突

在开发中，我们会经常遇到 prettier 与 ESLint 的配置存在冲突。
此时我们可以通过 `eslint-config-prettier` 和 `eslint-plugin-prettier` 来避免这个问题。
`eslint-config-prettier` 时 ESLint 的配置，会关闭可能与 Prettier 冲突的 ESLint 规则。它允许你在项目中同时使用 ESLint 和 Prettier，而不会出现规则冲突的问题。
`eslint-plugin-prettier` 是一个 ESLint 插件，它将 Prettier 的格式化功能集成到 ESLint 中。通过使用 eslint-plugin-prettier，你可以在 ESLint 中运行 Prettier 的格式化规则，并在代码检查过程中自动修复格式错误。

```bash
# 安装 eslint-config-prettier
pnpm i --save-dev eslint-config-prettier
pnpm i --save-dev eslint-plugin-prettier
```

ESLint 配置文件

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    // 告诉 ESLint 关闭与 Prettier 格式化规则冲突的任何规则，需写在最后，会覆盖前面的配置
    "plugin:prettier/recommended"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "vue",
    // 将 Prettier 的格式化功能集成到 ESLint 中。会应用Prettier的配置
    "prettier"
  ],
  "rules": {
    // 自定义规则
  }
}
```

**注意：上面的方法只能处理 extends 中的配置冲突。rules 中的冲突无法处理。我们一般会在 perttier 中统一我们的代码风格。在 eslint 中保证我们的代码质量。**

```json
// 为我们的项目开启 保存自动格式代码  使用的VSCode中的Prettier插件
// .vscode/extensions.json
{
  // 开启自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  // 保存的时候自动格式化
  "editor.formatOnSave": true,
  // 默认格式化工具选择prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 配置该项，新建文件时默认就是space：2
  "editor.tabSize": 2
}
```

### 集成 husky 和 lint-staged

`husky` 和 `lint-staged` 是两个常用的工具，它们的作用是帮助开发团队`在代码提交前进行代码质量检查和格式化，以确保代码的一致性和可维护性。`

具体来说，husky 的作用是通过 Git 钩子，在 Git 操作的不同阶段运行自定义脚本。它可以在代码提交前运行脚本，例如运行代码风格检查工具（如 ESLint 或 Prettier）或运行单元测试等。这样，每次提交代码时，husky 会自动运行这些脚本，并在有问题的情况下阻止提交，从而确保提交的代码符合团队的规范和标准。

而 lint-staged 的作用是在代码提交前对即将提交的文件进行静态代码分析。它可以配置要运行的脚本，例如运行代码风格检查工具或运行其他自定义的检查工具。lint-staged 会根据配置的规则，只对即将提交的文件进行检查，而不是对整个代码库进行检查，从而提高检查的效率。如果有问题的文件被检测到，lint-staged 可以阻止提交，确保只有符合规范的代码被提交到代码库中。

通过使用 husky 和 lint-staged，开发团队可以在代码提交前自动运行代码检查和格式化工具，从而减少代码质量问题和风格不一致的情况。这有助于提高代码的可读性、可维护性和可测试性，同时也有助于团队成员之间的协作和沟通，确保代码库的整体质量。

```bash
pnpm install husky lint-staged --save-dev

# 生成.husky文件夹。
npx husky install
# 生成我们需要的 git hook。
npx husky add .husky/pre-commit 'npx lint-staged'
```

我们可以看到生成的 git hook： `.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged

```

在 package.json 中配置 lint-staged

```json
  "lint-staged": {
    "src/**/*.{ts,js,jsx,tsx,vue}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
```

配好之后，我们在 git commit 代码的时候会自动帮我们修复代码以及格式化代码再进行提交。
这样即使不用 VSCode 来开发代码，也保证了项目代码风格的统一。
