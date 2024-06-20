# 框架使用说明

## 环境准备

- 推荐使用pnpm，否则依赖可能安装不上。
- Node.js 版本要求18.x以上。
- 推荐安装 nvm 来管理 Node.js 版本。

## 包管理工具

- pnpm
- 优势

  - 高效的磁盘空间利用
  - 更快的安装速度
  - 严格的依赖隔离
  - 内容寻址的包存储
  - 原子的操作
  - 灵活的多包管理
  - [快速入门](https://pnpm.io/)

## 工具配置

如果您使用的 IDE 是vscode(推荐)的话，可以安装以下工具来提高开发效率及代码格式化

- ESLint - 脚本代码检查
- Prettier - 代码格式化
- Code Spell Checker
- Tailwind CSS IntelliSense
- DotENV - .env 文件 高亮
- Even Better TOML toml文件高亮

## 脚本命令

```bash
pnpm dev # 正常开发调试
pnpm dev:tg # telegram miniapp 开发调试
pnpm build:qa # 测试环境构建
pnpm build # 生产环境构建
pnpm start # 生产环境部署
pnpm depoly:cf # cloudflare 部署
pnpm build:docker # 生产环境自托管 docker 构建
pnpm start:docker # 生产环境自托管 docker 部署
```

## 如何运行项目

- 安装依赖

  ```bash
  pnpm i
  ```

- 本地数据库初始化

```bash
 pnpx wrangler d1 execute telegram-miniapp-template-test --local --file=./db-schema/init_schema.sql
```

```bash
<!-- 推荐使用https环境启动 -->
默认环境development中的NEXT_PUBLIC_BASE_URL环境变量配置是的https，如果需要运行http环境的话需要修改环境变量为http
npm run dev:tg
```

```bash
<!-- 非https环境启动 -->
npm run dev
```

测试环境打包

```bash
npm run build:qa
```

生产模式打包

```bash
 npm run build
```

## 技术栈

- Next14-[使用文档](https://nextjs.org/)
- Shadcn/ui-[使用文档](https://ui.shadcn.com/)
- Tailwind3.x-[使用文档](https://www.tailwindcss.cn/)
- Zustand-[使用文档](https://docs.pmnd.rs/zustand/getting-started/introduction)
- Ahooks-[使用文档](https://ahooks.js.org/)
- next-intl国际化-[使用文档](https://react.dev/)
- Typescript
- rem + 媒体查询 适配
- Cloudflare D1

## 基本框架结构说明

```bash
├── .husky                     # husky配置
├── .vscode                    # vscode配置
├── db-schema                  # 数据库配置
├── public                     # 公共静态资源目录
├── src                        # 源码: 业务代码主要集中在此目录
│   ├── app                    # app 路由
│   ├── assets                 # 静态资源
│   ├── biz-components         # 全局公用业务组件
│   ├── components             # 全局公用组件
│   ├── config                 # 项目配置文件
│   ├── constants              # 常量文件
│   ├── hooks                  # 全局hook
│   ├── lib                    # 服务端相关的能力
│   ├── locales                # 国际化翻译文件
│   ├── services               # api请求
│   ├── store                  # store状态管理
│   ├── utils                  # 客户端相关工具能力
│   ├── I18n.ts                # 国际化配置
│   ├── middleware.ts          # 中间件
│   ├── main.ts                # 入口文件
├── .env.development           # 开发开发环境变量配置文件
├── .commitlintrc              # commitlin配置文件
├── .editorconfig              # editor配置文件
├── .eslintrc.json             # eslint 检验忽略文件
├── .gitignore                 # git 忽略文件配置项
├── .prettierrc                # prettier配置文件
├── .components.json           # shadcn配置文件
├── Dockerfile                 # Dockerfile文件
├── env.d.ts                   # ts环境变量文件
├── image-loader.js            # 图片资源cnd处理
├── next.config.mjs            # next配置文件
├── package.json               # package
├── postcss.config.js          # postcss配置文件
├── README.md                  # 使用文档
├── tailwind.config.ts         # tailwind 配置文件
├── tsconfig.json              # ts 配置文件
├── typings.d.ts               # ts 存放非环境变量相关的全局类型声明
├── wrangler.toml              # 数据库相关配置
```

## 目录补充说明

- src 目录

- 业务相关的代码主要集中在 src 目录下

- assets: 静态资源放在该目录下，管理 images

  - images 管理图片资源，图片命名采用模块+图片名的方式,eg:home-bg.png
    - 公用图片不用加模块前缀，一般来说模块名为路由对应页面的路径
    - 采用中划线进行连接

- Svg资源管理
  Icon现在使用的是codesign管理的方案不能满足需求的情况可在里面进行扩展
  - 在components下封装了一个SvgIcon的组件，在[svg管理平台上](https://codesign.qq.com/app/icon/dGZQlK3qqDYwa0X/detail?team_id=Ol9y5n1gzGwgn9d&projectId=dGZQlK3qqDYwa0X)上传管理svg资源后，直接在项目中引入SvgIcon使用即可，name对应为上传svg的名称，通过样式可以调整svg的颜色以及大小
  - 使用如下‘
  - 【腾讯 CoDesign】邀请你加入团队“用户西南偏南ccj的团队”，并参与文件“aircoin”的协作，点击链接加入：<https://codesign.qq.com/invite/WQCkAdRKS8>

```jsx
import { Icon } from '@/components';
const Home = () => {
  return (
    <div>
      <Icon name="arrow-up text-[20px] text-red-500"></Icon>
    </div>
  );
};

export default Home;
```

- components: 全局公用组件

  - 文件名使用中划线进行分割，组件中index.tsx是根组件，其他拆分的组件必填Pascal 命名
  - 全局组件多个业务用到才可提取到当前文件下进行管理，不然请就近维护
  - 详细目录结构参照 components 下 组件的结构
  - 自定义组件通过目录下 index.ts 做统一导出，页面通过引入导出文件进行使用，具体使用请查看 index.ts 文件
  - 具体适用如下

```jsx
import { Tabbar } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'telegram miniapp',
  description: 'telegram miniapp',
};

export const runtime = 'edge';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      <Tabbar />
    </main>
  );
}

```

- biz-components: 全局业务公用组件

  - 使用方式和components一致
  - 跟偏向业务相关的组件，不那么有普适性的组件

- config: 配置文件管理

  - 你认为可以抽离成配置的文件的都可以抽到当前文件夹下维护

- constants: 常量文件管理
  - 常量文件管理按照功能进行拆分，详细操作constants下已有文件
  - 通过目录下 index.tss 做统一导出，页面通过引入导出文件进行使用
  - 使用如下

```jsx
import { COOKIES_LOCALE, DEFAULT_LOCALE } from '@/constants';
```

- hooks

  - 逻辑复用采用 hooks 方式
  - 文件名以 use 开头，比如 useMessage，文件命名已 use 开头，eg：useTable、useConfirm
  - 项目引入引入了 ahooks，自定义 hooks 前请先查看有没有封装好的 hook，具体使用方式请查看技术栈中有文档地址

- store: 以文件为模块的形式组织

  - 注意使用只能在客户端组件中使用
  - 拆分按照模块相关原则进行拆分组织使用

- utils: 客户端公用工具函数等

  - 文件名以小驼峰命名，eg：setPageTitle
  - 工具类能使用 lodash-es 来处理，尽量通过使用 lodash 来处理，不重复造轮子
  - auth 用户信息相关 操作逻辑
  - storage 存储处理
  - is 判断是否是 xx 类型工具函数
  - regex 校验、正则工具
  - 工具类封装推荐尽量使用class封装，参考auth以及regex，如果你习惯is.js的方式也可以
  - 最终都通过index.ts文件做导出使用
  - 使用如下

- lib:只存放跟服务端组件相关的工具以及方法
- index.ts文件做统一导出 并且限制了只能在服务端中使用`import 'server-only'`;
- 其他规则跟utils类似

## Store

- store仅可以在客户端使用
- 非必要没必要使用

## Types

- 非模块进行ts类型管理
- 在index.ts中进行统一的导出使用

```jsx
import { IExampleData, IResponseWrapper } from '@/types';
```

## Services 层设计

- http请求

  - 基于axios以及fetch二次封装
  - 封装以后不管是服务端组件请求还是客户端组件请求都可以直接使用
  - 具体参照Services下文件使用
  - 常用的配置有是否取消请求abort,cache缓存相关配置，具体可以是进入到ts文件中查看
  - 在index.ts中进行统一的导出使用

```jsx
'use client';
import { getExample } from '@/services';
import { IExampleData } from '@/types';
import { useAsyncEffect } from 'ahooks';
import { useTranslations } from 'next-intl';
import { FC, memo, useEffect, useState } from 'react';

interface ComponentDemoProps {}
const ComponentDemo: FC<ComponentDemoProps> = memo(async (props) => {
  const t = useTranslations('app');
  const [examples, setExamples] = useState<IExampleData>([]);

  useAsyncEffect(async () => {
    // 测试 CSR 请求
    const { data } = await getExample({ example: 'example' });
    data && setExamples(data);
  }, []);
  return (
    <div>
      <h1>{t('title')}</h1>
      {examples.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});
ComponentDemo.displayName = 'ComponentDemo';
export default ComponentDemo;

```

## 异步操作

- 尽可能使用 async + await 处理
- 可读性更强 + 异常捕捉

## 环境变量

- 本地开发环境变量存储在 `.env.development`
- 测试环境变量存储在 `wrangler.toml` 中的 `[env.preview.vars]`
- 生产环境变量存储在 `wrangler.toml` 中的 `[env.production.vars]`

## 前端储存

- 使用 api 尽量封装后再使用
- 不要直接裸用
- 对于 cookie 的操作使用`js-cookie`，请基于此库进行二次封装使用,[文档](https://github.com/js-cookie/js-cookie)
- storage 的操作使用`store2`，请基于此库进行二次封装使用,[文档](https://github.com/nbubna/store)

## 国际化方案

采用 next-intl + cookies 处理

- 目前仅支持在 client component 中使用
- 翻译文件存放在 `/src/locales`

## 代码提交 建议使用Conventional Commits规范提交

## 分支管理 参考 Git Flow、GitHub Flow、GitLab Flow

## ESLint

- 不管是多人合作还是个人项目，代码规范都是很重要的。这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性。
- 项目已经集成 eslint 校验，并且配置了vscode 自动格式化配置，前置条件需要先安装eslint+Prettier插件
- 所有的配置文件都在 .eslintrc.json 中。 根据官方的 eslint 规则做了少许的修改，后续可根据根据使用情况进行配置

## 其他

- 编辑器体检 使用 vscode
- 如有需要增加的类库讨论后再做新增
- 其他: 使用第三方库或者组件等的时候, 不要裸用或者裸继承. 最好自己封装一层
  - 因为:没法进行一些通用处理
- 如果使用的库出现问题, 只能到处去修改
- 尽量避免使用硬编码(在代码中直接裸写一些后面可能会变化的值, 且在到处使用)
- 建议统一使用Image组件

- 如 `if ( code === 1 )`

  `if ( code === ResTypes.SUCCESS )`
