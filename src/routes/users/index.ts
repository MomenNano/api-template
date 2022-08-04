import { FastifyPluginAsync } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import schema from './schema'

const route: FastifyPluginAsync = async (fastify, opts) => {
  // to provide types right from json schema
  const server = fastify.withTypeProvider<JsonSchemaToTsProvider>()

  server.route({
    method: 'POST',
    url: '/',
    schema: schema.schema,
    handler: async (request, reply) => {
      return {
        foo: request.body.foo,
        bar: request.body.bar
      }
    }
  })

  server.route({
    method: 'GET',
    url: '/',
    // schema: schema.schema,
    handler: async (request, reply) => {
      return {
        ok: true
      }
    }
  })
}

export default route
