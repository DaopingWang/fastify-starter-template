import fastify from 'fastify';
import { v4 as uuidv4 } from 'uuid';

export const getUuid = fastify => async (request, reply) => {
    const id = uuidv4()

    reply.header("Access-Control-Allow-Origin", "*")

    return {uuid: id}
}