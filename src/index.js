import Fastify from "fastify"
import routerPlugin from "./routes"
import { items } from "./data/template"

const fastify = Fastify({
    logger: true,
})

// Routing examples
fastify.get('/test', (request, reply) => {
    reply.send({ test: 'Hello' })
})

fastify.get('/:id', (request, reply) => {
    const { id } = request.params
    reply.send(items.find(item => item.id === id))
})


fastify.register(routerPlugin);

fastify.listen(8080, '0.0.0.0', (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})