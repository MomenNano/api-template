import { FastifyPluginAsync } from 'fastify'
import swagger from '@fastify/swagger'
import fp from 'fastify-plugin'
import { readFileSync } from 'fs'
import { join } from 'path'

const { version } = JSON.parse(readFileSync(join(__dirname, '/../../../../package.json'), 'utf8'))

const swaggerGenerator: FastifyPluginAsync = async (fastify, opts) => {
  void fastify.register(swagger, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'API Template Documentation',
        description: 'Swagger Spec for API Template',
        version
      },
      host: 'localhost',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json', 'text/html'],
      tags: [
        { name: 'health', description: 'check app health' }
      ],
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Bearer',
          in: 'header'
        },
        Csrf: {
          type: 'apiKey',
          name: 'x-csrf-token',
          in: 'header'
        }
      }
    },
    exposeRoute: process.env.NODE_ENV !== 'production'
  })
}

export default fp(swaggerGenerator, {
  name: 'swagger'
})
