import { FastifyInstance } from 'fastify'
import build from '../../app'

describe('users route', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = build()
    await server.ready()
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
    jest.resetAllMocks()
  })

  afterAll(async () => await server.close())

  it('should return the same passed request object', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: {
        foo: 'hello',
        bar: 'world'
      }
    })

    const payload = JSON.parse(response.payload)

    expect(response.statusCode).toEqual(200)
    expect(payload).toEqual({
      foo: 'hello',
      bar: 'world'
    })
  })

  it('get route', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/users'
    })

    const payload = JSON.parse(response.payload)

    expect(response.statusCode).toEqual(200)
    expect(payload).toEqual({
      ok: true
    })
  })
})
