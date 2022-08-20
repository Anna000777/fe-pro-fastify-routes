import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', (request,reply) => {

  if(request.body.toLowerCase().includes('fuck')){
    return reply.status(403).send('unresolved');
  }
  reply.send(request.body.toUpperCase());

})

fastify.post('/lowercase', (request,reply) => {

  if(request.body.toLowerCase().includes('fuck')){
    return reply.status(403).send('unresolved');
  }
  reply.send(request.body.toLowerCase());

})

fastify.get('/user/:id', (request, reply) => {
  const {id} = request.params;
  if (users[id]){
    return reply.send(users[id]);
  }
  reply.status(400).send('User not exist');
})

fastify.get('/users', (request, reply) => {
  const {filter,value} = request.query;
  let result = Object.values(users);
  if(+value){
    return result.filter((user) => user[filter] === +value);
  }
  if (filter && value) {
    return result.filter((user) => user[filter] === value);
  }

  reply.send(result);
})

export default fastify;
