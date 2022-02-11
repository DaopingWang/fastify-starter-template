import templateRouter from "./template"

const routerPlugin = (fastify, options, next) => {
    fastify.register(templateRouter, { prefix: '/template' })
    next()
}

export default routerPlugin