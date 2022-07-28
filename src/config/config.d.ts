export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      HOST: string
      NODE_ENV: 'development' | 'testing' | 'staging' | 'production'
      LOG_LEVEL: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'
      DATABASE_URL: string
    }
  }
}
