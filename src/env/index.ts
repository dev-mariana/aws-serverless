import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  AWS_DEFAULT_REGION: z.string(),
  AWS_ENDPOINT_URL: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  DYNAMODB_TABLE: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables: ', _env.error.format());

  throw new Error('Invalid environment variables');
}

export const env = _env.data;
