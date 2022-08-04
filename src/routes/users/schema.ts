const schema = {
  body: {
    type: 'object',
    properties: {
      foo: { type: 'string' },
      bar: { type: 'string' }
    },
    required: ['foo', 'bar']
  }
} as const // don't forget to use const !

export default {
  schema
}
