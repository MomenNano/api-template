import { join } from 'path'
import envSchema from 'env-schema'

const ENV_SCHEMA = {
  type: 'object',
  required: ['PORT', 'HOST'],

  properties: {
    PORT: {
      type: 'number',
      default: 8080
    },
    HOST: {
      type: 'string',
      default: '0.0.0.0'
    },
    NODE_ENV: {
      type: 'string',
      enum: ['development', 'testing', 'staging', 'production'],
      default: 'production'
    },
    LOG_LEVEL: {
      type: 'string',
      enum: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
      default: 'info'
    },
    DATABASE_URL: {
      type: 'string'
    }
  }
}

export default envSchema({
  schema: ENV_SCHEMA,
  dotenv: {
    path: join(__dirname, '/../../../.env')
  }
})
