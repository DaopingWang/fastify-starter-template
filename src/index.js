import Fastify from "fastify"
import fastifySwagger from "fastify-swagger"
import routerPlugin from "./routes"
import { items } from "./data/template"

// Instantiate fastify
const fastify = Fastify({
    logger: true,
})

// Enable fastify Swagger API documentation plugin (register before routes)
fastify.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'fastify-api'}
    }
})

// Easy routing examples
fastify.get('/test', (request, reply) => {
    reply.send({ test: 'Hello' })
})

fastify.get('/:id', (request, reply) => {
    const { id } = request.params
    reply.send(items.find(item => item.id === id))
})

// Add router plugins and prefix to the server, e.g. { prefix: '/v1' }
fastify.register(routerPlugin);

// Start the fastify server
fastify.listen(8080, '0.0.0.0', (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})