import {
    getUuid as handleUuidGet,
} from '../api/template'

export default function templateRouter(fastify, options, next) {
    fastify.get('/uuid', handleUuidGet(fastify))

    fastify.get('/', (request, reply) => {
        reply.send({template: 'works'})
    })
    next()
}