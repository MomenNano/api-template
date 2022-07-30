import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import fastifyRedis from '@fastify/redis'

const redis: FastifyPluginAsync = async fastify => {
  void fastify.register(fastifyRedis, {
    host: '127.0.0.1',
    port: 6379,
    enableAutoPipelining: true,
    connectTimeout: 500,
    maxRetriesPerRequest: 5,
    showFriendlyErrorStack: process.env.NODE_ENV !== 'production', // avoid run in production
    retryStrategy (times) {
      fastify.log.error(`Redis: Retrying to connect...${times}`)

      // Stop retrying after 6 times
      if (times >= 6) {
        return undefined
      }

      const delay = Math.min(times * 50, 2000)
      return delay
    }
  })
}

export default fp(redis)
