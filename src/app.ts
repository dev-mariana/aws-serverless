import fastify from 'fastify';
import { usersRoutes } from './routes/routes';

export const app = fastify({ logger: true });

app.register(usersRoutes, { prefix: 'users' });
