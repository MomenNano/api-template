import app from './src/app'

/*
  load enviroment variables
*/
import './src/config'

/*
  initialize fastify
*/
const server = app({
  ignoreTrailingSlash: true,
  logger: {
    level: process.env.LOG_LEVEL
  }
})

/*
  start and listen to connections
*/
async function start (): Promise<void> {
  try {
    await server.listen({
      port: Number(process.env.PORT),
      host: process.env.HOST
    })
  } catch (error) {
    server.log.fatal(error)
  }
}

void start()
