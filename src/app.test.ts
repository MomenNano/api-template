import { FastifyInstance } from 'fastify'
import build from './app'

describe('server', () => {
  describe('plugins', () => {
    let server: FastifyInstance
    beforeAll(async () => {
      server = build()
      await server.ready()
    })

    afterAll(async () => {
      await server.close()
    })

    test('registers prisma plugin', async () => {
      expect(server.db).toBeTruthy()
    })

    test('registers redis plugin', async () => {
      expect(server.redis).toBeTruthy()
    })

    test('registers under pressure plugin', async () => {
      expect(server.memoryUsage).toBeTruthy()
    })
  })
})
