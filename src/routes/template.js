import {
    getUuid as handleUuidGet,
    getAllTemplateItems as handleAllTemplateItemsGet,
    getTemplateItemById as handleTemplateItemByIdGet,
    getTemplateItemsOpts,
    getTemplateItemOpts
} from '../api/template'

// options is for defining schema of http response (map return object to schema)
export default function templateRouter(fastify, options, done) {
    fastify.get('/uuid', handleUuidGet(fastify))

    fastify.get('/', (request, reply) => {
        reply.send({template: 'works'})
    })

    // Handle requests using built-in handlers in schema/option
    fastify.get('/item/:id', getTemplateItemOpts)
    fastify.get('/items', getTemplateItemsOpts)

    // Or handle requests using handling function
    // fastify.get('/items', getTemplateItemsOpts, handleAllTemplateItemsGet(fastify))
    done()
}