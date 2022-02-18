import fastify from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { items as templateItems } from '../data/template'

// Example schema for data/template.js
const TemplateItemSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
    }
}

// Options to get all items in data/template.js
// Build-in handlers as the second property
export const getTemplateItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: TemplateItemSchema,
            }
        }
    },
    handler: function (request, reply) {
        reply.send(templateItems)
    },
}

// Options to get item in data/template.js based on id
export const getTemplateItemOpts = {
    schema: {
        resposne: {
            200: TemplateItemSchema,
        }
    },
    handler: function(request, reply) {
        const { id } = request.params

        // find item by id in object array
        const item = templateItems.find((item) => item.id === id)
        reply.send(item)
    }
}

export const getTemplateItemById = fastify => async (request, reply) => {
    const { id } = request.params

    // find item by id in object array
    const item = templateItems.find((item) => item.id === id)
    reply.send(item)
}

export const getAllTemplateItems = fastify => async (request, reply) => {
    reply.send(templateItems)
}

export const getUuid = fastify => async (request, reply) => {
    const id = uuidv4()

    // Sent from backend to solve cors error
    reply.header("Access-Control-Allow-Origin", "*")

    return {uuid: id}
}