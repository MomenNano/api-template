import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import fastifyUnderPressure, {
  TYPE_EVENT_LOOP_DELAY,
  TYPE_EVENT_LOOP_UTILIZATION,
  TYPE_HEAP_USED_BYTES,
  TYPE_RSS_BYTES
} from '@fastify/under-pressure'

const underPressure: FastifyPluginAsync = async fastify => {
  void fastify.register(fastifyUnderPressure, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 100000000,
    maxRssBytes: 100000000,
    maxEventLoopUtilization: 0.8,
    retryAfter: 20,
    pressureHandler: (req, res, type, value) => {
      if (type === TYPE_HEAP_USED_BYTES) {
        fastify.log.warn(`too many heap bytes used: ${value ?? 0}`)
      } else if (type === TYPE_RSS_BYTES) {
        fastify.log.warn(`too many rss bytes used: ${value ?? 0}`)
      } else if (type === TYPE_EVENT_LOOP_UTILIZATION) {
        fastify.log.warn(`event loop utiliztion: ${value ?? 0}`)
      } else if (type === TYPE_EVENT_LOOP_DELAY) {
        fastify.log.warn(`event loop delay: ${value ?? 0}`)
      }

      // void res.send('out of memory') // if you omit this line, the request will be handled normally
    },
    exposeStatusRoute: {
      url: '/health',
      routeOpts: {
        logLevel: process.env.LOG_LEVEL
      },
      routeResponseSchemaOpts: {
        status: { type: 'string', default: 'ok' },
        metrics: {
          type: 'object',
          properties: {
            eventLoopDelay: { type: 'number' },
            rssBytes: { type: 'number' },
            heapUsed: { type: 'number' },
            eventLoopUtilized: { type: 'number' }
          }
        }
      }
    },
    healthCheck: async () => {
      return {
        status: 'ok',
        metrics: fastify.memoryUsage()
      }
    },
    healthCheckInterval: 10000 // Every 10 seconds
  })
}

export default fp(underPressure, {
  name: 'underPressure'
})
