// 存放非环境变量相关的全局类型声明
interface Window {}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_TG_MINIAPP_URL: string;
    NEXT_PUBLIC_TG_MINIAPP_NAME: string;
  }
}
