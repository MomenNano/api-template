import fp from 'fastify-plugin'
import sensible from '@fastify/sensible'
import autoload from '@fastify/autoload'
import helmet from '@fastify/helmet'
import { join } from 'path'
import { FastifyPluginAsync } from 'fastify'

const build: FastifyPluginAsync = async (fastify) => {
  void fastify.register(sensible)

  void fastify.register(autoload, {
    dir: join(__dirname, 'plugins')
  })

  void fastify.register(helmet)

  fastify.setErrorHandler((err, req, res) => {
    if (res.statusCode >= 500) {
      req.log.error({ req, res, err }, err?.message)
    } else if (res.statusCode >= 400) {
      req.log.info({ req, res, err }, err?.message)
    }

    void res.send(err)
  })
}

export default fp(build)
