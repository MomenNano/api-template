import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
  interface FastifyInstance {
    db: PrismaClient
  }
}

const prismaPlugin: FastifyPluginAsync = async (fastify, opts) => {
  fastify.decorate('db', null)

  const prisma = new PrismaClient()

  try {
    await prisma.$connect()
    fastify.log.info('connectioned to DB')
  } catch (error) {
    fastify.log.fatal('failed to establish a connection with db')
    throw error
  }

  fastify.db = prisma

  fastify.addHook('onClose', async (fastify) => {
    fastify.log.info('disconnecting Prisma from DB')
    await fastify.db.$disconnect()
  })
}

export default fp(prismaPlugin, {
  name: 'prisma'
})
