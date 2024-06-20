// 存放环境变量相关的全局类型声明
declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        DB: D1Database;
      }
    }
    interface Window {
      webkitAudioContext: typeof AudioContext;
    }
  }
}
interface CloudflareEnv {
  DB: D1Database;
}
