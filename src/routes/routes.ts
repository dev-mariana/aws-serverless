import { env } from '@/env';
import { config } from '@/infra/database/dynamo/dynamo';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function usersRoutes(app: FastifyInstance) {
  const client = new DynamoDBClient(config);
  const documentClient = DynamoDBDocumentClient.from(client);
  const tableName = env.DYNAMODB_TABLE;

  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const { name, email, password } = createUserBodySchema.parse(request.body);
    const params = {
      TableName: tableName,
      Item: {
        id: crypto.randomUUID(),
        name,
        email,
        password,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString() || null,
      },
    };

    const data = await documentClient.send(new PutCommand(params));
    console.log(data);

    return reply.status(201).send({ message: 'User created!' });
  });
}
