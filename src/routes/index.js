import templateRouter from "./template"

const routerPlugin = (fastify, options, done) => {
    fastify.register(templateRouter, { prefix: '/template' })
    done()
}

export default routerPlugin