import sensible from '@fastify/sensible'
import autoload from '@fastify/autoload'
import helmet from '@fastify/helmet'
import { join } from 'path'
import fastify, { FastifyInstance } from 'fastify'

export default function (opts = {}): FastifyInstance {
  const app = fastify(opts)

  void app.register(sensible)

  void app.register(autoload, {
    dir: join(__dirname, 'plugins')
  })

  void app.register(autoload, {
    dir: join(__dirname, 'routes'),
    routeParams: true
  })

  void app.register(helmet)

  app.setErrorHandler((err, req, res) => {
    if (res.statusCode >= 500) {
      req.log.error({ req, res, err }, err?.message)
    } else if (res.statusCode >= 400) {
      req.log.info({ req, res, err }, err?.message)
    }

    void res.send(err)
  })

  return app
}
