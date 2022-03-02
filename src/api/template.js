import fastify from 'fastify';
import { v4 as uuidv4 } from 'uuid';

// currently fetching data from hard-coded js
//import { items as templateItems } from '../data/template'
let templateItems = require('../data/template').items

/////////////////////// API function implementations //////////////////
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

// POST add item
export const addTemplateItem = fastify => async (request, reply) => {
    const { name } = request.body
    const item = {
        id: uuidv4(),
        name
    }

    templateItems = [...templateItems, item]
    reply.code(201).send(item)
}

// DELETE delete item
export const deleteTemplateItemById = fastify => async (request, reply) => {
    const { id } = request.params

    templateItems = templateItems.filter(item => item.id !== id)

    reply.code(200).send({message: `Item ${id} has been removed`})
}

/////////////////////// Schemas, Options, Handlers for HTTP Response //////////////////
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