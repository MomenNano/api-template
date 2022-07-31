import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import fastifyRateLimit from '@fastify/rate-limit'

const rateLimit: FastifyPluginAsync = async fastify => {
  void fastify.register(fastifyRateLimit, {
    timeWindow: '5 minutes',
    max: 100,
    whitelist: ['127.0.0.1', 'localhost'],
    redis: fastify.redis,
    skipOnError: true
  })
}

export default fp(rateLimit, {
  name: 'rateLimit',
  dependencies: ['redis']
})
